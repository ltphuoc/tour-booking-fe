import axiosClient from "./axiosClient";
import { tourType } from "api/tourApi";

export type tourPriceType = {
  id: Number;
  tourId: Number;
  priceAdults: Number;
  priceChildren: Number;
  priceInfants: Number;
  tour: tourType[];
};

// export type TourData = {
//   tourId: Number;
//   tourName: String;
//   tourDescription: String;
//   placeId: Number;
//   duration: Number;
//   cost: Number;
//   available: Number;
// };

const tourPriceApi = {
  getAll(params?: any) {
    const url = "/TourPrices";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/TourPrices/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/TourPrices/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/TourPrices/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: tourPriceType) {
    const url = "/TourPrices";
    return axiosClient.post(url, data);
  },

  update(data: tourPriceType) {
    const url = "/TourPrices";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/TourPrices/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourPriceApi;
