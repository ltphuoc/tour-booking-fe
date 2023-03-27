import { tourDetailType } from "api/tourDetailsApi";
import axiosClient from "./axiosClient";
import { tourGuideType } from "./tourGuideApi";
import { tourPriceType } from "./tourPriceApi";

export type tourType = {
  id: Number;
  tourName: String;
  tourDuration: Number;
  tourCapacity: Number;
  status: Number;
  tourGuideId: Number;
  tourGuide: tourGuideType;
  tourPrices: tourPriceType[];
  tourDetails: tourDetailType[];
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

const tourApi = {
  getAll(params?: any) {
    const url = "/tours";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/tours/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/tours/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/tours/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: tourType) {
    const url = "/tours";
    return axiosClient.post(url, data);
  },

  update(data: tourType) {
    const url = "/tours";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/tours/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
