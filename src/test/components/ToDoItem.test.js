import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDoItem from '../../components/ToDoItem'

const todoResponse =  
    rest.get('http://localhost:3004/todos/1', (req, res, ctx) => {
    return res(ctx.json(
    {
        "id": "1",
        "title": "Create React App",
        "description": "This is the first step to building a react application", 
        "done": false
    }))
    })

const server = new setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Todo Item Component', () => {
    it('displays a todo item', async () => {
        render(<ToDoItem />)
        expect(await screen.findByRole("heading")).toBeInTheDocument()             
    })
})