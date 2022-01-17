import React, { useState, useEffect } from 'react'
import { addToDo } from '../services/todos'

export default function AddToDo() {
    const [toDo, setToDo] = useState({title: "", description: "", done: false})
    
    const addToDoHandler = async () => {
        try {
         await addToDo(toDo)         
        } catch(error) {
            console.log('An error has occured while fetching the todo list', error)
        }
        window.location.href = "http://localhost:3000/";    
    }
    
    return (
        <div>
            <h1>Add To Do in Web Factory</h1>
                <fieldset>
                <label>
                    <p>Title</p>
                    <input
                     name="title"
                     value={toDo.title}
                     onChange={e => setToDo({...toDo, title: e.target.value})} 
                     />
                </label>
                </fieldset>
                <fieldset>
                <label>
                    <p>Description</p>
                    <input
                     name="description"
                     value={toDo.description}
                     onChange={e => setToDo({...toDo, description: e.target.value})}
                    />
                </label>
                </fieldset>
                <button type="submit" onClick={() => addToDoHandler()}>Submit</button>                
        </div>
    )
}
