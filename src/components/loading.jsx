import React from 'react'
import loadingGif from '../img/loadingcat.gif'

const loading = ({message="loading..."}) => {
    return (
        <div id="loadingComponent" className="centerText">
            <img alt="loader could not be loaded" src={loadingGif}/>
            {message}
        </div>
    )
}

export default loading
