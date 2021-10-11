/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_addUser {
  __typename: "Order";
  id: string;
  userName: string;
  productID: number;
  quantity: number;
}

export interface AddUser {
  addUser: AddUser_addUser;
}

export interface AddUserVariables {
  id: number;
  userName: string;
  productID: number;
  quantity: number;
}
