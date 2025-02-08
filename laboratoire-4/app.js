document.addEventListener('DOMContentLoaded', async () => {
    displayTasks(tasks);

    document.getElementById('addTaskForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskDescription = document.getElementById('taskDescription').value;
        const newTask = await createTask(userId, { description: taskDescription });
        displayTask(newTask);
    });
});

function displayTasks(tasks) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    tasks.forEach(task => {
        displayTask(task);
    });
}

function displayTask(task) {
    const content = document.getElementById('content');
    const taskElement = document.createElement('p');
    taskElement.textContent = task.description;
    content.appendChild(taskElement);
}