import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostWithPreview } from '../../actions/postActions'

import PostRating from './postView/PostRating.js'
import PostComments from './postView/PostComments.js'
import CommentForm from './postView/CommentFormTwo.js'
import PostNavigation from './PostNavigation.jsx';
import PostPreview from './PostPreview.jsx';
import Loading from '../loading';


const PostView = ({ post, preview, getPostWithPreview }) => {
  const [loading, setLoad] = useState(false);
  const params = useParams();
  useEffect(() => {
    if(setLoad){
      setLoad(false)
    }
    getPostWithPreview(params.id || 0, params.from);
    /* if there is no post after 1 second show the loading indicator */
    const loadingFallback = setTimeout(() => {
      if (!post || !post.thumbnail) setLoad(true);
    }, 1000)
    return () => {
      clearTimeout(loadingFallback);
    };
  }, [params])


  /*   if (!post || post.id != params.id) return loading ? <Loading /> : null
   */
  return (
    <div className={`postView`}>
      <PostPreview preview={preview} pathUrl={params.from}/>

      {((!post || post.id != params.id) && loading) ? <Loading /> :
        <>
          <div className={'imageWrapper'}>
            <img alt='no img' src={post.resourceurl} />
            <div /* onClick={()=>openFull(currentImage)} */ className={'fullScreenButton'}>
              <i className="material-icons">
                crop_free
              </i>
            </div>

            {<PostNavigation
              preview={preview}
            />}
          </div>

          {/* <PostRating
            tags={this.state.post.tags}
            postId={this.state.postId}
            rating={this.state.rating}
            vote={this.state.vote}
            favorite={this.state.favorite}
            toggleFavorite={this.toggleFavorite}
            ratePost={this.ratePost}
            history={history}
          />

          <CommentForm
            currentPost={this.state.post.id}
            refreshPost={() => this.getPost(this.state.postId)}
          />
          <PostComments
            comments={this.state.post.comments}
            postId={this.state.postId}
          /> */}
        </>}


    </div>
  )
}

const mapStateToProps = state => ({
  post: state.posts.current,
  preview: state.posts.preview
});

export default connect(mapStateToProps, { getPostWithPreview })(PostView)



