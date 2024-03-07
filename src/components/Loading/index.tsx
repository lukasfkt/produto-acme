import "./style.css";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <>
      <CgSpinner className="animate-spin w-12 h-12 mx-auto text-primary-blue" />
    </>
  );
}
