import React, { useState, useEffect } from 'react'
import { getToDos } from '../services/todos'
import AddToDo from './AddToDo'

export default function ToDoList(props) {
    const [toDoList, setToDoList] = useState([])

    const [showToDoItem, setShowToDoItem] = useState({visble: false})

    const changeTodoStatusHandler = (id) => {
        const list = [...toDoList]
        const indexToChange = list.findIndex(item => item.id === id)
        const itemToChange = list[indexToChange]
        list[indexToChange] = { ...itemToChange, done: !itemToChange.done }
        setToDoList(list)
    }

    const showToDoItemDetailHandler = (id) => {
        setShowToDoItem({visble: true})
        window.location.href = `http://localhost:3000/todos/${id}`
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

            <AddToDo />

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
                        <button aria-label={item.id} role="button" onClick={() => showToDoItemDetailHandler(item.id)}>Todo Details</button>
                        <br />
                    </>
                )
            }
        </div>
    )
}
