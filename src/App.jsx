import "./App.css";
import "swiper/swiper-bundle.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PlayList from "./components/PlayList/PlayList";
import { useDispatch } from "react-redux";
import { setPlaying } from "./redux/playBackSlice";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import Profile from "./components/Home/User/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/playlist",
        element: <PlayList />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App");
    dispatch(setPlaying(false));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
