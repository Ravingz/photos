import React from 'react';
import styles from '../css/SideBar.css';

const SideBar = ({ photo }) => {
    const { id, user_name, photo_title, date_added, url_address, comment } = photo;
    return (
          <div className={styles.image}> 
            <img src={url_address} alt="" />
        </div>
    )
}

export default SideBar;
