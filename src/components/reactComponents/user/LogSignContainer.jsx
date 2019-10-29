import React, {useState} from 'react'
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';


const LogSignContainer = ({loggedIn, signedUp}) => {
    const [logSignStatus, setStatus]=useState("logIn");

    
    return (
        <div className={'logSignContainer'}>
            <div className={'logSignSwitch pointer'}>
                <div onClick={()=>setStatus("logIn")} className={logSignStatus==="signUp"?'inactive':""}>SIGN UP</div>
                <div onClick={()=>setStatus("signUp")} className={logSignStatus==="logIn"?'inactive':""}>LOG IN</div>
            </div>
            {logSignStatus==="logIn"?
            <LogIn loggedIn/>:
            <SignUp signedUp/>}
        </div>
    )
}

export default LogSignContainer
