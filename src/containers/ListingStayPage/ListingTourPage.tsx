import destinationApi, { destinationsType } from "api/destinationApi";
import tourApi, { tourType } from "api/tourApi";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import Heading2 from "components/Heading/Heading2";
import StayCard from "components/StayCard/StayCard";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Pagination from "shared/Pagination/Pagination";

export interface ListingStayPageProps {
  className?: string;
}

const ListingTourPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [destinationsResponse, toursResponse] = await Promise.all([
          destinationApi.getAll(),
          tourApi.getAll(),
        ]);

        const destinations = destinationsResponse.data.data;
        const tours = toursResponse.data.data;

        const newCard = tours.map((e: tourType) => {
          const destination = destinations.find(
            (d: destinationsType) => d.id === e.tourDetails[0].destination.id
          );
          return {
            id: e.id,
            authorId: 10,
            date: "May 20, 2021",
            href: `/listing-stay-detail/${e.id}`,
            listingCategoryId: 17,
            title: e.tourName,
            galleryImgs: e.tourDetails[0].destination.destinationImages
              .map((x) => x.image)
              .slice(0, 3),
            commentCount: 70,
            viewCount: 602,
            like: false,
            address: e.tourDetails.map((x) => x.destination.name),
            reviewStart: 4.8,
            reviewCount: 28,
            price: e.tourPrices[0].priceAdults ?? 0,
            maxGuests: e.tourCapacity,
            bedrooms: e.tourCapacity,
            bathrooms: 3,
            saleOff: "-10% today",
            isAds: null,
            map: { lat: 55.2094559, lng: 61.5594641 },
            destination,
          };
        });
        setCard(newCard);
        setIsLoading(false);
      } catch (error) {
        // handle error
      }
    })();
  }, []);

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingTourPage"
    >
      <Helmet>
        <title>Chisfis || Tour List</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION */}
        <div
          className={`nc-SectionGridFilterCard ${className}`}
          data-nc-id="SectionGridFilterCard"
        >
          <Heading2 />

          {/* <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div> */}
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
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {card?.map((stay: any) => (
                <StayCard key={stay.id} data={stay} />
              ))}
            </div>
          )}
          {!isLoading && (
            <div className="flex mt-16 justify-center items-center">
              <Pagination />
            </div>
          )}
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default ListingTourPage;
