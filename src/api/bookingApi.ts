import { tourDetailType } from "api/tourDetailsApi";
import axiosClient from "./axiosClient";
import { tourGuideType } from "./tourGuideApi";
import { tourPriceType } from "./tourPriceApi";
import { tourType } from 'api/tourApi';
import { paymentType } from "./paymentApi";

export type bookingType = {
  tourId: Number,
  customerId: Number,
  bookingDate: Date,
  numAdults: Number,
  numChildren: Number,
  numInfants: Number,
  totalPrice: Number,
  tour: tourType,
  customer: any,
  payments: paymentType[],
};

export type createBookingType = {
  tourId: Number;
  bookingDate: Date;
  numAdults: Number;
  numChildren: Number;
  numInfants: Number;
  totalPrice: Number;
  paymentMethod: String;
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

const bookingApi = {
  getAll(params?: any) {
    const url = "/bookings";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/bookings/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/bookings/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/bookings/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: createBookingType) {
    const url = "/bookings";
    return axiosClient.post(url, data);
  },

  update(data: bookingType) {
    const url = "/bookings";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/bookings/${id}`;
    return axiosClient.delete(url);
  },
};

export default bookingApi;
