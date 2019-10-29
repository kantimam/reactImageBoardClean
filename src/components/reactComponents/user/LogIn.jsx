import React, {useState} from 'react'
import axios from 'axios';
const BASEURL=`${process.env.REACT_APP_BE_URL}`;


const LogIn = ({loggedIn}) => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");


    const logIn=(event)=>{
        event.preventDefault();
            const formData=new FormData();
            formData.append("email",email);
            formData.append("password",password);
            axios.post(`${BASEURL}/login`,formData,{credentials: true}).then(response=>{
                loggedIn(response.data);
            }).catch(error=>{
                window.alert("failure")
                console.log(error)
            })
    }
    return (
        <form onSubmit={logIn} className={'logSignForm'}>
            <h1>LOG IN</h1>
            <input value={email} onChange={(event)=>setEmail(event.target.value)} name='email' placeholder='email' type="email"/>
            <input value={password} onChange={(event)=>setPassword(event.target.value)} name='password' placeholder='password' type="password"/>
            <input className={"submitButtonMain"} type="submit"/>
        </form>
    )
}

export default LogIn
