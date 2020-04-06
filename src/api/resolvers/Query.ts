import { QueryResolvers } from "./../../types/graph.d";
import { userSearch, searchPost } from "./Queries/Search/Search";
import { post } from "./Queries/Posts/GetSinglePost";
import { me } from "./Queries/Me";
import { getUserProfile } from "./Queries/GetUserProfile";
import { users } from "./Queries/AllUsers";

export const Query: QueryResolvers = {
  users,
  me,
  getUserProfile,
  post,
  userSearch,
  searchPost
};
