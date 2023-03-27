import FooterNav from "components/FooterNav";
import AccountPage from "containers/AccountPage/AccountPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingTourPage from "containers/ListingStayPage/ListingTourPage";
import Page404 from "containers/Page404/Page404";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageHome from "containers/PageHome/PageHome";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import PayPage from "containers/PayPage/PayPage";
import SiteHeader from "containers/SiteHeader";
import useWindowSize from "hooks/useWindowResize";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "shared/Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { Page } from "./types";
import ListingDestionationPage from './../containers/ListingStayPage/ListingDestinationPage';
import AccountSavelists from "containers/AccountPage/AccountSavelists";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/home-1-header-2", exact: true, component: PageHome },
  // { path: "/home-2", component: PageHome2 },
  // { path: "/home-3", component: PageHome3 },
  //
  { path: "/listing-stay", component: ListingDestionationPage },
  { path: "/listing-stay/:id", component: ListingStayPage },
  // { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail/:id", component: ListingStayDetailPage },
  //
  { path: "/listing-tour", component: ListingTourPage },
  //
  // {
  //   path: "/listing-experiences",
  //   component: ListingExperiencesPage,
  // },
  // {
  //   path: "/listing-experiences-map",
  //   component: ListingExperiencesMapPage,
  // },
  // {
  //   path: "/listing-experiences-detail",
  //   component: ListingExperiencesDetailPage,
  // },
  //
  // { path: "/listing-car", component: ListingCarPage },
  // { path: "/listing-car-map", component: ListingCarMapPage },
  // { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  // { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  // { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  // { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout/:id", component: CheckOutPage },
  { path: "/pay-done/:id", component: PayPage },
  //
  { path: "/author", component: AuthorPage },
  { path: "/account/:id", component: AccountPage },
  // { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  // { path: "/account-billing", component: AccountBilling },
  //
  // { path: "/blog", component: BlogPage },
  // { path: "/blog-single", component: BlogSingle },
  //
  // { path: "/add-listing-1", component: PageAddListing1 },
  // { path: "/add-listing-2", component: PageAddListing2 },
  // { path: "/add-listing-3", component: PageAddListing3 },
  // { path: "/add-listing-4", component: PageAddListing4 },
  // { path: "/add-listing-5", component: PageAddListing5 },
  // { path: "/add-listing-6", component: PageAddListing6 },
  // { path: "/add-listing-7", component: PageAddListing7 },
  // { path: "/add-listing-8", component: PageAddListing8 },
  // { path: "/add-listing-9", component: PageAddListing9 },
  // { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
  //
];

// const ProtectedRoute = ({ children }: any) => {
//   const user = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

const MyRoutes = () => {
  const WIN_WIDTH = useWindowSize().width || window.innerWidth;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        {/* <Route index element={<PageLogin />} />
        <Route path="/login" element={<PageLogin />} /> */}
        {pages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route
              key={path}
              element={
                <Component />
                // <ProtectedRoute>
                //   <ScrollToTop />
                //   <SiteHeader />
                //   <Component />
                //   {WIN_WIDTH < 768 && <FooterNav />}
                //   <Footer />
                // </ProtectedRoute>
              }
              path={path}
            />
          );
        })}
        <Route element={<Page404 />} />
      </Routes>
      {WIN_WIDTH < 768 && <FooterNav />}
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
