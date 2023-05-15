
import { client } from "../../lib/apollo";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import Head from "next/head";
import { GET_PORTOFOLIO } from "../../source/get-portofolio";
 
export default function PortofolioPages({portofolio}) {
 
  const route = useRouter()
  const blogName = route.asPath.split("/")
 
  return (
<>
<Head>
 <title>Category || {blogName[blogName.length - 1]}</title>
</Head>
 
   
 {
 portofolio.map((post) => {
      return (
        <PostCard key={post.uri} post={post} type={'prtofolio'}></PostCard>
      )
    })
}
 

</>
  )
}

export async function getServerSideProps(context) {
    const responsePortofolio = await client.query({
        query:  GET_PORTOFOLIO,
      });
      
      const portofolio = responsePortofolio?.data?.portofolios?.nodes
  return {
    props: {
        portofolio
    },
  };
}