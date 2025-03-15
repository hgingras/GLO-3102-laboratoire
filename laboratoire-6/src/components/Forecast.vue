<template>
<div class="temperature-container">
    <div>
        {{ data.temp }}
    </div>
    <div>
        {{ day }}
    </div>
    
    
</div>
</template>

<script>
export default {
    props: [ "data"],
    created() {
        const date = new Date(this.data.datetime)
        this.day = this.toDay[date.getDay()]
    },
    data() {
        return {
            day: "",
            toDay: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        }
    }
}

</script>

<style>

.temperature-container {
    display: flex;
    flex-flow: column;
    align-items: center;

}

</style>