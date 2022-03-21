import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    DateTime: any,
    String: string,
    Boolean: boolean,
}

export interface Query {
    users?: (User | undefined)[]
    __typename: 'Query'
}

export type SortOrder = 'asc' | 'desc'

export interface User {
    created_at?: Scalars['DateTime']
    email: Scalars['String']
    id: Scalars['String']
    image?: Scalars['String']
    name?: Scalars['String']
    updated_at?: Scalars['DateTime']
    __typename: 'User'
}

export interface QueryRequest{
    users?: [{sortBy?: (SortOrder | null)},UserRequest] | UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    created_at?: boolean | number
    email?: boolean | number
    id?: boolean | number
    image?: boolean | number
    name?: boolean | number
    updated_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain{
    users: ((args?: {sortBy?: (SortOrder | null)}) => {get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<User, R> | undefined)[] | undefined)>})&({get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<User, R> | undefined)[] | undefined)>})
}

export interface QueryObservableChain{
    users: ((args?: {sortBy?: (SortOrder | null)}) => {get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<User, R> | undefined)[] | undefined)>})&({get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<User, R> | undefined)[] | undefined)>})
}

export interface UserPromiseChain{
    created_at: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    updated_at: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>})
}

export interface UserObservableChain{
    created_at: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    email: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    image: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    updated_at: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>})
}