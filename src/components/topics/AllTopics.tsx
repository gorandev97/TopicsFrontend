import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTopics, useAllTopics } from "../../api/topics";
import { Topics } from "./Topics";

export const AllTopics = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useAllTopics();
  console.log(data, status);
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
