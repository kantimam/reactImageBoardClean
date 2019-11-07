import React from 'react'
import CloseButton from './closeButton.jsx'
import CreatePost from './user/CreatePost.js'

const UploadModal = ({ token, close, history }) => {
    return (
        <div className={"animatedModal centerAll"}>
            <div className={"innerContent uploadContainer"}>
                <CloseButton onClick={history.goBack} />
                <CreatePost token={token} />
            </div>
        </div>
    )
}

export default UploadModal
