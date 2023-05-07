import Link from "next/link";

export default function Header({menus ,title}) {

    return(
<header className="header">
 <nav class="has-background-black-bis align-center navbar is-fixed-top py-3 px-5" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item is-bold" href="/">
     {title}
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu is-active">
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

 
    </div>

 

  </div>
</nav>
        </header>
    )
}
 
 