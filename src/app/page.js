"use client";
import Image from 'next/image'

import styles from './page.module.css'
import Conversations from './components/conversations/page'
import Chat from './components/chat/page'
import React,{ useEffect,useContext } from 'react'
import { AppContext } from "@/app/AppContext";
import { useRouter } from "next/navigation";
import SendMessage from "@/app/components/send_message/page"

export default function Home() {
  const router = useRouter();
  const { authToken } = useContext(AppContext);

  useEffect(() => {
    if (authToken === "") {
      router.push("/login");
    }
  },[])
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Conversations />
        <Chat />
        <SendMessage />
      </div>
    </main>
  )
}
