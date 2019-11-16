import React from 'react'
import { connect } from 'react-redux'
import { getNextPost, getPrevPost } from '../../actions/postActions'

const PostNavigation = ({ getNextPost, getPrevPost }) => {
  return (
    <>
      <div onClick={getNextPost} className={'undecoratedLink postNav navForward centerAll'}>
        <i className="material-icons">
          keyboard_arrow_right
        </i>
      </div>
      <div onClick={getPrevPost} className={'undecoratedLink postNav navBack centerAll'}>
        <i className="material-icons">
          keyboard_arrow_left
        </i>
      </div>
    </>
  )
}

export default PostNavigation;
