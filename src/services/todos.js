import axios from "axios"

export const getToDos = async () => {
    return axios.get('http://localhost:3004/todos')
}

export const getToDo = async (id) => {
    return axios.get(`http://localhost:3004/todos/${id}`)
}

export const addToDo = async (toDoItem) => {
    return fetch('http://localhost:3004/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toDoItem)
    })
}
