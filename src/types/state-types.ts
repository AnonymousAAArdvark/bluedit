export interface ModalState {
  status: string;
}

export interface FeedSortState {
  sort: string;
}

export interface PostTypeState {
  type: string;
}

export interface AuthState {
  user: {
    username: string;
    email: string;
    uid: string;
    posts: any[];
    postVotes: any;
    commentVotes: any;
  } | null;
  authError: {
    message: string;
    code: number;
  } | null;
}

export interface RootState {
  feedSort: FeedSortState;
  modal: ModalState;
  postType: PostTypeState;
  auth: AuthState;
}