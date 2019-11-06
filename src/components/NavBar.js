import React from 'react'
import Search from './Search.js'
import {Link, NavLink} from 'react-router-dom'


const NavBar = ({mobileNavOpen, loggedIn , location, history,  ...props}) => {
  return (
      <nav className={`mainNavBar noSelect ${mobileNavOpen? 'mobileNavOpen':'mobileNavClosed'}`}> 

        

        <NavLink activeClassName="active" className={'undecoratedLink centerAll pointer navItem'} to={`${location.pathname}/upload`}>
          UPLOAD
        </NavLink>

        <NavLink activeClassName="active" className={'undecoratedLink centerAll pointer navItem'} to="/popular">
          POPULAR
        </NavLink>

        <NavLink activeClassName="active" className={'undecoratedLink centerAll pointer navItem'} to="/new">
          NEW
        </NavLink>

        


        
        <Search history={history}/>

        {loggedIn?
          <>
            <NavLink activeClassName="active" className={'undecoratedLink centerAll pointer navItem'} to="/profile">
              PROFILE
            </NavLink>
            <div key='navLogOutButton' /* onClick={logOut} */ className={`navItem centerAll logOutButton`}>
              LOG OUT
            </div>
          </>:
          <NavLink activeClassName="active" className={'undecoratedLink centerAll pointer navItem'} to={`${location.pathname}/login`}>
              LOG IN
          </NavLink>
          }
        
      </nav>
  )
}

export default NavBar
