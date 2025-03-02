import { formatNumber, getElapsedTime } from "../../helper/calculations";
import { getDecodedToken } from "../../helper/token";
import { Topic } from "../../interfaces/interfaces";
import CommentImage from "../../assets/icons/chat-bubble.png";
import { LikeButtons } from "../like/likeButtons";
import { ActionButtons } from "../ActionButtons";
import { useState } from "react";
import { PictureModal } from "../modals/PictureModal";
type TopicsFullCardProps = {
  topic: Topic;
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsDeleteModalOpen: (isDeletedModalOpen: boolean) => void;
};

export const TopicsFullCard = (props: TopicsFullCardProps) => {
  const user = getDecodedToken();
  const { topic, setIsModalOpen, setIsDeleteModalOpen } = props;
  const [isPictureModal, setIsPictureModal] = useState<boolean>(false);

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
          <ActionButtons
            onDelete={() => setIsDeleteModalOpen(true)}
            onEdit={() => {
              setIsModalOpen(true);
            }}
          />
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
