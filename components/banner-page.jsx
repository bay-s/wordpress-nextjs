import { useContext } from "react"
import { AuthContext } from "../lib/state-context"
 

export const BannerPage = ({hero}) => {
    const value = useContext(AuthContext)
 
    {/* {
      titles.map(title => {
       return(
        <span  data-aos="fade-right"
     data-aos-duration="1000"
     data-aos-easing="ease-in-sine">{title},</span>
       )
      })
    } */}
    return(
<section class="banner-hero  ">
    {
      hero.map(heros => {
       const titles =  heros?.title.split(",")
        return(
<div class="banner-hero-body txt-white is-flex flex-column align-start gap-2 ">
    <div className="w-100 banner-title is-title  is-flex flex-column align-start">
    {
      titles.map((title, index)=> {
        const letters = title.split('');
 
        return (
    <div key={`txt-container-${index}`} className="is-flex  "  >
      {letters.map((letter, letterIndex) => (
        <h1 key={`${title}-${letterIndex}`}  className="is-bold hvr-wobble-vertical text-wrap">
          {
            letter === " " ? <span className="px-2"></span> : letter
          }
        </h1>
      ))}
    
    </div>
  );
      })
    }
  </div>

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