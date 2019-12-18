import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostWithPreview, getPost } from '../../actions/postActions'
import { toggleFullscreen } from '../../actions/uiActions'
import PostRating from './postView/PostRating.js'
import PostComments from './postView/PostComments.js'
import CommentForm from './postView/CommentFormTwo.js'
import PostNavigation from './PostNavigation.jsx';
import PostPreview from './PostPreview.jsx';
import Loading from '../loading';



const PostView = React.memo(function({ post, preview, getPostWithPreview, getPost, toggleFullscreen, match }) {
  const [loading, setLoad] = useState(false);
  const {params}=match;
  useEffect(() => {
    if(setLoad){
      setLoad(false)
    }
    /* getPostWithPreview(params.id || 0, params.from); */
    getPost(params.id)
    /* if there is no post after 1 second show the loading indicator */
    const loadingFallback = setTimeout(() => {
      if (!post || !post.thumbnail) setLoad(true);
    }, 1000)
    return () => {
      clearTimeout(loadingFallback);
    };
  }, [match.url])


  /*   if (!post || post.id != params.id) return loading ? <Loading /> : null
   */
  return (
    <div className={`postView`}>
      <PostPreview preview={preview} pathUrl={params.from}/>

      {((!post || post.id != params.id) && loading) ? <Loading /> :
        <>
          <div className={'imageWrapper'}>
            <img alt='no img' src={post.resourceurl} />
            <div onClick={()=>toggleFullscreen()} className={'fullScreenButton'}>
              <i className="material-icons">
                crop_free
              </i>
            </div>

            <PostNavigation
              preview={preview}
            />
          </div>

          {<PostRating
            // tags={post.tags}
            postId={post.id}
            rating={post.rating}
            /* vote={this.state.vote} */
            favorite={post.favorite}
            /* toggleFavorite={this.toggleFavorite} */
           /*  ratePost={this.ratePost} */
          />}

          <CommentForm
            currentPost={post.id}
            refreshPost={()=>getPost(params.id)}
          />
          <PostComments
            comments={post.comments}
            postId={post.id}
          /> 
        </>}


    </div>
  )
})

const mapStateToProps = state => ({
  post: state.posts.current,
  preview: state.posts.preview
});

export default connect(mapStateToProps, { getPostWithPreview, getPost, toggleFullscreen })(PostView)



