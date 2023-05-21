  
import Footer from "./Footer";
import Header from "./header";
import HomeSidebar from "./home-sidebar";


function BlogLaoyout(props) {
 console.log(props);
  return (
<>
<Header />
<main className="mt-6 pt-5  " id="main-container">
 
<div className='container w-100 mt-auto' id="containers">
      <section className="columns">
       <div className='column is-3 py-0'>
     <HomeSidebar categories={props.categories}/>
       </div>
        <div className='column is-flex flex-column  '>
          {props.children}
          </div>
    </section>
</div>

<Footer /> 

</main>
 
   </>
  );
}

 
export default BlogLaoyout;

 