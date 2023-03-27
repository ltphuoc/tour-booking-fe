import Glide from "@glidejs/glide";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import useNcId from "hooks/useNcId";
import { FC, useEffect, useMemo } from "react";
import NextPrev from "shared/NextPrev/NextPrev";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const SectionDestinationCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Destinations",
  subHeading = "Descriptions for sections",
  className = "",
  itemClassName = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const UNIQUE_CLASS =
    "SectionSliderNewCategories__" + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  const renderCard = (item: TaxonomyType, index: number) => {
    switch (categoryCardType) {
      case "card3":
        return <CardCategory3 taxonomy={item} />;
      case "card4":
        return <CardCategory4 taxonomy={item} />;
      case "card5":
        return <CardCategory5 taxonomy={item} />;
      default:
        return <CardCategory3 taxonomy={item} />;
    }
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
        // desc={subHeading}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {categories &&
              categories.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  {renderCard(item, index)}
                </li>
              ))}
          </ul>
        </div>

        {/* {sliderStyle === 'style2' && (
          <NextPrev className="justify-center mt-16" />
        )} */}
      </div>
    </div>
  );
};

export default SectionDestinationCategories;
