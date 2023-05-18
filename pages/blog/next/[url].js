import { useRouter } from "next/router"
import PostCard from "../../../components/PostCard"
import { client } from "../../../lib/apollo"
import { GET_PAGINATION_NEXT } from "../../../source/post-pagination"
import Head from "next/head"


const NextPagination = ({pagination}) => {
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
  pagination?.posts?.pageInfo?.hasNextPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.endCursor} data-current='next' onClick={nextPage}>Next Posts</button>
: <button className="button is-link"   disabled>Next Posts</button>
}

</div>
 </article>
</>
    )
}

export default NextPagination

export async function getServerSideProps(context) {
    const postId = context.query.url;
console.log(context.query);
console.log('slugs');
    const response = await client.query({
      query:  GET_PAGINATION_NEXT ,
      variables: {
        after: postId
      }
    });
    const pagination = response?.data;
   
    return {
      props: {
        pagination
      },
    };
  }