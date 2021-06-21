import {v4 as uuidv4} from "uuid";

export const SORT_OPTIONS: any = {
  NEW: {
    column: "timestamp",
    direction: "asc",
    column2: "vote",
    direction2: "asc",
  },
  OLD: {
    column: "timestamp",
    direction: "desc",
    column2: "vote",
    direction2: "asc",
  },
  TOP: {
    column: "vote",
    direction: "asc",
    column2: "timestamp",
    direction2: "asc",
  },
};

export const Comment = (
  {
    input = "",
    timestamp = Date.now(),
    username = "",
    points = 1,
    replies = [],
    id = uuidv4(),
    depth = 0,
    deleted = false,
  } = {}) => ({ input, timestamp, username, points, replies, id, depth, deleted }
);

export const setCommentAsDeleted = (object: any, targetId: number) => {
  if(object.id === targetId) {
    object.deleted = true;
  }
  else {
    object.replies.forEach((obj: any) => {
      setCommentAsDeleted(obj, targetId);
    });
  }

  return object.replies;
};

export const withNewCommentVote = (object: any, targetId: number, newVoteCount: number) => {
  if(object.id === targetId) {
    object.points = newVoteCount;
  }
  else {
    object.replies.forEach((obj: any) => {
      withNewCommentVote(obj, targetId, newVoteCount);
    });
  }

  return object;
};

export const insertReply =  (object: any, targetId: number, newReply: any) => {
  if(object.id === targetId) {
    object.replies.push(newReply);
  }
  else {
    object.replies.forEach((obj: any) => {
      insertReply(obj, targetId, newReply);
    });
  }

  return object.replies;
};

export const countReplies = (object: any) => {
  let counter = 0;
  const count = (object: any) => {
    for(let i = 0; i < object.replies.length; ++i) {
      counter++;
      if(object.replies[i].replies.length > 0) {
        count(object.replies[i]);
      }
    }
  }

  count(object);
  return counter;
};

export const filterPosts = (postsArr: any[], search: string) => {
  return postsArr.filter((post: any) => {
    return post.title.indexOf(search) !== -1 ||
      post.postText.indexOf(search) !== -1;
  });
};

export const validateMediaLink = (url: string) => {
  const testImage = (url: string, timeoutT: number = 5000) => {
    return new Promise((resolve: any) => {
      let timeout = timeoutT || 5000;
      let timer: any;
      let img = new Image();
      img.onerror = img.onabort = () => {
        clearTimeout(timer);
        resolve(false);
      };
      img.onload = () => {
        clearTimeout(timer);
        resolve({ mediaType: "image", url });
      };
      timer = setTimeout(() => {
        img.src = "//!!!!/test.jpg";
        resolve(false);
      }, timeout);
      img.src = url;
    });
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  if(url.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
    return testImage(url).catch((error) => console.error(error));
  }

  if(url.includes("youtube") || url.includes("youtu.be")) {
    const id = getYoutubeId(url);

    if(id) {
      return Promise.resolve({
        mediaType: "video",
        url: `https://www.youtube.com/embed/${id}`
      });
    }
    else {
      return Promise.resolve(false);
    }
  }
  return Promise.resolve(false);
}