import styled, { css } from "styled-components";

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  margin: .5rem 0 .3rem 0;
  @media (max-width: 640px) {
    margin: 0;
  }
`;

const PostPreviewWrapper = styled.div`
  display: flex;
  padding-right: 1rem;
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2.5rem;
  padding: .5rem;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  @media (max-width: 640px) {
    display: none;
    border-radius: 0;
  }
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

const ContentWrapper = styled.div`
  position: relative;
  padding-top: .4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 640px) {
    padding-left: 2.2rem;
  }
`;

const Info = styled.p`
  font-size: .8rem;
  margin: .2rem .5rem;
  color: #777c7e;
  font-weight: 200;
`;

const Title = styled.h3<{ link?: boolean }>`
  margin: .3rem .5rem;
  font-weight: 400;
  max-width: ${({ link }) => link ? "calc(100% - 11rem)" : "inherit"};
  overflow: hidden;
  word-wrap: anywhere;
`;

const Desc = styled.h4`
  font-size: .9rem;
  margin: .7rem .5rem 0 .5rem;
  font-weight: 400;
  line-height: 1.4rem;
  word-wrap: anywhere;
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin-top: .4rem;
  padding: 0 0 .2rem .3rem;
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
  padding: 0 .5rem;
  outline: none;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const CommentsBtn = styled(ActionBtn)`
  cursor: default;
  &:hover {
    background: none;
  }
  svg {
    font-size: 1.4rem;
    margin-right: .4rem;
  }
`;

const ShareBtn = styled(ActionBtn)`
  padding-left: .3rem;
  margin-left: .3rem;
  cursor: not-allowed;
  svg {
    font-size: 1.6rem;
    margin-right: .3rem;
  }
`;

const DeleteBtn = styled(ActionBtn)`
  padding-left: .3rem;
  margin-left: .3rem;
  svg {
    font-size: 1.4rem;
    margin-right: .3rem;
  }
`;

const AuthBtn = styled.button`
  padding: .5rem 1rem;
  font-weight: 600;
  margin: .2rem .3rem;
  border-radius: 9999px;
`;

const LoginBtn = styled(AuthBtn)`
  color: ${({theme}) => theme.colors.alt};
  background-color: white;
  border: 1px solid ${({theme}) => theme.colors.alt};
  &:hover {
    background-color: #ffebe9;
  }
  &:active {
    background-color: #ffd5d0;
  }
`;

const SignUpBtn = styled(AuthBtn)`
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

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
`;

const CreateCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
`;

const CommentAs = styled.p`
  font-size: .8rem;
  margin-bottom: .2rem;
`;

const InputCommentContainer = styled.div<{ focus?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  resize: vertical;
  min-height: 8rem;
`;

const CommentBtn = styled(AuthBtn)<{ disabled?: boolean }>`
  height: 1.5rem;
  padding: 0 1.2rem;
  margin: .3rem .5rem;
  font-size: .8rem; 
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

const LoginPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.mainBorder};
  margin: 0 1.8rem;
  padding: .6rem .3rem .6rem .6rem;
`;

const PromptTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #747576;
`;

const CommentsSortContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 3rem;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainBorder};

  h5 {
    font-size: .65rem;
    color: #5b5c5d;
    font-weight: 500;
    margin-bottom: .5rem;
  }
`;

const SelectSort = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin: 0 0 .5rem .5rem;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.colors.vote};
    margin: 0 0 .2rem .5rem;
  }
`;

const CurrSortOption = styled.p`
  text-transform: uppercase;
  color: #363c3f;
  font-size: .8rem;
  font-weight: 900;
`;

const SortOptionsDropDown = styled.div`
  position: absolute;
  top: 1.5rem;
  left: -.2rem;
  box-shadow: 0 .1rem .2rem 0 rgba(26, 26, 26, .2);
  background-color: white;
  border-radius: 5px;
  width: 7rem;
  border: 1px solid ${({ theme }) => theme.colors.mainBorder};
`;

const SortOption = styled.div<{ selected?: boolean }>`
  padding: .3rem .5rem;
  color: ${({ theme }) => theme.colors.vote};
  font-size: .9rem;
  border-radius: 3px;
  font-weight: 500;
  ${({ selected }) => selected && css`
    color: ${({ theme }) => theme.colors.alt} !important;
  `}
  &:hover {
    background-color: #ffebe7;
    color: #1c1c1c;
  }
`;

const NoComments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 22rem;
  color: #afb1b2;
  svg {
    font-size: 2rem;
    margin: .5rem;
  }
`;

const NoCommentsTitle = styled.h3`
  margin: .5rem;
  font-weight: 500;
`;

const NoCommentsDesc = styled.p`
  font-size: .9rem;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: .8rem;
`;

const CommentPadding = styled.div`
  padding-top: 1rem;
`;

export { Title, Info, ContentWrapper, ActionsWrapper, CommentsWrapper, SelectSort, CommentAs, CommentBtn,
         VoteWrapper, NumUpvotes, UpvoteContainer, PostPreviewWrapper, DownvoteContainer, CommentsSortContainer,
         Desc, CommentsBtn, ShareBtn, SignUpBtn, LoginBtn, CommentTextarea, CommentSection, CommentPadding,
         CreateCommentWrapper, InputCommentContainer, LoginPrompt, PromptTitle, SortOptionsDropDown, CurrSortOption,
         SortOption, PostContentWrapper, NoComments, NoCommentsDesc, NoCommentsTitle, DeleteBtn };