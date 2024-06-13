import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { Tasks } from '../App'

const initialState: Tasks = {}

export const toDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (
            state: Tasks,
            {
                payload: { date, todo },
            }: PayloadAction<{ date: string; todo: string }>
        ) => {
            if (!state[date]) {
                state[date] = [{ id: nanoid(), value: todo, completed: false }]
            } else if (todo) {
                state[date] = [
                    ...state[date],
                    { id: nanoid(), value: todo, completed: false },
                ]
            }

            console.log(state.date)
        },
        toggleTask: (
            state: Tasks,
            action: PayloadAction<{ date: string; id: string }>
        ) => {
            const { date, id } = action.payload
            state[date] = state[date].map((el) =>
                el.id === id ? { ...el, completed: !el.completed } : { ...el }
            )
        },
        removeTask: (
            state: Tasks,
            action: PayloadAction<{ date: string; id: string }>
        ) => {
            const { date, id } = action.payload
            state[date] = state[date].filter((el) => el.id !== id)
        },
        editTask: (
            state: Tasks,
            action: PayloadAction<{ date: string; id: string; value: string }>
        ) => {
            const { date, id, value } = action.payload
            state[date] = state[date].map((el) =>
                el.id === id ? { ...el, value } : { ...el }
            )
        },
    },
})

export const toDoList = toDoSlice.reducer
export const { addTask, toggleTask, removeTask, editTask } = toDoSlice.actions
