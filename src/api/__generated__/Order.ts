/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Order
// ====================================================

export interface Order_order {
  __typename: "Order";
  id: string;
  userName: string;
  productID: number;
  quantity: number;
}

export interface Order {
  order: Order_order;
}

export interface OrderVariables {
  id: number;
}
