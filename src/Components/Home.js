import React, { Component } from 'react';
import Fade from 'react-reveal';
import BgParticles from './BgParticles';

class Home extends Component {
  render() {
    if (!this.props.data) return null;

    const project = this.props.data.project;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;
    const resumeDownload = this.props.data.resumedownload;

    return (
      <section id="home">
        <BgParticles />

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}</h3>
              <hr />
            </Fade>

            <Fade bottom duration={2000}>
              <ul className="social">
                <a
                  className="smoothscroll button btn contact-btn"
                  href="#contact"
                >
                  <i className="fa fa-comment"></i>Contact
                </a>

                <a
                  href={resumeDownload}
                  target="_blank"
                  className="button btn download-btn"
                >
                  <i className="fa fa-download"></i>Resume
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </section>
    );
  }
}

export default Home;
