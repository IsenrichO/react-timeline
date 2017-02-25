'use strict';
import JSDom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../src/reducers/index';


// Set up testing environment to run like browser in the command line:
global.document = JSDom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// Build `renderComponent()` utility to render a given React class:
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={ createStore(reducers, state) }>
      <ComponentClass props={ ...props } />
    </Provider>
  );
  return $(ReactDOM.findDOMNode(componentInstance));  // Produces simulated HTML
}

// Build utility for simulating events:

// Setup Chai-jQuery:

export { renderComponent, expect };
