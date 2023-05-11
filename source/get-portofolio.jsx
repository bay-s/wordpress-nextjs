import { gql } from "@apollo/client";

export const GET_PORTOFOLIO = gql`
query GetPortofolio {
  portofolios {
    nodes {
      content
      date
      title
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      author {
        node {
          name
        }
      }
    }
  }
}
`