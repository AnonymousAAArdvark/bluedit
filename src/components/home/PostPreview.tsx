import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/state-types";
import { BiUpvote, BiDownvote, VscComment, BsArrow90DegRight, FiTrash } from "react-icons/all";
import { ShareBtn, Title, CommentsBtn, Info, Desc, ActionsWrapper,
  ContentWrapper, PostPreviewWrapper, DownvoteContainer, UpvoteContainer,
  VoteWrapper, NumUpvotes, BottomVoteWrapper, DeleteBtn } from "../../styled-components/home/StyledPostPreview";
import MediaPreview from "../previews/MediaPreview";
import LinkPreview from "../previews/LinkPreview";
import { countReplies } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type PostPreviewTypes = {
  viewPostComments: any,
  username: string,
  timestamp: number,
  post: any,
  vote: string,
  castPostVote: any,
  id: string,
  url: string,
  deletePost: any,
};

const PostPreview =
  ({
     viewPostComments,
     username,
     timestamp,
     post,
     vote,
     castPostVote,
     id,
     url,
     deletePost,
  }: PostPreviewTypes) => {
  const [userVote, setUserVote] = useState(null);
  const authState = useSelector((state: RootState) => state.auth);
  const commentCount = post ? countReplies(post) : null;
  const history = useHistory();

  useEffect(() => {
    const checkForUserVote = () => {
      if(authState.user!.postVotes.hasOwnProperty(post.id)) {
        setUserVote(authState.user!.postVotes[post.id]);
      }
    };
    authState.user !== null && checkForUserVote();
  }, [userVote, setUserVote, post, authState.user]);

  const handleClick = (id: string, url: string) => {
    viewPostComments(id);
    history.push(`/comments/${id}/${url}`);
  };

  return (
    <PostPreviewWrapper onClick={() => handleClick(id, url)}>
      <VoteWrapper>
        <UpvoteContainer
          onClick={(e) =>
            castPostVote(e, "up", id, vote, setUserVote, "home")
          }
          userVote={userVote}
        >
          <BiUpvote />
        </UpvoteContainer>
        <NumUpvotes userVote={userVote}>{vote}</NumUpvotes>
        <DownvoteContainer
          onClick={(e) =>
            castPostVote(e, "down", id, vote, setUserVote, "home")
          }
          userVote={userVote}
        >
          <BiDownvote />
        </DownvoteContainer>
      </VoteWrapper>
      <ContentWrapper>
        <Info>
          Posted by {post.deleted ? "[deleted] " : `u/${username} `}
          {formatDistanceToNow(timestamp, {includeSeconds: true})} ago
        </Info>
        {post.deleted && (
          <>
            <Title>[deleted]</Title>
            <Desc>[deleted]</Desc>
          </>
        )}
        {post.postType === "POST" && !post.deleted && (
          <>
            <Title>{post.title}</Title>
            <Desc>{post.postText}</Desc>
          </>
        )}
        {post.postType === "LINK" && !post.deleted && (
          <>
            <Title link>{post.title}</Title>
            <LinkPreview url={post.postLink} preview={post.linkPreview}/>
          </>
        )}
        {post.postType === "MEDIA" && !post.deleted && (
          <>
            <Title>{post.title}</Title>
            <MediaPreview media={post.postMedia}/>
          </>
        )}
        <ActionsWrapper>
          <BottomVoteWrapper>
            <UpvoteContainer userVote={userVote}>
              <BiUpvote />
            </UpvoteContainer>
            <NumUpvotes userVote={userVote}>{post.vote}</NumUpvotes>
            <DownvoteContainer userVote={userVote}>
              <BiDownvote />
            </DownvoteContainer>
          </BottomVoteWrapper>
          <CommentsBtn>
            <VscComment />
            {""+commentCount + (commentCount === 1 ? " comment" : " comments")}
          </CommentsBtn>
          <ShareBtn>
            <BsArrow90DegRight />
            Share
          </ShareBtn>
          {authState.user && post.username === authState.user!.username && !post.deleted &&
          <DeleteBtn onClick={(e) => {
            e.stopPropagation();
            deletePost(post.id);
          }}>
            <FiTrash/>
            Delete
          </DeleteBtn>}
        </ActionsWrapper>
      </ContentWrapper>
    </PostPreviewWrapper>
  )
};

export default PostPreview;