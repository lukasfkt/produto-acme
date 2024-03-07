import { useEffect, useState, useCallback, useRef } from "react";
import { ToastMessage, ToastProps } from "../ToastMessage";
import { useToast } from "../../../hooks/useToast";

function ToastContainer() {
  const [messages, setMessages] = useState<ToastProps[]>([]);

  const { showToast } = useToast();

  useEffect(() => {
    function handleAddToast(event: CustomEventInit) {
      const {
        label,
        message,
        type,
        duration,
        urlImage,
        urlNotification,
      }: Omit<ToastProps, "id"> = event.detail;
      showToast &&
        setMessages((prevState) => [
          {
            id: Date.now(),
            label,
            message,
            type,
            duration,
            urlImage,
            urlNotification,
          },
          ...prevState,
        ]);
    }
    document.addEventListener("addtoast", handleAddToast);

    return () => {
      document.removeEventListener("addtoast", handleAddToast);
    };
  }, [showToast]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef || !showToast) {
      return;
    }
    const container: any = containerRef.current;
    const toastCount = container.childElementCount;

    if (toastCount > 1) {
      // Adiciona a classe 'shift-down' para empurrar os toasts anteriores para baixo
      container.children[toastCount - 2].classList.add("shift-down");
    }
  }, [messages]);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed top-1 right-1 z-[1000] h-[${
        80 * messages.length + 1
      }px] transition-all`}
    >
      {messages.map((item) => (
        <ToastMessage
          key={item.id}
          id={item.id}
          label={item.label}
          message={item.message}
          type={item.type}
          duration={item.duration}
          urlImage={item.urlImage}
          urlNotification={item.urlNotification}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
