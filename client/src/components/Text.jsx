import React from 'react';
import Star from './userAvatars/Star.jsx';
import Person from './userAvatars/Person.jsx';
import PersonRed from './userAvatars/PersonRed.jsx';
import BarMan from './userAvatars/BarMan.jsx';
import styles from '../css/text.css';

const randomize = Math.floor(Math.random() * 100);

const Text = ({ photo }) => {
    const { id, user_name, photo_title, date_added, url_address, comment } = photo;
    return(
        <div className={styles.text}> 
        <div className={styles.title}>{photo_title} {comment}</div>
      <div className={styles.subtitle}>{date_added.slice(0, 10)}</div>
      <div className={styles.title}><li><BarMan />&nbsp;{user_name}</li></div>
      <div className={styles.subtitle}>
        <ul><PersonRed /><Person />
        {id*21}<Star />
        {id*randomize}</ul>
          </div>
      </div>
    )
}

export default Text;
