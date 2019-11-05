import React from 'react'
import CloseButton from './closeButton.jsx'
import CreatePost from './user/CreatePost.js'

const UploadModal = ({token, close}) => {
    return (
        <div className={"animatedModal centerAll"}>
            <div className={"innerContent uploadContainer"}>
                <CloseButton onClick={close}/>
                <CreatePost token={token}/>
            </div>
        </div>
    )
}

export default UploadModal
