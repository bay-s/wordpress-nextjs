import Head from 'next/head';
import PortoCard from '../components/portofolio-card';
import { AboutCard } from '../components/about-card';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout';
import { BannerPage } from '../components/banner-page';
import PageLoaders from '../components/page-loader';
import { AuthContext } from '../lib/state-context';
import { GET_HERO } from '../source/get-hero';
import { GET_ABOUT } from '../source/get-about';
import { GET_PORTOFOLIO } from '../source/get-portofolio';
import { client } from '../lib/apollo';
 
 
 
export default function Home({data}) {
  const {pathname} = useRouter()
  const { siteInfo } = useContext(AuthContext)
 
  const [isLoading,setIsLoading] = useState(true)
 
  useEffect(() => {

   if(data?.portofolio){
    const timer = setTimeout(() => {
      setIsLoading(false)
      }, 1000);
      return () => clearTimeout(timer);
   }

  },[])

 
console.log( siteInfo);
  return (

<>
<Head>
 <title>{siteInfo?.siteTitle} || {siteInfo?.siteTagLine}</title>
</Head>
 {
  pathname === "/" ? <BannerPage hero={data?.hero}/> : ""
 }

{
  isLoading ? <PageLoaders />
  : <MainLayout>
<AboutCard about={data?.about} />
 <PortoCard portofolio={data?.portofolio} />
</MainLayout>
 
}
</>
  )
}

 
export async function getServerSideProps(){
  const responseHero = await client.query({
    query: GET_HERO,
  });
  const responsePortofolio = await client.query({
    query:  GET_PORTOFOLIO,
  });
  const responseAbout = await client.query({
    query: GET_ABOUT,
  });

  const  about = responseAbout?.data?.pageBy 
  const hero = responseHero?.data?.heroSections?.nodes
  const portofolio = responsePortofolio?.data?.portofolios?.nodes

  const data = {
    about,
    hero,
    portofolio
  }
  return {
    props: {
      data
     }
  }
}
