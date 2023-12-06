"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Style from "@/app/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignIn,
  faSignOut,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "@/app/AppContext";
import { useRouter } from 'next/navigation'
import { capitalizeFirstLetter } from "@/app/utils";
const Navbar = () => {
  const router = useRouter();
  const { globalData, setGlobalData, setAuthToken,authToken, setChatWith, currentFriend } = useContext(AppContext);
  
  const  handleLogout = async () => {
    try {
      console.log("LOGOUT");
      const response = await fetch(
        `https://messager-api-c2cd41880be6.herokuapp.com/api/auth/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            Authorization: authToken
          },
        }
      );

      const data = await response.json();
      console.log("RESPONSE", data);
      if (data.message === "User logged out.") {
        setGlobalData({...globalData, user : {}})
        setAuthToken('');
        localStorage.removeItem("Authorization");
        router.push('/login');
        return "0";
      }

      setErrorData(data.errors);
      return "0";
    } catch (error) {
      console.error("Error during login:", error);
      return "0";
    }
  }
  return (
    <div className={`${Style.topnav}`}>
      <div className={`${Style.active}`}>
        <Link href="/">
          <FontAwesomeIcon
            style={{ fontSize: "120%" }}
            icon={faComments}
          />
        </Link>
      </div>

      {globalData.user.name && <div style={{color:"#09aa6d"}}>Hey, {capitalizeFirstLetter(globalData.user.name)}</div>}
      {!globalData.user.name && (
        <div>
          <Link href="/register">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </div>
      )}
      {!globalData.user.name && (
        <div>
          <Link href="/login">
            <FontAwesomeIcon icon={faSignIn} />
          </Link>
        </div>
      )}

      {globalData.user.name && (
        <div onClick={handleLogout} >
            <FontAwesomeIcon icon={faSignOut}
            />
        </div>
      )}
      {/* <div style={{color:"green"}}>{currentFriend}</div> */}
    </div>
  );
};
export default Navbar;
