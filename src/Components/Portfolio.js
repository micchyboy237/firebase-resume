import React, { Component } from 'react';
import Fade from 'react-reveal';
import PortfolioItem from './PortfolioItem';

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (project) {
      return (
        <PortfolioItem
          key={id++}
          className="columns portfolio-item"
          title={project.title}
          image={project.image}
          url={project.url}
        />
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check Out Some of My Works.</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
