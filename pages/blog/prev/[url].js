
import { useRouter } from "next/router"
import PostCard from "../../../components/PostCard"
import { client } from "../../../lib/apollo"
import Head from "next/head"
import { GET_PAGINATION_PREV } from "../../../source/get-pagination-prev"
import Link from "next/link"


const PreviousPagination = ({pagination}) => {

    const route = useRouter()
    const blogName = route.asPath.split("/")
    const posts = pagination?.posts?.edges
   console.log(pagination);
 
   const nextPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    const currentId = e.target.dataset.current
    alert(currentId);
    route.push(`/blog/${currentId}/${id}`)
    window.location.reload()
  }
   
    return(
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
  pagination?.posts?.pageInfo?.hasPreviousPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.startCursor} data-current='prev' onClick={nextPage}>Previous Posts</button>
  : <button className="button is-link" disabled>Previous Posts</button>
}
{
  pagination?.posts?.pageInfo?.hasNextPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.endCursor} onClick={nextPage}>Next Posts</button>
: <button className="button is-link" data-current='next' disabled>Next Posts</button>
}

</div>
 </article>
</>
    )
}

export default PreviousPagination

export async function getServerSideProps(context) {
    const postId = context.query.url;
console.log(context.query);
console.log('slugs');
    const response = await client.query({
      query: GET_PAGINATION_PREV ,
      variables: {
        before: postId
      }
    });
    const pagination = response?.data;
   
    return {
      props: {
        pagination
      },
    };
  }