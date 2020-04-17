import React from 'react';
import styles from '../css/modal.css';

const Modal = ({ photo, index }) => {
  return (
      <div className={styles.image}>
        <img alt="" src={photo.url} index={index}/>
    </div>
  )
};

export default Modal;
