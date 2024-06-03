import React, { Component } from 'react';
import firebaseAnalytics from '../firebaseAnalytics';

class Header extends Component {
  handleClick = (title) => () => {
    firebaseAnalytics.logClick(`Menu - ${title}`);
  };

  render() {
    return (
      <header>
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a
                className="smoothscroll"
                href="#home"
                onClick={this.handleClick('Home')}
              >
                Home
              </a>
            </li>

            <li>
              <a
                className="smoothscroll"
                href="#about"
                onClick={this.handleClick('About')}
              >
                About
              </a>
            </li>

            <li>
              <a
                className="smoothscroll"
                href="#skills"
                onClick={this.handleClick('Skills')}
              >
                Skills
              </a>
            </li>

            <li>
              <a
                className="smoothscroll"
                href="#portfolio"
                onClick={this.handleClick('Portfolio')}
              >
                Portfolio
              </a>
            </li>

            <li>
              <a
                className="smoothscroll"
                href="#contact"
                onClick={this.handleClick('Contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
