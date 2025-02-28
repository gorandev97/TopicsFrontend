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
      className="max-w-[500px] w-full h-auto bg-white border border-blue-500 rounded-lg m-8 relative shadow-2xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out transform pb-4"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <TopicContent topic={topic} />
    </div>
  );
};
