import React from "react";

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <path
        fill="none"
        stroke="#d88c51"
        strokeDasharray="146.25568908691406 110.33323913574219"
        strokeLinecap="round"
        strokeWidth="6.4"
        d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z"
        style={{
          WebkitTransformOrigin: 50,
          MsTransformOrigin: 50,
          transformOrigin: 50,
        }}
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="2.083333333333333s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;256.58892822265625"
        ></animate>
      </path>
    </svg>
  );
};

export default Loader;
