/* eslint-disable camelcase */
import React from 'react';
import styles from '../css/photo.css';

const Photo = ({ photo, index }) => {

  return (
    <div>
      <div className="flex-container">
        <img className={styles.image} alt="" src={photo.url_address} index={index} />
      </div>
    </div>
  );
};

export default Photo;
