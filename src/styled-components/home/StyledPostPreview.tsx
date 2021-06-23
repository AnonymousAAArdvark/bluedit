import styled, { css } from "styled-components";

const PostPreviewWrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: white;
  border-radius: 5px;
  margin: .3rem 0;
  cursor: pointer;
  &:hover {
    border-color: #898989;
  }
  @media (max-width: 640px) {
    border-radius: 0;
  }
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2.5rem;
  padding: .5rem;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #f7f9fa;
  @media (max-width: 640px) {
    display: none;
    border-radius: 0;
  }
`;

const BottomVoteWrapper = styled.div`
  display: flex;
  padding-right: .5rem;
  align-items: center;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  @media (min-width: 641px) {
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
`;

const Info = styled.p`
  font-size: .8rem;
  margin-left: .5rem;
  color: #777c7e;
  font-weight: 200;
`;

const Title = styled.h3<{ link?: boolean }>`
  margin: .3rem .5rem;
  font-weight: 400;
  max-height: 2.7rem;
  max-width: ${({ link }) => link ? "calc(100% - 11rem)" : "inherit"};
  word-wrap: anywhere;
  overflow: hidden;
`;

const Desc = styled.h4`
  position: relative;
  font-size: .9rem;
  margin: .7rem .5rem 0 .5rem;
  font-weight: 400;
  line-height: 1.4rem;
  max-height: 17.5rem;
  word-wrap: anywhere;
  overflow: hidden;
  
  &:before{
    content:'';
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    background:linear-gradient(transparent 7rem, white);
  }
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
  &:hover {
    background-color: #e8e8e8;
  }
`;

const CommentsBtn = styled(ActionBtn)`
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

export { ShareBtn, Title, CommentsBtn, Info, Desc, ActionsWrapper,
         ContentWrapper, PostPreviewWrapper, DownvoteContainer, UpvoteContainer,
         VoteWrapper, NumUpvotes, BottomVoteWrapper, DeleteBtn };