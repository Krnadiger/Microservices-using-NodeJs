import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    };
    useEffect(()=>{
        fetchPosts();
    }, []);

    console.log(posts);
    
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="card"
            style={{width:'30%', marginBottom: "20px"}}>
                <div className = "card-body">
                    <h3>{post.title}</h3>
                </div>
                <CommentList postID={post.id}/>
                <CommentCreate postID={post.id}/>
            </div>
        );
    });
    return (<div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>);
}