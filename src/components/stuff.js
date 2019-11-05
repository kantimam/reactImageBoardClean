loggedIn=(data)=>{
      this.setState({
        loggedIn:true, 
        logSignOpen: false,
        token:data.token,
        },
        ()=>this.createLocalStore())
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
        this.loadMorePosts()
      }
      // after more content was loaded and scrollpercent is below 90% unlock again
      if(this.scrollWait && scrollPercent<=0.9){
        this.scrollWait=false;
      }
    }


    handleBigScreen=(scrollRef)=>{
      /* if there was not enough content loaded to fill the entire screen load more */
      return scrollRef.current.scrollHeight === scrollRef.current.clientHeight
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
                this.postsPagination=res.data;
                this.imageFeed=res.data;
                
                if(this.handleBigScreen(this.scrollRef)){
                  /* if screen is not filled load more content should rarly happen but maybe people have giant screens...
                  also wait 800ms to give dom some time to render */
                  setTimeout(()=>this.loadMore('posts'),800);
                }
            })
            
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
      
        
      }


      loadMore=(saveTo)=>{
        const target=saveTo || 'posts';
        if(!this.loadingMore && this.state[target]){
          this.getPosts(this.imageFeed.next_page_url,this.props.token,(res)=>{
            //callback to append the new post "page" to current post array
            this.setState({[target]:[...this.state[target],...res.data.data]} ,()=>this.loadingMore=false);
            this[`${target}Pagination`]=res.data;
          })
        }
      }

      loadOlder=(saveTo)=>{
        const target=saveTo || 'posts';
        if(!this.loadingMore && this.state[target]){
          this.getPosts(this.imageFeed.prev_page_url,this.props.token,(res)=>{
            console.log(res.data[0])
            //callback to append the new post "page" to current post array
            this.setState({[target]:[...res.data[0].data, ...this.state[target]]} ,()=>this.loadingMore=false)
          })
        }
      }


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
              this.setState({postsSearch: res.data.data, loading: false, error: false},
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