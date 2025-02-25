import { useAllLikedTopics } from "../../api/topics";
import ErrorMessage from "../loader/Error";
import Spinner from "../loader/Spinner";
import { Topics } from "./Topics";

export const HotTopics = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useAllLikedTopics();

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorMessage message="Error loading topics" />;
  return (
    <Topics
      pages={data.pages}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  );
};
