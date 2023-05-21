import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../lib/state-context";

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
    <a class="navbar-item is-bold is-title" href="/">
     {siteInfo?.siteTitle}
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={openDropdown}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class={isOpen ? "navbar-menu fade is-active" : "navbar-menu fade"}>
    <div class="navbar-start">
 
{
  menus.map((menu) => {
    const hasChildItems = menu.node.childItems.edges.length > 0;
 
   return hasChildItems ? <div class="navbar-item has-dropdown is-hoverable" key={menu.id}>
          <a class="navbar-link">{menu.node.label}</a>
          <div class="navbar-dropdown px-2">
            {menu.node.childItems.edges.map((childItem) => (
              <Link
                href={`/page${childItem.node.path}`}
                class="navbar-item"
                key={childItem.node.id}
              >
                {childItem.node.label}
              </Link>
            ))}
          </div>
        </div>

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
 
 