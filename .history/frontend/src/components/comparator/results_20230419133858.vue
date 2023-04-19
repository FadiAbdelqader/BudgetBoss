<template>
    <div>
      <h2>{{ carburant }}</h2>
      <button @click="fetchPrix">Prix</button>
      <button @click="fetchAllPrix">AllPrix</button>
      <p>Région : {{ region }}</p>
      <div class = "station" v-if="prix && prixB && !allprixB">
        <p><strong>Adresse:</strong> {{ prix.adresse }}, {{ prix.ville }}, {{ prix.departement }}</p>
        <p v-if="prix.horaires_automate_24_24 === 'Oui'">Auto ouvert 24h/24 disponible dans cette station</p>
        <p v-if="prix.horaires_automate_24_24 === 'Non'">Auto ouvert 24h/24 indisponible dans cette station</p>
        <div v-if="prix.prix">
          <p>Prix unitaire : {{ prix.prix }} €</p>
        </div>
        <div v-else>
          <p>Prix unitaire : indisponible</p>
        </div>
        <p><strong>Services disponibles dans cette station :</strong></p>
        <ul>
          <li v-if="prix.services">
            <div v-for="(service, index) in JSON.parse(prix.services).service" :key="index">
              {{ service }}
            </div>
          </li>
          <li v-else>Aucun service disponible</li>
        </ul>
        <p><strong>Horaires ouverture semaine :</strong></p>
        <ul>
          <li v-if="prix.horaires">
            <div v-if="JSON.parse(prix.horaires).jour">
              <div v-for="(jour, index) in JSON.parse(prix.horaires).jour" :key="index">
                <div v-if="jour['@ferme'] === '1'">
                  <p>{{jour['@nom']}} : fermé</p>
                </div>
                <div v-else>
                  <p>{{jour['@nom']}} : {{parseHoraireOuverture(jour.horaire)}}-{{ parseHoraireFermeture(jour.horaire)}}</p>
                </div>
              </div>
            </div>  
            <div v-else>
              <p>Horaires indisponibles</p>
            </div>
          </li>
          <li v-else>
            <p>Horaires indisponibles</p>
          </li>
        </ul>
      </div>
      
      <div class="station-container" v-if="prixList && !prixB && allprixB" >
        <div class="station" v-for="prix in prixList">
          <p>Adresse : {{ prix.adresse }}, {{ prix.ville }}, {{ prix.departement }}</p>
          <p v-if="prix.horaires_automate_24_24 === 'Oui'">Auto ouvert 24h/24 disponible dans cette station</p>
          <p v-if="prix.horaires_automate_24_24 === 'Non'">Auto ouvert 24h/24 indisponible dans cette station</p>
          <div v-if="prix.prix">
            <p>Prix unitaire : {{ prix.prix }} €</p>
          </div>
          <div v-else>
            <p>Prix unitaire : indisponible</p>
          </div>
          <p>Services disponibles dans cette station : </p>
          <ul>
            <li v-if="prix.services">
              <div v-for="(service, index) in JSON.parse(prix.services).service" :key="index">
                {{ service }}
              </div>
            </li>
            <li v-else>Aucun service disponible</li>
          </ul>
          <p>Horaires ouverture semaine : </p>
          <ul>
            <li v-if="prix.horaires">
              <div v-if="JSON.parse(prix.horaires).jour">
                <div v-for="(jour, index) in JSON.parse(prix.horaires).jour" :key="index">
                  <div v-if="parseHoraireFermeture(jour.horaire) && parseHoraireOuverture(jour.horaire) || jour['@ferme']">
                    <div v-if="jour['@ferme'] === '1'">
                      <p>{{jour['@nom']}} : fermé</p>
                    </div>
                    <div v-else>
                      <div>
                        <p>{{jour['@nom']}} : {{parseHoraireOuverture(jour.horaire)}}-{{ parseHoraireFermeture(jour.horaire)}}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p>{{jour['@nom']}} : indisponible </p>
                  </div>
                </div>
              </div>  
              <div v-else>
                <p>Horaires indisponibles</p>
              </div>
            </li>
            <li v-else>
              <p>Horaires indisponibles</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<style>
</style>

<script>
  export default {
    data() {
      return {
        region: "",
        carburant: "",
        prixList: [],
        prix:{},
        prixB :false,
        allprixB : false
      };
    },
    created() {
      this.region = this.$route.params.region;
      this.carburant = this.$route.params.carburant;
    },
    methods: {
      getHoraires: function(horaireObj) {
        const keys = Object.keys(horaireObj);
        const ouverture = horaireObj[keys[0]];
        const fermeture = horaireObj[keys[1]];
        return `Horaires : ${ouverture} - ${fermeture}`;
      },
      parseHoraireOuverture : function(horaireObj) {
        if (horaireObj == null) {
        return null;
        }
  
        const horaireStr = JSON.stringify(horaireObj);
        const horaireParsed = JSON.parse(horaireStr, (key, value) => {
        if (typeof value === 'string') {
          return value.replace('.', ':');
        }
        return value;
      });
  
      const horaireArr = Object.values(horaireParsed);
      return horaireArr[0]
    },
    parseHoraireFermeture : function(horaireObj) {
        if (horaireObj == null) {
        return null;
        }
  
        const horaireStr = JSON.stringify(horaireObj);
        const horaireParsed = JSON.parse(horaireStr, (key, value) => {
        if (typeof value === 'string') {
          return value.replace('.', ':');
        }
        return value;
      });
  
      const horaireArr = Object.values(horaireParsed);
      return horaireArr[1]
    },
      fetchPrix() {
        fetch(`http://localhost:2001/compare/prix/${this.region}/${this.carburant}`)
          .then((response) => response.json())
          .then((data) => {
            this.prix = data
            this.prixB = true
            this.allprixB = false
            console.log('RETOUR DE PRIX : ',data)
          })
          .catch((error) => {
            console.error(error);
          });
      },
      fetchAllPrix() {
        fetch(`http://localhost:2001/api/comparator/carburants/allprix/${this.region}/${this.carburant}`)
          .then((response) => response.json())
          .then((data) => {
            this.prixList = data
            this.prixB = false
            this.allprixB = true
            console.log('RETOUR DE ALLPRIX : ',data)
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
</script>
  