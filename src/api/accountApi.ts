import axiosClient from "./axiosClient";

export type accountType = {
  id: Number;
  email: String;
  password: String;
  firstName: String;
  phone: String;
  address: String;
  lastName: String;
  city: String;
  province: String;
  district: String;
  avatar: String;
  role: Number;
  status: Number;
};

const accountApi = {
  getAll(params?: any) {
    const url = "/auth/info";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/auth/info/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/auth/info/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/auth/info/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: accountType) {
    const url = "/auth/info";
    return axiosClient.post(url, data);
  },

  update(data: accountType) {
    const url = "/auth/info";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/auth/info/${id}`;
    return axiosClient.delete(url);
  },
};

export default accountApi;
