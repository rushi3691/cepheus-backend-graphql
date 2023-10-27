import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Event = {
  __typename?: 'Event';
  active: Scalars['Boolean']['output'];
  event_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  max_grade: Scalars['Int']['output'];
  max_mates: Scalars['Int']['output'];
  min_grade: Scalars['Int']['output'];
};

export type EventTeam = {
  __typename?: 'EventTeam';
  event_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  team_id: Scalars['Int']['output'];
  user_id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeam: TeamResponse;
  loginUser: UserResponse;
  participateInEvent: TeamResponse;
  registerUser: UserResponse;
};


export type MutationCreateTeamArgs = {
  event_id: Scalars['Int']['input'];
  team_name: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationParticipateInEventArgs = {
  event_id: Scalars['Int']['input'];
  team_code: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  college: Scalars['String']['input'];
  grade: Scalars['Int']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getTeamInfo: TeamResponse;
  hello: Scalars['String']['output'];
};


export type QueryGetTeamInfoArgs = {
  teamid: Scalars['Int']['input'];
};

export type Team = {
  __typename?: 'Team';
  event_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  team_code?: Maybe<Scalars['String']['output']>;
  team_name: Scalars['String']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type TeamResponse = {
  __typename?: 'TeamResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  team?: Maybe<Team>;
};

export type User = {
  __typename?: 'User';
  college?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  grade?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  registered: Scalars['Boolean']['output'];
  user_name: Scalars['String']['output'];
  user_uuid: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Event: ResolverTypeWrapper<Event>;
  EventTeam: ResolverTypeWrapper<EventTeam>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
  TeamResponse: ResolverTypeWrapper<TeamResponse>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Event: Event;
  EventTeam: EventTeam;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Team: Team;
  TeamResponse: TeamResponse;
  User: User;
  UserResponse: UserResponse;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  event_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max_grade?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max_mates?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min_grade?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventTeam'] = ResolversParentTypes['EventTeam']> = {
  event_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  team_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTeam?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'event_id' | 'team_name'>>;
  loginUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'idToken'>>;
  participateInEvent?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType, RequireFields<MutationParticipateInEventArgs, 'event_id' | 'team_code'>>;
  registerUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'college' | 'grade' | 'mobile' | 'user_name'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getTeamInfo?: Resolver<ResolversTypes['TeamResponse'], ParentType, ContextType, RequireFields<QueryGetTeamInfoArgs, 'teamid'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  event_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  team_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  team_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamResponse'] = ResolversParentTypes['TeamResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  college?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grade?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registered?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Event?: EventResolvers<ContextType>;
  EventTeam?: EventTeamResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamResponse?: TeamResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};

