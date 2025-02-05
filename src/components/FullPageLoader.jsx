import React from 'react';
import { ClipLoader } from 'react-spinners';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lightBackground dark:bg-dark text-darkText dark:text-grayText">
      <ClipLoader color="#2563EB" size={50} />
    </div>
  );
};

export default FullPageLoader;
