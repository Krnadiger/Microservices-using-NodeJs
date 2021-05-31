const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

commentsByID = {};

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByID[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByID[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByID[req.params.id] = comments;
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postID: req.params.id
        }
    });
    res.status(201).send(comments);
});

app.post('/events', (req, res)=>{
    console.log('Event recieved', req.body.type);
    res.send({});
})

app.listen(4001, ()=>{
    console.log('Listiningon 4001');
})