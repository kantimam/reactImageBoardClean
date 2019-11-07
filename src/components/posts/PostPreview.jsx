import React from 'react'
import PostItem from './PostItem.js';


const PostPreview = ({ prev, next, post, pathUrl }) => {
    const postPreview = [prev[1], prev[0], { id: post.id, thumbnail: post.thumbnail }, next[0], next[1]]
    return (
        <section id='postFeedSmall'>
            {postPreview.map((currentPost, index) =>
                (currentPost && currentPost.id) ?
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
