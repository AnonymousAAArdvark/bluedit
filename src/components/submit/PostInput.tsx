import React, {FormEvent} from "react";
import {
  FormContainer, TitleInput, LinkInput, CancelBtn, SubmitBtn, TextInput, BtnsWrapper
} from "../../styled-components/submit/StyledPostInput";
import {validateMediaLink} from "../../utils/utils";

type PostInputProps = {
  onSubmit: any,
  onCancel: any,
  setPostText: any,
  setPostLink: any,
  postLink: string,
  postMedia: string,
  setPostMedia: any,
  setTitle: any,
  title: string,
  postText: string,
  inputShown: string,
}

const PostInput = ({ onSubmit, onCancel, setPostText, setPostLink, postLink, postMedia,
                     setPostMedia, setTitle, title, postText, inputShown} : PostInputProps) => {
  const validateMediaBeforeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(inputShown === "MEDIA") {
      validateMediaLink(postMedia).then((res) => {
        if(res) {
          onSubmit(res);
        }
        else {
          alert('Invalid media, only youtube links and image formats (.jpeg, .jpg, .png, .gif) currently supported');
        }
      });
    }
    else {
      onSubmit();
    }
  }

  return (
    <FormContainer onSubmit={validateMediaBeforeSubmit}>
      <TitleInput
        type="text"
        value={title}
        required
        onChange={(e: { currentTarget: { value: any; }; }) => setTitle(e.currentTarget.value)}
        placeholder="Title"
        maxLength={300}
      />
      {inputShown === "POST" && (
        <TextInput
          onChange={(e: { currentTarget: { value: any; }; }) => setPostText(e.currentTarget.value)}
          placeholder="Text (optional)"
          value={postText}
          maxLength={1600}
        />
      )}
      {inputShown === "MEDIA" && (
        <LinkInput
          onChange={(e: { target: { value: any; }; }) => setPostMedia(e.target.value)}
          placeholder="Url"
          value={postMedia}
          required
        />
      )}
      {inputShown === "LINK" && (
        <LinkInput
          onChange={(e: { target: { value: any; }; }) => setPostLink(e.target.value)}
          placeholder="Url"
          value={postLink}
          required
        />
      )}

      <BtnsWrapper>
        <CancelBtn type="button" onClick={() => onCancel()}>CANCEL</CancelBtn>
        <SubmitBtn type="submit">POST</SubmitBtn>
      </BtnsWrapper>
    </FormContainer>
  );
};

export default PostInput;