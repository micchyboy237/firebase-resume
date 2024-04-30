import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ src, autoPlay, fullscreen, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleFullScreenChange = () => {
        if (document.fullscreenElement === videoElement) {
          videoElement.play(); // Start playing the video when in fullscreen
        }
      };

      videoElement.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          videoElement.play(); // Autoplay the video when it's loaded
        }
        if (fullscreen) {
          videoElement.requestFullscreen().catch((err) => {
            console.error(
              'Error attempting to enable fullscreen:',
              err.message
            );
          }); // Request fullscreen when video is loaded
        }
      });

      document.addEventListener('fullscreenchange', handleFullScreenChange);

      return () => {
        document.removeEventListener(
          'fullscreenchange',
          handleFullScreenChange
        );
      };
    }
  }, []);

  return (
    <video ref={videoRef} controls {...props}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
