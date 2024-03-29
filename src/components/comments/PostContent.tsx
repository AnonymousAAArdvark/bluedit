import React, { useState, useRef, useEffect } from "react";
import { RootState } from "../../types/state-types";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Comment, countReplies } from "../../utils/utils";
import firebase from "../../firebase";
import "firebase/firestore";
import { BiUpvote, BiDownvote, VscComment, BsArrow90DegRight, FaCaretDown, IoMdChatbubbles, FiTrash } from "react-icons/all";
import { Title, Info, ContentWrapper, ActionsWrapper, CommentsWrapper, SelectSort, CommentAs, CommentBtn,
         VoteWrapper, NumUpvotes, UpvoteContainer, PostPreviewWrapper, DownvoteContainer, CommentsSortContainer,
         Desc, CommentsBtn, ShareBtn, SignUpBtn, LoginBtn, CommentTextarea, CommentSection, CommentPadding,
         CreateCommentWrapper, InputCommentContainer, LoginPrompt, PromptTitle, SortOptionsDropDown, CurrSortOption,
         SortOption, PostContentWrapper, NoCommentsDesc, NoCommentsTitle, NoComments, DeleteBtn }
  from "../../styled-components/comments/StyledPostContent";
import MediaPreview from "../previews/MediaPreview";
import LinkPreview from "../previews/LinkPreview";
import useOutSideAlerter from "../../utils/useOutSideAlerter";
import DisplayComments from "./DisplayComments";
import { formatDistanceToNow } from "date-fns";

type PostContentProps = {
  post: any,
  setPostData: any,
  castPostVote: any,
  deletePost: any,
};

