import React, { useState, useRef, useEffect } from "react";
import { BiUpvote, BiDownvote, VscComment, CgArrowsExpandLeft, FiTrash } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import useOutSideAlerter from "../../utils/useOutSideAlerter";
import avatar from "../../assets/avatar.webp";
import locale from 'date-fns/locale/en-US'
import { formatDistanceToNowStrict } from "date-fns";
import formatDistance from "../../utils/formatDistance";
import { RootState } from "../../types/state-types";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { ActionBtn, DownvoteContainer, UpvoteContainer, NumUpvotes, BottomVoteWrapper,
         ActionsWrapper, ContentWrapper, ContentContainer, InfoContainer, DisplayCommentsWrapper,
         Profile, Reply, ThreadLineWrapper, ThreadLine, UserName, TimePosted, InputCommentContainer,
         CommentTextarea, CommentBtn, CancelBtn, BtnsWrapper, InputCommentWrapper }
  from "../../styled-components/comments/StyledDisplayComments";
import { Comment, insertReply, setCommentAsDeleted, withNewCommentVote } from "../../utils/utils";

type DisplayCommentsProps = {
  comment: {
    input: string,
    deleted: boolean,
    depth: number,
    id: string,
    points: number,
    replies: any[],
    timestamp: number,
    username: string,
  }
  sortMethod: any,
  post: {
    id: string,
  },
  setPostData: any,
}

