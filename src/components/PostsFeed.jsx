import React, {useEffect} from 'react'
import ImageFeed from './ImageFeed.jsx';
import {connect} from 'react-redux';
import {getNewPosts, getPopularPosts, getFavoritePosts, getUserPosts} from '../actions/postActions';

const PostsFeed = ({getPosts, posts}) => {
    useEffect(() => {
        if(posts.length===0){
            getPosts()
        }
    }, [])
    
    return (
        <ImageFeed posts={posts.data} pathUrl={"new"}/>
    )
}




const NewPostsFeed=connect((state)=>({posts:state.posts.new}), {getPosts:()=>getNewPosts()})(PostsFeed)
const PopularPostsFeed=connect((state)=>({posts:state.posts.new}), {getPosts:()=>getPopularPosts()})(PostsFeed)
const FavoritePostsFeed=connect((state)=>({posts:state.posts.favorite}), {getPosts:()=>getFavoritePosts()})(PostsFeed)
const UserPostsFeed=connect((state)=>({posts:state.posts.user}), {getPosts:()=>getUserPosts()})(PostsFeed)

export {NewPostsFeed, PopularPostsFeed, FavoritePostsFeed, UserPostsFeed}