import Head from 'next/head';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { AboutCard } from '../components/about-card';
import { useEffect } from 'react';
 
export default function Home({siteInfo,portofolio, about }) {
 
  useEffect(() => {
    
    async function test(){
      const gets = await fetch("https://jsonplaceholder.typicode.com/todos/1")
      const res = await gets.json()
      console.log(res);
    }
    test()
  },[])

  return (
  <>
  
 <Head>
 <title>{siteInfo?.siteTagLine}</title>
 </Head>
 {/* <BannerPage hero={hero}/> */}
<AboutCard about={about} />
<PortoCard portofolio={portofolio} />

</>
  )
}

 
export async function getServerSideProps(){
  // const response = await client.query({
  //   query: GET_ALL_POSTS,
  // });

  // const posts = response?.data?.posts?.nodes
 
  const responsePortofolio = await client.query({
    query:  GET_PORTOFOLIO,
  });

 
  const responseAbout = await client.query({
    query: GET_ABOUT,
  });

 
  const portofolio = responsePortofolio?.data?.portofolios?.nodes
  const  about = responseAbout?.data?.pageBy 
  
  
  return {
    props: {
      portofolio,
      about,
    }
  }
}
