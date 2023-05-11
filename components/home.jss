import Head from 'next/head';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { GET_ALL_POSTS } from '../source/get-all-post';
 

export default function Home({ posts,siteInfo }) {
 
  return (
    <>
 <Head>
 <title>{siteInfo?.siteTagLine}</title>
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
 
  return {
    props: {
      posts
    }
  }
}
