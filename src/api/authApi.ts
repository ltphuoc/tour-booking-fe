import axiosClient from "./axiosClient";

type googlePostType = {
  idToken: String;
};

const authApi = {
  loginWithGoogle(data: googlePostType) {
    const url = "/auth/google-login";
    return axiosClient.post(url, data);
  },
};

export default authApi;
