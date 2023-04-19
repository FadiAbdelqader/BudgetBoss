const axios = require('axios');

  exports.getByRegion = async (req, res) => {
    try {
      const { region } = req.params;
  
      console.log('Récupération des données depuis l\'API...');
      const { data } = await axios.get('https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=1&facet=carburants_disponibles&facet=carburants_indisponibles&facet=horaires_automate_24_24&facet=services_service&facet=departement&facet=region&facet=prix');
      
      const records = data.records.map(record => JSON.stringify(record.fields));
      const geometry = JSON.stringify(data.records[0].geometry);

      console.log('records : ', records);
      console.log('geometry : ', geometry);
      console.log('Données récupérées depuis l\'API :', data);
  
      console.log('Conversion des données en tableau...');
      const dataArray = Object.values(data);
      console.log('Données converties en tableau :', dataArray);
  
      console.log(`Filtrage des données pour la région "${region}"...`);
      const filteredData = dataArray.filter(item => item.region === region);
      console.log('Données filtrées pour la région :', filteredData);
  
      console.log('Tri des données par prix croissants...');
      filteredData.sort((a, b) => a.prix - b.prix);
  
      console.log('Récupération des 5 éléments les moins chers...');
      const cheapestData = filteredData.slice(0, 5);
      console.log('5 éléments les moins chers :', cheapestData);
      
      
      res.status(200).json(cheapestData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  };


  exports.getCarburantByRegion = async (req, res) => {
   
    try {

      const { region } = req.params;

      //envoi de la requete a l'api
      const response = await axios.get('https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=1000&facet=carburants_disponibles&facet=carburants_indisponibles&facet=horaires_automate_24_24&facet=services_service&facet=departement&facet=region');
      
      const records = response.data.records;
      console.log('records : ', records);
      //filtrer la liste records selon la region et recuperer les carburants disponibles de la region 
      const carburantsRegion = records
        .filter(record => record.fields.region === region)
        .map(record =>  record.fields.carburants_disponibles.split(';'));

        console.log('Carburants REGION : ',carburantsRegion)
      //transformer la liste des carburants disponibles en un seul json
      const uniqueItems = new Set();
      for (const sublist of carburantsRegion) {
        sublist.forEach(item => uniqueItems.add(item));
      }
      const result = Array.from(uniqueItems);
      console.log('result : ', result)
      const jsonResult = JSON.stringify(result);

      console.log('RESULTAT :',jsonResult )
      //envoi de la réponses
      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  };

  
  exports.getAllPrixCarburant = async (req, res) => {
    try {
      const { region, type_carburant } = req.params;
      const type_prix = type_carburant.toLowerCase() + "_prix";
      const response = await axios.get('https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=1000&facet=carburants_disponibles&facet=carburants_indisponibles&facet=horaires_automate_24_24&facet=services_service&facet=departement&facet=region');
      const records = response.data.records;
      //console.log('RECORDS : ',records);
      const filteredRecords = records
        //.filter(record => record.fields.region === region && record.fields.carburants_disponibles.split(';').includes(type_carburant))
        .filter(record => record.fields.region === region)
        .map(record => ({
          services: record.fields.services,
          services_service : record.fields.services_service,
          horaires: record.fields.horaires,
          horaires_automate_24_24: record.fields.horaires_automate_24_24,
          ville: record.fields.ville,
          departement: record.fields.departement,
          adresse: record.fields.adresse,
          prix: record.fields[`${type_carburant.toLowerCase()}_prix`]
        }));
        console.log('RESULTAT A ENVOYER AU FRONT  : ', filteredRecords); // Affichage des enregistrements filtrés
      res.json(filteredRecords);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  };
  

  exports.getPrixCarburant = async (req, res) => {
    try {
      const { region, type_carburant } = req.params;
      const response = await axios.get('https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=1000&facet=carburants_disponibles&facet=carburants_indisponibles&facet=horaires_automate_24_24&facet=services_service&facet=departement&facet=region');
      const records = response.data.records;
      //console.log('RECORDS : ',records);
      const filteredRecords = records
        //.filter(record => record.fields.region === region && record.fields.carburants_disponibles.split(';').includes(type_carburant))
        .filter(record => record.fields.region === region)
        .map(record => ({
          services: record.fields.services,
          horaires: record.fields.horaires,
          horaires_automate_24_24: record.fields.horaires_automate_24_24,
          ville: record.fields.ville,
          departement: record.fields.departement,
          services_service: record.fields.services_service,
          adresse: record.fields.adresse,
          prix: record.fields[`${type_carburant.toLowerCase()}_prix`]
        }))
        .sort((a, b) => a.prix - b.prix); // tri par ordre croissant de la valeur de prix

      //console.log('RESULTAT A ENVOYER AU FRONT  : ', filteredRecords); // Affichage des enregistrements filtrés

        
      const cheapestRecord = filteredRecords[0];
      console.log('RESULTATS a envoyer a front : ', cheapestRecord); // Affichage du record qui a le prix le moins cher
      res.json(cheapestRecord);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  };

