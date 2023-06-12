import { useRouter } from "next/router"
import PostCard from "../../../components/PostCard"
import { client } from "../../../lib/apollo"
import { GET_PAGINATION_NEXT } from "../../../source/get-pagination-next"
import Head from "next/head"
import { useEffect, useState } from "react"
import PageLoaders from "../../../components/page-loader"
import Link from "next/link"

const NextPagination = ({pagination}) => {
    const route = useRouter()
    const blogName = route.asPath.split("/")
    const posts = pagination?.posts?.edges
   console.log(pagination);
   const [isLoading,setIsLoading] = useState(true)

   const nextPage = (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    setIsLoading(true)
    alert(id)
    route.push(`/blog/next/${id}`)
  }
   

  const prevPage = (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    setIsLoading(true)
    route.push(`/blog/prev/${id}`)
    alert(id)
  }
   

  useEffect(() => {
    setIsLoading(true)
    if(posts){
      console.log('test');
     const timer = setTimeout(() => {
       setIsLoading(false)
       }, 1000);
       return () => clearTimeout(timer);
    }
   },[posts])

  
    return(
isLoading ? <PageLoaders /> :
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
{/* {
  pagination?.posts?.pageInfo?.hasPreviousPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.startCursor} data-current='prev' onClick={prevPage}>Previous Posts</button>
  : <button className="button is-link" disabled>Previous Posts</button>
}
{
  pagination?.posts?.pageInfo?.hasNextPage ? <button className="button is-link" data-id={pagination?.posts?.pageInfo?.endCursor} data-current='next' onClick={nextPage}>Next Posts</button>
: <button className="button is-link"   disabled>Next Posts</button>
} */}
{
  pagination?.posts?.pageInfo?.hasPreviousPage ? <Link href={`/blog/prev/${pagination?.posts?.pageInfo?.startCursor}`}  >
    <a className="button is-link">
    Previous Posts
    </a>
  </Link>
  : <button className="button is-link" disabled>Previous Posts</button>
}
{
  pagination?.posts?.pageInfo?.hasNextPage ? <Link href={`/blog/next/${pagination?.posts?.pageInfo?.endCursor}`}  >
    <a  className="button is-link">Next Posts</a>
  </Link>
: <button className="button is-link" data-current='next' disabled>Next Posts</button>
}

</div>
 </article>
</>
    )
}

export default NextPagination

export async function getServerSideProps(context) {
    const postId = context.query.url;
 
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