<template>
  <div>
    <select v-model="selectedRegion" @change="fetchCarburants">
      <option value="">-- Choisissez une région --</option>
      <option v-for="region in regions" :key="region">{{ region }}</option>
    </select>
    <button v-if="selectedRegion" @click="fetchCarburants">Compare</button>
    <div class="liste_carburants">
      <ul v-if="carburants">
      <li v-for="carburant in carburants" :key="carburant" @click="showDetails(carburant)">
        {{ carburant }}
      </li>
    </ul>
    </div>
  </div>
</template>

<style>
  @import "../../assets/Comparator/comparator.css";
</style>

<script>
export default {
  data() {
    return {
      regions: [
    "Auvergne-Rhône-Alpes",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Île-de-France",
    "Grand Est",
    "Hauts-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Bourgogne-Franche-Comté",
    "Normandie",
    "Bretagne",
    "Pays de la Loire",
    "Centre-Val de Loire",
    "Corse"
],
      selectedRegion: "",
      carburants: null,
    };
  },
  methods: {
    fetchCarburants() {
      if (this.selectedRegion) {
        fetch(`http://localhost:2001/compare/byregion/${this.selectedRegion}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          this.carburants = data;
        })
        .catch((error) => {
          console.error(error);
        });
      } else {
        this.carburants = null;
      }
    },
    showDetails(carburant) {
      this.$router.push({
        name: "results",
        params: { region: this.selectedRegion, carburant: carburant },
      });
    },
  },
};
</script>
