// @flow
import React, { Component }               from 'react';
import { DragDropContext }                from 'react-dnd';
import HTML5Backend                       from 'react-dnd-html5-backend';
import MultiBackend, { createTransition } from 'react-dnd-multi-backend';
import TouchBackend                       from 'react-dnd-touch-backend';
import fontawesome                        from '@fortawesome/fontawesome';
import faBrands                           from '@fortawesome/fontawesome-free-brands';
import faRegular                          from '@fortawesome/fontawesome-free-regular';
import faSolid                            from '@fortawesome/fontawesome-free-solid';
import RouterConfig                       from '~/routing/RouterConfig';

/* FONTAWESOME SETUP */
const faModules = [faBrands, faRegular, faSolid];
fontawesome.library.add(...faModules);

/* REACT-DND BACKENDS */
const CustomTouchTransition = createTransition('touchstart', (evt) => evt.touches != null);

// Default backend for primary mouse support:
const primaryBackend = { backend: HTML5Backend };

// Touch support-enabled secondary backend:
const secondaryBackend = {
  backend: TouchBackend({ enableMouseEvents: true }),
  preview: true,
  transition: CustomTouchTransition,
};

const html5TouchPipeline = {
  backends: [primaryBackend, secondaryBackend],
};

@DragDropContext(MultiBackend(html5TouchPipeline))
export default class AppContainer extends Component {
  static displayName = 'REACT_TIMELINE_APP_ROOT';

  render = () => (RouterConfig);
}
