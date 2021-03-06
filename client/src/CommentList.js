import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default({ comments })=>{

    const renderedComments = comments.map(comment=> {
        let content;
        if(comment.status === 'approved'){
            content = comment.content;
        }
        if(comment.status === 'pending'){
            content = 'pending for comfirmation';
        }
        if(comment.status === 'rejected'){
            content = 'comment is rejected';
        }
        return <li key ={comment.id}>{content}</li>;
    });
    return <ul>{renderedComments}</ul>;
    
}