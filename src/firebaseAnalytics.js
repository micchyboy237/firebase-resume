import ReactGA from 'react-ga4';

const initialize = () => {
  ReactGA.initialize('G-TH3848R9V0');
};

const logEvent = ({
  category,
  action,
  label,
  value,
  nonInteraction,
  transport
}) => {
  // Send a custom event
  ReactGA.event({
    category,
    action,
    label, // optional
    value, // optional, must be a number
    nonInteraction, // optional, true/false
    transport // optional, beacon/xhr/image
  });
};

const logSend = ({ hitType, page = '/', title, ...args }) => {
  // Send pageview with a custom path
  ReactGA.send({
    hitType, // 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'
    page,
    title,
    ...args
  });
};

const logVisit = (path = '/', title = 'Website Visit') => {
  logSend({
    hitType: 'pageview',
    page: path,
    title
  });
};

const logView = (path = '/', title) => {
  logEvent({
    category: 'View Info',
    action: title
  });
};

const logClick = (action) => {
  logEvent({
    category: 'Click',
    action
  });
};

const logVitals = ({ id, name, value }) => {
  logEvent({
    category: 'Web Vitals',
    action: name,
    label: id, // id unique to current page load
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers,
    nonInteraction: true // avoids affecting bounce rate
  });
};

const firebaseAnalytics = {
  initialize,
  logEvent,
  logSend,
  logVisit,
  logView,
  logClick,
  logVitals
};

export default firebaseAnalytics;
