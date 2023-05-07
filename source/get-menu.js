import { gql } from "@apollo/client";
import menuFragment from "./fragment/menus";

export const GET_MENUS = gql`
query MyQuery {
  menuItems(where: { location: PRIMARY, parentId: "0" }) {
    edges {
      node {
        id
        label
        path
        url
        childItems {
          edges {
            node {
              id
              label
              path
              url
            }
          }
        }
      }
    }
  }
}
`