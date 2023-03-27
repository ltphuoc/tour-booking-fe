import axiosClient from "./axiosClient";
import { bookingType, createBookingType } from "api/bookingApi";

export type paymentType = {
  id: Number;
  bookingId: Number;
  paymentMethod: String;
  paymentDate: Date;
  paymentAmount: Number;
  status: Number;
  paymentCode: String;
  paymentImage: String;
  booking: bookingType;
};

const paymentApi = {
  getAll(params?: any) {
    const url = "/Bookings";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/Bookings/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/Bookings/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/Bookings/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: createBookingType) {
    const url = "/Bookings";
    return axiosClient.post(url, data);
  },

  update(data: paymentType) {
    const url = "/Bookings";
    return axiosClient.put(url, data);
  },
  putImage(id: Number, image: string) {
    const url = `/payments/${id}`;
    return axiosClient.put(url, image);
  },

  delete(id: Number) {
    const url = `/Bookings/${id}`;
    return axiosClient.delete(url);
  },
};

export default paymentApi;
