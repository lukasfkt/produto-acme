import { create } from "zustand";

interface useToastProps {
  showToast: boolean;
  setShowToast: (show: boolean) => void;
}

export const useToast = create<useToastProps>((set) => ({
  showToast: true,
  setShowToast: (showToast: boolean) => {
    set({ showToast });
  },
}));
