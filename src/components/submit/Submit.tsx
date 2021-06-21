import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/state-types";
import {useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import firebase from "../../firebase";
import "firebase/firestore";
import { BsFileText, FiLink, IoImageOutline } from "react-icons/all";
import {LINKPREVIEW_API_KEY} from "../../firebase";
import PostInput from "./PostInput";
import Resources from "../home/Resources";
import AboutProject from "../home/AboutProject";
import { SubmitContainer, TypeSelect, PostTypeSelector, Title, SideBarContainer,
         PostInputContainer, TitleWrapper, FeedContainer } from "../../styled-components/submit/StyledSubmit";

type SubmitProps = {
  posts: any,
  setPosts: any,
};

const Submit = ({ posts, setPosts }: SubmitProps) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postMedia, setPostMedia] = useState("");
  const [postLink, setPostLink] = useState('');
  const dispatch = useDispatch();
  const postTypeState = useSelector((state: RootState) => state.postType);
  const authState = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  const onSubmit = async (media: any = null) => {
    const timestamp = Date.now();
    const postID = uuidv4();

    const getPreviewImage = async () => {
      return await axios
        .get(`https://api.linkpreview.net/?key=${LINKPREVIEW_API_KEY}&q=${postLink}`)
        .then((res) => res.data.image)
        .catch((error) => console.error(error));
    };

    type submitPostTypes = {
      img: string | null,
      media: any,
    };

    const submitPost = async ({img = null, media = null}: submitPostTypes) => {
      await firebase
        .firestore()
        .collection("posts")
        .doc(postID)
        .set({
          postType: postTypeState.type,
          linkPreview: img,
          title,
          postText,
          postMedia: media,
          postLink,
          timestamp,
          vote: 1,
          username: authState.user!.username,
          replies: [],
          id: postID,
          deleted: false,
        });
      setPosts([
        {
          postType: postTypeState.type,
          linkPreview: img,
          title,
          postText,
          postMedia: media,
          postLink,
          timestamp,
          vote: 1,
          username: authState.user!.username,
          replies: [],
          id: postID,
          deleted: false,
        },
        ...posts,
      ]);
      firebase
        .firestore()
        .collection("users")
        .doc(authState.user!.uid)
        .update({
          posts: [
            ...authState.user!.posts,
            {
              title,
              postText,
              timestamp,
              postID,
              uid: authState.user!.uid,
            }
          ]
        });

      firebase
        .firestore()
        .collection("users")
        .doc(authState.user!.uid)
        .get()
        .then((res) => {
          const data = res.data();
          dispatch({
            type: "UPDATE_USER",
            payload: {
              ...data,
              isSignedIn: true,
              isAnonymous: false,
              posts: [
                ...authState.user!.posts,
                {
                  postID,
                  postText,
                  title,
                  timestamp,
                  uid: authState.user!.uid,
                },
              ],
            }
          })
        });
    };

    if(authState.user) {
      if(postTypeState.type === "LINK") {
        const img = await getPreviewImage();
        submitPost(img);
      }
      else {
        submitPost({ img: null, media });
      }
      setTitle("");
      setPostText("");
      history.push("/");
    }
    else {
      alert('you must sign in to create a post');
    }
  }

  const onCancel = () => {
    const cancel = () => {
      setTitle("");
      setPostText("");
      history.push("/");
    };
    if(title.length > 0 || postText.length > 0) {
      if (window.confirm("Are you sure you want to leave this page? You post will not be saved.")) {
        cancel();
      }
    }
    else {
      cancel();
    }
  };

  return (
    <SubmitContainer>
      <FeedContainer>
        <TitleWrapper>
          <Title>Create a post</Title>
        </TitleWrapper>
        <PostInputContainer>
          <PostTypeSelector>
            <TypeSelect active={postTypeState.type === "POST"} onClick={() => dispatch({ type: "POST" })}>
              <BsFileText />
              Post
            </TypeSelect>
            <TypeSelect active={postTypeState.type === "MEDIA"}  onClick={() => dispatch({ type: "MEDIA" })}>
              <IoImageOutline />
              Image & Video
            </TypeSelect>
            <TypeSelect active={postTypeState.type === "LINK"}  onClick={() => dispatch({ type: "LINK" })}>
              <FiLink />
              Link
            </TypeSelect>
          </PostTypeSelector>
          <PostInput
            onCancel={onCancel}
            onSubmit={onSubmit}
            setTitle={setTitle}
            setPostText={setPostText}
            title={title}
            postText={postText}
            postMedia={postMedia}
            setPostMedia={setPostMedia}
            postLink={postLink}
            setPostLink={setPostLink}
            inputShown={postTypeState.type}
          />
        </PostInputContainer>
      </FeedContainer>
      <SideBarContainer>
        <AboutProject />
        <Resources />
      </SideBarContainer>
    </SubmitContainer>

  );
};

export default Submit;