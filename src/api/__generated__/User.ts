/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  username: string;
  password: string;
  address: string;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  username: string;
}
