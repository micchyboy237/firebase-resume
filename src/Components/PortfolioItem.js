import React, { useState } from 'react';
import firebaseAnalytics from '../firebaseAnalytics';
import Modal from './Modal';
import { isVideoFile } from '../utils';
import Delay from './Delay';
import VideoPlayer from './VideoPlayer';

const PortfolioItem = ({ title, image, url, ...props }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    firebaseAnalytics.logView(url, `Show Portfolio: ${title}`);

    if (isVideoFile(url)) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const projectImage = 'images/portfolio/' + image;

  return (
    <div {...props}>
      <a className="item-wrap" href={url} target="_blank" onClick={handleClick}>
        <div className="img-wrapper">
          <div className="img-container">
            <img alt={title} src={projectImage} />
          </div>
        </div>
        <p>{title}</p>
      </a>

      {showModal && (
        <Modal
          duration={0}
          contentStyle={{
            maxWidth: 'fit-content',
            width: '100%'
          }}
          onClose={handleClose}
        >
          <div
            className="portfolio-content"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 1280,
              height: 720,
              backgroundColor: '#000'
            }}
          >
            <Delay timeout={400}>
              <VideoPlayer
                src={url}
                controls
                autoPlay
                // fullscreen
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Delay>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PortfolioItem;
