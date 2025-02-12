import { NavLink } from "react-router";
import MusicPlayerFooter from "./Home/MusicPlayerFooter";
import { useSelector } from "react-redux";
import MusicPlayer from "./Home/MusicPlayer";
import { getGreetingByTime } from "../services/greeting";
import UserMenu from "./Home/User/UserMenu";
import { useState } from "react";
import AddSongButton from "./AddSongButton";
import { useSong } from "../hooks/useSong";

const PlayerNav = () => {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  //const [update, setUpdate] = useState(false);
  // const { handleInputChange } = useSong(setUpdate);
  const currentWidth = window.innerWidth;
  const handleShowMenu = () => {
    if (!showMenu == false) {
      const timeOut = setTimeout(() => {
        console.log("timeout");
        clearTimeout(timeOut);
        setShowMenu(!showMenu);
      }, 600);
    } else setShowMenu(!showMenu);
  };

  return (
    <>
      {showMenu && <UserMenu handleShowMenu={handleShowMenu} />}
      <header className="header     w-full h-full  ">
        <nav className="nav  h-full   lg:rounded-t-2xl lg:rounded-b-2xl bg-[#181b22] lg:flex lg:flex-col lg:py-4 lg:px-3 text-xl ">
          <a
            href="/"
            className="nav__logo   justify-center items-center mb-16 text-white gap-y-5 gap-x-2 
              xs:hidden lg:inline-flex 
            "
          >
            <img src="/Images/azur-lane-logo.png" alt="" className="w-[15%]" />
            <span className="xs:hidden lg:inline">MiniPlayer</span>
          </a>

          <div className="nav__menu   xs:w-full xs:h-full ">
            <ul className="nav__list flex xs:w-full xs:h-full xs:flex-row xs:justify-between lg:flex-col lg:justify-normal gap-2 text-white ">
              <li className="nav__item">
                <NavLink
                  to={"/"}
                  className="nav__link xs:inline-flex xs:flex-col xs:justify-center lg:flex-row lg:justify-normal   w-full h-full"
                >
                  <i className="ri-home-line"></i>
                  <span className=" lg:inline">Home</span>
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to={"/playlist"}
                  className="nav__link xs:inline-flex xs:flex-col xs:justify-center lg:flex-row lg:justify-normal w-full h-full"
                >
                  <i className="ri-play-list-line"></i>
                  <span className=" lg:inline">Playlist</span>
                </NavLink>
              </li>
              {/**
                 *   <li className="nav__item lg:hidden">
                <AddSongButton handleInputChange={handleInputChange} />
              </li>
                 */}

              <li className="nav__item lg:hidden">
                <NavLink
                  to={"/logo"}
                  className="nav__link xs:inline-flex xs:flex-col xs:justify-center xs:gap-1  lg:flex-row lg:justify-normal  w-full h-full"
                >
                  <img
                    src="/Images/azur-lane-logo.png"
                    alt=""
                    className="xs:w-[30px] lg:w-[15%]"
                  />
                  <span className=" lg:inline leading-[15px] text-center">
                    Mini Player
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="nav__options  ">
        <div className="xs:hidden lg:flex h-full   justify-between ">
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
          <div
            className="user__options  flex gap-3  items-center lg:cursor-pointer lg:relative"
            onClick={handleShowMenu}
          >
            <div className="user__avatar  ">
              <a
                href=""
                className="user__avatar-link w-full  "
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src="/Images/user-avatar.jpg"
                  alt=""
                  className="user__avatar-img h-[50px] w-[50px] rounded-full"
                />
              </a>
            </div>
            <div className="user__info flex flex-col justify-center gap-1">
              <span className="user__name text-white text-sm font-bold w-[60px]  overflow-hidden whitespace-nowrap overflow-ellipsis">
                {user?.name || user?.email}
              </span>
              {/*
                <span className="user__type text-white/75 bg-[#082b33] text-sm rounded-full w-max px-[20px] py-0">
                  {user != null
                    ? Object.keys(user).length === 0
                      ? ""
                      : user.roles[0].name.charAt(0).toUpperCase() +
                        user.roles[0].name.substring(1).toLowerCase()
                    : "Unknown"}
              </span>
              */}
            </div>
          </div>
        </div>
        <div className="mobile_nav__options xs:flex lg:hidden h-full w-[90%]  mx-auto   justify-between items-center">
          <span className="text-white">{getGreetingByTime()}</span>
          <button
            className="nav__options__mobile__config_btn white p-2 "
            onClick={handleShowMenu}
          >
            <i className="ri-settings-3-line text-2xl text-white"></i>
          </button>
        </div>
      </div>
      {currentWidth >= 1024 ? <MusicPlayerFooter /> : <MusicPlayer />}
    </>
  );
};

export default PlayerNav;
