import React from "react";
import { FiExternalLink } from "react-icons/all";
import {Img, Vid, ImgContainer, LinkContainer, VidContainer } from "../../styled-components/previews/StyledMediaPreview";

type MediaPreviewProps = {
  media: {
    mediaType: string,
    url: string,
  },
};

const MediaPreview = ({ media }: MediaPreviewProps) => {
  const shortenedUrl =
    media &&
    media.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];

  return (
    <div>
      {media.mediaType === "image" ? (
        <ImgContainer>
          <Img src={media.url} />
        </ImgContainer>
      ) : (
        <div>
          <LinkContainer>
            <a
              href={media.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {shortenedUrl}
            </a>
            <FiExternalLink />
          </LinkContainer>
          <VidContainer>
            <Vid
              src={media.url}
              width="100%"
              scrolling="no"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </VidContainer>
        </div>
      )}
    </div>
  )
};

export default MediaPreview;