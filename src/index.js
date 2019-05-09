import { Provider } from 'react-redux';
import * as UUID from 'uuid';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, Actions, Selectors } from '@andyet/simplewebrtc';

import App from './components/App';

// ====================================================================
// IMPORTANT SETUP
// ====================================================================
// Replace `YOUR_API_KEY` here with the API key you received when
// signing up for SimpleWebRTC
// --------------------------------------------------------------------
const API_KEY = '0f5ff97f17b7fc67b76095f7';
// ====================================================================

const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const store = createStore();

window.store = store;
window.actions = Actions;
window.selectors = Selectors;

const params = new URLSearchParams(window.location.search);

if (API_KEY === 'YOUR_API_KEY') {
  ReactDOM.render(
    <p>
      You need to configure the app with your API key. See{' '}
      <code>src/index.js</code>
    </p>,
    document.getElementById('app')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App
        configUrl={CONFIG_URL}
        roomName={params.get('room')}
        roomPassword={params.get('key') || ''}
      />
    </Provider>,
    document.getElementById('app')
  );
}
