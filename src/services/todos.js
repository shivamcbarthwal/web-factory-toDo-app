import axios from "axios"


export const getToDos = async () => {
    return axios.get('http://localhost:3004/todos')
}

