import Head from 'next/head';
import PortoCard from '../components/portofolio-card';
import { AboutCard } from '../components/about-card';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout';
import { BannerPage } from '../components/banner-page';
import PageLoaders from '../components/page-loader';
import { AuthContext } from '../lib/state-context';
 
export default function Home( ) {
  const {pathname} = useRouter()
  const { siteInfo } = useContext(AuthContext)
  const [datas,setDatas] = useState({
    about:[],
    portofolio:[],
    hero:[]
  })
  const [isLoading,setIsLoading] = useState(true)
 
  useEffect(() => {
    fetchAbout()
    fetchHero()
    fetchPortofolio()
  
   if(datas?.portofolio){
    const timer = setTimeout(() => {
      setIsLoading(false)
      }, 1000);
      return () => clearTimeout(timer);
   }

  },[])

const fetchAbout = async () => {
  const response = await fetch(`/api/get-about`)
  const data = await response.json()
  setDatas(prevState => ({
   ...prevState,
   about: data
 }));
 
  console.log(data);
}

const fetchHero = async () => {
  const response = await fetch(`/api/get-hero`)
  const data = await response.json()
  setDatas(prevState => ({
   ...prevState,
   hero: data
 }));
 
  console.log(data);
}

const fetchPortofolio = async () => {
  const response = await fetch(`/api/get-portofolio`)
  const data = await response.json()
  setDatas(prevState => ({
   ...prevState,
   portofolio: data
 }));
 
  console.log(data);
}

console.log( siteInfo);
  return (

<>
<Head>
 <title>{siteInfo?.siteTitle} || {siteInfo?.siteTagLine}</title>
</Head>
 {
  pathname === "/" ? <BannerPage hero={datas?.hero}/> : ""
 }

{
  isLoading ? <PageLoaders />
  : <MainLayout>
<AboutCard about={datas?.about} />
 <PortoCard portofolio={datas?.portofolio} />
</MainLayout>
 
}
</>
  )
}

 
export async function getServerSideProps(){
 
  return {
    props: { }
  }
}
