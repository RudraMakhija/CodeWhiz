import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
import { classnames } from "../utils/general";
import { langOptions } from "../constants/langOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LangDropdown from "./LangDropdown";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const javascriptDefault = `console.log('Hello, World!')`


const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");

  const [language, setLanguage] = useState(langOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };
  
    axios
      .request(options)
      .then((response) => {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err;
        const status = err.response ? err.response.status : null;
        
        if (status === 429) {
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        } else {
          showErrorToast(
            `An error occurred: ${error.message || 'Unknown error'}`,
            10000
          );
        }
        
        setProcessing(false);
      });
  };
  
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
  
    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;
  
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully!");
      }
    } catch (err) {
      setProcessing(false);
      const errorMessage = err.response?.data?.message || 'An error occurred';
      showErrorToast(errorMessage);
    }
  };
  

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
<div className="min-h-screen flex flex-col">
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />

  <Navbar />

  <div className="flex flex-row gap-8 mt-4">
    <div className="px-4 py-2 flex items-center gap-4">
      <h1 className="text-xl font-bold">Select Language:</h1>
      <LangDropdown onSelectChange={onSelectChange} />
    </div>
    <div className="px-4 py-2 flex items-center gap-4">
      <h1 className="text-xl font-bold">Select Theme:</h1>
      <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
    </div>
  </div>

  <main className="flex flex-row space-x-4 items-start px-4 py-4 flex-grow">
    <div className="flex flex-col w-full h-full justify-start items-end">
      <CodeEditor
        code={code}
        onChange={onChange}
        language={language?.value}
        theme={theme.value}
      />
      <p className="text-red-500 font-bold">To quickly run your code, press Ctrl + Enter.</p>
    </div>

    <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
      <OutputWindow outputDetails={outputDetails} />
      <div className="flex flex-col items-end">
        <CustomInput
          customInput={customInput}
          setCustomInput={setCustomInput}
        />
        <button
          onClick={handleCompile}
          disabled={!code}
          className={classnames(
            "mt-4 rounded-lg shadow-lg px-6 py-3 bg-blue-500 text-white font-semibold transition-transform transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed",
            !code ? "opacity-50" : "hover:bg-blue-600"
          )}
        >
          {processing ? "Processing..." : "Run Code"}
        </button>
        
      </div>
      {outputDetails && <OutputDetails outputDetails={outputDetails} />}
    </div>
  </main>

  <footer className="bg-[#3a1c71] flex justify-center items-center gap-4 py-3">
    <div className="text-[1rem] text-white">
      Developed and maintained by Rudra Makhija.
    </div>
    <div className="flex gap-4 text-2xl text-white">
      <FaLinkedin className="cursor-pointer" />
      <FaGithub className="cursor-pointer" />
    </div>
  </footer>
</div>

  );
};
export default Landing;