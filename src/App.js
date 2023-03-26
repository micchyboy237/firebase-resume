import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import { scrollToHash } from './utils';
import Home from './Components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData(onSuccess) {
    $.ajax({
      url: './resumeData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });

        onSuccess(data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData(scrollToHash);
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <Home data={this.state.resumeData.main} />
        <About
          data={this.state.resumeData.aboutme}
          email={this.state.resumeData.main?.email}
          address={this.state.resumeData.main?.address}
        />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Contact data={this.state.resumeData.main} />
        {/* <Footer data={this.state.resumeData.main} /> */}
      </div>
    );
  }
}

export default App;
