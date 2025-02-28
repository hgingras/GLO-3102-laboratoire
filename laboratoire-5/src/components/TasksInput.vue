<template>
    <section>
        <input 
            type="text" 
            id="taskDescription" 
            placeholder="Enter task description" required
            v-model="name"
        />
        <button id="submit" @click="onAddTask(name)" type="button">Add Task</button>
    </section>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["onAddTask"]);

const name = ref("");



</script>


<style></style>