const express = require('express');
const axios = require('axios');
// const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(cors());
const events = [];


app.post('/events', (req, res )=>{
    const event = req.body;
    events.push(event);
    axios.post('http://localhost:4000/events', event);//posts
    axios.post('http://localhost:4001/events', event);//comments
    axios.post('http://localhost:4002/events', event);//query
    axios.post('http://localhost:4003/events', event);//moderation

    res.send({status: 'ok'});
});

app.get('/events', (req, res)=>{
    res.send(events);
});

app.listen(4005, ()=>{
    console.log('listining on 4005');
})
