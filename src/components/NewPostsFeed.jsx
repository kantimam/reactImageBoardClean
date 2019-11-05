import React, {useEffect} from 'react'
import ImageFeed from './ImageFeed.jsx';
import {connect} from 'react-redux';
import {getNewPosts} from '../actions/postActions';

const NewPostsFeed = ({getNewPosts, posts}) => {
    useEffect(() => {
        getNewPosts()
    }, [])
    
    console.log(posts)
    return (
        <ImageFeed posts={posts.data} pathUrl={""}/>
    )
}

const mapStateToProps=state=>({
    posts: state.posts.new
});

export default connect(mapStateToProps, {getNewPosts})(NewPostsFeed)
