import React, { Component } from 'react';
//import Axios from 'axios';
import Posts from './Posts/Posts';
import './Blog.css';
import { Route ,NavLink } from 'react-router-dom';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
     render () {
        // array of JSX elemenets
        // let posts = <p style={{textAlign:'center'}}>Something went wrong!!! </p>
        // if(!this.props.error) {
        //      posts = this.state.posts.map(
        //         post=> {
        //             return<Post 
        //             key={post.id} 
        //             title={post.title} 
        //             author={post.author}
        //             clicked={() => this.postSelectedHandler(post.id)}/>
    
                
         
        return (
            <div className ="Blog"> 
                {/* Added the heading tag  */}
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/" 
                            exact 
                            
                            activeStyle={{
                                color:'lightblue',
                                textDecoration:'underLine'
                            }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search: '?quick=submit=true'

                            }} exact
                            activeStyle={{
                                color:'lightblue',
                                textDecoration:'underLine'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Posts />  */}
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> 
                <Route path="/" render={() => <h1>Home 2</h1>} />  */}
                <Route path ="/" exact component={Posts} /> 
                <Route path ="/new-post" component={NewPost} />  
                <Route path ="/:id" component={FullPost} />  

 

                
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;