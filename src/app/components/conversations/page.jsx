"use client";
import React, { useState, useEffect,useContext } from "react";
import Link from "next/link";
import Style from "@/app/page.module.css";
import { AppContext } from "@/app/AppContext";

const Conversations = () => {
  const [people, setPeople] = useState([]);
  const { authToken,setCurrentFriend,currentFriend } = useContext(AppContext);
const changeChatUser = (id) => {
    if (!id) {return;}
    setCurrentFriend(id)
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://messager-api-c2cd41880be6.herokuapp.com/api/msg/get_last_convesations",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        setPeople(data.data.users);
          console.log(currentFriend,data.data.users[0].id)
        if (currentFriend === 0) setCurrentFriend(data.data.users[0].id)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (authToken !== '')
        fetchData();
  }, []); // empty dependency array to run the effect only once when the component mounts

  return (
    <div
      className={`${Style.conversations}`}
      style={{ border: "solid 1px #04AA6D" }}
    >
      <ul>
        <li style={{fontWeight:"600"}}>
            Conversations:
        </li>
        {people.map((person) => (
          <li key={person.id} onClick={()=>changeChatUser(person.id)} className={`${Style.user_list_item} ${currentFriend === person.id ? Style.chosen_one : ''}`}>
            <Link href="/">
            {person.name} <br/>
            last seen:{person.last_action_time}
            </Link>
            </li>
        ))}
      </ul>
    </div>
  );
};
export default Conversations;
