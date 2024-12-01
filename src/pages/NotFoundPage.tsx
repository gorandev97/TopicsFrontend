import EmptyStatePicture from "../assets/icons/kitten.png";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center  w-full">
      <img src={EmptyStatePicture} alt="Cat" />
      <div className="text-3xl font-bold">Error 404: Page not found</div>
    </div>
  );
};
