import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
query GetSkills {
  skills {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
 
    }
  }
}
`