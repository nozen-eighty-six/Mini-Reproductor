import { createBrowserRouter, Outlet, useNavigate } from "react-router";
import PlayerNav from "../components/PlayerNav";
import Home from "../pages/Home";
import helpHttp from "../hooks/helpHttp";
import { SERVER_URL } from "../Const/server";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user) || null;
  //Validar cada vez que entra a Home para poder validar si el token es válido, sino para que lo redireccione a login
  useEffect(() => {
    const validateUserAndToken = async () => {
      try {
        console.log(user);
        if (user == null || user == {}) {
          alert("Por favor inicie sesión");
          navigate("/login");
          return;
        }

        const res = await helpHttp().get(SERVER_URL + "/api/token", {
          credentials: "include",
        });
        //console.log("Respuesta del servidor:", res);

        // Validar si el token es válido
        if (!res.valid) {
          console.log("Token inválido");
          alert("Token inválido, por favor inicie sesión nuevamente");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        if (error.status === 401) {
          alert("Token inválido, por favor inicie sesión nuevamente");
          navigate("/login");
        }
      }
    };

    validateUserAndToken();
  }, [user]);

  return (
    <>
      <PlayerNav />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
