import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import helpHttp from "../../hooks/helpHttp";

import { SERVER_URL } from "../../Const/server";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

const LogIn = ({ login, handleLogin }) => {
  /* document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target == document.getElementById("sign__up__button")) {
      console.log("clicked");
      e.preventDefault();
      document.querySelector(".log__in").classList.remove("show");
      //refSignUp.current.classList.remove("hidden");
      // refSignUp.current.style.display = "block";
      document.querySelector(".sign__up").classList.add("show");
    }
  });*/
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  //const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log("LogIn hijo");
  const handleSubmit = async (e) => {
    try {
      const res = await helpHttp().post(SERVER_URL + "/login", {
        body: form,
        credentials: "include",
      });
      console.log(res);

      if (res.token) {
        //setAlert(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyUser = async () => {
    try {
      const res = await helpHttp().post(SERVER_URL + "/api/user/verificar", {
        headers: {
          "Content-Type": "Application/json",
        },
        body: form,
      });
      if (res) {
        //Crear un slice para guardar el usuario
        dispatch(addUser(res)); //Cambiar para solo enviar información necesaria desde el servidor y no toda la información del user
        await handleSubmit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`log__in login-animate-fadeInUp xs:w-[100%] md:w-[550px]  lg:w-[450px]`}
        onAnimationEnd={(e) => {
          e.target.classList.remove("login-animate-fadeInUp");
        }}
      >
        <div className={`transition-all duration-300 show`}>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)]  text-white mb-2">
            Log In
          </h2>
          <span className="text-[clamp(0.875rem,1.5vw,1rem)]  text-white/80 inline-flex gap-2">
            {"You do not have an account?"}
            <a
              href="#"
              id="sign__up__button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="underline decoration-solid text-[#8a86f6]"
            >
              Sign Up
            </a>
          </span>
          <form
            className="create-account__container flex flex-col gap-4 mt-8 mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-4 h-[114px]">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="py-3 px-3 text-[clamp(1rem,2vw,1.25rem)]"
                value={form.email || ""}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="py-3 px-3 text-[clamp(1rem,2vw,1.25rem)]"
                value={form.password || ""}
                onChange={handleChange}
              />
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-[#6e54b5] text-white py-2 px-3 rounded-md text-[clamp(1rem,2vw,1.25rem)]"
            onClick={verifyUser}
          >
            Log In
          </button>
        </div>
      </div>
      {/*alert && (
        <Alert show={alert} setAlert={setAlert}>
          <p className="text-white">You have successfully logged in</p>
        </Alert>
      )*/}
    </>
  );
};

export default LogIn;
