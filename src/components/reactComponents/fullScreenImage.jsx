import React, {useState} from 'react'
import FullScreenModal from './FullScreenModal.js';
import CloseButton from './closeButton.jsx';

const FullScreenImage = ({imgSrc, close}) => {
    const [zoom, setZoom]=useState(false);

    return (
        <FullScreenModal>
          <img 
                onClick={()=>setZoom(!zoom)} 
                alt='' 
                className="fullScreenImage" 
                src={imgSrc}
                style={zoom?{objectFit:"cover"}:{objectFit:"contain",height: "99.6%"}}
            />
            <div className={"centerAll shortInfo"}>
                <p>CLICK THE PICTURE AGAIN TO ZOOM IN!</p>
            </div>
            <CloseButton onClick={close}/>  
        </FullScreenModal>
    )
}

export default FullScreenImage
