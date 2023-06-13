
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function BlogPage( ) {
 
  const router = useRouter()
  const blogName = router.asPath.split("/")
  const [hasNextPage,setHasNextPage] = useState(false)
  const [hasPreviousPage,setHasPreviousPage] = useState(false)

  const [post,setPost] = useState([])
  let currentId = null
  useEffect(() => {
 
    const fetchPagination = async ( ) => {
      const post  = await fetch(`/api/get-post-pagination-next?slug=${null}`)
      const dataPost = await post .json()
      setHasNextPage(dataPost?.posts?.pageInfo?.hasNextPage)
      setHasPreviousPage(dataPost?.posts?.pageInfo?.hasPreviousPage)
      setPost(dataPost)

      
    }
    fetchPagination()
  },[])

  const nextPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    currentId = id; // Update the currentId variable
    fetchNextPagination(currentId);
 
  }

  const prevPage = async (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    fetchPrevPagination(id)
  }

  const fetchNextPagination = async (id) => {
 
    const post  = await fetch(`/api/get-post-pagination-next?slug=${id}`)
    const dataPost = await post .json()
    setPost(dataPost )
    setHasNextPage(dataPost?.posts?.pageInfo?.hasNextPage)
    setHasPreviousPage(dataPost?.posts?.pageInfo?.hasPreviousPage)
    console.log(dataPost);
 
  }

  const fetchPrevPagination = async (id) => {
 
    const post  = await fetch(`/api/get-post-pagination-prev?slug=${id}`)
    const dataPost = await post .json()
    setPost(dataPost )
    setHasNextPage(dataPost?.posts?.pageInfo?.hasNextPage)
    setHasPreviousPage(dataPost?.posts?.pageInfo?.hasPreviousPage)
    console.log(dataPost);
 
  }
 

  console.log(post);
  return (
<>
<Head>
 <title>Category || {blogName[blogName.length - 1]}</title>
</Head>
 
   
 {
  post?.posts?.edges.map((post) => {
    return (
        <PostCard key={post?.node.uri} post={post?.node} type={'posts'}></PostCard>
      )
    })
}
 
<div className="is-flex justify-between w-100 align-center">
{
 hasPreviousPage ? <button className="button is-link" data-id={post?.posts?.pageInfo?.startCursor} onClick={ prevPage}>Previous Posts</button>
  : <button className="button is-link" disabled>Previous Posts</button>
}

{
  hasNextPage ? <button className="button is-link" data-id={post?.posts?.pageInfo?.endCursor} onClick={nextPage}>Next Posts</button>
: <button className="button is-link"  disabled>Next Posts</button>
}

</div>
</>
  )
}

export async function getServerSideProps( ) {
 
  return {
    props: { }
 
  };
}