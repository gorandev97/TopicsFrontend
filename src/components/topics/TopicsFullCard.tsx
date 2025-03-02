import { formatNumber, getElapsedTime } from "../../helper/calculations";
import { getDecodedToken } from "../../helper/token";
import { Topic } from "../../interfaces/interfaces";
import CommentImage from "../../assets/icons/chat-bubble.png";
import { LikeButtons } from "../like/likeButtons";
import { ActionButtons } from "../ActionButtons";
import { useEffect, useRef, useState } from "react";
import { PictureModal } from "../modals/PictureModal";
import { DropdownActionButtons } from "../DropdownActionButtons";

type TopicsFullCardProps = {
  topic: Topic;
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsDeleteModalOpen: (isDeletedModalOpen: boolean) => void;
};

export const TopicsFullCard = (props: TopicsFullCardProps) => {
  const user = getDecodedToken();
  const { topic, setIsModalOpen, setIsDeleteModalOpen } = props;
  const [isPictureModal, setIsPictureModal] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="flex flex-row ml-3 justify-between ">
        <div className="flex flex-row">
          <img
            src={topic.author?.profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
          />
          <div className="mt-3 ml-3">
            <div>{topic.author?.firstName + " " + topic.author?.lastName}</div>
            <div className="text-gray-400">
              {getElapsedTime(topic?.createdAt)}{" "}
            </div>
          </div>
        </div>
        {user?.id === topic.postedBy && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="block md:hidden text-gray-700 mr-2 mt-8"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <div className="hidden md:flex">
              <ActionButtons
                onDelete={() => {
                  setIsDeleteModalOpen(true);
                }}
                onEdit={() => {
                  setIsModalOpen(true);
                }}
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <DropdownActionButtons
                  onEdit={() => {
                    setIsModalOpen(true);
                  }}
                  onDelete={() => {
                    setIsDeleteModalOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="px-3">
        <h2 className="text-xl font-bold text-blue-900">{topic.title}</h2>

        <div className="flex md:flex-col flex-col justify-center  gap-4">
          {topic && topic.image && (
            <div className="flex items-center justify-center">
              <img
                src={topic.image}
                alt="Topic"
                className="w-full h-auto max-h-96 max-w-[500px] w-auto object-contain rounded-lg my-3 cursor-pointer border border-blue-700 shadow-lg"
                onClick={() => setIsPictureModal(true)}
              />
              {isPictureModal && (
                <PictureModal
                  image={topic.image}
                  setIsPictureModalOpen={setIsPictureModal}
                />
              )}
            </div>
          )}
          <div className="">{topic?.description}</div>
        </div>
        <div className="flex flex-row gap-4 ">
          <LikeButtons
            likesCount={topic?.likesCount}
            dislikesCount={topic.dislikesCount}
            userId={user?.id ?? ""}
            targetId={topic.id}
            isTopic={true}
          />
          <img src={CommentImage} alt="Profile" className="w-8 h-8 my-3" />
          <div className="text-xl self-center">
            {formatNumber(topic?.comments?.length)}
          </div>
        </div>
      </div>
    </>
  );
};
