import '../styles/index.css'
import '../styles/bulma.min.css'
import '../styles/custom.css'
import '../styles/loading.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'aos/dist/aos.css';
import { ApolloProvider, gql } from '@apollo/client'
import { client } from '../lib/apollo'
import { GET_MENUS } from '../source/get-menu'
import { GET_CATEGORIES } from '../source/get-categories';
import { GET_TITLE } from '../source/get-title';
import Head from 'next/head';
import { GET_FOOTER } from '../source/get-footer-info';
import BlogLaoyout from '../components/blog-layout';
import {  StateProvider } from './state-context';
import MainLayout from '../components/layout';
import { useRouter } from 'next/router';
import { GET_HERO } from '../source/get-hero';
import { useEffect } from "react";
import AOS from 'aos';

function MyApp({ Component, pageProps,siteProps}) {
  const {pathname} = useRouter()

 
useEffect(() => {
  AOS.init()
 
  },[])
  
 const value = {
  menus:siteProps.menus,
  siteInfo:siteProps.siteInfo,
  categories:siteProps.categories,
  footerInfo:siteProps.footerInfo,
  hero:siteProps.hero
 }
 const Layout = pathname === '/' ? MainLayout : BlogLaoyout;
console.log(pathname);
  return (
<StateProvider value={value}>

<Layout categories={siteProps.categories} footerInfo={siteProps.footerInfo}>
<Head>
  <link rel="icon" href={siteProps.siteInfo?.favicon}></link>
</Head>
 <ApolloProvider client={client}>
          <Component {...pageProps} />
</ApolloProvider>
 </Layout>

 </StateProvider>
    )
}

MyApp.getInitialProps = async (ctx) => {
 
  const responseCat = await client.query({
    query:GET_CATEGORIES,
  })
 
  const response = await client.query({
    query: GET_MENUS,
  });
 
 
  const responseTitle = await client.query({
    query: GET_TITLE,
  });
 
  const responseFooter = await client.query({
    query: GET_FOOTER,
  });

  const responseHero = await client.query({
    query: GET_HERO,
  });


  const hero = responseHero?.data?.heroSections?.nodes
  const menus = response?.data?.menuItems?.edges;
  const siteInfo = responseTitle.data?.getHeader
  const categories = responseCat?.data?.categories?.nodes
  const footerInfo = responseFooter?.data?.getFooter
 
  const siteProps = {
    menus,
    siteInfo,
    categories,
    footerInfo,
    hero
  }
  return {
    siteProps
  };
};

export default MyApp;