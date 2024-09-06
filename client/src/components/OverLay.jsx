import { useRef } from "react";

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
      className=" fixed inset-0 bg-blacksh flex flex-col items-center justify-center z-20"
    >
      {children}
    </div>
  );
}

export default OverLay;
