"use client";

import { useState } from "react";
import { useQRCode } from "next-qrcode";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  Instagram,
  Smartphone,
  LightbulbOff,
  Lightbulb,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import {
  IG_HANDLE,
  PHONE_NUMBER,
  QR_CODE_DARK_COLOR,
  QR_CODE_LIGHT_COLOR,
  LANGUAGES,
} from "../constants/app";

interface MessageProps {
  message?: string;
  status?: {
    isError?: boolean;
    isSuccess?: boolean;
  };
}

export default function Home() {
  const [message, setMessage] = useState<MessageProps | null>(null);
  const { theme, setTheme } = useTheme();
  const { Image } = useQRCode();
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCopyToClipBoard = async (text: string, message?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage({
        message: `${message} copied to clipboard!`,
        status: {
          isSuccess: true,
        },
      });
    } catch (err) {
      setMessage({
        message: `Failed to copy! ${err}`,
        status: {
          isError: true,
        },
      });
    }
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const changeLanguage = (code: string) => {
    const newPath = `/${code}${pathname.replace(/^\/(en|fr|rw)/, "")}`;
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="min-h-screen lg:h-screen w-screen flex flex-col-reverse lg:flex-row items-center justify-end lg:justify-center gap-8 lg:gap-24 p-8 lg:p-24">
      <div className="w-full lg:w-[40%] min-h-[90vh] flex flex-col items-center lg:justify-center text-center font-bold italic py-12 shadow-2xl rounded-2xl">
        {message?.message && (
          <div className="flex items-center my-4 mx-4 justify-center bg-green-300 text-white p-4 rounded-md shadow-2xl">
            {message?.message}
          </div>
        )}
        <div className="flex flex-row my-6 gap-8">
          <button onClick={handleChangeTheme}>
            {theme === "light" ? <LightbulbOff /> : <Lightbulb />}
          </button>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md shadow-sm hover:bg-gray-100"
            >
              <Globe className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <span className="mx-8 my-4"> {t("description")}</span>
        <span className="font-extrabold mx-2 my-4 italic text-2xl">
          {t("name")}
        </span>
        <Image
          text={"https://www.instagram.com/annathecounselor"}
          options={{
            type: "image/png",
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: QR_CODE_DARK_COLOR,
              light: QR_CODE_LIGHT_COLOR,
            },
          }}
        />
        <span className="mx-2 my-4"> {t("hereForYou")}</span>
        <span className="mx-2 my-8"> {t("dontDie")}</span>
        <div
          className="flex flex-row justify-center items-center cursor-pointer mb-2"
          onClick={() => handleCopyToClipBoard(IG_HANDLE, "Instagram handle")}
        >
          <Instagram />
          <span className="ml-2">{IG_HANDLE}</span>
        </div>
        <div
          className="flex flex-row justify-center items-center cursor-pointer mt-2"
          onClick={() => handleCopyToClipBoard(PHONE_NUMBER, "Phone number")}
        >
          <Smartphone />
          <span className="ml-2">{PHONE_NUMBER}</span>
        </div>
      </div>
      <div className="w-full lg:w-[40%] h-full flex flex-col items-center justify-center rounded-full p-8">
        <img
          src="/anna-trans.png"
          alt="Anna The Consolor"
          className="w-full rounded-full cursor-pointer shadow-2xl"
        />
        <span className="mt-8 font-light text-center italic">
          "{t("title")}"
        </span>
      </div>
    </div>
  );
}
