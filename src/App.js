import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import Resume from './Components/Resume';
import Portfolio from './Components/Portfolio';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { scrollToHash } from './utils';
import Home from './Components/Home';
import firebaseAnalytics from './firebaseAnalytics';
import withAnalytics from './hoc/withAnalytics';
import Chatbot from './Components/Chatbot';

const AboutWithAnalytics = withAnalytics(About);
const ResumeWithAnalytics = withAnalytics(Resume);
const PortfolioWithAnalytics = withAnalytics(Portfolio);
const ContactWithAnalytics = withAnalytics(Contact);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    firebaseAnalytics.initialize();
    firebaseAnalytics.logVisit(window.location.pathname);
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
    const hasLoaded = !!this.state.resumeData.main;

    return !hasLoaded ? null : (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <Home data={this.state.resumeData.main} />
        <AboutWithAnalytics
          data={this.state.resumeData.aboutme}
          email={this.state.resumeData.main?.email}
          address={this.state.resumeData.main?.address}
        />
        <ResumeWithAnalytics data={this.state.resumeData.resume} />
        <PortfolioWithAnalytics data={this.state.resumeData.portfolio} />
        <ContactWithAnalytics data={this.state.resumeData.main} />
        {/* <Footer data={this.state.resumeData.main} /> */}
        {/* Fixed bottom right  */}
        <div
          style={{
            position: 'fixed',
            bottom: 40,
            right: 80,
            zIndex: 1000
          }}
        >
          <Chatbot />
        </div>
      </div>
    );
  }
}

export default App;
