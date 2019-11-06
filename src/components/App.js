import React, { Component } from 'react';
import ImageBoard from './ImageBoard.js'
import UserPage from './user/UserPage.js'
import NavBar from './NavBar.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './scss/customStyles.css';
import LogSignModal from './logSignModal.jsx';
import axios from 'axios';
import FullScreenImage from './fullScreenImage.jsx';
import UploadModal from './UploadModal.jsx';

import {Provider} from 'react-redux';
import store from '../store/store';
import NewPostsFeed from './NewPostsFeed.jsx';
import SearchPostsFeed from './SearchPostsFeed.jsx';
import PostView from './posts/PostView';




export default class ComponentName extends Component {
    constructor(props) {
      super(props)
      this.scrollRef=React.createRef();

      this.imageFeed={};
      this.postsPagination={};
      this.postsSearchPagination={};
      this.postsUserFavoritePagination={};
      this.loadingMore=false;
      this.scrollWait=false;
 
      this.state = {
          uploadOpen: false,
          logSignOpen: false,
          loggedIn: false,
          mobileNavOpen: false,

          signUpStatus: 0,
          token: "",


          //image board state
          posts: [],
          postsSearch: [],
          postsUserFavorite: [],

          postOpen: 2,
          postOpenId: 20,
          endReached: false,
          loading: true,
          error: false,

          user: {}
         
      }
    }



    

    render() {
        return (
        <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  
                  <header className="App-header centerAll">
                  <div 
                    onClick={()=>this.setState({mobileNavOpen: !this.state.mobileNavOpen})} 
                    className='mobileToggle'
                  >
                    X
                  </div>
                  <Route path="" render={(props)=>
                      <NavBar
                          mobileNavOpen={this.state.mobileNavOpen} 
                          logOut={this.logOut} 
                          loggedIn={this.state.loggedIn} 
                          openLogSign={()=>this.setState({logSignOpen: true, mobileNavOpen: false})} 
                          {...props}
                      />
                  }/>    
                  </header>
                  
                  {/* MAIN CONTAINER CORE CONTENT */}
                  <main ref={this.scrollRef}>
                    <Switch>
                      <Route path={"*/upload"} component={UploadModal}/>
                      <Route path={["*/login","*/signup"]} component={LogSignModal}/>
                    </Switch>
                    

                    {/* Modal to login or sign up */}
                    {this.state.logSignOpen&&<LogSignModal loggedIn={this.loggedIn} signedUp={""} close={()=>this.setState({logSignOpen: false})}/>}
                    
                    <Switch>
                      <Route path={"*/post/:id"} component={PostView}/>

                      <Route path={"/"} component={NewPostsFeed}/>
                      <Route path={"/search"} component={SearchPostsFeed}/>
                    </Switch>
                  </main>

                  {this.state.fullScreenImage&&
                    <FullScreenImage 
                      imgSrc={this.state.fullScreenImage} 
                      close={()=>this.setState({fullScreenImage:""})}
                    />
                  }
              </div>
          </BrowserRouter>
        </Provider>
        );
    }
}