const DisplayComments = ({ comment, sortMethod, post, setPostData }: DisplayCommentsProps) => {
  const [replyInput, setReplyInput] = useState("");
  const [replyContainerOpen, setReplyContainerOpen] = useState(false);
  const [createReplyFocus, setCreateReplyFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const [userVote, setUserVote] = useState<string | null>(null);
  const createReplyFocusRef = useRef(null);
  useOutSideAlerter(createReplyFocusRef, setCreateReplyFocus);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForUserVote = () => {
      if(authState.user!.commentVotes.hasOwnProperty(comment.id)) {
        setUserVote(authState.user!.commentVotes[comment.id]);
      }
    };
    authState.user !== null && checkForUserVote();
  }, [userVote, setUserVote, comment.id, authState.user]);

  const submitReply = async () => {
    try {
      if (replyInput === "") return;
      const depth = comment.depth + 1;
      const commentInput = replyInput;
      const username = authState.user!.username;
      const newComment = Comment({input: commentInput, username, depth});
      const withNewReply = insertReply(post, comment.id, newComment);

      await firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .update({replies: withNewReply})

      setPostData({...post, replies: withNewReply})

      setReplyInput("");
      setReplyContainerOpen(false);
    }
    catch(error) {
      console.error(error);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        'Are you sure you want to delete this comment? There is no undo.'
      );

      if (confirm) {
        const withDeleted = setCommentAsDeleted(post, comment.id);

        await firebase
          .firestore()
          .collection('posts')
          .doc(post.id)
          .update({replies: withDeleted});

        setPostData({...post, replies: withDeleted});
      }
    }
    catch(error) {
      console.error(error);
    }
  };

  const castCommentVote = (e: any, direction: string) => {
    e.stopPropagation();

    if(authState.user) {
      let newVoteCount;

      if(authState.user.commentVotes[comment.id] === direction) {
        direction === "up"
          ? (newVoteCount = comment.points - 1)
          : (newVoteCount = comment.points + 1);
        direction = "";
      }
      else {
        if(authState.user.commentVotes[comment.id] === "up") {
          newVoteCount = comment.points - 2;
        }
        else if(authState.user.commentVotes[comment.id] === "down") {
          newVoteCount = comment.points + 2;
        }
        else {
          direction === "up"
            ? (newVoteCount = comment.points + 1)
            : (newVoteCount = comment.points - 1);
        }
      }
      const updated = withNewCommentVote(
        { ...post },
        comment.id,
        newVoteCount,
      );
      setPostData(updated);

      const newUserVotes = { ...authState.user.commentVotes };
      newUserVotes[comment.id] = direction;
      dispatch({ type: "USER_UPDATED", payload: { ...authState.user, commentVotes: newUserVotes }});
      setUserVote(direction);

      firebase
        .firestore()
        .collection("posts")
        .doc(post.id)
        .update({ replies: updated.replies })
        .catch((error) => console.error(error));

      firebase
        .firestore()
        .collection("users")
        .doc(authState.user.uid)
        .update({ commentVotes: newUserVotes })
        .catch((error) => console.error(error));
    }
    else {
      dispatch({ type: "SIGNUP" });
    }
  };

  return (
    <DisplayCommentsWrapper>
      <InfoContainer>
        {!visible && <CgArrowsExpandLeft  onClick={() => setVisible(true)}/>}
        <Profile src={avatar} />
        <UserName>{comment.deleted ? '[deleted]' : comment.username}</UserName>
        <TimePosted> · {formatDistanceToNowStrict(
          comment.timestamp, { locale: { ...locale, formatDistance } }
        )}</TimePosted>
      </InfoContainer>
      <ContentContainer visible={visible}>
        <ThreadLineWrapper onClick={() => setVisible(false)}>
          <ThreadLine/>
        </ThreadLineWrapper>
        <ContentWrapper>
          <Reply>{comment.deleted ? '[deleted]' : comment.input}</Reply>
          <ActionsWrapper>
            <BottomVoteWrapper>
              <UpvoteContainer
                onClick={(e) => castCommentVote(e, "up")}
                userVote={userVote}
              >
                <BiUpvote/>
              </UpvoteContainer>
              <NumUpvotes
                userVote={userVote}
              >
                {comment.points}</NumUpvotes>
              <DownvoteContainer
                onClick={(e) => castCommentVote(e, "down")}
                userVote={userVote}
              >
                <BiDownvote/>
              </DownvoteContainer>
            </BottomVoteWrapper>
            {comment.depth < 10 &&
            <ActionBtn
              onClick={() =>
                !authState.user ? dispatch({ type: "SIGNUP" }) : setReplyContainerOpen(!replyContainerOpen)
              }
            >
              <VscComment/>
              Reply
            </ActionBtn>}
            {authState.user && comment.username === authState.user!.username && !comment.deleted &&
            <ActionBtn onClick={() => deleteComment()}>
              <FiTrash />
              Delete
            </ActionBtn>}
          </ActionsWrapper>
          {replyContainerOpen &&
            <InputCommentWrapper>
              <ThreadLineWrapper disabled>
                <ThreadLine/>
              </ThreadLineWrapper>
              <InputCommentContainer
                ref={createReplyFocusRef}
                focus={createReplyFocus}
                onClick={() => setCreateReplyFocus(true)}
              >
                <CommentTextarea
                  placeholder="What are your thoughts?"
                  value={replyInput}
                  maxLength={1000}
                  onChange={(e) => setReplyInput(e.target.value)}
                />
                <BtnsWrapper>
                  <CancelBtn
                    type="button"
                    onClick={() => setReplyContainerOpen(false)}
                  >Cancel</CancelBtn>
                  <CommentBtn
                    type="button"
                    onClick={submitReply}
                    disabled={replyInput === ""}
                  >Reply</CommentBtn>
                </BtnsWrapper>
              </InputCommentContainer>
            </InputCommentWrapper>
          }
          {comment.replies &&
            { ...comment}.replies.sort(sortMethod).map((reply) => {
              return (
                <DisplayComments
                  comment={reply}
                  sortMethod={sortMethod}
                  post={post}
                  setPostData={setPostData}
                  key={uuidv4()}
                />
              );
            })
          }
        </ContentWrapper>
      </ContentContainer>
    </DisplayCommentsWrapper>
  );
};

export default DisplayComments;