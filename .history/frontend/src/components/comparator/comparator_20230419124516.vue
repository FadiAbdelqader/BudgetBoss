<template>
  <div>
    <select v-model="selectedRegion" @change="fetchCarburants">
      <option value="">-- Choisissez une région --</option>
      <option v-for="region in regions" :key="region">{{ region }}</option>
    </select>
    <button v-if="selectedRegion" @click="fetchCarburants">Compare</button>
    <ul v-if="carburants">
      <li v-for="carburant in carburants" :key="carburant" @click="showDetails(carburant)">
        {{ carburant }}
      </li>
    </ul>
  </div>
</template>

<style>
  @import "../../assets/Comparator/comparator.css";
</style>

<script>
export default {
  data() {
    return {
      regions: ["Corse", "Normandie", "Bretagne"],
      selectedRegion: "",
      carburants: null,
    };
  },
  methods: {
    fetchCarburants() {
      if (this.selectedRegion) {
        fetch(`http://localhost:2001/api/comparator/carburants/byregion/${this.selectedRegion}`, {
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
