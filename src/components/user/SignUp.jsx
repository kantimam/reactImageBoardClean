import React, { useState } from 'react'
import axios from 'axios';
const BASEURL = `${process.env.REACT_APP_BE_URL}`;

const SignUp = ({ signedUp }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");


    const signUp = (event) => {
        event.preventDefault();
        if (this.validateState) {
            const formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("email", this.state.email);
            formData.append("password", this.state.password);
            axios.post(`${BASEURL}/signup`, formData).then(response => {
                signedUp(1);
            }).catch(error => {
                window.alert("failure")
                console.log(error)
            })
        }

    }
    return (
        <form onSubmit={signUp} className={'logSignForm'}>
            <h1>SIGN UP</h1>
            <input value={name} onChange={(event) => setName(event.target.value)} name='name' placeholder='user name' type="text" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} name='email' placeholder='email' type="email" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} name='password' placeholder='password' type="password" />
            <input value={passwordRe} onChange={(event) => setPasswordRe(event.target.value)} name='passwordRe' placeholder='password again' type="password" />
            <input className={"submitButtonMain"} type="submit" />
        </form>
    )
}

export default SignUp