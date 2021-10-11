/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditStudent
// ====================================================

export interface EditStudent_editStudent {
  __typename: "User";
  username: string;
  password: string;
  address: string;
}

export interface EditStudent {
  editStudent: EditStudent_editStudent;
}

export interface EditStudentVariables {
  username: string;
  password: string;
  address: string;
}
