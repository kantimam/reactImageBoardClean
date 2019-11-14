import React, {useState, useEffect} from 'react'

export default ({post}) => {
    console.log(post)
    const [loading, setLoad]=useState(false);
    useEffect(() => {
        let timeOut;
        if(!post || !post.resourceurl){
            timeOut=setTimeout(()=>setLoad(true), 1000);
        }
        return () => {
            if(timeOut) clearTimeout(timeOut)
        };
    }, [post])
    
    if(post && post.resourceurl) return <img alt='no img' src={post.resourceurl}/>
    
    return loading?<div className = "centerText" >LOADING</div>:null
}
