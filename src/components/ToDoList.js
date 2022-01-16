import React, { useState, useEffect } from 'react'
import { getToDos } from '../services/todos'

export default function ToDoList() {
    const [toDoList, setToDoList] = useState([])

    const changeTodoStatusHandler = (id) => {
        const list = [...toDoList]
        const indexToChange = list.findIndex(item => item.id === id)
        const itemToChange = list[indexToChange]
        list[indexToChange] = { ...itemToChange, done: !itemToChange.done }
        setToDoList(list)
    }

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
                // displays the done items at the bottom of the list 
                toDoList && toDoList.sort(({done}) => done ? 1 : -1).map(item =>
                    <>
                        <input 
                            key={item.id}
                            id={item.id}
                            type="checkbox"
                            checked={item.done}
                            onChange={() => changeTodoStatusHandler(item.id)}
                        />
                        <label for={item.id} >
                            { item.done ? <strike>{item.title}</strike> : item.title }
                        </label>
                        <br />
                    </>
                )
            }
        </div>
    )
}
