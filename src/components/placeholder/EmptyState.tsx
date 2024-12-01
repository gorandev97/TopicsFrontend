import EmptyStatePicture from "../../assets/icons/kitten.png";

type EmptyStateProps = {
  title: string;
};

export const EmptyState = ({ title }: EmptyStateProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <img src={EmptyStatePicture} alt="CatPicture" />
      <div className="text-3xl font-bold text-wrap items-center">{title}</div>
    </div>
  );
};
