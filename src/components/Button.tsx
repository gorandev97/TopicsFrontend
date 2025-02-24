type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
};

export const Button = ({
  title,
  onClick,
  type = "button",
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className="px-8 py-2 bg-white text-blue-400 border border-blue-400 shadow-md text-lg rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 w-30"
    >
      {title}
    </button>
  );
};
