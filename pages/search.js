import { gql} from "@apollo/client";
import { client } from "../lib/apollo";
import PostCard from "../components/PostCard";
import { SEARCH_POSTS } from "../source/get-search-post";



const  SearchPage = ({searchResult}) => {
 
    console.log(searchResult);
    return(

            searchResult.map((post) => {
       
              return (
                <PostCard key={post.node.id} post={post.node}></PostCard>
              )
            })
          

    )
  }
  
  export async function getServerSideProps(context) {
    const { q } = context.query;
  
 
  const response = await client.query({
    query:SEARCH_POSTS,
    variables: {
      search: q,
    },
  })
  console.log(q);
  const searchResult = response?.data?.posts?.edges
  console.log(searchResult);
    return {
      props: {
        searchResult
      }
    };
  }
  
export default  SearchPage