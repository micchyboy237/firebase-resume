import React, { Component } from 'react';
import Fade from 'react-reveal';
import firebaseAnalytics from '../firebaseAnalytics';
import BgParticles from './BgParticles';

class Home extends Component {
  handleAIChat() {
    firebaseAnalytics.logClick('View AI Chat');
  }

  handleViewResume() {
    firebaseAnalytics.logClick('View Resume');
  }

  render() {
    const data = this.props.data;

    const project = data?.project;
    const github = data?.github;
    const name = data?.name;
    const description = data?.description;
    const resumeDownload = data?.resumedownload;

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
                {/* <a
                  href="https://jetbot.vercel.app"
                  target="_blank"
                  className="button btn contact-btn"
                  onClick={this.handleAIChat}
                >
                  <i className="fa fa-comment"></i>AI Chat
                </a> */}

                <a
                  href={resumeDownload}
                  target="_blank"
                  className="button btn download-btn"
                  onClick={this.handleViewResume}
                >
                  <i className="fa fa-download"></i>View Resume
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
