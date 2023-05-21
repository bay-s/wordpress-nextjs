
import Image from "next/image"
 
 

export const AboutPage = ({skills}) => {
 
    return(
<article className="is-flex flex-column gap-3">

{/* PASSION */}
<div className="is-flex flex-column align-start gap-7">
<ul className="is-flex align-center gap-2">
    <li>
        <span className="txt-white title is-2">02 -</span>
    </li>
    <li>
        <span className="has-text-primary is-title title is-2">PASSION</span>
    </li>
</ul>

 <div className="columns is-multiline">

 <div className="column ">
     <ul className="is-flex flex-column align-center gap-1  ">
      <li>
      <Image
    src="/img/music.png"
    width={200}
    height={200}
    alt="Image description"  
     />
      </li>
      <li>
        <h3 className="is-title title is-3 txt-white">MUSIC</h3>
      </li>
      </ul>
      <span className="lh-base has-text-grey-light py-5">
      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </span>
   </div>

   <div className="column ">
     <ul className="is-flex flex-column align-center gap-1  ">
      <li>
      <Image
    src="/img/game-controller.png"
    width={200}
    height={200}
    alt="Image description"  
     />
      </li>
      <li>
        <h3 className="is-title title is-3 txt-white">GAMES</h3>
      </li>
      </ul>
      <span className="lh-base has-text-grey-light py-5">
      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </span>
   </div>

   <div className="column ">
     <ul className="is-flex flex-column align-center gap-1  ">
      <li>
      <Image
    src="/img/book.png"
    width={200}
    height={200}
    alt="Image description"  
     />
      </li>
      <li>
        <h3 className="is-title title is-3 txt-white">STORY</h3>
      </li>
      </ul>
      <span className="lh-base has-text-grey-light py-5">
      Browse & download free and premium 8,722 Processor Icons in line, colored outline, flat, glyph, gradient, dualtone, isometric, . 
      </span>
   </div>


 </div>


</div>
{/* END PASSION */}
{/* START SKILL SET */}
<div className="is-flex flex-column align-start gap-7">
<ul className="is-flex align-center gap-2">
    <li>
        <span className="txt-white title is-2">03 -</span>
    </li>
    <li>
        <span className="has-text-primary is-title title is-2">SKILLS</span>
    </li>
</ul>
<div className="columns is-multiline">
 {
  skills.map(skill => {
 
        return(
        <div className="column is-6 is-flex align-center gap-1">
        <div className="is-flex align-center gap-1 w-100  ">
      <figure class={!skill.featuredImage  ? "hide" : "image is-64x64"}>
     {skill.featuredImage?.node?.sourceUrl && (
    <img   src={skill?.featuredImage?.node?.sourceUrl} />
    )}
          </figure>
          <div className="is-flex flex-column gap-1 w-100">
          <h1 className="txt-white is-title">{skill?.title}</h1>
          <progress class="progress is-primary" value="15" max="100">15%</progress>
          </div>
        </div>
        </div>
        )
    })
 }
</div>
{/* END COLUMNS */}
</div>
{/* END SKILL SET */}
</article>
    )
}
 