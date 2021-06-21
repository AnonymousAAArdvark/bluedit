import React, { useState, useRef } from "react";
import { BiUpvote, BiDownvote, VscComment, CgArrowsExpandLeft, FiTrash } from "react-icons/all";
import { useDispatch } from "react-redux";
import useOutSideAlerter from "../../utils/useOutSideAlerter";
import avatar from "../../assets/avatar.webp";
import locale from 'date-fns/locale/en-US'
import { formatDistanceToNowStrict } from "date-fns";
import formatDistance from "../../utils/formatDistance";
import { ActionBtn, DownvoteContainer, UpvoteContainer, NumUpvotes, BottomVoteWrapper,
         ActionsWrapper, ContentWrapper, ContentContainer, InfoContainer, DisplayCommentsWrapper,
         Profile, Reply, ThreadLineWrapper, ThreadLine, UserName, TimePosted, InputCommentContainer,
         CommentTextarea, CommentBtn, CancelBtn, BtnsWrapper, InputCommentWrapper }
  from "../../styled-components/comments/StyledDisplayComments";

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
}

const DisplayComments = ({ comment, sortMethod, post }: DisplayCommentsProps) => {
  const [replyInput, setReplyInput] = useState("");
  const [replyContainerOpen, setReplyContainerOpen] = useState(false);
  const [createReplyFocus, setCreateReplyFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const createReplyFocusRef = useRef(null);
  useOutSideAlerter(createReplyFocusRef, setCreateReplyFocus);
  const dispatch = useDispatch();

  const submitReply = () => {
    if(replyInput === "") return;
    return;
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
              <UpvoteContainer>
                <BiUpvote/>
              </UpvoteContainer>
              <NumUpvotes>{comment.points}</NumUpvotes>
              <DownvoteContainer>
                <BiDownvote/>
              </DownvoteContainer>
            </BottomVoteWrapper>
            <ActionBtn
              onClick={() => false ? dispatch({ type: "SIGNUP" }) : setReplyContainerOpen(!replyContainerOpen)}
            >
              <VscComment/>
              Reply
            </ActionBtn>
            {true && <ActionBtn>
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