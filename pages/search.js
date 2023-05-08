import { gql} from "@apollo/client";
import { client } from "../lib/apollo";
import PostCard from "../components/PostCard";
import { SEARCH_POSTS } from "../source/get-search-post";



const  SearchPage = ({searchResult,query}) => {
 
    console.log(searchResult);
    return(
<section className="is-flex flex-column gap-1">
<div className="is-flex align-center gap-3">
<h3 className="txt-white">Result for : <span className="is-title">{query}</span></h3>

<h4 className="txt-white">{ searchResult.length} : <span className="is-title">Result</span></h4>
</div>
  {
    
    searchResult.map((post) => {
       
       return (
         <PostCard key={post.node.id} post={post.node}></PostCard>
       )
     })
   
  }
</section>

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
        searchResult,
        query:q
      }
    };
  }
  
export default  SearchPage