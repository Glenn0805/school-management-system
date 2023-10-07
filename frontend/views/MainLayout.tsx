import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import { useRouteMetadata } from 'Frontend/util/routing';
import { Suspense,useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md'
import router from 'Frontend/routes'

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  const [theme, setTheme] = useState<any>( localStorage.getItem("theme") || "light");
  const routesPages =router.routes[0].children;
  const changeTheme=(themeColor:string)=>{
    setTheme(themeColor);

    localStorage.setItem("theme",themeColor)
    document.documentElement.setAttribute('theme', themeColor)
  }


  const renderNavLink =routesPages?.map((page)=>(
    <NavLink className={navLinkClasses} key={page.id} to={page.path || "/"}>
      {page.handle.title}
    </NavLink>
  ));

  document.documentElement.setAttribute('theme', localStorage.getItem("theme") || "light")
  

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">My App</h1>
          <nav>
           {renderNavLink}
          </nav>
        </header>
      </div>
      
      <div slot="navbar" className='flex items-center justify-between w-full pr-m'>
        <div className='flex items-center'>
          <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
          <h2 className="text-l m-0">
            {currentTitle}
          </h2>
        </div>
        {
          theme == "dark" ? 
          (<MdOutlineLightMode onClick={()=>{changeTheme("light")}} className="flex text-xl" />) 
          :
          (<MdLightMode onClick={()=>{changeTheme("dark")}}  className="flex text-xl"/>)
        }
        
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
