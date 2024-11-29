import { Topic } from "../../interfaces/interfaces";
import LikeImage from "../../assets/icons/like.png";
import CommentImage from "../../assets/icons/chat-bubble.png";
import { getElapsedTime, formatNumber } from "../../helper/calculations";
import { useNavigate } from "react-router-dom";
import { TopicContent } from "./TopicsContent";

type TopicsProps = {
  topic: Topic;
};

export const TopicsCard = (props: TopicsProps) => {
  const { topic } = props;
  const navigate = useNavigate();
  return (
    <div
      key={topic.id}
      className="w-[500px] h-[300px] bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg m-8 relative shadow-2xl cursor-pointer"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <TopicContent topic={topic} />
    </div>
  );
};
