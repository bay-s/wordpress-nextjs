 
import { useRouter } from "next/router";
import Footer from "./Footer";
import { BannerPage } from "./banner-page";
import HomeSidebar from "./home-sidebar";
import Header from "./header";
 

function MainLayout(props) {
 console.log(props);
 const {pathname} = useRouter()
 console.log(pathname);
  return (
<>
<Header />
<main  id="main-container">

{
  pathname === "/" ? <BannerPage /> : ""
}

<div className='container w-100 ' id="containers">
  <section className="is-flex flex-column gap-5" id="main-element">
    {props.children}
  </section>
  {/* <section className="columns">
       <div className='column is-3 py-0'>
     <HomeSidebar categories={props.categories}/>
       </div>
        <div className='column is-flex flex-column  '>
          {props.children}
          </div>
    </section> */}
</div>

</main>
   <Footer footerInfo={props.footerInfo}/>
   </>
  );
}

 
export default MainLayout;

 