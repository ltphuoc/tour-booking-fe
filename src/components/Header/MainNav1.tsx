import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import { AuthContext } from "context/AuthContext";
import { FC, useContext } from "react";
import { auth } from "service/firebase";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import Navigation from "shared/Navigation/Navigation";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import SearchDropdown from "./SearchDropdown";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const user = useContext(AuthContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("token");
        // Redirect to Homepage after logout
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          <Navigation />
        </div>

        <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-0.5">
            <SwitchDarkMode />
            <SearchDropdown />
            <div className="px-1" />
            {user ? (
              <ButtonPrimary onClick={handleLogout}>Log out</ButtonPrimary>
            ) : (
              <ButtonPrimary href="/login">Log In</ButtonPrimary>
            )}
          </div>
          <div className="flex xl:hidden items-center">
            <SwitchDarkMode />
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
