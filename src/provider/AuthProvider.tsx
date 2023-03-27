import authApi from "api/authApi";
import axiosClient from "api/axiosClient";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { auth } from "service/firebase";
import { AuthContext } from "../context/AuthContext";

// import { auth } from "../firebaseSetup";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      // const token = await firebaseUser?.getIdToken();
      // if (token) {
      //   const res = await authApi.loginWithGoogle({ idToken: token });
      //   if (res.data.status.isSuccess) {
      //     axiosClient.defaults.headers.common[
      //       "Authorization"
      //     ] = `Bearer ${res.data.data.token}`;
      //   }
      // }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
