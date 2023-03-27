import imagePng from "images/hero-right.png";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            Booking Tours
          </h2>
          <div>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
              Accompanying us, you have a trip full of experiences. With
              Chisfis, booking accommodation, resort villas, hotels.
            </p>
            <div className="opacity-0">
              dkal;sdka;sldkasl;dkals;dk;lasdk;alsdkasl;dksal;dk;laskdas;ldsakl;das
            </div>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              in autem ipsam accusamus porro, libero repellat iure dolorum aut
              tenetur magnam? Vero ab sit repellat nostrum itaque unde non hic.
            </p>
            <div className="opacity-0">
              dkal;sdka;sldkasl;dkals;dk;lasdk;alsdkasl;dksal;dk;laskdas;ldsakl;das
            </div>
          </div>
          <ButtonPrimary>Start your search</ButtonPrimary>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div>
      </div>

      {/* <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div> */}
    </div>
  );
};

export default SectionHero;
