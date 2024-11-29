import {
  FetchNextPageOptions,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchTopics } from "../../api/topics";
import { TopicsCard } from "./TopicsCard";
import { Topic } from "../../interfaces/interfaces";
import { Button } from "../Button";

type TopicsProps = {
  pages: {
    data: any;
    nextPage: number | null;
  }[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => void;
};

export const Topics = (props: TopicsProps) => {
  const { pages, hasNextPage, isFetchingNextPage, fetchNextPage } = props;
  return (
    <div key={"topics" + pages.length}>
      {pages.map((page, index) => (
        <div key={index} className="flex flex-row flex-wrap justify-between">
          {page.data.map((topic: Topic) => (
            <TopicsCard topic={topic} />
          ))}
        </div>
      ))}
      <div className="self-center w-full flex justify-center items-center pb-10">
        {hasNextPage ? (
          <Button
            title={isFetchingNextPage ? "Loading more..." : "Load More"}
            onClick={() => fetchNextPage()}
            isDisabled={isFetchingNextPage}
          />
        ) : (
          <div>No more topics</div>
        )}
      </div>
    </div>
  );
};
