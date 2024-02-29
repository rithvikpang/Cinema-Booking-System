// components/LeftThirdContent.js
import React from 'react';
import styles from './LeftThirdContent.module.css';

const LeftThirdContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.leftThirdContent}>
      {children}
    </div>
  );
};

export default LeftThirdContent;