 
import { useRouter } from "next/router";
import Footer from "./Footer";
import HomeSidebar from "./home-sidebar";
import Header from "./header";
 

function MainLayout(props) {
 

  return (
<>
<Header />
<main  id="main-container">

<div className='container w-100 ' id="containers">
  <section className="is-flex flex-column gap-5" id="main-element">
    {props.children}
  </section>
 
</div>

</main>
   <Footer />
   </>
  );
}

 
export default MainLayout;

 