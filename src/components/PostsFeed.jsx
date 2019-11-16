import React, {useEffect} from 'react'
import ImageFeed from './ImageFeed.jsx';
import {connect} from 'react-redux';
import {getNewPosts, getPopularPosts, getFavoritePosts, getUserPosts} from '../actions/postActions';

const PostsFeed = ({getPosts, posts, match}) => {
    const currentFrom=match.params.from || "new";
    useEffect(() => {
        if(posts.length===0){
            console.log(match.params.from)
            getPosts(currentFrom)
        }
    }, [match])
    
    return (
        <ImageFeed posts={posts.data} pathUrl={currentFrom}/>
    )
}

const mapStateToProps=(state)=>({
    posts: state.posts.new
});



const NewPostsFeed=connect(mapStateToProps, {getPosts:()=>getNewPosts()})(PostsFeed)
const PopularPostsFeed=connect(mapStateToProps, {getPosts:()=>getPopularPosts()})(PostsFeed)
const FavoritePostsFeed=connect(mapStateToProps, {getPosts:()=>getFavoritePosts()})(PostsFeed)
const UserPostsFeed=connect(mapStateToProps, {getPosts:()=>getUserPosts()})(PostsFeed)

export {NewPostsFeed, PopularPostsFeed, FavoritePostsFeed, UserPostsFeed}