const PostContent =
  ({
     post,
     setPostData,
     castPostVote,
     deletePost,
  }: PostContentProps) => {
  const [commentInput, setCommentInput] = useState("");
  const [sortOptionsVisible, setSortOptionsVisible] = useState(false);
  const [commentSortOption, setCommentSortOption] = useState("top");
  const [createCommentFocus, setCreateCommentFocus] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const commentCount = post ? countReplies(post) : null;
  const authState = useSelector((state: RootState) => state.auth);
  const commentFocusRef = useRef(null);
  const sortOptionsDropDownRef = useRef(null);
  const sortOptionsDropDownRef2 = useRef(null);
  useOutSideAlerter(sortOptionsDropDownRef, setSortOptionsVisible, sortOptionsDropDownRef2);
  useOutSideAlerter(commentFocusRef, setCreateCommentFocus);

  useEffect(() => {
    const checkForUserVote = () => {
      if(authState.user!.postVotes.hasOwnProperty(post.id)) {
        setUserVote(authState.user!.postVotes[post.id]);
      }
    };
    authState.user !== null && checkForUserVote();
  }, [userVote, setUserVote, post, authState.user]);

  const submitTopLevelComment = async () => {
    try {
      if (commentInput === "") return;
      let newComment = Comment(
        {input: commentInput, username: authState.user!.username}
      );
      setCommentInput("");
      await firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .update({
          replies: [...post.replies, newComment],
        })
      setPostData({
        ...post,
        replies: [...post.replies, newComment],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const commentSort: any = {
    top: (a: any, b: any) => (a.points <= b.points ? 1 : -1),
    new: (a: any, b: any) => (a.timestamp <= b.timestamp ? 1 : -1),
    old: (a: any, b: any) => (a.timestamp >= b.timestamp ? 1 : -1),
  };

  return (
    <PostContentWrapper>
      <PostPreviewWrapper>
        <VoteWrapper>
          <UpvoteContainer
            onClick={(e) =>
              castPostVote(e, "up", post.id, post.vote, setUserVote, "comments")
            }
            userVote={userVote}
          >
            <BiUpvote />
          </UpvoteContainer>
          <NumUpvotes userVote={userVote}>{post.vote}</NumUpvotes>
          <DownvoteContainer
            onClick={(e) =>
              castPostVote(e, "down", post.id, post.vote, setUserVote, "comments")
            }
            userVote={userVote}
          >
            <BiDownvote />
          </DownvoteContainer>
        </VoteWrapper>
        <ContentWrapper>
          <Info>
            Posted by {post.deleted ? "[deleted] " : `u/${post.username} `}
            {formatDistanceToNow(post.timestamp, {includeSeconds: true})} ago
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
              <LinkPreview url={post.postLink} preview={post.linkPreview} />
            </>
          )}
          {post.postType === "MEDIA" && !post.deleted && (
            <>
              <Title>{post.title}</Title>
              <MediaPreview media={post.postMedia}/>
            </>
          )}
          <ActionsWrapper>
            <CommentsBtn>
              <VscComment />
              {""+commentCount + (commentCount === 1 ? " comment" : " comments")}
            </CommentsBtn>
            <ShareBtn>
              <BsArrow90DegRight />
              Share
            </ShareBtn>
            {authState.user && post.username === authState.user!.username && !post.deleted &&
            <DeleteBtn onClick={() => deletePost(post.id)}>
              <FiTrash/>
              Delete
            </DeleteBtn>}
          </ActionsWrapper>
        </ContentWrapper>
      </PostPreviewWrapper>
      <CommentsWrapper>
        {authState.user ? (
          <CreateCommentWrapper>
            <CommentAs>Comment as {authState.user.username}</CommentAs>
            <InputCommentContainer
              ref={commentFocusRef}
              focus={createCommentFocus}
              onClick={() => setCreateCommentFocus(true)}
            >
              <CommentTextarea
                placeholder="What are your thoughts?"
                value={commentInput}
                maxLength={1000}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <CommentBtn
                type="button"
                onClick={submitTopLevelComment}
                disabled={commentInput === ""}
              >Comment</CommentBtn>
            </InputCommentContainer>
          </CreateCommentWrapper>
        ) : (
          <LoginPrompt>
            <PromptTitle>Log in or sign up to leave a comment</PromptTitle>
            <div style={{ display: "flex" }}>
              <LoginBtn>Log In</LoginBtn>
              <SignUpBtn>Sign Up</SignUpBtn>
            </div>
          </LoginPrompt>
        )}
        <CommentsSortContainer>
          <h5>SORT BY</h5>
          <SelectSort onClick={() => setSortOptionsVisible(!sortOptionsVisible)} ref={sortOptionsDropDownRef}>
            <CurrSortOption>{commentSortOption}</CurrSortOption>
            <FaCaretDown />
            {sortOptionsVisible && (
              <SortOptionsDropDown ref={sortOptionsDropDownRef2}>
                <SortOption
                  selected={commentSortOption === "top"}
                  onClick={() => setCommentSortOption("top")}
                >Top</SortOption>
                <SortOption
                  selected={commentSortOption === "new"}
                  onClick={() => setCommentSortOption("new")}
                >New</SortOption>
                <SortOption
                  selected={commentSortOption === "old"}
                  onClick={() => setCommentSortOption("old")}
                >Old</SortOption>
              </SortOptionsDropDown>
            )}
          </SelectSort>
        </CommentsSortContainer>
        {post.replies.length > 0 ? (
          <CommentSection>
            {{ ...post }.replies
              .sort(commentSort[commentSortOption])
              .map((comment: any) => {
                return (
                  <div key={uuidv4()}>
                    <CommentPadding />
                    <DisplayComments
                      comment={comment}
                      sortMethod={commentSort[commentSortOption]}
                      post={post}
                      setPostData={setPostData}
                    />
                  </div>
                );
              })
            }
          </CommentSection>
        ) : (
          <NoComments>
            <IoMdChatbubbles />
            <NoCommentsTitle>No Comments Yet</NoCommentsTitle>
            <NoCommentsDesc>Be the first to share what you think!</NoCommentsDesc>
          </NoComments>
        )}
      </CommentsWrapper>
    </PostContentWrapper>
  );
};

export default PostContent;
