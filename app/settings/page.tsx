/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

// Imports 
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Toggle from "../components/toggle/toggle";
import Slider from "../components/slider/slider";
import CryptoJS from "crypto-js";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedDarkMode = Cookies.get("darkMode");
    const savedFontSize = Cookies.get("fontSize");
    const savedPassword = Cookies.get("password");

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
    if (savedPassword) {
      setSavedPassword(savedPassword);
      setIsPasswordSet(true);
    }
  }, []);

  const handleSaveSettings = () => {
    Cookies.set("darkMode", JSON.stringify(darkMode), { expires: 365 });
    Cookies.set("fontSize", fontSize.toString(), { expires: 365 });
    if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(password, "secret-key").toString();
      Cookies.set("password", encryptedPassword, { expires: 365 });
      setSavedPassword(encryptedPassword);
      setIsPasswordSet(true);
    }
  };

  const handleDecrypt = () => {
    const decryptedPassword = CryptoJS.AES.decrypt(savedPassword, "secret-key").toString(CryptoJS.enc.Utf8);
    if (decryptedPassword === password) {
      alert("Password is correct!");
    } else {
      alert("Password is incorrect!");
    }
  };

  return (
    <div className={`min-h-screen p-8 pb-20 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} font-sans flex flex-col gap-8`}>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Toggle toggled={darkMode} setToggled={setDarkMode} id="darkModeToggle" />
        </div>
        <div className="flex items-center justify-between">
          <span>Font Size</span>
          <Slider value={fontSize} setValue={setFontSize} min={12} max={24} />
        </div>
        <div className="flex flex-col gap-2">
          <span>Password</span>
          <input
            type="password"
            className="p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {isPasswordSet && (
            <button
              className="mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
              onClick={handleDecrypt}
            >
              Decrypt
            </button>
          )}
        </div>
        <button
          className="mt-4 px-6 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
