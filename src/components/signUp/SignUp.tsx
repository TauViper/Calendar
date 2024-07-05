import React, { useState } from 'react'
import { signUp } from '../../store/fireBase.ts'

export const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            await signUp(email, password)
            // navigate('/signin');
        } catch (err) {
            setError((err as Error).message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span>Логин:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <span>Пароль:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>sign up</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}
