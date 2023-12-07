"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Style from "@/app/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
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