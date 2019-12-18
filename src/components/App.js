import React, { Component } from 'react';
import ImageBoard from './ImageBoard.js'
import UserPage from './user/UserPage.js'
import NavBar from './NavBar.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/customStyles.css';
import LogSignModal from './logSignModal.jsx';
import axios from 'axios';
import FullScreenImage from './fullScreenImage.jsx';
import UploadModal from './UploadModal.jsx';
import { connect } from 'react-redux'


import {NewPostsFeed} from './PostsFeed.jsx';
import SearchPostsFeed from './SearchPostsFeed.jsx';
import PostView from './posts/PostView.jsx';




class App extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef();


    this.state = {
      uploadOpen: false,
      logSignOpen: false,
      mobileNavOpen: false,
    }
  }





  render() {
    const {fullscreen, loggedIn}=this.props;
    return (
      
        <BrowserRouter>
          <div className="App">

            <header className="App-header centerAll">
              <div
                onClick={() => this.setState({ mobileNavOpen: !this.state.mobileNavOpen })}
                className='mobileToggle'
              >
                X
              </div>

              <Route path="" render={(props) =>
                <NavBar
                  mobileNavOpen={this.state.mobileNavOpen}
                  logOut={this.logOut}
                  loggedIn={loggedIn}
                  openLogSign={() => this.setState({ logSignOpen: true, mobileNavOpen: false })}
                  {...props}
                />
              } />
            </header>

            {/* MAIN CONTAINER CORE CONTENT */}
            <main ref={this.scrollRef}>
              <Switch>
                <Route path={"*/upload"} component={UploadModal} />
                <Route path={["*/login", "*/signup"]} component={LogSignModal} />
              </Switch>


              {/* Modal to login or sign up */}
              {this.state.logSignOpen && <LogSignModal loggedIn={this.loggedIn} signedUp={""} close={() => this.setState({ logSignOpen: false })} />}

              <Switch>
                <Route path={"/:from(new|search|favorite|user)/post/:id"} component={PostView} />
                {/* <Route path={"/:from(new|popular|favorite|user)?"} component={PostsFeed} /> */}
                <Route path={"/profile"} render={(props)=><SearchPostsFeed {...props} searchMode="search"/>} />
                <Route path={"/search/:search"} render={(props)=><SearchPostsFeed {...props} searchMode="search"/>} />
                <Route path={"/searchstrict/:search"} render={(props)=><SearchPostsFeed {...props} searchMode="searchstrict"/>} />
                <Route path={"/tags/:search"} render={(props)=><SearchPostsFeed {...props} searchMode="tag"/>} />
                <Route path={["/","/new"]} component={NewPostsFeed} />
              </Switch>
            </main>

            
            {fullscreen&&<FullScreenImage/>}
            
          </div>
        </BrowserRouter>
    );
  }
}

export default connect((state)=>({fullscreen:state.ui.fullscreen, loggedIn: state.user.loggedIn}))(App)