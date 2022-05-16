import { Modal } from "react-bootstrap";

interface ModalComType {
  children: React.ReactNode;
  title?: string;
  show: boolean;
  handleClose: () => void;
}

const ModalCom: React.FC<ModalComType> = ({ children, show, handleClose, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>{title && <Modal.Title>{title}</Modal.Title>}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalCom;
