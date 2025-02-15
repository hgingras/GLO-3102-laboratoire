import * as api from "/api.js";

export const start = async () => {
    await api.createUser();
    addFunctionToAddBtn();
}

/*
document.addEventListener('DOMContentLoaded', async () => {
    displayTasks(tasks);

    document.getElementById('addTaskForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskDescription = document.getElementById('taskDescription').value;
        const newTask = await createTask(userId, { description: taskDescription });
        displayTask(newTask);
    });
});
*/

const addFunctionToAddBtn = () => {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', async () =>{
        const taskDescription = document.getElementById('taskDescription');
        const name = taskDescription.value;

        if(name.lenght !== 0) {
            const newTask = await api.createTask(name);
            displayTasks(newTask)
        }
    })
}

function displayTasks(tasks) {
    const content = document.getElementById('newContent');
    content.innerHTML = '';
    tasks.forEach(task => {
        displayTask(task, content);
    });
}

function displayTask(task, content) {
    const taskElement = document.createElement('div');
    taskElement.innerText = task.name;
    taskElement.id = task.id;
    taskElement.className = "task";
   
    const updateBtn = createUpdateBtn(task.id);
    const deleteBtn = createDeleteBtn(task.id);

    taskElement.appendChild(updateBtn);
    taskElement.appendChild(deleteBtn);

    content.appendChild(taskElement);
} 

function createUpdateBtn(taskId) {
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "update";

    updateBtn.addEventListener('click', async() => {
        const input = document.getElementById("taskDescription");

        if(input.value.lenght !== 0){
            const tasks = await api.updateTask(taskId, input.value);
                displayTasks(tasks);
        }
    })
    return updateBtn;
    
}

function createDeleteBtn(taskId) {
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener('click', async () =>{
        const tasks = await api.deleteTask(taskId);

        displayTasks(tasks);
    })
    return deleteBtn;
}
