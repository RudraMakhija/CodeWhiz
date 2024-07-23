import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input...`}
        className={classnames(
          "focus:outline-none w-full border-2 border-gray-300 z-10 rounded-lg shadow-lg px-4 py-2 transition duration-200 bg-white mt-2 text-black placeholder-gray-500 hover:shadow-xl"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
