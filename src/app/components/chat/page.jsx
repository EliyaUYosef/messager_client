"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/AppContext";
import Style from "@/app/page.module.css";
import ChatHeader from "../chat_header/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faEnvelope, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
      const { globalData, currentFriend, authToken } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://messager-api-c2cd41880be6.herokuapp.com/api/msg/get_chat_with_first",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
            body: JSON.stringify({
              user_id: currentFriend,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setMessages(data.data.messages); // assuming the API response is an array of people
        setUser(data.data.chat_with);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log(globalData);
    };
    
    // fetchData();
    // Set up an interval to fetch data every 1.5-2 seconds
    const intervalId = setInterval(() => {
        if (currentFriend > 0 && messages.length === 0) {
            fetchData();
        }
    }, 2500);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentFriend]); // Empty dependency array to run the effect only once when the component mounts
  return (
    <div
      className={`${Style.chat}`}
    >
      <ul>
        {currentFriend && <li
          className={`${Style.chat_header}`}
          style={{ fontWeight: "600" }}
        >
          <ChatHeader params={user} />
        </li>}
        <br />
        <br />
        <br />
        <br />
        <br />
        {messages.map((message) => (
          <li
            key={message.id}
            className={`${Style.message} ${
              message.sender !== user.id
                ? Style.primary_user_message
                : Style.secondary_user_message
            }`}
          >
            { message.recieved_flag === 0 && message.sender === user.id &&

            <div className={`${Style.un_read_message_indication}`}>
                <FontAwesomeIcon icon={faEnvelope} 
                    style={{
                        fontSize:'20px',
                        margin:"auto"
                    }}
                /> 
                {" - "}New Message
                    
              </div>
              }
            <span className={Style.message_subject}>{message.subject}</span>
            {message.message}
            
            <div className={Style.message_time}>
              {formatDate(message.created_at)}{" "}
              <FontAwesomeIcon
                icon={message.sender !== user.id ? faCaretDown : faCaretUp}
              />
            </div>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default Chat;
function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Add leading zero if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}
