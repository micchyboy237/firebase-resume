import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Header from './Components/Header';
import Home from './Components/Home';
import Portfolio from './Components/Portfolio';
import Skills from './Components/Skills';
import firebaseAnalytics from './firebaseAnalytics';
import withAnalytics from './hoc/withAnalytics';
import { scrollToHash } from './utils';

const HomeWithAnalytics = withAnalytics(Home, 'home_section');
const AboutWithAnalytics = withAnalytics(About, 'about_section');
const SkillsWithAnalytics = withAnalytics(Skills, 'skills_section');
const PortfolioWithAnalytics = withAnalytics(Portfolio, 'portfolio_section');
const ContactWithAnalytics = withAnalytics(Contact, 'contact_section');

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
        console.error(err);
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
        <HomeWithAnalytics data={this.state.resumeData.main} />
        <AboutWithAnalytics
          data={this.state.resumeData.aboutme}
          email={this.state.resumeData.main?.email}
          address={this.state.resumeData.main?.address}
        />
        <SkillsWithAnalytics data={this.state.resumeData.skills} />
        <PortfolioWithAnalytics data={this.state.resumeData.portfolio} />
        <ContactWithAnalytics data={this.state.resumeData.main} />
        {/* <Footer data={this.state.resumeData.main} /> */}
        {/* Fixed bottom right  */}
        {/* <div
          style={{
            position: 'fixed',
            bottom: 40,
            right: 80,
            zIndex: 1000
          }}
        >
          <Chatbot />
        </div> */}
      </div>
    );
  }
}

export default App;
