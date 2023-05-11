import { gql } from "@apollo/client";


export const GET_TITLE = gql`
query GetSiteMetadata {
  getHeader {
    siteTitle
    siteTagLine
    siteLogoUrl
    favicon
  }
}
`