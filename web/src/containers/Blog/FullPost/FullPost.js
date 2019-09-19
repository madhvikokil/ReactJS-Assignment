import React, { Component } from 'react';
import Axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPosts : null
    }
    
    componentDidMount() {
        // console.log("update");
        console.log(this.props);
        this.loadData();
     
}

componentDidUpdate () {
    this.loadData();
       
}

loadData () {
    if(this.props.match.params.id){ // if id i strue
        console.log("this.props.id");
        console.log(this.props.id);
        console.log("this.state.loadPost = "+this.state.loadedPosts);
        console.log(this.state.loadedPosts);
       
        if(!this.state.loadedPosts || (this.state.loadedPosts && this.state.loadedPosts.id != this.props.match.params.id))
//             console.log("this.state.loadedPosts.id");
//           //  console.log(this.state.loadedPosts.id);
//           console.log("this.props.id");
//   //  console.log(this.props.id);
    Axios.get('/posts/'+this.props.match.params.id)
        .then(response => {
            //console.log(response);
            this.setState({loadedPosts:response.data}); // updating state within the component(infinite loop)
        });
}
}



    deletePostHandler = () => {
        Axios.delete('/posts/'+this.prop.match.params.id)
            .then(response => {
                console.log(response);
            });
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>
        if(this.props.match.params.id){
        let post = <p style={{textAlign:'center'}}>Loading!</p>;
        }

        if(this.state.loadedPosts){
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedPosts.title}</h1>
                <p>{this.state.loadedPosts.body}</p>
                <div className="Edit">
                    <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                </div>
            </div>

        );
        }
        return post;
    }
}

export default FullPost;