import React ,{Component} from 'react';
import Axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state ={
        posts:[],
        selectedPostId:null,
        error : false
    }

    componentDidMount() {
        console.log(this.props);
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

    componentDidUpdate () {
        
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId :id});  alternative to link 
        this.props.history.push('/posts/' +id);
    }

    render(){
      
        let posts = <p style={{textAlign:'center'}}>Something went wrong!!! </p>
        
        if(!this.props.error) {
             posts = this.state.posts.map(
                post=> {
                    return (
                        // alternative to this by navigating programmatically
                    // <Link to={'/posts/' + post.id} key={post.id} > 
                    <Post 
                    key={post.id}
                        title={post.title} 
                        author={post.author}
                        match={this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                   )
    
        });
    }
       
        return(
            <div>
            <section className="Posts">
                   {posts}
            </section>
           
                <Route path ={this.props.match.url + '/:id'}  component={FullPost} />  
            </div>
        )
    };
}

export default Posts;



