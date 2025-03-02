import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTopic, useGetTopic, useUpdateTopic } from "../api/topics";
import { useEffect, useState } from "react";
import { Comment, Topic } from "../interfaces/interfaces";
import DownArrow from "../assets/icons/arrow.png";
import WriteIcon from "../assets/icons/pencil.png";
import {
  useCreateComment,
  useDeleteComment,
  useLikedComments,
  useUpdateComment,
} from "../api/comments";
import { Button } from "../components/Button";
import { TopicModal } from "../components/modals/TopicModal";
import ConfirmationModal from "../components/modals/DeleteModal";
import { CommentModal } from "../components/modals/CommentModal";
import { CommentCard } from "../components/comments/commentCards";
import { TopicsFullCard } from "../components/topics/TopicsFullCard";
import Spinner from "../components/loader/Spinner";

export const TopicPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState<Topic>();
  const [newComment, setNewComment] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState<boolean>(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const {
    data,
    isSuccess,
    isLoading,
    refetch: refetchTopic,
  } = useGetTopic(id ?? "");

  const {
    data: likedCommentsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useLikedComments(id ?? "");

  const { mutate: mutateCreateComment, isSuccess: isCreateCommentSuccess } =
    useCreateComment();

  const { mutate: mutateDeletetTopic, isSuccess: isDeleteTopicSuccess } =
    useDeleteTopic();
  const { mutate: mutateCommentUpdate, isSuccess: isCommentUpdateSuccess } =
    useUpdateComment();
  const { mutate: mutateDeleteComment, isSuccess: isDeleteComment } =
    useDeleteComment();
  const { mutate } = useUpdateTopic();

  const handleEditTopic = (
    title: string,
    content: string,
    category: string,
    file?: File
  ) => {
    if (topic) {
      mutate(
        {
          topicId: topic.id,
          title,
          content,
          category,
          file,
        },
        {
          onSuccess: (data) => {
            setTopic({ ...topic, ...data });
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  const handleDeleteTopic = () => {
    mutateDeletetTopic(topic?.id ?? "");
  };
  const navigate = useNavigate();

  const handleEditComment = (content: string) => {
    mutateCommentUpdate({ commentId: commentId, content });
  };

  const handleDeleteComment = () => {
    mutateDeleteComment(commentId);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      mutateCreateComment({ content: newComment, topicId: id ?? "" });
      setNewComment("");
    }
  };

  useEffect(() => {
    if (isCommentUpdateSuccess || isCreateCommentSuccess || isDeleteComment) {
      setIsDeleteCommentModalOpen(false);
      refetch();
      refetchTopic();
    }
  }, [
    isCommentUpdateSuccess,
    isCreateCommentSuccess,
    isDeleteComment,
    refetch,
    refetchTopic,
  ]);

  useEffect(() => {
    if (isDeleteTopicSuccess) {
      setIsDeleteModalOpen(false);
      navigate("/dashboard");
    }
  }, [isDeleteTopicSuccess, navigate]);

  useEffect(() => {
    if (isSuccess) setTopic(data);
  }, [data, isSuccess]);

  return (
    <div className="relative flex flex-col justfy-center items-center">
      {!isLoading && topic ? (
        <div className="px-10 mt-10 w-full">
          <div className="border border-blue-400 rounded-xl shadow-2xl bg-gradient-to-tr from-blue-200 via-white to-light-blue">
            <TopicsFullCard
              topic={topic}
              setIsModalOpen={setIsModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
            <div className="w-full self-center flex">
              {hasNextPage && (
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
              )}
            </div>
          </div>
          <div className=" mt-2">
            <div className="flex items-center space-x-2 bg-blue-100 border border-blue-300  shadow-xl rounded-xl p-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow p-2 border rounded-xl"
              />
              <div className="hidden md:block">
                <Button title="Post" onClick={handleAddComment} />
              </div>
              <div className="block md:hidden bg-blue-600 text-white text-lg rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 w-30 h-full">
                <img
                  src={WriteIcon}
                  alt="write"
                  className=""
                  onClick={handleAddComment}
                />
              </div>
            </div>
          </div>
          <div className="mb-10">
            {likedCommentsData?.pages.map((page, index) => (
              <div
                key={index}
                className="flex flex-row flex-wrap justify-center gap-8 mt-10 items-center "
              >
                {page.data.map((comment: Comment) => (
                  <CommentCard
                    comment={comment}
                    setCommentId={setCommentId}
                    setIsDeleteCommentModalOpen={setIsDeleteCommentModalOpen}
                    setIsCommentModalOpen={setIsCommentModalOpen}
                    setCommentContent={setCommentContent}
                    refetch={refetch}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      <TopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEditTopic}
        initialTitle={topic?.title}
        initialContent={topic?.description}
        initialCategory={topic?.category}
        initialPicture={topic?.image ? topic.image.split("/").pop() : ""}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTopic}
        message={`Are you sure you want to delete ${topic?.title}`}
      />
      <ConfirmationModal
        isOpen={isDeleteCommentModalOpen}
        onClose={() => setIsDeleteCommentModalOpen(false)}
        onConfirm={handleDeleteComment}
        message={`Are you sure you want to this comment`}
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSave={handleEditComment}
        initialContent={commentContent}
      />
    </div>
  );
};
