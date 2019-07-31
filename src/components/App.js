import React, { Component } from 'react';
import ImageBoard from './reactComponents/ImageBoard.js'
import UserPage from './reactComponents/user/UserPage.js'
import SignUp from './reactComponents/user/SignUp.js'
import NavBar from './reactComponents/NavBar.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './scss/customStyles.css';
import CreatePost from './reactComponents/user/CreatePost.js'
import FullScreenModal from './reactComponents/FullScreenModal.js'
import axios from 'axios';
const BASEURL=`${process.env.REACT_APP_BE_URL}`;



export default class ComponentName extends Component {
    constructor(props) {
      super(props)
      this.scrollRef=React.createRef();


      this.postsPagination={};
      this.postsSearchPagination={};
      this.postsUserFavoritePagination={};
      this.loadingMore=false;
      this.scrollWait=false;
 
      this.state = {
          uploadOpen: false,
          zoom: false,
          logSignOpen: false,
          loggedIn: false,
          mobileNavOpen: false,

          signUpStatus: 0,
          name: "",
          email: "",
          password: "",
          passwordRe: "",
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
         
      }
    }
    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    
    signUp=(event)=>{
        event.preventDefault();
        if(this.validateState){
            const formData=new FormData();
            formData.append("name",this.state.name);
            formData.append("email",this.state.email);
            formData.append("password",this.state.password);
            axios.post(`${BASEURL}/signup`,formData).then(response=>{
                console.log(response)
                this.setState({signUpStatus:1})
            }).catch(error=>{
                window.alert("failure")
                console.log(error)
            })
        }
        
    }

    logIn=(event)=>{
        event.preventDefault();
            const formData=new FormData();
            formData.append("email",this.state.email);
            formData.append("password",this.state.password);
            axios.post(`${BASEURL}/login`,formData,{credentials: true}).then(response=>{
                console.log(response)
                this.setState({
                    loggedIn:true, 
                    logSignOpen: false,
                    token:response.data.token,
                    name: "",
                    email: "",
                    password: "",
                    passwordRe: "",
                    },
                    ()=>this.createLocalStore())
            }).catch(error=>{
                window.alert("failure")
                console.log(error)
            })
    }
    logOut=(event)=>{
        event.preventDefault();
        const token=this.state.token;
        if(token){
          this.setState({
            loggedIn: false,
            token: ""
          })
          localStorage.removeItem("userState");
        }
    }

    loggedOutByServer=()=>{
      this.setState({
        loggedIn: false,
        token: "",
      })
      alert('you have been logged out')
      localStorage.removeItem("userState");
    }

    validateState=()=>{
        
        const {name,email,password,passwordRe}=this.state;
        let valid=false;
        //matching pw length in backend
        if(name.length>3 &&
            email.length>4  &&
            password.length>7 &&
            password===passwordRe){
                valid=true;
            }
        return valid;
    }

    createLocalStore=()=>{
        localStorage.setItem("userState",JSON.stringify({...this.state}))
    }
    componentDidMount(){
        // try recover from local storage
        const stateStr=localStorage.getItem("userState")
        if(stateStr){
            const state=JSON.parse(stateStr);
            this.setState(state)
        }
        this.scrollRef.current.addEventListener('scroll',(event)=>this.handleScroll(event));
    }

    handleScroll=(event)=>{
      /* TODO HANDLE PEOPLE WITH GIANT SCREENS LOAD CONTENT UNTIL CONTENT OVERFLOWS */
      const scrollVal=event.target.scrollTop;
      const maxScroll=event.target.scrollHeight-event.target.offsetHeight;
      /* TODO SHOULD FIRE IN IMAGEBOARD NOT HERE */
      const scrollPercent=scrollVal / maxScroll;
      if(scrollPercent>0.9 && !this.scrollWait){
        console.log(scrollPercent)
        this.loadMorePosts()
      }
      // after more content was loaded and scrollpercent is below 90% unlock again
      if(this.scrollWait && scrollPercent<=0.9){
        this.scrollWait=false;
      }
    }

    handleEndlessScroll=()=>{

    }


    setScroll=(amount)=>{
        const offset=-80;
        const currentScroll=this.scrollRef.current.scrollTop;
        this.scrollRef.current.scroll(0,currentScroll+amount+offset);
    }
    fullScreenImage=(imageSource)=>{
        this.setState({fullScreenImage:imageSource});
    }

