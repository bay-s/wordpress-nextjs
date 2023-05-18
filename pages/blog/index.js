
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import {  GET_PAGINATION_NEXT } from "../../source/post-pagination";
 
export default function BlogPage( {posts,pagi}) {
  
  const router = useRouter()
  const blogName = router.asPath.split("/")
 console.log(pagi);
 console.log(posts);
  const nextPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    console.log(id);
    router.push(`/blog/next/${id}`)
  }
  return (
<>
<Head>
 <title>Category || {blogName[blogName.length - 1]}</title>
</Head>
 
   
 {
  pagi.edges.map((post) => {
      return (
        <PostCard key={post.uri} post={post.node} type={'posts'}></PostCard>
      )
    })
}
 
<div className="is-flex justify-between w-100 align-center">
{
  pagi?.pageInfo?.hasPreviousPage ? <button className="button is-link" data-id={pagi?.pageInfo?.startCursor}>Previous Posts</button>
  : <button className="button is-link" disabled>Previous Posts</button>
}

{
pagi?.pageInfo?.hasNextPage ? <button className="button is-link" data-id={pagi?.pageInfo?.endCursor} onClick={nextPage}>Next Posts</button>
: <button className="button is-link"  disabled>Next Posts</button>
}

</div>
</>
  )
}

export async function getServerSideProps(context) {
  const response = await client.query({
    query:  GET_PAGINATION_NEXT,
  });

  const responsePagination = await client.query({
    query: GET_PAGINATION_NEXT ,
    variables: {
      after: null // Set the 'after' variable to null
    }
  });

  
  const posts = response?.data?.posts?.edges
  const pagi = responsePagination?.data.posts 
  return {
    props: {
      posts,
      pagi
    },
  };
}