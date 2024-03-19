const Modal = ({ children, onClose, show }) => {
  return (
    <div className={show ? "overlay" : "d-none"}>
      <div className="custom-modal">
        <div className="text-end">
          <i className="bi bi-x-lg pointer" onClick={onClose}></i>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
