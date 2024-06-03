import ReactGA from 'react-ga4';

const isProduction = process.env.NODE_ENV === 'production';

const initialize = () => {
  if (isProduction) {
    ReactGA.initialize('G-TH3848R9V0');
  }
};

const logEvent = ({
  category,
  action: actionArg,
  label,
  value,
  nonInteraction,
  transport
}) => {
  const action = `${category}: ${actionArg}`;

  if (isProduction) {
    // Send a custom event
    ReactGA.event({
      category,
      action,
      label, // optional
      value, // optional, must be a number
      nonInteraction, // optional, true/false
      transport // optional, beacon/xhr/image
    });
  } else {
    console.debug(`logEvent: "${action}"`);
  }
};

const logSend = ({ hitType, page = '/', title, ...args }) => {
  if (isProduction) {
    // Send pageview with a custom path
    ReactGA.send({
      hitType, // 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'
      page,
      title,
      ...args
    });
  } else {
    console.debug(`logSend | hitType: "${hitType}", page: "${page}"`);
  }
};

const logVisit = (path = '/', title = 'Website Visit') => {
  logSend({
    hitType: 'pageview',
    page: path,
    title
  });
};

const logView = (title) => {
  logEvent({
    category: 'View',
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
