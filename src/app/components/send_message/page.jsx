"use client";
import React,{useState,useContext,useEffect} from 'react';
import styles from '@/app/page.module.css';
import Box from '@mui/joy/Box';
import { Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { AppContext } from "@/app/AppContext";

export default function SendMessage() {
    const { currentFriend,authToken } = useContext(AppContext);

    const [message, setMessage] = useState({
        subject: '', message: '',reciver:0
    });
    useEffect(()=>{
        setMessage({...message,reciver:currentFriend})
    },[currentFriend]);
    const sendMessage = async (formData) => {
        try {
          console.log("REQUEST", formData);
          const response = await fetch(
            `http://messager-api-c2cd41880be6.herokuapp.com/api/msg/send_message`,
            {
              method: "POST",
              headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
                Accept: "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
    
          const data = await response.json();
          if (data.message === "Message created.") {
              console.log("RESPONSE", data);
              setMessage({subject:'',message:''})
          }
          return "0";
        } catch (error) {
          console.error("Error during login:", error);
          return "0";
        }
      };
    const handleSubmit = () => {
        sendMessage(message);
    }
    const handleInputChange = (e) => {
        const { value, name} = e.target;
        setMessage({...message,[name]:value});
    };
  return (
    <div className={styles.send_message_form}>
            <TextField 
                label="Subject"
                autoFocus 
                size='small' 
                name='subject' 
                value={message.subject}
                sx={{ mt: 0, p: 1, width: '100%' }} 
                variant='filled' 
                onChange={handleInputChange} 
            />
            <TextField 
                label="Message"
                autoFocus 
                value={message.message}
                size='small' 
                sx={{ m: 0, p: 1, width: '100%' }} 
                name='message' 
                variant='filled' 
                onChange={handleInputChange} 
            />
            <br/>
            <Button sx={{background:"#04AA6D"}} type='submit' name='submit' variant='contained'
                onClick={handleSubmit}>
            Send
            </Button>
    </div>
  )
}
