import Head from 'next/head';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { AboutCard } from '../components/about-card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout';
import { GET_HERO } from '../source/get-hero';
import { BannerPage } from '../components/banner-page';
import PageLoaders from '../components/page-loader';
 
export default function Home({siteInfo,portofolio, about ,hero}) {
  const {pathname} = useRouter()

  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
   if(portofolio){
    const timer = setTimeout(() => {
      setIsLoading(false)
      }, 1000);
      return () => clearTimeout(timer);
   }
  },[])


  return (

<>
<Head>
 <title>{siteInfo?.siteTagLine}</title>
</Head>
 {
  pathname === "/" ? <BannerPage hero={hero}/> : ""
}

{
  isLoading ? <PageLoaders />
  : <MainLayout>
<AboutCard about={about} />
 <PortoCard portofolio={portofolio} />
</MainLayout>
 
}
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

  const responseHero = await client.query({
    query: GET_HERO,
  });
 
  const hero = responseHero?.data?.heroSections?.nodes
  const portofolio = responsePortofolio?.data?.portofolios?.nodes
  const  about = responseAbout?.data?.pageBy 
  
  
  return {
    props: {
      portofolio,
      about,
      hero
    }
  }
}
