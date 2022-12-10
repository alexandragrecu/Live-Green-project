import React, { useState, Fragment } from 'react';

const Arrow = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Fragment>
      {visible && (
        <p id="top" className="fade-arrow">
          <a
            href="#top"
            onClick={scrollToTop}
            style={{
              width: '50px',
              height: '50px',
              lineHeight: '50px',
              textAlign: 'center',
              borderRadius: '100%',
              color: '#fff',
              background: '#23233C',
              display: 'inline-block',
            }}
          >
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </a>
        </p>
      )}
    </Fragment>
  );
};

export default Arrow;
