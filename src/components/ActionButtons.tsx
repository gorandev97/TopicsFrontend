import React from "react";
import EditButton from "../assets/icons/edit.png";
import DeleteButton from "../assets/icons/delete.png";

interface ActionButtonsProps {
  onEdit: () => void; // Callback for edit action
  onDelete: () => void; // Callback for delete action
  label?: string; // Optional label (e.g., "comment" or "topic")
}

export const ActionButtons = ({
  onEdit,
  onDelete,
  label,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-2 mx-2">
      <img
        src={EditButton}
        onClick={onEdit}
        alt="Edit"
        className="w-14 h-auto px-3 py-1"
      />
      <img
        alt="Delete"
        src={DeleteButton}
        onClick={onDelete}
        className="w-14 h-auto px-3 py-1"
      />
    </div>
  );
};
