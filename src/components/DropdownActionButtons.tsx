interface ActionButtonsProps {
  onEdit: () => void; // Callback for edit action
  onDelete: () => void; // Callback for delete action
  label?: string; // Optional label (e.g., "comment" or "topic")
}

export const DropdownActionButtons = ({
  onEdit,
  onDelete,
  label,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center flex-col">
      <div
        onClick={onEdit}
        className="w-[50px] my-2 py-2 text-center rounded-lg bg-gray-300 h-auto "
      >
        Edit
      </div>
      <div
        onClick={onDelete}
        className="w-[50px] my-2 py-2 text-center rounded-lg bg-gray-300 h-auto  text-red-600"
      >
        Delete
      </div>
    </div>
  );
};
