import { useNavigate } from "react-router-dom";
import { Notification } from "../../interfaces/interfaces";
import { EmptyState } from "../placeholder/EmptyState";

type NotificationsDropDownProps = {
  notifications?: Notification[];
};

export const NotificationsDropDown = ({
  notifications,
}: NotificationsDropDownProps) => {
  const navigate = useNavigate();
  return (
    <div className="absolute sm:right-0 right-[-80px] right-0 mt-2 max-w-[350px] w-auto max-h-[500px] overflow-y-auto bg-white border border-blue-400 rounded-md shadow-lg z-10 flex justify-center items-center flex-col gap-2 p-2 ">
      {notifications && notifications.length !== 0 ? (
        notifications.map((notifications: Notification) => {
          return (
            <div
              className={`${
                notifications.isRead ? "bg-gray-200" : "bg-blue-200"
              } rounded-md w-[300px] flex-wrap p-1`}
              onClick={() => navigate(`/topic/${notifications.topicId}`)}
              key={notifications.id}
            >
              {notifications.content}
            </div>
          );
        })
      ) : (
        <EmptyState title="No notifications" />
      )}
    </div>
  );
};
