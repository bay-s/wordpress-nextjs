import { gql } from "@apollo/client";

export const GET_FOOTER = gql`
query GetSiteMetadata {
    getFooter {
      copyrightText
      sidebarOne
      sidebarTwo
      socialLinks {
        iconUrl
        iconName
      }
    }
  }
`