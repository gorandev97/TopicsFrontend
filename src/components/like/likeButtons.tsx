import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleLikeDislikeAPI } from "../../api/like";
import { formatNumber } from "../../helper/calculations";
import LikeImage from "../../assets/icons/like.png";
import DisLikeImage from "../../assets/icons/dislike.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LikeButtonsProps {
  likesCount: number;
  dislikesCount: number;
  userId: string; // User ID will be passed to the component
  targetId: string; // Topic/Comment ID will be passed to the component
  isTopic: boolean; // Whether it's a topic or comment
}

export const LikeButtons: React.FC<LikeButtonsProps> = ({
  likesCount,
  dislikesCount,
  userId,
  targetId,
  isTopic,
}) => {
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikesCount);

  const { mutate } = useMutation({
    mutationFn: toggleLikeDislikeAPI,
    onSuccess: (data) => {
      if (isTopic && data.topic) {
        setLocalLikesCount(data.topic.likesCount);
        setLocalDislikesCount(data.topic.dislikesCount);
      } else if (data.comment) {
        setLocalLikesCount(data.comment.likesCount);
        setLocalDislikesCount(data.comment.dislikesCount);
      }
    },
    onError: () => {
      toast.error("You already performed that action", {
        position: "top-right",
      });
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate({
      userId,
      targetId,
      isTopic,
      isLike: true, // User is liking the topic/comment
    });
  };

  const handleDislikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate({
      userId,
      targetId,
      isTopic,
      isLike: false, // User is disliking the topic/comment
    });
  };

  return (
    <div className="flex flex-row gap-4">
      <button onClick={handleLikeClick}>
        <img src={LikeImage} alt="Like" className="w-8 h-8 my-3" />
      </button>
      <div className="text-xl self-center">{formatNumber(localLikesCount)}</div>

      <button onClick={handleDislikeClick}>
        <img src={DisLikeImage} alt="Dislike" className="w-8 h-8 my-3" />
      </button>
      <div className="text-xl self-center">
        {formatNumber(localDislikesCount)}
      </div>
    </div>
  );
};
