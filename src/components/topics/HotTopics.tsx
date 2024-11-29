import { useAllLikedTopics } from "../../api/topics";
import { Topics } from "./Topics";

export const HotTopics = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useAllLikedTopics();

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading topics</div>;
  return (
    <Topics
      pages={data.pages}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};
