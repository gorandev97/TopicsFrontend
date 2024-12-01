import { Notification } from "../../interfaces/interfaces";
import { EmptyState } from "../placeholder/EmptyState";

type NotificationsDropDownProps = {
  notifications?: Notification[];
};

export const NotificationsDropDown = ({
  notifications,
}: NotificationsDropDownProps) => {
  return (
    <div className="absolute sm:right-0 right-[-80px] right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-md shadow-lg z-10 flex justify-center items-center py-2 flex-col gap-2">
      {notifications && notifications.length !== 0 ? (
        notifications.map((notifications: Notification) => {
          return (
            <div className="bg-gray-300 rounded-md w-[300px] flex-wrap p-1">
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
