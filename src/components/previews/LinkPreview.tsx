import React, { useState, useEffect } from "react";
import { FiLink, FiExternalLink } from "react-icons/all";
import { LinkWrapper, PreviewImage } from "../../styled-components/previews/StyledLinkPreview";

type LinkPreviewProps = {
  url: string,
  preview: string,
}

const LinkPreview = ({ url, preview }: LinkPreviewProps) => {
  const [img, setImg] = useState<string>("");
  const shortenedUrl = url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split("/")[0];

  useEffect(() => {
    if(preview !== null) {
      setImg(preview);
    }
  }, [preview]);

  return (
    <>
      <LinkWrapper>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {shortenedUrl}/...
        </a>
        <FiExternalLink />
      </LinkWrapper>
      <PreviewImage
        img={preview ? img : "none"}
        onClick={(e: { stopPropagation: () => void; }) => {
          e.stopPropagation();
          window.open(url, "_blank");
        }}
      >
        <FiExternalLink />
        {!preview && <FiLink />}
      </PreviewImage>
    </>
  );
};

export default LinkPreview;