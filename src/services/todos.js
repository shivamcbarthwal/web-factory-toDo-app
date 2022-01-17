import axios from "axios"

export const getToDos = async () => {
    return axios.get('http://localhost:3004/todos')
}

export const getToDo = async (id) => {
    return axios.get(`http://localhost:3004/todos/${id}`)
}
