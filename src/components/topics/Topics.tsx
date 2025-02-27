import {
  FetchNextPageOptions,
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { TopicsCard } from "./TopicsCard";
import { Topic } from "../../interfaces/interfaces";
import { Button } from "../Button";
import { EmptyState } from "../placeholder/EmptyState";
import { TopicModal } from "../modals/TopicModal";
import { useEffect, useState } from "react";
import { useCreateTopic } from "../../api/topics";

type TopicsProps = {
  pages: {
    data: any;
    nextPage: number | null;
  }[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      InfiniteData<
        {
          data: any;
          nextPage: number | null;
        },
        unknown
      >,
      Error
    >
  >;
};

export const Topics = (props: TopicsProps) => {
  const { pages, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mutate, isSuccess } = useCreateTopic();
  const handleEditTopic = (title: string, content: string) => {
    mutate({ title, description: content });
  };
  useEffect(() => {
    refetch();
  }, [isSuccess, refetch]);
  return (
    <>
      <div className="self-center w-full flex md:justify-end justify-center items-center pt-5 md:pr-10">
        <Button
          title={"Create a new topic"}
          onClick={() => setIsModalOpen(true)}
        ></Button>
      </div>
      <div key={"topics" + pages.length}>
        {pages[0].data.length === 0 && (
          <EmptyState title="There are no topics here" />
        )}
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex flex-row flex-wrap justify-between items-center"
          >
            {page.data.map((topic: Topic) => (
              <div className="flex-grow flex justify-center">
                <TopicsCard topic={topic} />
              </div>
            ))}
          </div>
        ))}
        <div className="self-center w-full flex justify-center items-center pb-10">
          {hasNextPage && (
            <Button
              title={isFetchingNextPage ? "Loading more..." : "Load More"}
              onClick={() => fetchNextPage()}
              isDisabled={isFetchingNextPage}
            />
          )}
        </div>
      </div>
      <TopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEditTopic}
      />
    </>
  );
};
