import React, { useEffect, useState } from "react";
import {
  useToggleLikeMutation,
  useGetLikesCountQuery,
} from "../Redux/contentApiSlice";
import { useGetUserProfileQuery } from "../Redux/UserApiSlice";

import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const LikeButton = ({ contentId, size = "lg" }) => {
  const { data: user, isSuccess: userLoaded } = useGetUserProfileQuery();
  const { data, isSuccess: likesLoaded , refetch} = useGetLikesCountQuery(contentId);
  
  const [toggleLike] = useToggleLikeMutation();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  // console.log("LikeButton data:", data);
  // Sync state after both user + likes are loaded
  useEffect(() => {
    if (data) {
      setLikes(data.likes);
      setLiked(data.userLiked);
    }
  }, [ data,user]);

  const sizes = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" };

  const handleLike = async () => {
      // console.log("Like data:", data);
    if (!user) {
      toast.error("Please login to like this content.");
      return;
    }

    // Optimistic update
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await toggleLike(contentId);
    } catch (err) {
      // revert if fails
      if (data) {
        setLikes(data.likes);
        setLiked(data.userLiked);
      }
      toast.error("Something went wrong.");
    }
  };

  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none"
      onClick={handleLike}
      whileTap={{ scale: 0.85 }}
    >
      <motion.div
        animate={{ scale: liked ? 1.2 : 1 }}
        transition={{ duration: 0.25 }}
        className={`${sizes[size]} ${
          liked ? "text-blue-600 drop-shadow-lg" : "text-gray-600"
        } hover:scale-110 transition-transform`}
      >
        {liked ? <FaThumbsUp /> : <FiThumbsUp />}
      </motion.div>

      <span className="text-lg font-semibold text-gray-700">{likes}</span>
    </motion.div>
  );
};

export default LikeButton;
