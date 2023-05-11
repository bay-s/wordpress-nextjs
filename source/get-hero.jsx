import { gql } from "@apollo/client";

export const GET_HERO = gql`
query GetHero {
    heroSections {
      nodes {
        title
        content
      }
    }
  }
`