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
      className="px-8 py-2 bg-custom-blue text-white border border-blue-400 shadow-md text-lg rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-hover hover:text-white hover:scale-105  w-30"
    >
      {title}
    </button>
  );
};
