import React, { useContext } from 'react'
import NavigationItem, { NavItemType } from './NavigationItem'
//import { NAVIGATION_DEMO } from 'data/navigation'
import ncNanoId from 'utils/ncNanoId'
import { AuthContext } from 'context/AuthContext'

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Home',
    // type: "none",
    // children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: '/listing-tour',
    name: 'Tours',
    // type: "megaMenu",
    // megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: '/listing-stay',
    name: 'Destination',
    // type: "megaMenu",
    // megaMenu: megaMenuDemo,
  },
  // {
  //   id: ncNanoId(),
  //   href: '/account/:id',
  //   name: 'Account',
  //   // type: "megaMenu",
  //   // megaMenu: megaMenuDemo,
  // },
  {
    id: ncNanoId(),
    href: '/account-savelists',
    name: 'My Booking',
    // type: "megaMenu",
    // megaMenu: megaMenuDemo,
  },
]

function Navigation() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.getIdToken || false;

  const updatedNavigation = NAVIGATION_DEMO.map((item) => {
    if (item.name === 'Account' || item.name === 'My Bill') {
      return { ...item, hidden: !isAuthenticated };
    }
    return item;
  });

  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {updatedNavigation.map((item) => {
        if (item.hidden) {
          return null;
        }
        return <NavigationItem key={item.id} menuItem={item} />;
      })}
    </ul>
  );
}


export default Navigation