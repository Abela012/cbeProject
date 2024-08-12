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
    <div ref={modalRef} onClick={closeModal} className="popup">
      {children}
    </div>
  );
}

export default OverLay;
