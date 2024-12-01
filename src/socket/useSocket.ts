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
      if (user?.id === notification.userId) {
        toast.success(notification.content);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on(
      "notificationsCount",
      (count: { notificationsCount: number; id: string }) => {
        console.log(user?.id === count.id, user?.id, count.id);
        if (user?.id === count.id) setUnreadCount(count.notificationsCount);
      }
    );
    socket.on(
      "unreadNotifications",
      (unreadNotifications: {
        unreadNotifications: Notification[];
        id: string;
      }) => {
        if (user?.id === unreadNotifications.id)
          setUnreadNotifications(unreadNotifications.unreadNotifications);
      }
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  return { unreadCount, unreadNotifications };
};
