import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTopic, useGetTopic } from "../api/topics";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TopicContent } from "../components/topics/TopicsContent";
import { useEffect, useState } from "react";
import { getElapsedTime, formatNumber } from "../helper/calculations";
import { Comment, Topic } from "../interfaces/interfaces";
import LikeImage from "../assets/icons/like.png";
import DisLikeImage from "../assets/icons/dislike.png";
import CommentImage from "../assets/icons/chat-bubble.png";
import DownArrow from "../assets/icons/arrow.png";
import { createComment, useLikedComments } from "../api/comments";
import { Button } from "../components/Button";

export const TopicPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<Topic>();
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>();
  const { data, isSuccess, isError, isLoading } = useGetTopic(id ?? "");
  const {
    data: likedCommentsData,
    isLoading: isLoadingComments,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useLikedComments(id ?? "");
  useEffect(() => {
    if (isSuccess) setTopic(data);
  }, [data]);
  useEffect(() => {
    if (isLoadingComments) setComments(likedCommentsData);
  }, [likedCommentsData]);
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      console.log("New comment:", newComment);
      mutation.mutate({ content: newComment, topicId: id ?? "" });
      setNewComment("");
    }
  };
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      console.log(data, "COMMENT DATA");
      if (data) refetch();
    },
    onError: (error) => {
      console.error("Posting failed:", error);
    },
  });
  return (
    <div className="relative flex flex-col h-[calc(100vh-100px)] justfy-center items-center">
      {!isLoading && topic ? (
        <div className="px-10 mt-10">
          <div className="bg-blue-300 rounded-xl shadow-2xl">
            <div className="flex flex-row ml-3">
              <img
                src={topic.author?.profileImage}
                alt="Profile"
                className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
              />
              <div className="mt-3 ml-3">
                <div>
                  {topic.author?.firstName + " " + topic.author?.lastName}
                </div>
                <div>{getElapsedTime(topic?.createdAt)} </div>
              </div>
            </div>
            <div className="px-3">
              <h2 className="text-xl font-bold text-blue-900">{topic.title}</h2>
              <div className="line-clamp-5">{topic?.description}</div>
              <div className="flex flex-row gap-4 ">
                <img src={LikeImage} alt="Profile" className="w-8 h-8 my-3" />
                <div className="text-xl self-center">
                  {formatNumber(topic?.likesCount)}
                </div>
                <img
                  src={DisLikeImage}
                  alt="Profile"
                  className="w-8 h-8 my-3"
                />
                <div className="text-xl self-center">
                  {formatNumber(topic?.dislikesCount)}
                </div>
                <img
                  src={CommentImage}
                  alt="Profile"
                  className="w-8 h-8 my-3"
                />
                <div className="text-xl self-center">
                  {formatNumber(topic?.comments?.length)}
                </div>
              </div>
            </div>
            <div className="w-full self-center flex">
              {hasNextPage ? (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="flex flex-row font-bold ml-2"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : "Load More Comments"}
                  <img
                    src={DownArrow}
                    alt="Profile"
                    className="w-4 h-4 mt-1 ml-2"
                  />
                </button>
              ) : (
                <div>No more comments</div>
              )}
            </div>
          </div>
          <div className="overflow-y-auto h-[500px]">
            {likedCommentsData?.pages.map((page, index) => (
              <div
                key={index}
                className="flex flex-row flex-wrap justify-center gap-8 mt-10 items-center "
              >
                {page.data.map((comment: Comment) => (
                  <div className="border-blue-300 border-2 rounded-xl shadow-2xl w-full">
                    <div className="flex flex-row ml-3">
                      {/* Prebaciti u odvojenu komponentu*/}
                      <img
                        src={comment.author?.profileImage}
                        alt="Profile"
                        className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
                      />
                      <div className="mt-3 ml-3">
                        <div>
                          {comment.author?.firstName +
                            " " +
                            comment.author?.lastName}
                        </div>
                        <div>{getElapsedTime(comment?.createdAt)} </div>
                      </div>
                    </div>
                    <div>{comment.content}</div>
                    <div className="flex flex-row gap-4 ">
                      <img
                        src={LikeImage}
                        alt="Profile"
                        className="w-8 h-8 my-3"
                      />
                      <div className="text-xl self-center">
                        {formatNumber(comment?.likesCount)}
                      </div>
                      <img
                        src={DisLikeImage}
                        alt="Profile"
                        className="w-8 h-8 my-3"
                      />
                      <div className="text-xl self-center">
                        {formatNumber(comment?.dislikesCount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}

      <div className="absolute bottom-4 left-0 right-0 px-10 ">
        <div className="flex items-center space-x-2 bg-white shadow-xl rounded-xl p-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-2 border rounded-xl"
          />
          <Button title="Post" onClick={handleAddComment} />
        </div>
      </div>
    </div>
  );
};
