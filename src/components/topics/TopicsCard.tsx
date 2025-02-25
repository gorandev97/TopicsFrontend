import { Topic } from "../../interfaces/interfaces";
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
      className="w-[500px] h-[300px] bg-white border border-blue-500 rounded-lg m-8 relative shadow-2xl cursor-pointer"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <TopicContent topic={topic} />
    </div>
  );
};
