import React, { Component } from 'react';
import Fade from 'react-reveal';
import firebaseAnalytics from '../firebaseAnalytics';
import BgParticles from './BgParticles';

class Home extends Component {
  handleClick = (title) => () => {
    firebaseAnalytics.logClick(`home_${title}`);
  };

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
                <a
                  href={resumeDownload}
                  className="button btn download-btn"
                  onClick={this.handleClick('download_resume')}
                  download="Resume Latest - Jethro Estrada.pdf"
                >
                  <i className="fa fa-download"></i>Download Resume
                </a>

                {/* <a
                  href="https://jetbot.vercel.app/chat"
                  target="_blank"
                  className="button btn contact-btn"
                  onClick={this.handleClick('chat_with_jetbot')}
                >
                  <i className="fa fa-comment"></i>Chat With JetBot
                </a> */}
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a
            className="smoothscroll"
            href="#about"
            onClick={this.handleClick('bottom_icon_smooth_scroll')}
          >
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </section>
    );
  }
}

export default Home;
