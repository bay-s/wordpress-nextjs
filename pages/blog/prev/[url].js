
import { useRouter } from "next/router"
import PostCard from "../../../components/PostCard"
import { client } from "../../../lib/apollo"
import Head from "next/head"
import { GET_PAGINATION_PREV } from "../../../source/get-pagination-prev"
import PageLoaders from "../../../components/page-loader"
import { useEffect, useState } from "react"
import Link from "next/link"


const PreviousPagination = ({pagination}) => {

    const route = useRouter()
    const blogName = route.asPath.split("/")
    const posts = pagination?.posts?.edges
    const [isLoading,setIsLoading] = useState(true)
    console.log(pagination);
 
    
   useEffect(() => {
    setIsLoading(true)
    if(posts){
      console.log('test');
     const timer = setTimeout(() => {
      console.log('stopu');
       setIsLoading(false)
       }, 1000);
       return () => clearTimeout(timer);
    }
   },[pagination])

  

   const nextPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    const currentId = e.target.dataset.current
    setIsLoading(true)
    route.push(`/blog/next/${id}`)
    alert(id)

  }
   
  
  const prevPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    route.push(`/blog/prev/${id}`)
    alert(id)
    setIsLoading(true)
  }
   
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
{
  pagination?.posts?.pageInfo?.hasPreviousPage ? <Link href={`/blog/prev/${pagination?.posts?.pageInfo?.startCursor}`}>
    <a className="button is-link">Previous Posts</a>
  </Link>
  : <button className="button is-link" disabled>Previous Posts</button>
}
{
  pagination?.posts?.pageInfo?.hasNextPage ? <Link href={`/blog/next/${pagination?.posts?.pageInfo?.endCursor}`}>
    <a class="button is-link">Next Posts</a>
  </Link>
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