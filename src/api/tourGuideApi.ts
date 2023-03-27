import axiosClient from "./axiosClient";
import { tourType } from 'api/tourApi';

export type tourGuideType = {
  id: Number;
  tour: tourType[];
  tourGuideName: String;
  tourGuideAge: Number;
  tourGuidePhone: String;
  tourGuideEmail: String;
  tourGuideLanguageSpoken: String;
  tourGuideAva: String;
  tourGuideBio: String;
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

const tourGuideApi = {
  getAll(params?: any) {
    const url = "/TourGuides";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/TourGuides/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/TourGuides/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/TourGuides/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: tourGuideType) {
    const url = "/TourGuides";
    return axiosClient.post(url, data);
  },

  update(data: tourGuideType) {
    const url = "/TourGuides";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/TourGuides/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourGuideApi;
