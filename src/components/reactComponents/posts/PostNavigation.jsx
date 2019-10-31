import React from 'react'

const PostNavigation = ({next, prev, getNextPost, getPrevPost}) => {
    return (
        <>
        {next[0]&&
            <div onClick={()=>getNextPost(this.state.next[0])} className={'undecoratedLink postNav navForward centerAll'}>
              <i className="material-icons">
                keyboard_arrow_right
              </i>
            </div>
          }
          {prev[0]&&
            <div onClick={()=>getNextPost(this.state.prev[0])} className={'undecoratedLink postNav navBack centerAll'}>
              <i className="material-icons">
                keyboard_arrow_left
              </i>
            </div>
          }
          </>
    )
}

export default PostNavigation
