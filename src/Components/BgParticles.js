import React from 'react';
import ParticlesBg from 'particles-bg';

const BgParticles = (props) => <ParticlesBg {...props} />;

BgParticles.defaultProps = {
  type: 'circle',
  bg: true
};

export default BgParticles;
