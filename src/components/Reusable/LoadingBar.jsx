const LoadingBar = () => {
  return (
    <div
      className="w-[600px] playlist-animate-fadeInUp h-2  bg-gray-200 relative overflow-hidden rounded"
      onAnimationEnd={(e) =>
        e.target.classList.remove("playlist-animate-fadeInUp")
      }
    ></div>
  );
};

export default LoadingBar;
