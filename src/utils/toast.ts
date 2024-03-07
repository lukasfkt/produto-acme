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

export function toast({
  label,
  message,
  type,
  duration,
  urlImage,
  urlNotification,
}: Omit<ToastProps, "id">) {
  const event = new CustomEvent("addtoast", {
    detail: {
      label,
      message,
      type,
      duration,
      urlImage,
      urlNotification,
    },
  });
  document.dispatchEvent(event);
}
