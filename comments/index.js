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
    comments.push({id: commentId, content, status: 'pending'});
    commentsByID[req.params.id] = comments;
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postID: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send(comments);
});

app.post('/events', async (req, res)=>{
    console.log('Event recieved', req.body.type);
    const {type, data} = req.body;
    if(type==='CommentModerated'){
        const { postID, id, status, content } = data;
        const comments = commentsByID[postID];
        // console.log(data);
        // console.log(commentsByID);
        // console.log(commentsByID[postID]);
        // console.log(postID);
        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data:{
                id,
                status,
                postID,
                content
            }
        });
    }
    res.send({});
})

app.listen(4001, ()=>{
    console.log('Listiningon 4001');
});