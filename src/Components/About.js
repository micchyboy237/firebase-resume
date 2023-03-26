import React, { Component } from 'react';
import Fade from 'react-reveal';
import { getAge } from '../helpers';

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const profilepic = 'images/' + this.props.data.image;
    const bio = this.props.data.bio;
    const nationality = this.props.data.nationality;
    const age = getAge(this.props.data.birthday);
    const school = this.props.data.school;
    const languages = this.props.data.languages;
    const email = this.props.email;
    const state = this.props.address.state;
    const country = this.props.address.country;
    const maplink = this.props.address.maplink;

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img className="profile-pic" src={profilepic} alt="Profile Pic" />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>
              <p>{bio}</p>

              <ul className="details">
                <li>
                  <span>Age:</span>
                  {age}
                </li>

                <li>
                  <span>Nationality:</span>
                  {nationality}
                </li>

                <li>
                  <span>Email:</span>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>

                <li>
                  <span>Languages:</span>
                  {languages}
                </li>

                <li>
                  <span>Location:</span>
                  <a href={maplink} target="_blank">
                    {state}, {country}
                  </a>
                </li>

                <li>
                  <span>Study:</span>
                  {school}
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
