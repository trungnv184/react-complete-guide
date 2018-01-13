import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        currentPost: null,
        loading: false,
        cache: []
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({ loading: true });

            const postFound = this.state.cache.find(p => p.id === nextProps.id);

            if (!postFound) {
                const post = (await axios.get(`/posts/${nextProps.id}`)).data;

                this.setState(prevState => {
                    const newCache = [...prevState.cache];
                    newCache.push(post);
                    return { cache: newCache, currentPost: post, loading: false };
                })                
            } else {
                this.setState({ currentPost: postFound, loading: false} )
            }
        }
    }

    /*
     Alternative:
     HOWEVER, there's a bug!
     although we don't get an infinite loop here, the first post clicked doesn't get rendered for some reason
    */

    /* shouldComponentUpdate(nextProps, nextState) {
        return nextProps.id !== this.props.id;
    }

    async componentDidUpdate() {
        if (this.props.id) {
            const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`);

            this.setState({ currentPost: post.data });
        }
    } */

    deleteHandler = () => {
        if (this.props.id) {
            axios.delete(`/posts/${this.props.id}`)
            .then(console.log,
                 err => console.log(`Oops, something went wrong! ${err}`))
        }
    }

    render () {
        let post = null;
        if (!this.props.id) {
            post = <p className = "FullPost">Please select a Post!</p>;
        } else if (this.state.loading || !this.state.currentPost) {
            post = <p className = "FullPost">Loading...</p>;
        } 
        else {
            post = (
                <div className="FullPost">
                    <h1
                    className = "FullPost-Title">{ this.state.currentPost.title }</h1>
                    <p
                    className = "FullPost-Body">{ this.state.currentPost.body }</p>
                    <div className="Edit">
                        <button
                         className="Delete"
                         onClick = { this.deleteHandler }>Delete</button>
                    </div>
                </div>    
            );          
        }

        return post;
    }
}

export default FullPost;