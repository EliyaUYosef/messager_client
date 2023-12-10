"use client";
import React from "react";
import { capitalizeFirstLetter, formatDateAndTime } from '@/app/utils';
const ChatHeader = (params) => {
  return (
    <div>
      {capitalizeFirstLetter(params.params.name)}
      <br />
      <span
        style={{
          fontWeight: "500",
          fontSize: "83%",
          float: "right",
          marginTop: "5px",
        }}
      >
        {formatDateAndTime(params.params.last_action_time)}
      </span>
      <span
        style={{
          fontWeight: "500",
          fontSize: "87%",
        }}
      >
        {params.params.email}
      </span>
    </div>
  );
};
export default ChatHeader;