import React from 'react';
import styles from '../css/SideBar.css';

const SideBar = ({ photo }) => {
    return (
          <div className={styles.image}> 
            <img src={photo.url} alt="" />
        </div>
    )
}

export default SideBar;
