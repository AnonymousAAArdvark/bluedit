import styled from "styled-components";

const FeedCreatePostContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  padding: .5rem;
  margin: .5rem 0;
`;

const Profile = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid #eef0f2;
  margin-right: .5rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  max-width: 40rem;
  padding: .5rem .5rem .5rem 1rem;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #edeff1;
  background-color: ${({ theme }) => theme.colors.search};
  outline: none;
  font-family: "Source Sans Pro", sans-serif;
  margin-right: .5rem;
  &:hover, &:focus {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.alt};
  }
`;

const Btn = styled.button`
  margin: 0 .1rem;
  color: ${({ theme }) => theme.colors.vote};
  background: none;
  border: none;
  display: flex;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: #ededed;
  }
`;

const MediaBtn = styled(Btn)`
  font-size: 1.5rem;
  padding: .45rem;
`;

const LinkBtn = styled(Btn)`
  font-size: 1.3rem;
  padding: .55rem;
`;

export { FeedCreatePostContainer, Profile, Input, LinkBtn, MediaBtn };