import React from 'react';

const useToggle = (initialValue = false) => {
  const [isOpen, setIsModalOpen] = React.useState(initialValue);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const toggle = () => setIsModalOpen(prev => !prev);
  return { isOpen, open, close, toggle };
};

export default useToggle;
