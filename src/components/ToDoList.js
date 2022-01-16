import React, { useState, useEffect } from 'react'
import { getToDos } from '../services/todos'

export default function ToDoList() {
    const [toDoList, setToDoList] = useState([])

    useEffect(async () => {
        try {
            await getToDos()
            .then(response => {
                const todos = response.data
                setToDoList(todos)
            })
        } catch(error) {
            console.log('An error has occured while fetching the todo list', error)
        }    
    }, [])
  
    return (
        <div>
            <br />
            <h1>Your current To DOS</h1>
            {
                // display all todos
                toDoList && toDoList.map(item =>
                    <>
                        <input 
                            key={item.id}
                            id={item.id}
                            type="checkbox"
                            checked={item.done}
                        />
                        <label for={item.id} >
                            { item.title }
                        </label>
                        <br />
                    </>
                )
            }
        </div>
    )
}
