"use client";
import ModalImage from "react-modal-image";

const ImageModal = ({ image }: { image: string }) => {
  return <ModalImage className="w-24 h-24" small={image} large={image} />;
};

export default ImageModal;
