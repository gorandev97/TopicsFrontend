import { useEffect, useRef, useState } from "react";
import { useReplyComment } from "../../api/comments";
import { getElapsedTime } from "../../helper/calculations";
import { getDecodedToken } from "../../helper/token";
import { Comment } from "../../interfaces/interfaces";
import { ActionButtons } from "../ActionButtons";
import { LikeButtons } from "../like/likeButtons";
import { Button } from "../Button";
import WriteIcon from "../../assets/icons/pencil.png";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { DropdownActionButtons } from "../DropdownActionButtons";
type CommentCardProps = {
  comment: Comment;
  setCommentId: (commentId: string) => void;
  setIsDeleteCommentModalOpen: (isDeletedCommentModalOpen: boolean) => void;
  setIsCommentModalOpen: (isCommentModalOpen: boolean) => void;
  setCommentContent: (commentContent: string) => void;
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

export const CommentCard = (props: CommentCardProps) => {
  const user = getDecodedToken();
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownReplyOpen, setIsDropdownReplyOpen] = useState(false);
  const {
    comment,
    setCommentId,
    setIsCommentModalOpen,
    setIsDeleteCommentModalOpen,
    setCommentContent,
    refetch,
  } = props;
  const { mutate: mutateReplyComment, isSuccess: isReplyCommentSuccess } =
    useReplyComment();

  const handleReplyComment = () => {
    if (replyComment.trim() !== "") {
      mutateReplyComment({
        content: replyComment,
        topicId: comment.topicId ?? "",
        commentId: comment.id,
      });
      setReplyComment("");
    }
  };
  useEffect(() => {
    refetch();
  }, [isReplyCommentSuccess, refetch]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      setIsDropdownReplyOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-blue-300 border-2 bg-blue-100 rounded-xl shadow-2xl w-full">
      <div className="flex flex-row ml-3 justify-between">
        <div className="flex flex-row">
          <img
            src={comment.author?.profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
          />
          <div className="mt-3 ml-3">
            <div>
              {comment.author?.firstName + " " + comment.author?.lastName}
            </div>
            <div>{getElapsedTime(comment?.createdAt)} </div>
          </div>
        </div>
        {user?.id === comment.postedBy && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                setIsDropdownReplyOpen(false);
              }}
              className="block md:hidden text-gray-700 mr-2 mt-8"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <div className="hidden md:flex">
              <ActionButtons
                onDelete={() => {
                  setCommentId(comment.id);
                  setIsDeleteCommentModalOpen(true);
                }}
                onEdit={() => {
                  setIsCommentModalOpen(true);
                  setCommentContent(comment.content);
                  setCommentId(comment.id);
                }}
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <DropdownActionButtons
                  onEdit={() => {
                    setIsCommentModalOpen(true);
                    setIsDropdownReplyOpen(false);
                    setIsDropdownOpen(false);
                    setCommentContent(comment.content);
                    setCommentId(comment.id);
                  }}
                  onDelete={() => {
                    setCommentId(comment.id);
                    setIsDropdownReplyOpen(false);
                    setIsDropdownOpen(false);
                    setIsDeleteCommentModalOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="ml-2">{comment.content}</div>
      <div className="flex flex-row gap-4 ml-2">
        <LikeButtons
          likesCount={comment?.likesCount}
          dislikesCount={comment.dislikesCount}
          userId={user?.id ?? ""}
          targetId={comment.id}
          isTopic={false}
        />
        <div
          className="ri-reply-line text-3xl mt-2 text-blue-900 cursor-pointer"
          onClick={() => {
            setIsReplyComment(!isReplyComment);
          }}
        ></div>
      </div>
      {isReplyComment && (
        <div className=" mt-2">
          <div className="flex items-center space-x-2 bg-blue-100   rounded-xl p-4">
            <input
              type="text"
              value={replyComment}
              onChange={(e) => setReplyComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-2 border rounded-xl"
            />
            <div className="hidden md:block">
              <Button title="Post" onClick={handleReplyComment} />
            </div>
            <div className="block md:hidden bg-blue-600 text-white text-lg rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 w-30 h-full">
              <img
                src={WriteIcon}
                alt="write"
                className=""
                onClick={handleReplyComment}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        {comment.replies.map((reply) => (
          <div
            className="mx-8 rounded-2xl bg-white mb-2 shadow-md"
            key={reply.id}
          >
            <div className="flex flex-row ml-3  justify-between">
              <div className="flex flex-row">
                <img
                  src={reply.author?.profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full bg-blue-500 my-3 cursor-pointer"
                />
                <div className="mt-3 ml-3">
                  <div>
                    {reply.author?.firstName + " " + reply.author?.lastName}
                  </div>
                  <div>{getElapsedTime(reply?.createdAt)} </div>
                </div>
              </div>
              {user?.id === reply.postedBy && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => {
                      setIsDropdownReplyOpen(!isDropdownReplyOpen);
                      setIsDropdownOpen(false);
                    }}
                    className="block md:hidden text-gray-700 mr-2 mt-8"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                  <div className="hidden md:flex">
                    <ActionButtons
                      onDelete={() => {
                        setCommentId(reply.id);
                        setIsDeleteCommentModalOpen(true);
                      }}
                      onEdit={() => {
                        setIsCommentModalOpen(true);
                        setCommentContent(reply.content);
                        setCommentId(reply.id);
                      }}
                    />
                  </div>
                  {isDropdownReplyOpen && (
                    <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <DropdownActionButtons
                        onEdit={() => {
                          setIsCommentModalOpen(true);
                          setIsDropdownReplyOpen(false);
                          setIsDropdownOpen(false);
                          setCommentContent(reply.content);
                          setCommentId(reply.id);
                        }}
                        onDelete={() => {
                          setCommentId(reply.id);
                          setIsDropdownReplyOpen(false);
                          setIsDropdownOpen(false);
                          setIsDeleteCommentModalOpen(true);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="ml-8"> {reply.content} </div>
            <div className="flex flex-row gap-4 ml-2">
              <LikeButtons
                likesCount={reply?.likesCount}
                dislikesCount={reply.dislikesCount}
                userId={user?.id ?? ""}
                targetId={reply.id}
                isTopic={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
