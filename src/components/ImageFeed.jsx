import React from 'react'
import PostItem from './posts/PostItem'


const ImageFeed = ({ posts, pathUrl }) => {
    console.log(posts);
    return (
        <div id='imageBoard' className={'imageGrid'}>
            {(posts && posts.length > 0) && posts.map((post, index) =>
                <PostItem
                    index={index}
                    key={"postItem" + index}
                    post={post}
                    pathUrl={pathUrl}
                />)
            }
        </div>
    )
}

export default ImageFeed
