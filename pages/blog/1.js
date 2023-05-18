
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { GET_PAGINATION_NEXT  } from "../../source/post-pagination";
import { GET_PAGINATION_PREV } from "../../source/get-pagination-prev";
import { useState } from "react";

export default function TagsPage( {pagination,prevPost}) {
  const route = useRouter()
  const blogName = route.asPath.split("/")
  const posts = pagination?.posts?.edges
  const [currents,setCurrent] = useState('after')
 console.log(pagination);
 console.log(prevPost);


 const nextPage = async (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  const currentId = e.target.dataset.current
  console.log(id);
  setCurrent(currentId)
  route.push(`/blog/${id}`)

 
}
 
  return (
<>
<Head>
<title>Blog || {blogName[blogName.length - 1]}</title>
</Head>
 <article className="is-flex flex-column gap-2">

{
  posts.map((post) => {
      return (
        <PostCard key={post.uri} post={post.node} type={'posts'}></PostCard>
      )
    })
}
 
<div className="is-flex justify-between w-100 align-center">
{
  pagination?.posts?.pageInfo?.hasPreviousPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.endCursor} data-current='before' onClick={nextPage}>Previous Posts</button>
  : <button className="button is-link" disabled>Previous Posts</button>
}
{
  pagination?.posts?.pageInfo?.hasNextPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.endCursor} onClick={nextPage}>Next Posts</button>
: <button className="button is-link" data-current='after' disabled>Next Posts</button>
}

</div>
 </article>
</>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const slugs = slug.join("")
  const response = await client.query({
    query:  GET_PAGINATION_NEXT ,
    variables: {
      after: slugs
    }
  });
  const pagination = response?.data;
 
  const responsePrev = await client.query({
    query: GET_PAGINATION_PREV,
    variables: {
      before: pagination.posts?.pageInfo?.startCursor,
    },
  });
  
 
  const prevPost = responsePrev?.data;
  return {
    props: {
      pagination,
      prevPost
    },
  };
}