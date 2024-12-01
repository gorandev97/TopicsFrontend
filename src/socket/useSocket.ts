// useSocket.ts
import { useEffect, useState } from "react";
import io from "socket.io-client";
import config from "../config";
import { toast } from "react-toastify";
import { Notification } from "../interfaces/interfaces";
import { getDecodedToken } from "../helper/token";

const SOCKET_URL = config.apiUrl;

export const useSocket = (count: number, notifications: Notification[]) => {
  const [unreadCount, setUnreadCount] = useState<number>(count);
  const [unreadNotifications, setUnreadNotifications] =
    useState<Notification[]>(notifications);
  useEffect(() => {
    setUnreadCount(count);
  }, [count]);
  const user = getDecodedToken();
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on("notificationCreated", (notification: Notification) => {
      if (user?.id === notification.userId) toast.success(notification.content);

      setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
    });
    socket.on("notificationsCount", (count: number) => {
      setUnreadCount(count);
    });
    socket.on("unreadNotifications", (unreadNotifications: Notification[]) => {
      setUnreadNotifications(unreadNotifications);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return { unreadCount, unreadNotifications };
};
