import Head from 'next/head';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { GET_ALL_POSTS } from '../source/get-all-post';
 
 
export default function Home({ posts }) {
 
 console.log(posts);
 
  return (
    <>
       <Head>
        <title>Headless WP Next Starter</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>
 
      {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}></PostCard>
              )
            })
          }
 
 
      {/* <Footer>
       
      </Footer> */}
    </>
  )
}

export async function getServerSideProps(){
  const response = await client.query({
    query: GET_ALL_POSTS,
  });

  const posts = response?.data?.posts?.nodes

  console.log("ERR AT TOP");
  console.log(posts);
  return {
    props: {
      posts
    }
  }
}
