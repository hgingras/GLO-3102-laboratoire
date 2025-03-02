const API_URL = 'https://glo3102lab4.herokuapp.com';
let URL = ""

export async function createUser() {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    URL = API_URL + "/" + data.id + "/tasks"
}

export async function getTasks() {
    const response = await fetch(
        URL,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    const data = await response.json();
    return data.tasks;
}

export async function createTask(name) {
    const body = JSON.stringify({
        name: name
    })
    const response = await fetch(
        URL, 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
        }
    );
    
    if(response.status !== 200) {
        throw new Error("Could not add task");
    }
    
    const data = await getTasks();
    return data;
}

export async function deleteTask(taskId) {
    await fetch(
        URL + "/" + taskId,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    const data = await getTasks();
    return data;
}

export async function updateTask(taskId, new_task) {
    const body = JSON.stringify({
        name : new_task
    })
    const response = await fetch(
        URL + "/" + taskId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    //if(response.status !== 200) {
    //    throw new Error("Could not update task");
    //}


    const data = await getTasks();
    return data;
}