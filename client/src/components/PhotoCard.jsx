import React from 'react';
import Photo from './Photo.jsx';
import styles from '../css/photoCard.css';


 
const PhotoCard = ({ photos, selectedPhotoIndex }) => {
  const renderPhotos = photos.slice(selectedPhotoIndex);
  return (
  <div className={styles.wrapper}>
    <div className={styles.slider}>
      {
    renderPhotos.map((photo) => (
      <Photo key={photo._id} index={photos.indexOf(photo)} photo={photo} />
    ))
      }
    </div>
  </div>

  );
};

export default PhotoCard;
