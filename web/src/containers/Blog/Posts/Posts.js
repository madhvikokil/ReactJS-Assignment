import React ,{Component} from 'react';
import Axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link} from 'react-router-dom';

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

    postSelectedHandler = (id) => {
        this.setState({selectedPostId :id});
    }

    render(){
      
        let posts = <p style={{textAlign:'center'}}>Something went wrong!!! </p>
        
        if(!this.props.error) {
             posts = this.state.posts.map(
                post=> {
                    return (
                    <Link to={'/' + post.id} key={post.id} >
                    <Post 
                        
                        title={post.title} 
                        author={post.author}
                        match={this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                    </Link>)
    
        });
    }
       
        return(
           
            <section className="Posts">
                   {posts}
            </section>
        )
    };
}

export default Posts;



