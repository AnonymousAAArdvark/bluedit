import styled, {css} from "styled-components";

const DisplayCommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: .5rem 0 .5rem 0;
  svg {
    color: #363c3f;
    font-size: .9rem;
    margin: .8rem .5rem 0 .5rem;
    cursor: pointer;
  }
`;

const Profile = styled.img`
  width: 1.8rem;
  border-radius: 50%;
  margin-right: .5rem;
`;

const UserName = styled.p`
  color: #1a1a1b;
  font-size: .8rem;
  font-weight: 500;
`;

const TimePosted = styled.p`
  color: #7c7c7c;
  font-size: .8rem;
  margin-left: .3rem;
`;

const ContentContainer = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => visible ? "flex" : "none"};
`;

const ThreadLineWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  padding: 0 .5rem;
  margin-left: .3rem;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};
  &:hover {
    i {
      border-right: 2px solid ${({ disabled }) => disabled ? ({ theme }) => theme.colors.mainBorder : "#363c3f"};
    }
  }
`;

const ThreadLine = styled.i`
  border-right: 2px solid ${({ theme }) => theme.colors.mainBorder};
  display: block;
  width: 50%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Reply = styled.p`
  margin: 0 .5rem;
  word-wrap: anywhere;
`;

const BottomVoteWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UpvoteContainer = styled.div<{ userVote: string | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.vote};
  &:hover {
    background-color: #e1e2e4;
    color: ${({ theme }) => theme.colors.mainUpvote};
  }
  ${({ userVote }) => userVote === "up" && css`
    color: ${({ theme }) => theme.colors.mainUpvote};
  `}
`;

const NumUpvotes = styled.h5<{ userVote: string | null }>`
  margin: .3rem;
  ${({ userVote }) => userVote === "up" && css`
    color: ${({ theme }) => theme.colors.mainUpvote};
  `}
  ${({ userVote }) => userVote === "down" && css`
    color: ${({ theme }) => theme.colors.altDownvote};
  `}
`;

const DownvoteContainer = styled.div<{ userVote: string | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.vote};
  &:hover {
    background-color: #e1e2e4;
    color: ${({ theme }) => theme.colors.altDownvote};
  }
  ${({ userVote }) => userVote === "down" && css`
    color: ${({ theme }) => theme.colors.altDownvote};
  `}
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin: .4rem 0 .3rem 0;
  padding-left: .3rem;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.vote};
  font-size: .75rem;
  font-weight: 550;
  height: 2rem;
  padding: 0 .2rem;
  margin-left: .3rem;
  &:hover {
    background-color: #e8e8e8;
  }
  svg {
    font-size: 1.4rem;
    margin-right: .4rem;
  }
`;

const InputCommentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
`;

const InputCommentContainer = styled.div<{ focus?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin: 0 1rem;
  border: 1px solid ${({ focus }) => focus ? "#1a1a1b" : ({ theme }) => theme.colors.mainBorder};
  border-radius: 5px;
  tab-index: 0;
  background-color: ${({ theme }) => theme.colors.search};
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: 8rem;
  border: 1px solid transparent;
  border-radius: 5px;
  outline: none;
  padding: .5rem 1rem;
  font-weight: 300;
  font-size: 1rem;
  font-family: "Source Sans Pro", sans-serif;
`;

const BtnsWrapper = styled.div`
  display: flex;
`;

const Btn = styled.button`
  height: 1.5rem;
  padding: 0 1.2rem;
  margin: .3rem .5rem;
  font-size: .8rem;
  font-weight: 600;
  border-radius: 9999px;
`;

const CancelBtn = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.colors.search};
  background-color: ${({ theme }) => theme.colors.search};
  color: ${({ theme }) => theme.colors.alt};
  &:hover {
    background-color: #ffebe9;
    border-color: #ffebe9;
  }
  &:active {
    background-color: #ffd5d0;
    border-color: #ffd5d0;
  }
`;

const CommentBtn = styled(Btn)<{ disabled?: boolean }>`
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
  ${({ disabled }) => disabled && css`
    background-color: #ff632d;
    border-color: #ff632d;
    color: #ffd8cd;
    cursor: not-allowed;
  `}
`;

export { ActionBtn, DownvoteContainer, UpvoteContainer, NumUpvotes, BottomVoteWrapper,
         ActionsWrapper, ContentWrapper, ContentContainer, InfoContainer, DisplayCommentsWrapper,
         Profile, Reply, ThreadLineWrapper, ThreadLine, UserName, TimePosted, InputCommentContainer,
         CommentTextarea, CommentBtn, CancelBtn, BtnsWrapper, InputCommentWrapper }