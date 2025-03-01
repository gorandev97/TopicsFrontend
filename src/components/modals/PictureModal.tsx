interface PictureModalProps {
  setIsPictureModalOpen: (isOpen: boolean) => void;
  image: string;
}

export const PictureModal = ({
  setIsPictureModalOpen,
  image,
}: PictureModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <img
          src={image}
          alt="Topic"
          className="w-full h-auto max-h-screen max-w-screen object-contain rounded-lg"
        />
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={() => setIsPictureModalOpen(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
