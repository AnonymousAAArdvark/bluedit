import React, { useEffect } from "react";
import AboutProject from "../home/AboutProject";
import Resources from "../home/Resources";
import PostContent from "./PostContent";
import styled from "styled-components";

type CommentsProps = {
  postData: any,
  viewPostComments: any,
  setPostData: any,
  castPostVote: any,
  posts: any[],
  setPosts: any,
  id: string,
  deletePost: any,
};

const tempPost = {
  id: 1,
  title: "",
  username: "user",
  vote: 0,
  timestamp: Date.now(),
  postText: "",
  replies: [],
};

const Comments =
  ({
     postData,
     viewPostComments,
     setPostData,
     castPostVote,
     posts,
     setPosts,
     id,
     deletePost,
  } : CommentsProps) => {
  useEffect(() => {
    if(!postData) {
      viewPostComments(id);
    }
  }, [id, postData, viewPostComments]);

  return (
    <CommentsContainer>
      <PostContainer>
        <PostContent
          post={postData ? postData : tempPost}
          setPostData={setPostData}
          castPostVote={castPostVote}
          deletePost={deletePost}
        />
      </PostContainer>
      <SideBarContainer>
        <AboutProject />
        <Resources />
        <BtnContainer onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <TopBtn>Back to Top</TopBtn>
        </BtnContainer>
      </SideBarContainer>
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  padding: 2.5rem .7rem;
  @media (max-width: 640px) {
    padding: 0;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 46rem;
  margin: .7rem;
  @media (max-width: 960px) {
    max-width: none;
  }
  @media (max-width: 640px) {
    margin: 0;
  }
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19.5rem;
  min-width: 19.5rem;
  margin: .7rem;
  @media (max-width: 960px) {
    display: none;
  }
`;

const BtnContainer = styled.div`
  position: sticky;
  top: calc(100vh - 3rem);
`;

const TopBtn = styled.button`
  bottom: 10rem;
  margin: .3rem 0;
  padding: .5rem 1rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.alt};
  background-color: ${({ theme }) => theme.colors.alt};
  color: white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.altHover};
    border: 1px solid ${({ theme }) => theme.colors.altHover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.altActive};
    border: 1px solid ${({ theme }) => theme.colors.altActive};
  }
`;

export default Comments;