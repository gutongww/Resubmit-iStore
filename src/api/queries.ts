import { gql } from "@apollo/client";
import * as fragments from "./fragments";



export const ORDER  = gql`
    query Order($id: Int!) {
        order(id: $id) {
            ...orderFields
        }
    }
    ${fragments.ORDER}
`


export const USER = gql`
    query User($username: String!) {
        user(username: $username){
            ...userFields
        }
    }
    ${fragments.USER}
`

export const SELF = gql`
    query Self {
        self {
            ...userFields
        }
    }
    ${fragments.USER}
`