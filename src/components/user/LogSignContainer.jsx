import React, { useState } from 'react'
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import { Route, Switch, NavLink } from 'react-router-dom';

const LogSignContainer = ({ loggedIn, signedUp }) => {
    const [logSignStatus, setStatus] = useState("logIn");


    return (
        <div className={'logSignContainer'}>
            <div className={'logSignSwitch pointer'}>
                <NavLink className="undecoratedLink" to="signup" activeClassName="active">SIGN UP</NavLink>
                <NavLink className="undecoratedLink" to="login" activeClassName="active">LOG IN</NavLink>
            </div>

            <Switch>
                <Route path={"*/login"} component={LogIn} />
                <Route path={"*/signup"} component={SignUp} />
            </Switch>

        </div>
    )
}

export default LogSignContainer
