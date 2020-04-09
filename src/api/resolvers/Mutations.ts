import { sendMessege } from "./Mutations/Messages/SendMessage";
import { editPost } from "./Mutations/Posts/editPost";
import {
  createComment,
  deleteComment,
  editComment,
} from "./Mutations/Posts/Comments/Comments";
import { toggleLike } from "./Mutations/Posts/ToggleLike";
import { createPost } from "./Mutations/Posts/NewPost";
import { followUnfollow } from "./Mutations/User/Follow-UnFollow/followUnFollow";
import { editProfile } from "./Mutations/User/EditProfile";
import { confirmSecretLogin } from "./Mutations/User/ConfirmSecretLogin";
import { requestLoginSecret } from "./Mutations/User/RequestLoginSecrete";
import { createUser } from "./Mutations/User/CreateUserMutation";
import { deleteUser } from "./Mutations/User/DeleteUser";
import { deletePost } from "./Mutations/Posts/DeletePost";
import { MutationResolvers } from "../../types/graph";

export const Mutation: MutationResolvers = {
  createUser,
  requestLoginSecret,
  confirmSecretLogin,
  editProfile,
  followUnfollow,
  deleteUser,
  deletePost,
  createPost,
  toggleLike,
  createComment,
  deleteComment,
  editComment,
  editPost,
  sendMessege,
};
