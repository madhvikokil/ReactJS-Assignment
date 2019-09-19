import React, { Component } from 'react';
//import Axios from 'axios';
import Posts from './Posts/Posts';
import './Blog.css';
import { Route ,NavLink ,Switch,Redirect} from 'react-router-dom';
//import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';
import Axios from 'axios';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})
class Blog extends Component {
    state ={
        auth : false
    }
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
                            to="/posts/" 
                            exact 
                            
                            activeStyle={{
                                color:'lightblue',
                                textDecoration:'underLine'
                            }}
                            >Post</NavLink></li>
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

                {/* In witch only one route works */}
                 
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}  />:  null}
                    {/* if new-post in at down then it is not going to be rendered */}
                    {/* // <Route path ="/new-post" component={NewPost} />   */}
                    <Route path ="/posts"  component={Posts} /> 
                    <Route render={() => <h1> NOT FOUND</h1>} />
                    {/* <Route path ="/"  component={Posts} />  */}
                    {/* <Redirect from="/" to= "/posts" />  */}
                    {/* one way to handle 404 */}
                    
                </Switch>

 

                
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