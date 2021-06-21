import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiLink, IoImageOutline } from "react-icons/all";
import profilePic from "../../assets/profile.svg";
import { FeedCreatePostContainer, Profile, Input, LinkBtn, MediaBtn } from "../../styled-components/home/StyledFeedCreatePost";

const FeedCreatePost = () => {
  const dispatch = useDispatch();

  return (
    <FeedCreatePostContainer>
      <Link to="/submit" style={{ display: "flex" }}>
        <Profile src={profilePic} />
      </Link>
      <Link to="/submit" style={{ display: "flex", width: "100%" }}>
        <Input
          type="text"
          placeholder="Create Post"
          onClick={() => dispatch({ type: "POST" })}
        />
      </Link>
      <Link to="/submit" style={{ display: "flex" }}>
        <MediaBtn onClick={() => dispatch({ type: "MEDIA" })}><IoImageOutline /></MediaBtn>
      </Link>
      <Link to="/submit" style={{ display: "flex" }}>
        <LinkBtn onClick={() => dispatch({ type: "LINK" })}><FiLink /></LinkBtn>
      </Link>
    </FeedCreatePostContainer>
  )
}

export default FeedCreatePost;