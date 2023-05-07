
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
 
const HomeSidebar = ({categories}) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
  
   
    const searchPost = (e) => {
      e.preventDefault()
      // router.push(`/posts?search=${searchQuery}`);
      if(!searchQuery){
        return
      }
      router.push(`/search?q=${searchQuery}`)
    }
  
    const handlerChange = (e) => {
      const {name,value} = e.target
      setSearchQuery(value)
      console.log(searchQuery );
    }
    
    return(
<aside className='is-flex flex-column gap-1 home-sidebar'>

<form className="field py-3" onSubmit={searchPost}>
  <div className="control has-icons-left has-icons-right">
    <input className="input bg-transparent txt-white is-primary" type="text" placeholder="Search post" name='search'  onChange={handlerChange}/>
    <span className="icon is-small is-left">
      <i className="fa fa-check"></i>
    </span>
    <button className="icon is-small is-right no-border no-bg pt-2">
      <i className="fa fa-search is-clickable is-size-6"></i>
    </button>
  </div>
</form>

   <div className='is-flex flex-column gap-2 p-3' id="categories">
     <h3 className='is-title txt-white is-bold is-size-5'>
      Category
     </h3>
     <ul className='is-flex flex-column gap-1 menu-list'>
       {
        categories.length > 1 ? categories.map(cat => {
          return(
            <li className="border-butt">
              <Link href={`/categories${cat.uri}`} className='txt-white'>{cat.name}</Link>
            </li>
          )
        }) 
        : ""
       }
     </ul>
   </div>

 

  </aside>
    )
}

 

export default HomeSidebar