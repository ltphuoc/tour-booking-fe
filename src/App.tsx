import axiosClient from "api/axiosClient";
import MyRouter from "routers/index";

function App() {
  const storedToken = localStorage.getItem("token");

  console.log(storedToken);
  if (storedToken) {
    axiosClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${storedToken}`;
      return config;
    });
  }

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
