import React from 'react'
import PostItem from './posts/PostItem'
import Loading from './loading'

const ImageFeed = ({ posts, pathUrl }) => {
    /* handle loading */
    if (!posts || !posts.length) {
        return (
            <Loading/>
        )
    }

    return (
        <div id='imageBoard' className={'imageGrid'}>
            {posts.map((post, index) =>
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
