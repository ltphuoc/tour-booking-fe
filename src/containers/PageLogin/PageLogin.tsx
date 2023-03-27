import authApi from "api/authApi";
import axiosClient from "api/axiosClient";
import "firebase/compat/auth";
import facebookSvg from "images/Facebook.svg";
import googleSvg from "images/Google.svg";
import twitterSvg from "images/Twitter.svg";
import { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "service/firebase";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

interface LoadingProps {
  className?: string;
}

const Loading: FC<LoadingProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${className}`}
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const login = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      const res = await authApi.loginWithGoogle({ idToken: token });
      if (res.data.status.isSuccess) {
        console.log("res.data.data.token", res.data.data.token);
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.data.token}`;
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Tour Booking</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3" style={{ cursor: "pointer" }}>
            {isLoading ? (
              <Loading />
            ) : (
              <a
                onClick={login}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={googleSvg}
                  alt="Continue with Google"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  Continue with Google
                </h3>
              </a>
            )}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
