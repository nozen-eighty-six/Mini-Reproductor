import { NavLink } from "react-router";
import MusicPlayerFooter from "./Home/MusicPlayerFooter";
import { useSelector } from "react-redux";

const PlayerNav = () => {
  const { user } = useSelector((state) => state.user);
  console.log("PlayerNav");
  console.log(user);
  return (
    <>
      <header className="header     w-full h-full  ">
        <nav className="nav  h-full   rounded-t-2xl rounded-b-2xl bg-[#181b22] flex flex-col py-4 px-3 text-xl ">
          <a
            href="/"
            className="nav__logo inline-flex justify-center items-center mb-16 text-white gap-y-5 gap-x-2  "
          >
            <img src="/Images/azur-lane-logo.png" alt="" className="w-[15%]" />
            MiniPlayer
          </a>

          <div className="nav__menu ">
            <ul className="nav__list flex flex-col gap-2 text-white ">
              <li className="nav__item">
                <NavLink to={"/"} className="nav__link   w-full h-full">
                  <i className="ri-home-line"></i>
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to={"/categories"} className="nav__link w-full h-full">
                  <i className="ri-list-unordered"></i>
                  Categories
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to={"/playlist"} className="nav__link w-full h-full">
                  <i className="ri-play-list-line"></i>
                  Playlist
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="nav__options  ">
        <div className="h-full  flex justify-between ">
          <form
            action=""
            className="nav__search flex items-center h-[45px] w-[480px] py-[10px] px-5 bg-[#23262d] rounded-3xl"
          >
            <input
              type="text"
              placeholder="Search for a song"
              className="nav__input   w-full bg-transparent text-white"
            />
            <i className="ri-search-line search__icon bg-[#23262d] text-[#646568] text-2xl cursor-pointer"></i>
          </form>
          <div className="user__options  flex gap-3  items-center">
            <div className="user__avatar  ">
              <a href="" className="user__avatar-link w-full  ">
                <img
                  src="/Images/user-avatar.jpg"
                  alt=""
                  className="user__avatar-img h-[50px] w-[50px] rounded-full"
                />
              </a>
            </div>
            <div className="user__info flex flex-col justify-center gap-1">
              <span className="user__name text-white text-sm font-bold">
                {user.name || ""}
              </span>
              <span className="user__type text-white/75 bg-[#082b33] text-sm rounded-full w-max px-[20px] py-0">
                {Object.keys(user).length === 0
                  ? ""
                  : user.roles[0].name.charAt(0).toUpperCase() +
                    user.roles[0].name.substring(1).toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <MusicPlayerFooter />
    </>
  );
};

export default PlayerNav;
