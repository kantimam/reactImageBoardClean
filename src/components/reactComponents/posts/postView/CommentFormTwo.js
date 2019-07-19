import React, { Component } from 'react'
import axios from 'axios'
const BASEURL=`${process.env.REACT_APP_BE_URL}`;


export default class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
             comment: "",
             succes: false,
             postId:this.props.currentPost
        }
    }
    componentDidUpdate(){
        // check if we are viewing a different post
        if(this.state.postId!==this.props.currentPost){
            //reset the state and update postId
            this.setState({
                postId:this.props.currentPost,
                succes: false,
                comment: ""
            })
        }
    }
    sendComment=(event)=>{
        event.preventDefault();
        if(this.state.comment.length>1 && this.props.currentPost){
            const formData=new FormData();
            formData.append("body",this.state.comment);
            formData.append("postId",this.props.currentPost)

            const headers=this.props.token?
                {headers:
                    {'Content-Type': 'multipart/form-data',
                    "Authorization":`Bearer ${this.props.token}`
                    }
                }:{headers:{'Content-Type': 'multipart/form-data'}}

            const requestMode=this.props.token? "/logged/comments" : "/comments"

            axios.post(`${BASEURL}${requestMode}` ,formData, headers)
            .then(response=>{
                if(response.status===200){
                    this.setState({
                        succes:"succes!",
                        comment: ""
                    },()=>{
                        this.props.refreshPost()
                    })
                }
            })
            .catch(error=>{
                console.log(error)
                this.setState({
                    succes:"something went wrong!"
                })
            })
            
        }
        
    }

    onChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
    
        this.setState({[name]:value})
    }
    
    render() {
        return (
            <form className={'commentFormSimple'}>
                {this.state.succes&&<div onClick={()=>this.setState({succes:""})} className={'commentInfo'}>{this.state.succes}</div>}
                <textarea value={this.state.comment} onChange={this.onChange} name="comment" className={'commentText'} placeholder='write a comment' />
                <input onClick={this.sendComment} className={'submitComment mainHover'} type='submit'></input>
            </form>
        )
    }
}
