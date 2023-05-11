import { gql } from "@apollo/client";

export const GET_PORTFOLIO_BY_URI = gql`
  query GetPortfolioByURI($path: String!) {
    portofolioBy(uri: $path) {
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
`;