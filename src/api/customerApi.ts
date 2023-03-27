import axiosClient from "./axiosClient";

type customerData = {
  customerId: Number;
  name: String;
  address: String;
  email: String;
  phone: String;
};

const customerApi = {
  getAll(params?: any) {
    const url = "/Customer";
    return axiosClient.get(url, { params });
  },

  getByEmail(email: String) {
    const url = `/Customer/${email}`;
    return axiosClient.get(url);
  },

  create(data: customerData) {
    const url = "/Customer";
    return axiosClient.post(url, data);
  },

  update(data: customerData) {
    const url = "/Customer";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Customer/${id}`;
    return axiosClient.delete(url);
  },
};

export default customerApi;
