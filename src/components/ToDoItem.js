import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToDo } from '../services/todos'


export default function ToDoItem() {

    const {id} = useParams()

    const [toDoItem, setToDoItem] = useState({})

    useEffect(async () => {
        try {
            await getToDo(id)
            .then(response => {
             console.log(response)   
             const todo = response.data
             setToDoItem(todo)
            })
            
        } catch(error) {
            console.log('An error has occured while fetching the todo list', error)
        }
    }, [])
    
    return (
        <div>
            <h1 role='heading'>{toDoItem.title}</h1>
            <p>{toDoItem.description}</p>          
        </div>
    )
}
