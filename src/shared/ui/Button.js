"use client";

import { Oval } from "react-loader-spinner";

import ArrowLeftIcon from "../icons/ArrowLeftIcon";

export const ButtonPrimary = ({
  type = "button",
  text = "empty",
  style = "",
  borderRadius = 12,
  onClick = () => {},
  children,
  loader = false,
}) => {
  const clickHandler = () => {
    if (!loader) onClick();
  };

  return (
    <button
      type={type}
      className={`${style} font-medium w-full text-[14px] leading-[18px] tracking-[-0.015em] p-[12px] text-center select-none text-white items-center flex justify-center transition duration-[250ms] bg-[#00afff] cursor-pointer  `}
      style={{ borderRadius }}
      onClick={() => clickHandler()}
    >
      {children && <div className="mr-[8px]">{children}</div>}

      {!loader ? (
        <>{text}</>
      ) : (
        <Oval
          height={18}
          width={18}
          color="rgba(255, 255, 255, 1)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="rgba(255, 255, 255, 0.3)"
          strokeWidth={6}
          strokeWidthSecondary={6}
        />
      )}
    </button>
  );
};

export const ButtonOpacity = ({
  children,
  style = "",
  borderRadius = 20,
  padding = 12,
  onClick = () => {},
  title = "",
  disabled = false,
}) => {
  return (
    <button
      title={title}
      style={{ borderRadius, padding, opacity: disabled ? 0.4 : 1 }}
      className={`${style} ${
        disabled ? "cursor-default" : "cursor-pointer"
      }  group items-center relative flex flex-row max-w-[260px] [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const BackButton = ({ onClick = () => {}, style = "", children }) => {
  return (
    <button
      className={`${style} group rounded-[16px] px-[12px] py-[8px] text-center text-[#00afff] items-center flex justify-center
       cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
      onClick={onClick}
    >
      <ArrowLeftIcon />
    </button>
  );
};
