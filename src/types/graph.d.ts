import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
   __typename?: 'Comment';
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
};

export type File = {
   __typename?: 'File';
  id?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
};

export type Like = {
   __typename?: 'Like';
  id?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Float']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
};

export type Message = {
   __typename?: 'Message';
  id?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
  from?: Maybe<User>;
  to?: Maybe<User>;
  text?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  receiverId?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser: User;
  requestLoginSecret: Scalars['String'];
  confirmSecretLogin: Scalars['String'];
  followUnfollow: User;
  deleteUser: Scalars['String'];
  editProfile: User;
  createPost: Post;
  editPost: Post;
  toggleLike: Scalars['String'];
  deletePost: Scalars['String'];
  createComment: Comment;
  editComment: Comment;
  deleteComment: Scalars['String'];
  sendMessege: Message;
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationRequestLoginSecretArgs = {
  email: Scalars['String'];
};


export type MutationConfirmSecretLoginArgs = {
  email: Scalars['String'];
  key: Scalars['String'];
};


export type MutationFollowUnfollowArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationEditProfileArgs = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  caption: Scalars['String'];
  files: Array<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};


export type MutationEditPostArgs = {
  postId: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<Scalars['String']>;
};


export type MutationToggleLikeArgs = {
  postId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationEditCommentArgs = {
  text: Scalars['String'];
  commentId: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationSendMessegeArgs = {
  roomId?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  toId?: Maybe<Scalars['String']>;
};

export type Post = {
   __typename?: 'Post';
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<File>>>;
  likes?: Maybe<Array<Maybe<Like>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export type Query = {
   __typename?: 'Query';
  me?: Maybe<User>;
  users: Array<User>;
  posts: Array<Maybe<Post>>;
  post: Post;
  getUserProfile: User;
  userSearch: Array<User>;
  searchPost: Array<Post>;
  feeds: Array<Maybe<Post>>;
  rooms: Array<Maybe<Room>>;
  room: Room;
  myPosts: Array<Maybe<Post>>;
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserProfileArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserSearchArgs = {
  term: Scalars['String'];
};


export type QuerySearchPostArgs = {
  term: Scalars['String'];
};


export type QueryRoomArgs = {
  id: Scalars['String'];
};


export type QueryMyPostsArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Room = {
   __typename?: 'Room';
  id?: Maybe<Scalars['String']>;
  participants?: Maybe<Array<Maybe<User>>>;
  messeges?: Maybe<Array<Maybe<Message>>>;
};

export type Subscription = {
   __typename?: 'Subscription';
  DriversSubscriptions?: Maybe<User>;
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  RoomId: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  loginSecret?: Maybe<Scalars['String']>;
  post?: Maybe<Array<Maybe<Post>>>;
  likes?: Maybe<Array<Maybe<Like>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  followedBy?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  SendMessege?: Maybe<Array<Maybe<Message>>>;
  ReceiveMessage?: Maybe<Message>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Post: ResolverTypeWrapper<Post>,
  File: ResolverTypeWrapper<File>,
  Like: ResolverTypeWrapper<Like>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Comment: ResolverTypeWrapper<Comment>,
  Room: ResolverTypeWrapper<Room>,
  Message: ResolverTypeWrapper<Message>,
  Mutation: ResolverTypeWrapper<{}>,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  String: Scalars['String'],
  Post: Post,
  File: File,
  Like: Like,
  Float: Scalars['Float'],
  Comment: Comment,
  Room: Room,
  Message: Message,
  Mutation: {},
  Subscription: {},
  Boolean: Scalars['Boolean'],
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  file?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType>,
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  senderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  receiverId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username' | 'email'>>,
  requestLoginSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRequestLoginSecretArgs, 'email'>>,
  confirmSecretLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmSecretLoginArgs, 'email' | 'key'>>,
  followUnfollow?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationFollowUnfollowArgs, 'id'>>,
  deleteUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>,
  editProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditProfileArgs, never>>,
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'caption' | 'files'>>,
  editPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'postId'>>,
  toggleLike?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationToggleLikeArgs, 'postId'>>,
  deletePost?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'postId'>>,
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'text' | 'postId'>>,
  editComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'text' | 'commentId'>>,
  deleteComment?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  sendMessege?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessegeArgs, 'text'>>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['File']>>>, ParentType, ContextType>,
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>,
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, never>>,
  getUserProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserProfileArgs, never>>,
  userSearch?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserSearchArgs, 'term'>>,
  searchPost?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerySearchPostArgs, 'term'>>,
  feeds?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>,
  rooms?: Resolver<Array<Maybe<ResolversTypes['Room']>>, ParentType, ContextType>,
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>,
  myPosts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<QueryMyPostsArgs, never>>,
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  participants?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  messeges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  DriversSubscriptions?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "DriversSubscriptions", ParentType, ContextType>,
  newMessage?: SubscriptionResolver<ResolversTypes['Message'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'RoomId'>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  loginSecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
  rooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Room']>>>, ParentType, ContextType>,
  followedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  SendMessege?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>,
  ReceiveMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Like?: LikeResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Room?: RoomResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
