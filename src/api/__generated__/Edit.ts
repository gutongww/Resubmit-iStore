/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Edit
// ====================================================

export interface Edit_edit {
  __typename: "Order";
  id: string;
  userName: string;
  productID: number;
  quantity: number;
}

export interface Edit {
  edit: Edit_edit;
}

export interface EditVariables {
  id: number;
  userName: string;
  productID: number;
  quantity: number;
}
