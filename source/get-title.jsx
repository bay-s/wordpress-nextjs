import { gql } from "@apollo/client";


export const GET_TITLE = gql`
query GetSiteMetadata {
       generalSettings {
         title
       }
     }
`