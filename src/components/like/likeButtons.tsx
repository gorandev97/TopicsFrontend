import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleLikeDislikeAPI } from "../../api/like";
import { formatNumber } from "../../helper/calculations";
import LikeImage from "../../assets/icons/like.png";
import DisLikeImage from "../../assets/icons/dislike.png";

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
      console.log("Like/dislike action was successful", data);
    },
    onError: (error) => {
      console.error("Error performing like/dislike action", error);
    },
    onMutate: (variables) => {
      // Optimistic update (update UI instantly)
      if (variables.isLike) {
        setLocalLikesCount((prev) => prev + 1);
        setLocalDislikesCount((prev) => prev - 1);
      } else {
        setLocalLikesCount((prev) => prev - 1);
        setLocalDislikesCount((prev) => prev + 1);
      }
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
