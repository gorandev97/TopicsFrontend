// useSocket.ts
import { useEffect, useState } from "react";
import io from "socket.io-client";
import config from "../config";
import { toast } from "react-toastify";
import { Notification } from "../interfaces/interfaces";

const SOCKET_URL = config.apiUrl;

export const useSocket = (count: number, notifications: Notification[]) => {
  const [unreadCount, setUnreadCount] = useState<number>(count);
  const [unreadNotifications, setUnreadNotifications] =
    useState<Notification[]>(notifications);
  useEffect(() => {
    setUnreadCount(count);
  }, [count]);
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on("notificationCreated", (notification: Notification) => {
      toast.success(notification.content);

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
