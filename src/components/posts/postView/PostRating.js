import React from 'react'
import {Link} from 'react-router-dom'

const PostRating = ({vote, ratePost, postId, token, tags, rating, favorite, toggleFavorite/* , searchByTag */}) => {
  return (
    <div className={"ratings"}>
        {token?
          <section>
              <div 
                onClick={()=>ratePost(1)}
                id={vote===1?'currentVote':''} 
                className={'centerAll pointer'}>
                <i className="material-icons">
                  add
                </i>
              </div>
              <div
                onClick={()=>ratePost(-1)}
                id={vote===-1?'currentVote':''}  
                className={'centerAll pointer'}>
                <i className="material-icons">
                  remove
                </i>
              </div>
          </section>:
          <div className='votePlaceholder'></div>
        }
        <p className={'ratingP'}>{rating | 0}</p>
        
        {token&&
          <div 
            className={'favoriteWrapper'}
            onClick={toggleFavorite}>
            {favorite?
            <i className={`material-icons on`}>
              favorite
            </i>:
            <i className={`material-icons off`}>
              favorite_border
            </i>}  
          </div>
        }
        
        <div className={'postTags'}>
          {tags&&tags.map((tag, index)=>
            <Link key={`tags${postId}${index}`} to={`/tag/${tag.name}`} className={'tag pointer undecoratedLink'}>{tag.name}</Link>
          )}          
        </div>
        
      </div>
  )
}

export default PostRating
