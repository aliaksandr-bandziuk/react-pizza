import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🥺</span>
        <br />
        Not found
      </h1>
      <p className={styles.description}>Unfortunately this URL-adress doesn't exist</p>
    </div>
  )
}

export default NotFoundBlock;