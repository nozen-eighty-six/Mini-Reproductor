import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile__container p-4">
      <Link
        className="block top-0 left-0  text-[clamp(1.4rem,1.5vw,1.6rem)] mb-4"
        to="/"
      >
        <i className="ri-arrow-left-line text-white"></i>
      </Link>
      <div className="profile__info flex  items-center gap-4">
        <div
          className="profile__avatar bg-[#535353] w-[130px] h-[130px] rounded-full
            flex justify-center items-center text-6xl
        "
        >
          <i className="ri-user-line text-white"></i>
        </div>
        <div>
          <span className="text-white text-[clamp(1.4rem,1.5vw,1.6rem)]">
            <strong>{user?.name || ""}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
