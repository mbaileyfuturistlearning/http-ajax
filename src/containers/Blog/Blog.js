import React, { Component } from 'react';
import axios from 'axios'
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {


    state = {
        posts:[]
    }

    //This life cycle hook is used for side effects.
    //A get request is a side effect because it doesnt change the react logic,
    //but it gets data.
    componentDidMount(){
        //The axios get() method is used to make a get request.
        //then is used to get the response back.
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
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

    }
    

    render () {

        const posts = this.state.posts.map(post => {
            return <Post title={post.title} key={post.id} author={post.author}/>
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;