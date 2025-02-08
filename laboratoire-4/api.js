const API_URL = 'https://glo3102lab4.herokuapp.com';

async function createUser() {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.id;
}

async function getTasks() {
    const response = await fetch(`${API_URL}/ce40bb67-cac4-40a5-8761-69c047f20d65/tasks`);
    const data = await response.json();
    return data;
}

async function createTask(task) {
    const response = await fetch(`${API_URL}/ce40bb67-cac4-40a5-8761-69c047f20d65/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    const data = await response.json();
    return data;
}

async function deleteTask(taskId) {
    await fetch(`${API_URL}/ce40bb67-cac4-40a5-8761-69c047f20d65/tasks/${taskId}`, {
        method: 'DELETE'
    });
}

async function updateTask(taskId, task) {
    await fetch(`${API_URL}/ce40bb67-cac4-40a5-8761-69c047f20d65/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}