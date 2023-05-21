import Head from 'next/head';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { AboutCard } from '../components/about-card';
import { useEffect } from 'react';
import { GET_SKILLS } from '../source/get-skills';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout';
 
export default function Home({siteInfo,portofolio, about }) {
  const {pathname} = useRouter()
   console.log(pathname);
  return (

<MainLayout>
<Head>
 <title>{siteInfo?.siteTagLine}</title>
 </Head>
 
<div>
<AboutCard about={about} />
 <PortoCard portofolio={portofolio} />
</div>
</MainLayout>

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
