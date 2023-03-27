import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionHero from "components/SectionHero/SectionHero";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import { TaxonomyType } from "data/types";
import { useEffect, useState } from "react";
import destinationApi, { destinationsType } from "./../../api/destinationApi";
import SectionVideos from "./SectionVideos";

// const DEMO_CATS: TaxonomyType[] = [
//   {
//     id: "1",
//     href: "/listing-stay",
//     name: "New Yourk",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Singapore",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Paris",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "London",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Tokyo",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Maldives",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

// const DEMO_CATS_2: TaxonomyType[] = [
//   {
//     id: "1",
//     href: "/listing-stay",
//     name: "Enjoy the great cold",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "222",
//     href: "/listing-stay",
//     name: "Sleep in a floating way",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "3",
//     href: "/listing-stay",
//     name: "In the billionaire's house",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "4",
//     href: "/listing-stay",
//     name: "Cool in the deep forest",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "5",
//     href: "/listing-stay",
//     name: "In the billionaire's house",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

function PageHome() {
  const [destination, setDestinations] = useState<TaxonomyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await destinationApi.getAll();
      const list = data.data
        .filter((x: destinationsType) => x.status != 0)
        .map((e: destinationsType) => {
          return {
            id: e.id,
            href: `/listing-stay/${e.id}`,
            name: e.name,
            taxonomy: "category",
            count: Math.floor(Math.random() * 99) + 1,
            thumbnail: e.destinationImages[0].image,
          };
        });
      setDestinations(list);
      setIsLoading(false);
      //console.log("list",data);
    })();
  }, []);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />
        {/* SECTION 1 */}
        {destination?.length !== 0 && (
          <SectionSliderNewCategories
            categories={destination}
            uniqueClassName="PageHome_s1"
          />
        )}
        {/* SECTION2 */}
        <SectionOurFeatures />
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          {destination.length !== 0 && (
            <SectionGridFeaturePlaces
              tabs={destination
                .sort(function (a, b) {
                  return Math.random() - 0.5;
                })
                .map((e): any => {
                  return { id: e.id, name: e.name };
                })
                .slice(0, 4)}
            />
          )}
        </div> */}
        {/* SECTION */}
        {/* <SectionHowItWork /> */}
        {/* SECTION 1 */}
        {isLoading ? (
          <div className="flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="relative py-16">
            <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
            {destination?.length !== 0 && (
              <SectionSliderNewCategories
                categories={destination}
                categoryCardType="card4"
                itemPerRow={4}
                heading="Suggestions for discovery"
                subHeading="Popular places to stay that Chisfis recommends for you"
                sliderStyle="style2"
                uniqueClassName="PageHome_s2"
              />
            )}
          </div>
        )}
        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}
        {/* SECTION 1 */}
        {destination?.length !== 0 && (
          <SectionSliderNewCategories
            categories={destination}
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            uniqueClassName="PageHome_s3"
          />
        )}
        {/* SECTION */}
        <SectionVideos />
        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
