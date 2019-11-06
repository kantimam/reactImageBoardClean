import React, {useEffect} from 'react'
import ImageFeed from './ImageFeed.jsx';
import {connect} from 'react-redux';
import {getNewPosts} from '../actions/postActions';

const UserPostsFeed = ({getNewPosts, posts}) => {
    useEffect(() => {
        if(posts.length===0){
            getNewPosts()
        }
    }, [])
    
    console.log(posts)
    return (
        <ImageFeed posts={posts.data} pathUrl={""}/>
    )
}

const mapStateToProps=state=>({
    posts: state.posts.user
});

export default connect(mapStateToProps, {getNewPosts})(UserPostsFeed)
