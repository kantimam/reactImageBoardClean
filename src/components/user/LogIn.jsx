import React, { useState } from 'react'
import { logInUser } from '../../actions/userActions'
import { connect } from 'react-redux'


const LogIn = ({ logInUser, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogIn = (event) => {
        event.preventDefault();
        logInUser(email, password);
    }

    return (
        <form onSubmit={submitLogIn} className={'logSignForm'}>
            <h1>LOG IN</h1>
            <input value={email} onChange={(event) => setEmail(event.target.value)} name='email' placeholder='email' type="email" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} name='password' placeholder='password' type="password" />
            <input className={"submitButtonMain"} type="submit" />
        </form>
    )
}

export default connect(null, {logInUser})(LogIn)
