import { gql } from "@apollo/client";
import * as fragments from "./fragments";
 
export const LOGIN = gql`
  mutation Login($code: String!) {
    login(input: { code: $code }) {
      user {
        ...userFields
      }
      jwt
    }
  }
  ${fragments.USER}
`;
 
export const EDIT_Student = gql`
  mutation EditStudent(
    $username: String!
    $password: String!
    $address: String!
  ) {
    editStudent(
      input: {
        username: $username,
        password: $password,
        address: $address
      }
    ) {
      ...userFields
    }
  }
  ${fragments.USER}
`;
 
export const ADD_USER = gql`
  mutation AddUser(
    $id: Int!
    $userName: String!
    $productID: Int!
    $quantity: Int!
  ) {
    addUser(input: { id: $id, userName: $userName, productID: $productID, quantity: $quantity }) {
      ...orderFields
    }
  }
  ${fragments.ORDER}
`;
 
export const EDIT = gql`
  mutation Edit(
    $id: Int!
    $userName: String!
    $productID: Int!
    $quantity: Int!
  ) {
    edit(
      input: {
        id: $id,
        userName: $userName,
        productID: $productID,
        quantity: $quantity
      }
    ) {
      ...orderFields
    }
  }
  ${fragments.ORDER}
`;