    getUserPosts=(type)=>{
      const currentType=(type==='user' || type ==='favorites')?type : 'user';
      const token=this.state.token;
      if(token){
          this.getPosts(`${BASEURL}/logged/${currentType}`,token,(res)=>{
              //callback to create the first page of postarray
              this.setState({postsUserFavorite: res.data.data,loading: false, error: false} ,()=>this.loadingMore=false)
              this.postsUserFavoritePagination=res.data;
            })
      }
    }


      getNewPosts=()=>{
        if(!this.mainBoardLoaded){
          const token=this.state.token;
          this.getPosts(`${BASEURL}/posts`,token,(res)=>{
            //callback to create the first page of postarray
            this.setState({
              posts: res.data.data, 
              loading: false, error: false},()=>{
                this.loadingMore=false
                this.mainBoardLoaded=true
            })
            this.postsPagination=res.data;
          })
        }
        
      }

      searchByTag=(tagName)=>{
        this.searchPosts(`${BASEURL}/posts/search/`,tagName)
      }

      searchByString=(searchString)=>{
        this.searchPosts(`${BASEURL}/posts/search/`,searchString)
      }

  
  
  
      getPosts=(url,token, callback)=>{
        const headers=token?{headers:{"Authorization":`Bearer ${token}`}}:{}
        if(url){
          this.loadingMore=true;
          this.setState({loading: true})
          axios.get(url, headers)
            .then(res=>{
            callback(res)
          }).catch(error=>{
            if(error && error.response && error.response.status===403){
              this.loggedOutByServer();
            }
            this.setState({error: true,loading: false})
          })
        }
        /* if(this.imageFeed.current_page===this.imageFeed.last_page && this.state.endReached===false){
          this.setState({endReached:true})
        } */
        
      }
/*       loadMore=(saveTo, paginationObject)=>{
        const target=saveTo || 'posts';
        if(paginationObject && paginationObject.next_page_url){
          if(!this.loadingMore && this.state[target]){
            this.getPosts(paginationObject.next_page_url,this.props.token,(res)=>{
              console.log(paginationObject)
              console.log(res)
              paginationObject=res.data;
              console.log(paginationObject)
              //callback to append the new post "page" to current post array
              //paginationObject=res.data
              this.setState({[target]:[...this.state[target],...res.data.data]} ,()=>this.loadingMore=false)
            })
          }
        }
        
      } */

      loadMorePosts=()=>{
        if(this.postsPagination && this.postsPagination.next_page_url && this.postsPagination.current_page!==this.postsPagination.last_page){
          if(!this.loadingMore && this.state.posts){
            this.getPosts(this.postsPagination.next_page_url,this.props.token,(res)=>{
              this.postsPagination=res.data;
              this.setState({posts:[...this.state.posts,...res.data.data]} ,()=>this.loadingMore=false)
            })
          }
        }
      }

      loadMorePostsSearch=()=>{
        if(this.postsSearchPagination && this.postsSearchPagination.next_page_url && this.postsSearchPagination.current_page!==this.postsSearchPagination.last_page){
          if(!this.loadingMore && this.state.postsSearch){
            this.getPosts(this.postsSearchPagination.next_page_url,this.props.token,(res)=>{
              this.postsSearchPagination=res.data;
              this.setState({postsSearch:[...this.state.postsSearch,...res.data.data]} ,()=>this.loadingMore=false)
            })
          }
        }
      }
      loadMorePostsUserFavorite=()=>{
        if(this.postsUserFavoritePagination && this.postsUserFavoritePagination.next_page_url && this.postsUserFavoritePagination.current_page!==this.postsUserFavoritePagination.last_page){
          if(!this.loadingMore && this.state.postsUserFavorite){
            this.getPosts(this.postsUserFavoritePagination.next_page_url,this.props.token,(res)=>{
              this.postsUserFavoritePagination=res.data;
              this.setState({postsUserFavorite:[...this.state.postsUserFavorite,...res.data.data]} ,()=>this.loadingMore=false)
            })
          }
        }
      }
  
