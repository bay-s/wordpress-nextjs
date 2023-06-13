import '../styles/index.css'
import '../styles/bulma.min.css'
import '../styles/custom.css'
import '../styles/loading.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'aos/dist/aos.css';
import { ApolloProvider, gql } from '@apollo/client'
import { client } from '../lib/apollo'
import { GET_MENUS } from '../source/get-menu'
import { GET_TITLE } from '../source/get-title';
import Head from 'next/head';
import BlogLaoyout from '../components/blog-layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import AOS from 'aos';
import { StateProvider } from '../lib/state-context';

function MyApp({ Component, pageProps }) {
  const {pathname} = useRouter()
  const [item,setItem] = useState({
    categories:[],
    footerInfo:[],
    menus:[],
    siteInfo:[]
  })
useEffect(() => {
  AOS.init()
  getCategories()
  getFooter()
  getSiteTitle()
  getMenus()
  },[])
  
 const getCategories = async () => {
   const response = await fetch(`/api/get-categories`)
   const data = await response.json()
   setItem(prevState => ({
    ...prevState,
    categories: data
  }));
  
   console.log(item);
 }

 const getFooter = async () => {
  const response = await fetch(`/api/get-footer`)
  const data = await response.json()
  setItem(prevState => ({
    ...prevState,
    footerInfo: data
  }));
  
 }

 const getMenus= async () => {
  const response = await fetch(`/api/get-menus`)
  const data = await response.json()
  setItem(prevState => ({
    ...prevState,
    menus: data
  }));
  
 }

 const getSiteTitle = async () => {
  const response = await fetch(`/api/get-site-title`)
  const data = await response.json()
  setItem(prevState => ({
    ...prevState,
    siteInfo: data
  }));
  
 }

 const value = {
  menus:item.menus,
  siteInfo:item.siteInfo,
  categories:item.categories,
  footerInfo:item.footerInfo,
 }
 
 
  return (
<StateProvider value={value}>

  <Head>
  <link rel="icon" href={item.siteInfo?.favicon}></link>
  </Head>
<ApolloProvider client={client}>
    {
      pathname === "/" ? <>
      <Component {...pageProps} />
      </>
      : <BlogLaoyout categories={item.categories}>
      <Component {...pageProps} />
      </BlogLaoyout>
    }
</ApolloProvider>

 </StateProvider>
    )
}
 
export default MyApp;

