import React, { FC, useEffect, useState } from "react";
import Heading from "shared/Heading/Heading";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { ReactNode } from "react";

export interface HeaderFilterProps {
  // tabActive: Number;
  tabs?: {
    id: any;
    name: any;
  }[];
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab: (item: Number) => void;
  tabActiveState: any;
  setTabActiveState: any;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  // tabActive,
  tabActiveState,
  setTabActiveState,
  tabs,
  subHeading = "",
  heading = "🎈 Latest Articles",
  onClickTab,
}) => {
  // const [tabActiveState, setTabActiveState] = useState(tabActive);

  // useEffect(() => {
  //   setTabActiveState(tabActiveState);
  // }, [tabActiveState]);

  const handleClickTab = (item: Number) => {
    onClickTab && onClickTab(item);
    setTabActiveState(item);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading}>{heading}</Heading>
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {tabs!.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActiveState === item.id}
              onClick={() => handleClickTab(item.id)}
            >
              {item.name}
            </NavItem>
          ))}
        </Nav>
        <span className="hidden sm:block flex-shrink-0">
          <ButtonSecondary className="!leading-none">
            <span>View all</span>
            <i className="ml-3 las la-arrow-right text-xl"></i>
          </ButtonSecondary>
        </span>
      </div>
    </div>
  );
};

export default HeaderFilter;
