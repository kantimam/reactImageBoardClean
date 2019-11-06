import React from 'react'

const PostNavigation = ({next, prev, getNextPost, getPrevPost}) => {
    return (
        <>
        {next&&
            <div onClick={getNextPost} className={'undecoratedLink postNav navForward centerAll'}>
              <i className="material-icons">
                keyboard_arrow_right
              </i>
            </div>
          }
          {prev&&
            <div onClick={getPrevPost} className={'undecoratedLink postNav navBack centerAll'}>
              <i className="material-icons">
                keyboard_arrow_left
              </i>
            </div>
          }
          </>
    )
}

export default PostNavigation
