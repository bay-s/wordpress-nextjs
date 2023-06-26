import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../lib/state-context";
import HeaderDropdown from "./header-dropdown";

export default function Header( ) {
  const { menus, siteInfo,} = useContext(AuthContext);
 const [isOpen,setIsOpen] = useState(false)

 const openDropdown = (e) => {
  e.preventDefault()
  setIsOpen(!isOpen)
 }
    return(
<header className="header">

 <nav class="footer-dark justify-between  align-center navbar is-fixed-top py-3 px-5" role="navigation" aria-label="main navigation">
 <div class="navbar-brand">
    <Link   href="/">
     <a class="navbar-item is-bold is-title is-clickable">{siteInfo?.siteTitle}</a> 
    </Link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={openDropdown}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>


  <div id="navbarBasicExample" class={`navbar-menu  fade ${isOpen ? 'is-active' : ''}`}>
    
    <div class="navbar-start">
    {
  menus.map((menu) => {
    const hasChildItems = menu.node.childItems.edges.length > 0;
    const item = {
      name:menu?.node?.label,
      childItems:menu.node.childItems.edges
    }
   return hasChildItems ? <HeaderDropdown item={item} />
   :  <a href={`/page/${menu.node.path}`} class="navbar-item" key={menu.node.id}>
          {menu.node.label}
       </a>
  })
 
}
<a class="navbar-item " href="/blog">
  Blog
</a>
     </div>

</div>
  {/* END NAVBAR MENU */}
  
 </nav>

</header>
    )
}
 
 