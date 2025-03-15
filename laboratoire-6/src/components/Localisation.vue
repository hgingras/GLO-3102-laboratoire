<template>
    <h2 class="geolocalisation">
        {{ ville }}, {{ province }}
    </h2>
</template>

<script>
export default {
    name: 'Location',
    props: ['ville', 'province']
}
</script>

<style>

.geolocalisation {
    font-weight: bold;
    display: flex;
    justify-content: center;

}

</style>
