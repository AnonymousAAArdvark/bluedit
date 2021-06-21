import AboutProject from "./AboutProject";
import FeedCreatePost from "./FeedCreatePost";
import FeedSort from "./FeedSort";
import PostPreview from "./PostPreview";
import Resources from "./Resources";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../types/state-types";

type HomeProps = {
  posts: any[],
  viewPostComments: any,
  castPostVote: any,
}

const Home = ({ posts, viewPostComments, castPostVote } : HomeProps) => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <HomeContainer>
      <FeedContainer>
        {authState.user && <FeedCreatePost />}
        <FeedSort />
        {posts && posts.map((post, index) => {
          const url = post.title.replace(/\W/g, '').toLowerCase();
          return (
            <PostPreview
              key={index}
              viewPostComments={viewPostComments}
              username={post.username}
              timestamp={post.timestamp}
              post={post}
              vote={post.vote}
              castPostVote={castPostVote}
              id={post.id}
              url={url}
            />
          )
        })}
      </FeedContainer>
      <SideBarContainer>
        <AboutProject />
        <Resources />
        <BtnContainer onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <TopBtn>Back to Top</TopBtn>
        </BtnContainer>
      </SideBarContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  padding: 2.5rem .7rem;
  @media (max-width: 640px) {
    padding: 2.5rem 0;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  margin: .7rem;
  @media (max-width: 960px) {
    max-width: none;
  }
  @media (max-width: 640px) {
    margin: .7rem 0;
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

export default Home;