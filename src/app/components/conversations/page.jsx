"use client";
import React, { useState, useEffect,useContext } from "react";
import Link from "next/link";
import Style from "@/app/page.module.css";
import { AppContext } from "@/app/AppContext";

const Conversations = () => {
  const [people, setPeople] = useState([]);
  const { globalData, authToken,setCurrentFriend } = useContext(AppContext);
const changeChatUser = (id) => {
    if (!id) {return;}
    setCurrentFriend(id)
}
  useEffect(() => {
    const fetchData = async () => {
      let accessToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmM4NWFmMDZlNDIxMjkwM2RmNDI4ZGZkOTk3MzcwOTI5ZjUxOTM3MWQ1YjUyNDEwNjQ2NmViNTc0N2UxZDUyYzZlZTQxNmVmZjA5OGIzOTQiLCJpYXQiOjE3MDE4MDM3NTkuMTg5NDk2LCJuYmYiOjE3MDE4MDM3NTkuMTg5NDk3LCJleHAiOjE3MzM0MjYxNTkuMTc3MTI0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.AFpsJCtNev73WLjZzHzSYhjJLJ8zBL10YiYXXNR8s5PEXXu8jnitolnC3q1s39v74OkSyIO0KtS7G3lj1SZL-NawhI-VFaVCIdldYMEQ9XnkyKMvv3vnlL-WJjCBbIwfWLtlrTrWEUeHYcrTb-i9cVf6gkfQo4OX8hg0X1MVYw_cqCo-P4CdZoY6LnY9e61b_dKAeSwK-GN8NjpyBj7zSckdjiZ7-9lafIVIYvXljfdxsM80gM7TvpOqNLaVWHKWdHqLylsBYuL47JC-gZYoKH8-diyVM6CF3VpwSnxea3hhbOQHEHreCFbwbZAaK46hPnpKWaVCbKWLPyQfd0cwOjI2uTRtmMKsJBzEfKYxs67_LmPOVe4gNejg2c5WLOtPPRtwYB4KCeFE6HqaURHX9pCD-XoXWWZf7PNqJFygYoWjWE0ol79o4knZOJUIbbICIWHOhiWHCmrTbWpKGAryRNlIMDQHls054YjW72S_r_aeCq8VFBMsVUew7ULRbWZpmgf9p4052qLp0BLoNrePLlNnTIWgXgkTuvOrYnmpSmgqgXax3cVM0iAHhNNVpL9mK5IN79oF-2IcZtwi9bKwMztVE_LswqFLnFc4lpF9GBGMhMgqKpXIeMuVU8iY5IbCOYChsOcUawygeCAHPliNNB4b7tUxz26CxvCH5PwQnU0";
      try {
        const response = await fetch(
          "https://messager-api-c2cd41880be6.herokuapp.com/api/msg/get_last_convesations",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setPeople(data.data.users); // assuming the API response is an array of people
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
          <li key={person.id} onClick={()=>changeChatUser(person.id)} className={`${Style.user_list_item}`}>
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
