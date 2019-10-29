import React, {useState} from 'react'

const FullScreenImage = ({imgSrc}) => {
    const [zoom, setZoom]=useState(false);

    return (
        <>
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
        </>
    )
}

export default FullScreenImage
