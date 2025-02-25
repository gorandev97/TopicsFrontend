import { useUserTopics } from "../../api/topics";
import Spinner from "../loader/Spinner";
import { Topics } from "./Topics";

export const UserTopics = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useUserTopics();

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>Error loading topics</div>;
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
