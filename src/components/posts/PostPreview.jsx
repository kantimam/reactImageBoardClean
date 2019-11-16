import React from 'react'
import PostItem from './PostItem.js';


const PostPreview = ({ preview, pathUrl }) => {
    return (
        <section id='postFeedSmall'>
            {preview.map((currentPost, index) =>
                (currentPost && currentPost.thumbnail) ?
                    <PostItem
                        index={index}
                        key={`preview${currentPost.id}${index}`}
                        post={currentPost}
                        pathUrl={pathUrl}
                    /> : <div key={`preview${index}placeholder`} />
            )
            }
        </section>
    )
}

export default PostPreview