      searchPosts=(url, search)=>{
        const token=this.state.token;
        if(search){
          const searchUrl=`${url}${search}`
          const headers=token?{headers:{"Authorization":`Bearer ${token}`}}:{}
          if(searchUrl){
            this.loadingMore=true;
            axios.get(searchUrl, headers)
              .then(res=>{
              this.setState({postsSearch:res.data.data, loading: false, error: false},
                ()=>{
                  this.loadingMore=false;
                })
              this.postsSearchPagination=res.data;
            }).catch((error)=>{
              this.setState({postsSearch:[],loading: false,error: true},
                ()=>{
                  this.loadingMore=false;
                })
            })
          }
        }
        else{
        }
      }

    render() {
        return (
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
                        openUpload={()=>this.setState({uploadOpen:!this.state.uploadOpen,mobileNavOpen: false})} 
                        {...props}
                    />
                }/>    
                </header>
                
                <main ref={this.scrollRef}>
                  
                  {this.state.uploadOpen&&
                  <div className={"uploadModal centerAll"}>
                    <div className={"innerContent"}>
                        <i onClick={()=>this.setState({uploadOpen: false})} className="material-icons closeButton">
                            close
                        </i>
                        <CreatePost token={this.state.token}/>
                    </div>
                  </div>}

                  {this.state.logSignOpen&&
                  <div className={"uploadModal centerAll"}>
                    <div className={"innerContent  fixHeightNoBorder"}>
                        <i onClick={()=>this.setState({logSignOpen: false})} className="material-icons closeButton">
                            close
                        </i>
                        <SignUp 
                            logIn={this.logIn}
                            signUp={this.signUp}
                            sign={()=>this.setState({signUpStatus:0})}
                            log={()=>this.setState({signUpStatus:1})}
                            signUpStatus={this.state.signUpStatus}
                            onChange={this.onChange}
                            name={this.state.name}
                            email={this.state.email}
                            password={this.state.password}
                            passwordRe={this.state.passwordRe}
                        />
                    </div>
                  </div>}
                  
                  <Switch>
                    {this.state.loggedIn && 
                    <Route path='/profile' render={({history})=>
                        <UserPage 
                            token={this.state.token}
                            history={history}
                            openFull={this.fullScreenImage}
                            loadMore={this.loadMorePostsUserFavorite} 
                            posts={this.state.postsUserFavorite} 
                            getUserPosts={this.getUserPosts}
                            loggedOutByServer={this.loggedOutByServer} 
                        />}
                    />
                    }  
    
                    <Route path={"/tag/:search"} render={({history, match})=>
                        <ImageBoard 
                          loadMore={this.loadMorePostsSearch} 
                          key='boardTag' 
                          posts={this.state.postsSearch} 
                          getPosts={this.searchByTag} 
                          pathUrl="/tag" 
                          history={history} 
                          match={match} 
                          token={this.state.token}
                          openFull={this.fullScreenImage}
                          loggedOutByServer={this.loggedOutByServer} 
                        />}
                    />

                    <Route path={"/search/:search"} render={({history, match})=>
                        <ImageBoard 
                          loadMore={this.loadMorePostsSearch} 
                          key='boardSearch' 
                          posts={this.state.postsSearch} 
                          getPosts={this.searchByString} 
                          pathUrl="/search" 
                          history={history} 
                          match={match} token={this.state.token} 
                          openFull={this.fullScreenImage}
                          loggedOutByServer={this.loggedOutByServer}
                        />}
                    />

                    <Route path={"/"} render={({history})=>
                        <ImageBoard 
                          loadMore={this.loadMorePosts} 
                          key='boardNew' 
                          posts={this.state.posts} 
                          getPosts={this.getNewPosts} 
                          pathUrl="" 
                          history={history} 
                          token={this.state.token} 
                          openFull={this.fullScreenImage}
                          loggedOutByServer={this.loggedOutByServer}
                        />
                      }
                    />
                  </Switch>
                </main>
                {this.state.fullScreenImage&&
                <FullScreenModal>
                    <img 
                        onClick={()=>this.setState({zoom:!this.state.zoom})} 
                        alt='' 
                        className="fullScreenImage" 
                        src={this.state.fullScreenImage}
                        style={this.state.zoom?{objectFit:"cover"}:{objectFit:"contain",height: "99.6%"}}
                    />
                    <div className={"centerAll shortInfo"}>
                        <p>CLICK THE PICTURE AGAIN TO ZOOM IN!</p>
                    </div>
                    <i onClick={()=>this.setState({fullScreenImage:""})} className="material-icons closeButton">
                        close
                    </i>
                </FullScreenModal>}
            </div>
        </BrowserRouter>
        );
    }
}
