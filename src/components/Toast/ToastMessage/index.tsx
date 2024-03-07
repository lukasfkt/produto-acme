import { useEffect, useState } from "react";
import {
  BsCheckCircle,
  BsExclamationTriangle,
  BsInfoCircle,
  BsX,
  BsXCircle,
} from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { GrNotification } from "react-icons/gr";

import "./style.css";
export interface ToastProps {
  id: string | number;
  type: "info" | "success" | "error" | "alert" | "notification";
  label: string;
  message: string;
  duration?: number;
  urlImage?: string;
  urlNotification?: string;
  onRemoveMessage?(id: number | string): void;
}

export function ToastMessage({
  id,
  message,
  type,
  label,
  duration,
  urlImage,
  onRemoveMessage,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, duration || 7000); // 7s

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, duration]);

  function handleRemoveToast() {
    setVisible(false);
    setTimeout(() => {
      onRemoveMessage!(id);
    }, 300); // Tempo de espera para remover completamente o toast após a animação
  }

  function handleAnimationEnd() {
    if (!visible) {
      onRemoveMessage!(id);
    }
  }

  return (
    <>
      {type === "notification" ? (
        <>
          <a href="/notifications">
            <article
              className={`toast relative w-fit border mx-auto flex items-center py-4 bg-white shadow-lg mb-4 z-[1000] ${
                visible ? "show" : "hide"
              }`}
              onAnimationEnd={handleAnimationEnd}
              onClick={handleRemoveToast}
            >
              <div
                className={`h-full w-[4px] absolute top-0 left-0 ${
                  type === "notification" ? "bg-transparent" : ""
                }`}
              ></div>
              <div className="px-6">
                {urlImage == undefined ? (
                  <GrNotification size={24} color="#29df67" />
                ) : (
                  <img
                    src={`${urlImage}`}
                    alt="Image Notification"
                    className="w-12"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-gray-800">{label}</h4>
                <span className="text-sm text-gray-500">{message}</span>
              </div>
              <div className="h-full flex ml-6 px-6">
                <button
                  onClick={handleRemoveToast}
                  className="text-gray-400 hover:opacity-70"
                >
                  <MdClose size={22} />
                </button>
              </div>
            </article>
          </a>
        </>
      ) : (
        <>
          <article
            className={`toast relative border mx-auto flex items-center p-4 bg-white shadow-lg rounded-lg z-50 font-raleway w-[300px] ${
              visible ? "show" : "hide"
            }`}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleRemoveToast}
          >
            <div
              className={`h-full w-[4px] rounded-l-lg absolute top-0 left-0 ${
                type === "success" ? "bg-[#27AE60]" : ""
              } ${type === "info" ? "bg-[#212fe1]" : ""} ${
                type === "alert" ? "bg-[#F3C947]" : ""
              } ${type === "error" ? "bg-[#CD0C0C]" : ""}`}
            />
            <div className="mr-5">
              {type === "success" && (
                <BsCheckCircle size={22} color="#27AE60" />
              )}
              {type === "info" && <BsInfoCircle size={24} color="#212fe1" />}
              {type === "alert" && (
                <BsExclamationTriangle size={24} color="#F3C947" />
              )}
              {type === "error" && <BsXCircle size={24} color="#CD0C0C" />}
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-azulfy-rich-black">{label}</h4>
              <span className="text-sm text-azulfy-rich-black break-words w-[230px]">
                {message}
              </span>
            </div>
            <div className="absolute top-1 right-1">
              <button
                onClick={handleRemoveToast}
                className="text-gray-400 hover:opacity-70"
              >
                <BsX size={25} />
              </button>
            </div>
          </article>
        </>
      )}
    </>
  );
}
