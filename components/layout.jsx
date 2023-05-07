 
import HomeSidebar from "./home-sidebar";

function Layout(props) {
 console.log(props);
  return (
<main id="main-container">

<div className='mt-5 pt-5 container' id="containers">
      <section className="columns">
       <div className='column is-3 py-0'>
     <HomeSidebar categories={props.categories}/>
       </div>
        <div className='column is-flex flex-column  '>
          {props.children}
          </div>
    </section>
</div>

</main>
  );
}

 
export default Layout;

 