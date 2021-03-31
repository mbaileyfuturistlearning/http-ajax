import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {


    state = {
        posts:[],
        selectedPostId:null,
        error:false
    }

    //This life cycle hook is used for side effects.
    //A get request is a side effect because it doesnt change the react logic,
    //but it gets data.
    componentDidMount(){
        //The axios get() method is used to make a get request.
        //then is used to get the response back.
        //Axios also takes promises after making its request. The most common ones are then and catch.
        axios.get('/posts')
        .then(response => { //Then is a method we will use to manipulate the data we get back from our response.
            const posts = response.data.slice(0, 4) //This will limit the number of visible posts.
            const updatedPosts = posts.map(post => {
                return{
                    ...post,
                    author:'Mcheal'//We can manipulate the data we get back 
                                   //from the server by hardcoding values for a given property.
                }
            })
            this.setState({posts:updatedPosts})
        })
        .catch(error => { //Catch is a method we will use to catch errors in case our request doesnt work.
            this.setState({error:true})
        })
    }
    

    postSelectedHandler =(id) => {
        this.setState({selectedPostId:id})
    }

    render () {

        let posts = <p style={{textAlign:'center'}}>Something went wrong</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post title={post.title} 
                            key={post.id} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}/>
            })
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