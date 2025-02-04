import { useState } from "react";
import helpHttp from "../../hooks/helpHttp";
import { SERVER_URL } from "../../Const/server";
import Alert from "../Alert";

const CreateAccount = ({ login, handleLogin }) => {
  /* document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target == document.getElementById("log__in__button")) {
      console.log("clicked");
      e.preventDefault();
      //refSignUp.current.classList.remove("hidden");
      // refSignUp.current.style.display = "block";
      document.querySelector(".sign__up").classList.remove("show");
      document.querySelector(".log__in").classList.add("show");
    }
  });*/

  const [form, setForm] = useState({});
  //const [alert, setAlert] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const res = await helpHttp().post(SERVER_URL + "/api/user", {
        headers: {
          "Content-Type": "Application/json",
        },
        body: form,
        credentials: "include",
      });
      //setAlert(true);
      handleLogin();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="register-animate-fadeInUp sm:w-[100%] md:w-[550px]  lg:w-[450px]"
        onAnimationEnd={(e) => {
          e.target.classList.remove("register-animate-fadeInUp");
        }}
      >
        <div className={`show `}>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] text-white mb-2">
            Create an account
          </h2>
          <span className="text-[clamp(0.875rem, 1.5vw, 1rem)] text-white/80 inline-flex gap-2">
            Already have an account?{" "}
            <a
              href="#"
              id="log__in__button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="underline decoration-solid text-[#8a86f6]"
            >
              Log in
            </a>
          </span>
          <form
            className="create-account__container flex flex-col gap-4 mt-8 mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-4  h-[50px]">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name || ""}
                onChange={handleChange}
                className="w-1/2 py-3 px-3 text-[clamp(1rem,2vw,1.25rem)]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName || ""}
                onChange={handleChange}
                className="w-1/2 py-3 px-3 text-[clamp(1rem,2vw,1.25rem)]"
              />
            </div>
            <div className="flex flex-col gap-4 h-[114px]">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email || ""}
                onChange={handleChange}
                className="py-3 px-3"
              />
              <input
                type="password"
                name="password"
                value={form.password || ""}
                onChange={handleChange}
                placeholder="Enter your password"
                className="py-3 px-3"
              />
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-[#6e54b5] text-white py-2 px-3 rounded-md text-[clamp(1rem,2vw,1.25rem)]"
            onClick={handleSubmit}
          >
            Create account
          </button>
        </div>
      </div>
      {/*alert && (
        <Alert
          show={alert}
          setAlert={setAlert}
          classNameP={"bg-[#6e54b5] w-[400px] h-[60px] text-white"}
        />
      )*/}
    </>
  );
};

export default CreateAccount;
