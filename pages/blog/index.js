
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { GET_ALL_POSTS } from "../../source/get-all-post";
 
export default function BlogPage( {posts}) {
 
  const route = useRouter()
  const blogName = route.asPath.split("/")
 
  return (
<>
<Head>
 <title>Category || {blogName[blogName.length - 1]}</title>
</Head>
 
   
 {
  posts.map((post) => {
      return (
        <PostCard key={post.uri} post={post} type={'posts'}></PostCard>
      )
    })
}
 

</>
  )
}

export async function getServerSideProps(context) {
  const response = await client.query({
    query: GET_ALL_POSTS,
  });

  const posts = response?.data?.posts?.nodes
  return {
    props: {
      posts
    },
  };
}