import {
  FetchNextPageOptions,
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { TopicsCard } from "./TopicsCard";
import { Topic, TopicCategory } from "../../interfaces/interfaces";
import { Button } from "../Button";
import { EmptyState } from "../placeholder/EmptyState";
import { TopicModal } from "../modals/TopicModal";
import { useCallback, useEffect, useState } from "react";
import { useCreateTopic } from "../../api/topics";
import { DropDown } from "./CategoryDropdown";

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
  setSearchTerm: (input: string) => void;
  setCategory: (input: string) => void;
  search: string;
  selectedCategory: string;
};

export const Topics = (props: TopicsProps) => {
  const {
    pages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    setSearchTerm,
    setCategory,
    selectedCategory,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { mutate, isSuccess } = useCreateTopic();
  const handleEditTopic = (
    title: string,
    content: string,
    category: string,
    file?: File
  ) => {
    mutate({ title, description: content, category, file });
  };
  useEffect(() => {
    refetch();
  }, [isSuccess, refetch]);

  const handleSetCategory = useCallback(
    (input: string) => {
      setCategory(input);
    },
    [setCategory]
  );
  return (
    <>
      <div className="self-center w-full flex md:justify-between md:flex-row flex-col justify-center items-center pt-5 md:pr-10">
        <div className="flex flex-col md:flex-row gap-5 ml-0 md:ml-16 mb-4 md:mb-0">
          <div className="w-60 bg-white border border-blue-700 rounded-3xl py-2 px-4 flex justify-between items-center">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <i
              className="ri-search-line cursor-pointer"
              onClick={() => setSearchTerm(searchInput)}
            ></i>
          </div>
          <DropDown
            className="max-w-80 w-auto bg-white border border-blue-700 rounded-3xl py-2 px-4 flex justify-between items-center relative cursor-pointer"
            selectedItem={selectedCategory}
            setSelectedItem={handleSetCategory}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            items={Object.keys(TopicCategory)}
            isCategory={true}
          />
        </div>
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
