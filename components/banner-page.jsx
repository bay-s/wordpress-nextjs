import { useContext } from "react"
import { AuthContext } from "../pages/state-context"


export const BannerPage = ( ) => {
    const value = useContext(AuthContext)

    return(
        <section class="banner-hero ">
    {/* {
      hero.map(heros => {
        return(
<div class="hero-body txt-white is-flex flex-column align-center m-auto gap-1">
  <h1 class="banner-title  ">
      {heros?.title}
  </h1>         
 <article className='is-title  banner-text' dangerouslySetInnerHTML={{__html: heros?.content}}>   
 </article>
</div>     
        )
      })
    } */}

    {
      value.hero.map(heros => {
        return(
          <div class="banner-hero-body txt-white is-flex flex-column align-center m-auto gap-2">
  <h1 class="banner-title  is-title">
  {heros?.title}
  </h1>         
 
  <article className='is-title  banner-text' dangerouslySetInnerHTML={{__html: heros?.content}}>   
 </article>
  <button className="button is-link is-large">Contact</button>
</div> 
        )
      })
    }
  


</section>
    )
}