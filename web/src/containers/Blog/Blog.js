import React, { Component } from 'react';
//import Axios from 'axios';
import Axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state ={
        posts:[],
        selectedPostId:null,
        error : false
    }

   
    componentDidMount() {
        // axios return a promise
        // storing the axios in a variable won't work because get is async
        // get returns a
        Axios.get('/posts')
            .then(response => {
             // this.setState({posts:response.data})        stored in the posts
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author:'madhvi'
                    }
                })
                this.setState({posts:updatedPosts});
                // console.log("hey");
                // console.log(response);
            })
          //  one way
            // .catch(error => {
            //     console.log("error");
            // })

            .catch(error => {
                this.setState({error : true});
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId :id});
    }
    
    render () {
        // array of JSX elemenets
        let posts = <p style={{textAlign:'center'}}>Something went wrong!!! </p>
        if(!this.props.error) {
             posts = this.state.posts.map(
                post=> {
                    return<Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
    
                }
            )
        }
       
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;