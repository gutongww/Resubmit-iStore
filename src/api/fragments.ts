import { gql } from "@apollo/client";

export const USER = gql`
    fragment userFields on User {
        username
        password
        address
    }
`;


export const ORDER = gql`
    fragment orderFields on Order {
        id
        userName
        productID
        quantity
    }
`;
