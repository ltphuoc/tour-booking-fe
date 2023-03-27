import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import tourApi, { tourType } from "api/tourApi";
import { DEMO_STAY_CATEGORIES } from "data/taxonomies";
import { DEMO_AUTHORS } from "data/authors";
import { useParams } from "react-router-dom";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: {
    id: any;
    name: any;
  }[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "OUR TOURS",
  subHeading = "Popular tours that Chisfis recommends for you",
  headingIsCenter,
  tabs,
}) => {
  const [tourList, setTourList] = useState<tourType[]>([]);
  const [card, setCard] = useState([]);
  const [tabActiveState, setTabActiveState] = useState(tabs![0].id);
  const { id } = useParams();
  
  useEffect(() => {
    (async () => {
      const { data } = await tourApi.getById(Number(id));
      setTourList(data);
      setCard(
        data
          .map((e: tourType) => {
            return {
              id: e.id,
              authorId: 10,
              date: "May 20, 2021",
              href: "/listing-stay-detail",
              listingCategoryId: 17,
              title: "Best Western Cedars Hotel ",
              featuredImage:
                "https://images.pexels.com/photos/5191371/pexels-photo-5191371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              galleryImgs: [
                "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              ],
              commentCount: 70,
              viewCount: 602,
              like: false,
              address: "1 Anzinger Court",
              reviewStart: 4.8,
              reviewCount: 28,
              //price: e.cost.toString(),
              maxGuests: 6,
              bedrooms: 10,
              bathrooms: 3,
              saleOff: "-10% today",
              isAds: null,
              map: { lat: 55.2094559, lng: 61.5594641 },
            };
          })
          .map((post: any, index: any): StayDataType => {
            //  ##########  GET CATEGORY BY CAT ID ######## //
            const category = DEMO_STAY_CATEGORIES.filter(
              (taxonomy) => taxonomy.id === post.listingCategoryId
            )[0];

            return {
              ...post,
              id: `stayListing_${index}_`,
              saleOff: !index ? "-20% today" : post.saleOff,
              isAds: !index ? true : post.isAds,
              author: DEMO_AUTHORS.filter(
                (user) => user.id === post.authorId
              )[0],
              listingCategory: category,
            };
          })
      );
    })();
  }, [tabActiveState]);

  const renderCard = (stay: StayDataType) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      {tabs && tabs.length !== 0 && (
        <HeaderFilter
          tabActiveState={tabActiveState}
          setTabActiveState={setTabActiveState}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
          onClickTab={() => {}}
        />
      )}
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {/* {DEMO_DATA.map((stay) => renderCard(stay))} */}
        {card.length !== 0 && card.map((tour) => renderCard(tour))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
