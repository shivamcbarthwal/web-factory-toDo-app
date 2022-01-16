import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDoList from '../../components/ToDoList'

const todosResponse =  
    rest.get('http://localhost:3004/todos', (req, res, ctx) => {
    return res(ctx.json(
    {
        "id": "1",
        "title": "Create React App", 
        "done": false
    },
    {
        "id": "2",
        "title": "Display ToDO List", 
        "done": false
    },
    {
        "id": "3",
        "title": "Modify ToDO Item", 
        "done": false
    }))
    })


const server = new setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Todo List Component', () => {

    it('displays todo items', async () => {
        render(<ToDoList />)
        expect(await screen.findAllByRole("checkbox")).toHaveLength(3)        
    })

    it('checks a todo item and sends it to the bottom', async () => {
        render(<ToDoList />)
        let checkbox = await screen.findByLabelText("Modify ToDO Item")
        expect(checkbox).not.toBeChecked()

        fireEvent.click(checkbox)
        checkbox = await screen.findByLabelText("Modify ToDO Item")
        expect(checkbox).toBeChecked()
        
        
        const allCheckboxes = await screen.findAllByRole("checkbox")
        expect(allCheckboxes[2]).toEqual(checkbox)
    })

})