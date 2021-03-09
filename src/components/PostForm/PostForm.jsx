import React from 'react'
import {Card,Input,Button} from 'antd'


export default function PostForm(props) {

    console.log(props.userDetails);
    return(
    <Card title=" Logged In User id"style={{width:"75%",height:"25%",margin:"auto",marginTop:"100px"}}>
        <p>{props.userDetails.token}</p>
    </Card>
    )
}