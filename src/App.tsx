import { FC, useCallback, useState } from 'react'
import './App.css'
import '@natscale/react-calendar/dist/main.css'

import { Todos } from './components/toDo/ToDos.tsx'
import { Calendar } from '@natscale/react-calendar'
import { Value } from '@natscale/react-calendar/dist/utils/types'

export interface todo {
    id: string
    value: string
    completed: boolean
}
export type Tasks = {
    [date: string]: todo[]
}

export const App: FC = () => {
    const [value, setValue] = useState<Value>(new Date())
    // const [exercise, setExercise] = useState({})

    const onChange = useCallback(
        (val: Value) => {
            setValue(val)
        },
        [setValue]
    )
    return (
        <>
            <Calendar onChange={onChange} value={value} />
            <Todos
                date={value.toLocaleString().split(',')[0]}
                // exercise={exercise}
                // setExercise={setExercise}
            />
        </>
    )
}
