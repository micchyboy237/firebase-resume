import React, { Component } from 'react';
import { Fade, Slide } from 'react-reveal';

class Contact extends Component {
  render() {
    if (!this.props.data) return null;

    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const country = this.props.data.address.country;
    const maplink = this.props.data.address.maplink;
    const phone = this.props.data.phone;
    const email = this.props.data.email;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="twelve columns header-col">
              <h1>
                <span>Get In Touch</span>
              </h1>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <ul className="five columns contact-details">
              <li>
                <a href={`tel:${phone}`}>
                  <i className="fa fa-phone"></i>
                  {phone}
                </a>
              </li>

              <li>
                <a href={`mailto:${email}`}>
                  <i
                    className="fa fa-envelope"
                    style={{
                      fontSize: '12px'
                    }}
                  ></i>
                  {email}
                </a>
              </li>

              <li className="address">
                <a
                  href={maplink}
                  target="_blank"
                  style={{
                    display: 'flex'
                  }}
                >
                  <i className="fa fa-map-marker"></i>
                  {city}, {state} <br /> {country}
                </a>
              </li>

              {/* <aside
                id="contactLocation"
                className="four columns footer-widgets"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61820.56475237634!2d120.99510719999999!3d14.43953335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce0835972b6f%3A0xff33295d281774b!2sLas%20Pi%C3%B1as%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1679360162033!5m2!1sen!2sph"
                  width="300"
                  height="400"
                  allowFullScreen
                ></iframe>
              </aside> */}
            </ul>
          </Slide>

          <Slide right duration={1000}>
            <div className="seven columns">
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>

              <div id="contactForm" name="contactForm" action="" method="POST">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  defaultValue=""
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={this.handleChange}
                />

                <input
                  required
                  type="text"
                  placeholder="Email"
                  defaultValue=""
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={this.handleChange}
                />

                <textarea
                  required
                  placeholder="Message"
                  cols="50"
                  rows="8"
                  id="contactMessage"
                  name="contactMessage"
                ></textarea>

                <div>
                  <button className="submit">Send Message</button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </div>

              <div id="message-warning"></div>
            </div>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
