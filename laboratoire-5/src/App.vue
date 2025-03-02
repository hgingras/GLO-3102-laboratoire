<template>
  <section>
    <TasksInput :onAddTask="onAddTask"></TasksInput>
    <Task :tasks="tasks" :onModifyTask="onModifyTask" :onDeleteTask="onDeleteTask"></Task>
    <div id="error-msg" v-if="emptyInput">
      Task name connot be empty...
    </div>
  </section>

</template>

<script setup>

import TasksInput from './components/TasksInput.vue';
import Task from './components/Task.vue';
import * as api from "./api.js";
import { ref, onMounted  } from 'vue';



const tasks = ref([]);
const emptyInput = ref(false);


onMounted(async () => {
  await api.createUser();
  tasks.value = await api.getTasks();
})

const onAddTask = async (name) => {
  if (name.length === 0) {
    showWarning();
    return;
  }
  tasks.value = await api.createTask(name);
}

const onModifyTask = async (id, name) => {
  if (name.length === 0) {
    showWarning();
    return;
  }
  tasks.value = await api.updateTask(id, name);
}

const onDeleteTask = async (id) => {
  tasks.value = await api.deleteTask(id);
}

const showWarning = () => {
  emptyInput.value = true;
  setTimeout(() => {
    emptyInput.value = false;
  }, 5000)
}


</script>


<style>
#error-msg {
  color: red;
}
</style>