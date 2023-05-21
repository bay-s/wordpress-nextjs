import Head from 'next/head';
import { client } from '../lib/apollo';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import PortoCard from '../components/portofolio-card';
import { GET_ABOUT  } from '../source/get-about';
import { AboutCard } from '../components/about-card';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout';
import { GET_HERO } from '../source/get-hero';
import { BannerPage } from '../components/banner-page';
 
export default function Home({siteInfo,portofolio, about ,hero}) {
  const {pathname} = useRouter()
   console.log(pathname);
  return (

<>
<Head>
 <title>{siteInfo?.siteTagLine}</title>
</Head>
 {
  pathname === "/" ? <BannerPage hero={hero}/> : ""
}

<MainLayout>
<AboutCard about={about} />
 <PortoCard portofolio={portofolio} />
</MainLayout>

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
