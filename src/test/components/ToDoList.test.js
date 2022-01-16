import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
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
        console.log(todosResponse)
        expect(await screen.findAllByRole("checkbox")).toHaveLength(3)        
    })

})