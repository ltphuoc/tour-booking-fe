import tourApi, { tourType } from "api/tourApi";
import Heading2 from "components/Heading/Heading2";
import StayCard from "components/StayCard/StayCard";
import { DEMO_AUTHORS } from "data/authors";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { DEMO_STAY_CATEGORIES } from "data/taxonomies";
import { StayDataType } from "data/types";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "shared/Pagination/Pagination";
import destinationApi from "./../../api/destinationApi";
import TabFilters from "./TabFilters";

export interface SectionGridFilterCardProps {
  className?: string;
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  const { id } = useParams();

  const [card, setCard] = useState([]);

  useEffect(() => {
    (async () => {
      const destination = await (
        await destinationApi.getById(Number(id))
      ).data.data;
      const tour = await (
        await tourApi.getAll({ destinationId: id })
      ).data.data;

      setCard(
        tour
          .map((e: tourType) => {
            return {
              id: e.id,
              authorId: 10,
              date: "May 20, 2021",
              href: `/listing-stay-detail/${e.id}`,
              listingCategoryId: 17,
              title: e.tourName,
              galleryImgs: destination.destinationImages.map(
                (b: any) => b.image
              ).slice(0, 3),
              commentCount: 70,
              viewCount: 602,
              like: false,
              address: destination.name,
              reviewStart: 4.8,
              reviewCount: 28,
              //price: e.cost.toString(),
              maxGuests: e.tourCapacity,
              // bedrooms: e.available,
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
  }, []);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
      style={{marginTop: '-200px'}}
    >
      <Heading2 />

      {/* <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div> */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {card?.map((stay: any) => (
          <StayCard key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
