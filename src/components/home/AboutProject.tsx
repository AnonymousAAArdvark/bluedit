import React from "react";
import { BiCake } from "react-icons/all";
import styled from "styled-components";

const AboutProject = () => {
  return (
    <AboutProjectWrapper>
      <Title>About Project</Title>
      <Desc>
        Hello and welcome to Bluedit! Bluedit is a clone of the popular site
        <a href="https://www.reddit.com/"> Reddit </a>
        and was built purely for fun and as a learning experience. This app was made entirely by me
        (<a href="https://github.com/AnonymousAAArdvark/">AnonymousAAArdvark</a>)
        , though I took inspiration and art from Reddit, as well as other projects on Github.
        I do not intend this to be an alternative to Reddit. However,
        feel free to create an account and upvote/create some posts!
      </Desc>
      <Created><BiCake /> Created Jun 14, 2021</Created>
    </AboutProjectWrapper>
  )
};

const AboutProjectWrapper = styled.div`
  background-color: white;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin: .5rem 0 .3rem 0;
`;

const Title = styled.h4`
  font-weight: 500;
  padding-bottom: 1.5rem;
`;

const Desc = styled.p`
  font-size: .9rem;
  padding-bottom: 1rem;
`;

const Created = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    margin-right: .5rem;
  }
`;

export default AboutProject;