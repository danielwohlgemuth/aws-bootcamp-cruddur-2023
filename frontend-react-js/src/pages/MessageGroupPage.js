import './MessageGroupPage.css';
import React from "react";
import { useParams } from 'react-router-dom';

import { checkAuth, getAccessToken } from '../lib/CheckAuth';
import DesktopNavigation  from '../components/DesktopNavigation';
import MessageGroupFeed from '../components/MessageGroupFeed';
import MessageFeed from '../components/MessageFeed';
import MessageForm from '../components/MessageForm';

export default function MessageGroupPage() {
  const [messageGroups, setMessageGroups] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [popped, setPopped] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);
  const params = useParams();

  const refreshMessages = (message_group_uuid) => {
    params.message_group_uuid = message_group_uuid;
    loadMessageGroupData();
  }

  const loadMessageGroupsData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/message_groups`
      const accessToken = await getAccessToken();
      const res = await fetch(backend_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessageGroups(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };  

  const loadMessageGroupData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/messages/${params.message_group_uuid}`
      const accessToken = await getAccessToken();
      const res = await fetch(backend_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessages(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };  

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadMessageGroupsData();
    loadMessageGroupData();
    checkAuth(setUser);
  }, [refreshMessages])
  return (
    <article>
      <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
      <section className='message_groups'>
        <MessageGroupFeed message_groups={messageGroups} refreshMessages={refreshMessages} />
      </section>
      <div className='content messages'>
        <MessageFeed messages={messages} />
        <MessageForm setMessages={setMessages} />
      </div>
    </article>
  );
}