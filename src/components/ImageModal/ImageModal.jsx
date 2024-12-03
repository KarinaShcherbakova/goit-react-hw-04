import {useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={300}
    >
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <img src={image.urls.regular} alt={image.alt_description} />
      <div className={styles.modalInfo}>
        <h2>{image.description || 'Description not available'}</h2>
        <p>Автор: {image.user.name}</p>
        <p>{image.likes} лайків</p>
      </div>
    </Modal>
  );
};

export default ImageModal;