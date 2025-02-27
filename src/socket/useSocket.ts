// useSocket.ts
import { useEffect, useState } from "react";
import io from "socket.io-client";
import config from "../config";
import { toast } from "react-toastify";
import { Notification } from "../interfaces/interfaces";
import { getDecodedToken } from "../helper/token";
import { useNavigate } from "react-router-dom";

const SOCKET_URL = config.apiUrl;

export const useSocket = (count: number, notifications: Notification[]) => {
  const [unreadCount, setUnreadCount] = useState<number>(count);

  const [unreadNotifications, setUnreadNotifications] =
    useState<Notification[]>(notifications);

  useEffect(() => {
    setUnreadNotifications(notifications);
  }, [notifications]);
  useEffect(() => {
    setUnreadCount(count);
  }, [count]);
  const user = getDecodedToken();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on(
      "notificationCreated",
      (notification: { notification: Notification; topicId: string }) => {
        if (user?.id === notification.notification.userId) {
          toast.success(notification.notification.content, {
            onClick: () => {
              navigate(`/topic/${notification.topicId}`);
            },
          });
          setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
          console.log(notification.notification, unreadNotifications, "nesto");
          setUnreadNotifications((prevUnreadNotifications) => [
            notification.notification,
            ...prevUnreadNotifications,
          ]);
        }
      }
    );
    socket.on(
      "notificationsCount",
      (count: { notificationsCount: number; id: string }) => {
        console.log(user?.id === count.id, user?.id, count.id);
        if (user?.id === count.id) setUnreadCount(count.notificationsCount);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);
  console.log(unreadCount, unreadNotifications, notifications);
  return { unreadCount, unreadNotifications };
};
