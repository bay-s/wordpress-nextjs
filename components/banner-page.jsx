import { useContext } from "react"
import { AuthContext } from "../lib/state-context"
 

export const BannerPage = ( ) => {
    const value = useContext(AuthContext)

    return(
<section class="banner-hero  ">
    {
      value.hero.map(heros => {
       const titles =  heros?.title.split(",")
        return(
<div class="banner-hero-body txt-white is-flex flex-column align-start gap-2 ">
 
  <h1 className="banner-title is-title  is-flex flex-column align-start">
    {
      titles.map(title => {
       return(
        <span  data-aos="fade-right"
     data-aos-duration="1000"
     data-aos-easing="ease-in-sine">{title},</span>
       )
      })
    }
  </h1>

  <article className='is-title  banner-text has-text-grey-light' dangerouslySetInnerHTML={{__html: heros?.content}}   >   
 </article>
  <button className="custom-btn hvr-sweep-to-right">Contact</button>
</div> 
        )
      })
    }
</section>
    )
}