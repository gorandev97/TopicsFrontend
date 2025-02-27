import { useEffect, useState } from "react";
import { useAllTopics } from "../../api/topics";
import Spinner from "../loader/Spinner";
import ErrorMessage from "../loader/Error";
import { Topics } from "./Topics";

export const AllTopics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useAllTopics(searchTerm, category);

  useEffect(() => {
    refetch();
  }, [searchTerm, category, refetch]);

  if (status === "pending") return <Spinner />;
  if (status === "error")
    return <ErrorMessage message="Error loading topics" />;

  return (
    <Topics
      pages={data.pages}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
      setSearchTerm={setSearchTerm}
      setCategory={setCategory}
      search={searchTerm}
      selectedCategory={category}
    />
  );
};
