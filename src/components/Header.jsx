import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`portfolio-header${visible ? '' : ' hide'}`}>
      <h1>Digital Portfolio</h1>
    </header>
  );
};

export default Header;