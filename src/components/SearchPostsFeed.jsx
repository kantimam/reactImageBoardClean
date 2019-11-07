import React, { useEffect } from 'react'
import ImageFeed from './ImageFeed.jsx';
import { connect } from 'react-redux';
import { searchPosts } from '../actions/postActions';

const SearchPostsFeed = ({ searchPosts, posts, match, searchMode}) => {
    useEffect(() => {
        searchPosts(match.params.search, searchMode)
        
    }, [match.params])

    console.log(posts)
    return (
        <ImageFeed posts={posts.data} pathUrl={""} />
    )
}

const mapStateToProps = state => ({
    posts: state.posts.search
});

export default connect(mapStateToProps, { searchPosts })(SearchPostsFeed)
