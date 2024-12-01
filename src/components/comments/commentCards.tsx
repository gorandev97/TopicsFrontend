import { getElapsedTime } from "../../helper/calculations";
import { getDecodedToken } from "../../helper/token";
import { Comment } from "../../interfaces/interfaces";
import { ActionButtons } from "../ActionButtons";
import { LikeButtons } from "../like/likeButtons";

type CommentCardProps = {
  comment: Comment;
  setCommentId: (commentId: string) => void;
  setIsDeleteCommentModalOpen: (isDeletedCommentModalOpen: boolean) => void;
  setIsCommentModalOpen: (isCommentModalOpen: boolean) => void;
  setCommentContent: (commentContent: string) => void;
};

export const CommentCard = (props: CommentCardProps) => {
  const user = getDecodedToken();
  const {
    comment,
    setCommentId,
    setIsCommentModalOpen,
    setIsDeleteCommentModalOpen,
    setCommentContent,
  } = props;
  return (
    <div className="border-blue-300 border-2 rounded-xl shadow-2xl w-full">
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
        )}
      </div>
      <div>{comment.content}</div>
      <div className="flex flex-row gap-4 ">
        <LikeButtons
          likesCount={comment?.likesCount}
          dislikesCount={comment.dislikesCount}
          userId={user?.id ?? ""}
          targetId={comment.id}
          isTopic={false}
        />
      </div>
    </div>
  );
};
