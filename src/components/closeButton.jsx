import React from 'react'

const CloseButton = ({ onClick }) => {
    return (
        <i onClick={onClick} className="material-icons closeButton">
            close
        </i>
    )
}

export default CloseButton
