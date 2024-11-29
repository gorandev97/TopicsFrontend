import { getElapsedTime, formatNumber } from "../../helper/calculations";
import { Topic } from "../../interfaces/interfaces";
import LikeImage from "../../assets/icons/like.png";
import CommentImage from "../../assets/icons/chat-bubble.png";
import { LikeButtons } from "../like/likeButtons";
import { getDecodedToken } from "../../helper/token";

type TopicContentProps = {
  topic: Topic;
};

export const TopicContent = (props: TopicContentProps) => {
  const { topic } = props;
  const user = getDecodedToken();
  return (
    <>
      <div className="flex flex-row ml-3">
        <img
          src={topic.author?.profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
        />
        <div className="mt-3 ml-3">
          <div>{topic.author?.firstName + " " + topic.author?.lastName}</div>
          <div>{getElapsedTime(topic?.createdAt)} </div>
        </div>
      </div>
      <div className="px-3">
        <h2 className="text-xl font-bold text-blue-900">{topic.title}</h2>
        <div className="line-clamp-5">{topic?.description}</div>
        <LikeButtons
          likesCount={topic?.likesCount}
          dislikesCount={topic.dislikesCount}
          userId={user?.id ?? ""}
          targetId={topic.id}
          isTopic={true}
        />
        {/*  <div className="flex flex-row gap-2 absolute bottom-0 left-2 bg-red-300">
          <img src={LikeImage} alt="Profile" className="w-8 h-8 my-3" />
          <div className="text-xl self-center">
            {formatNumber(topic?.likesCount)}
          </div>
          <img src={CommentImage} alt="Profile" className="w-8 h-8 my-3" />
          <div className="text-xl self-center">
            {formatNumber(topic?.comments?.length)}
          </div>
        </div> */}
      </div>
    </>
  );
};
