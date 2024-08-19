import { useRef } from "react";
import "../App.css";

function OverLay({ children, handleClick }) {
  const modalRef = useRef(null);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      handleClick();
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className=" fixed inset-0 bg-[rgba(16, 16, 16, 0.824)] backdrop-blur-sm flex flex-col items-center justify-center "
    >
      {children}
    </div>
  );
}

export default OverLay;
