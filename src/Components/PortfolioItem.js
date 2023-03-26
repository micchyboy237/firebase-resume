import React, { useState } from 'react';
// import Modal from './Modal';

const PortfolioItem = ({ title, image, url, ...props }) => {
  // const [showModal, setShowModal] = useState(false);

  // function handleClick() {
  //   setShowModal(true);
  // }

  // function handleClose() {
  //   setShowModal(false);
  // }

  const projectImage = 'images/portfolio/' + image;

  return (
    <div {...props}>
      <a className="item-wrap" href={url} target="_blank">
        <div className="img-wrapper">
          <div className="img-container">
            <img alt={title} src={projectImage} />
          </div>
        </div>
        <p>{title}</p>
      </a>

      {/* {showModal && (
        <Modal
          contentStyle={{
            maxWidth: 'fit-content',
            width: '100%'
          }}
          onClose={handleClose}
        >
          <div className="portfolio-content">
            <div
              style={{
                flex: 1,
                display: 'flex'
              }}
            >
              <img src={projectImage} alt="Full-size version of item" />
            </div>
            <button
              style={{
                marginBottom: 0
              }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default PortfolioItem;
