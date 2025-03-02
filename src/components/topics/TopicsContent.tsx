import { getElapsedTime } from "../../helper/calculations";
import { Topic } from "../../interfaces/interfaces";
import { LikeButtons } from "../like/likeButtons";
import { getDecodedToken } from "../../helper/token";

type TopicContentProps = {
  topic: Topic;
};

export const TopicContent = (props: TopicContentProps) => {
  const { topic } = props;
  const user = getDecodedToken();
  return (
    <div className="h-full relative">
      <div className="flex flex-row ml-3 ">
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

      <div className="px-3 ">
        <h2 className="text-xl font-bold text-blue-900 break-words">
          {topic.title}
        </h2>

        {topic && topic.image && (
          <img
            src={topic.image}
            alt="Topic"
            className="w-full max-h-[150px] h-auto object-cover rounded-lg my-3 cursor-pointer"
          />
        )}

        <div className={topic.image ? "line-clamp-2" : "line-clamp-[10]"}>
          {topic?.description}
        </div>

        <div className="absolute bottom-0 left-2">
          <LikeButtons
            likesCount={topic?.likesCount}
            dislikesCount={topic.dislikesCount}
            userId={user?.id ?? ""}
            targetId={topic.id}
            isTopic={true}
          />
        </div>
      </div>
    </div>
  );
};
