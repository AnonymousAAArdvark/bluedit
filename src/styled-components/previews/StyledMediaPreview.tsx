import styled from "styled-components";

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: .5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 30rem;
  object-fit: contain;
`;

const LinkContainer = styled.div`
  cursor: pointer;
  margin-bottom: .5rem;
  margin-left: .5rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.alt};
  a {
    font-size: .8rem;
  }
  svg {
    font-size: .9rem;
    margin-left: .2rem;
    border-bottom: 1px solid transparent;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.alt};
    text-decoration: underline;
    svg {
      border-bottom: 1px solid ${({ theme }) => theme.colors.alt};
    }
  }
`;

const VidContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
`;

const Vid = styled.iframe`
  border: none;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export { Img, Vid, ImgContainer, LinkContainer, VidContainer };
