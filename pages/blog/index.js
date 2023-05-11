
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { GET_ALL_POSTS } from "../../source/get-all-post";
import HomeSidebar from "../../components/home-sidebar";
import { useContext } from "react";
import { AuthContext } from "../state-context";

export default function BlogPage( {posts}) {
  const { menus, siteInfo, categories, footerInfo } = useContext(AuthContext);
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
        <PostCard key={post.uri} post={post}></PostCard>
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