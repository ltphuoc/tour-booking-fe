import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionDestinationCategories from "components/SectionSliderNewCategories/SectionDestinationCategories";
import { TaxonomyType } from "data/types";
import { useEffect, useState } from "react";
import destinationApi, { destinationsType } from "./../../api/destinationApi";

function ListingDestionationPage() {
  const [destination, setDestinations] = useState<TaxonomyType[]>([]);
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
            count: 188288,
            thumbnail: e.destinationImages[0].image,
          };
        });
      setDestinations(list);
      //console.log("list",data);
    })();
  }, []);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION 1 */}
        {destination?.length !== 0 && (
          <SectionDestinationCategories
            categories={destination}
            uniqueClassName="PageHome_s1"
          />
        )}
      </div>
    </div>
  );
}

export default ListingDestionationPage;
