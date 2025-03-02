<template>
    <div>
        <ul>
            <li v-for="task in props.tasks" :key="task.id">
                {{ task.name }}
                <button @click="onEditTask(task.id)">Edit</button>
                <button @click="onDeleteTask(task.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getTasks } from '../api.js';

const props = defineProps(['tasks', 'onModifyTask', 'onDeleteTask']);
const tasks = ref(props.tasks);

const onEditTask = async (taskId) => {
    const newDescription = prompt('Enter new task description:');
    if (newDescription) {
        await props.onModifyTask(taskId, newDescription);
        tasks.value = await getTasks();
    }
};

const onDeleteTask = async (taskId) => {
    await props.onDeleteTask(taskId);
    tasks.value = await getTasks();
};
</script>

<style>

</style>