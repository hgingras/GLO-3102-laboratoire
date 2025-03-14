<template>
  <div>
    <Localisation :ville="ville" :province="province" />
  </div>
</template>

<script>
import * as api from "./api.js";
import Localisation from "./components/Localisation.vue";
export default {
  components: {
    Localisation,
  },
  async created() {
    const weatherReport = await api.getWeather();
    this.ville = weatherReport.city_name;
    this.province = weatherReport.state_code;
    this.weather = weatherReport.data;
    console.log(this.weather);
    console.log(this.ville);
    console.log(this.province);
  },
  data() {
    return {
      ville: "",
      province: "",
      weather: [],
    };
  },
}
</script>

<style>

</style>