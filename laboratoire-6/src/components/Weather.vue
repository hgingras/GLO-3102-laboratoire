<template>
    <div id="temperature">
        <Forecast v-for="data in weather" :key="data.datetime" :data="data"></Forecast>
    </div>
</template>

<script>
import Forecast from './Forecast.vue';

export default {
    components: {
        Forecast
    },
    props: [ "weather" ]
    
}
</script>

<style>

#temperature {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

</style>

