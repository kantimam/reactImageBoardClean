import React, {useState} from 'react'
import CloseButton from './closeButton.jsx'
import LogSignContainer from './user/LogSignContainer.jsx'

const LogSignModal = ({loggedIn, signedUp, close}) => {
    return (
        <div className={"uploadModal centerAll"}>
          <div className={"innerContent  fixHeightNoBorder"}>
              <CloseButton onClick={close}/>
              <LogSignContainer 
                  loggedIn signedUp
              />
          </div>
        </div>
    )
}

export default LogSignModal
