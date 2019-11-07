import React, { useState } from 'react'
import CloseButton from './closeButton.jsx'
import LogSignContainer from './user/LogSignContainer.jsx'

const LogSignModal = ({ loggedIn, signedUp, close, history }) => {
    return (
        <div className={"animatedModal centerAll"}>
            <div className={"innerContent  fixHeightNoBorder"}>
                <CloseButton onClick={history.goBack} />
                <LogSignContainer

                />
            </div>
        </div>
    )
}

export default LogSignModal
