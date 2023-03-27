import axiosClient from "./axiosClient";

export type transportationTypeData = {
  id: Number;
  transportationType: String;
  transportationDescription: String;
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

const transportationsApi = {
  getAll(params?: any) {
    const url = "/Transportations";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/Transportations/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/Transportations/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/Transportations/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: transportationTypeData) {
    const url = "/Transportations";
    return axiosClient.post(url, data);
  },

  update(data: transportationTypeData) {
    const url = "/Transportations";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Transportations/${id}`;
    return axiosClient.delete(url);
  },
};

export default transportationsApi;
