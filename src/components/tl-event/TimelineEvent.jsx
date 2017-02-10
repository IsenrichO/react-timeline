'use strict';
import React, { Component } from 'react';

import TimelineEventToolbar from './TimelineEventToolbar';
import TLEventHeader from './TLEventHeader';
import TLEventBody from './TLEventBody';
import TLEventFooter from './TLEventFooter';


// const debounceToggle = (evt) => debounce(toggleAccordionSection(evt), 2000, true);

// const collapseBody = (evt) => {
//   const $targ = $(evt.target),
//       $parentListItem = $targ.closest($('li[class^="tl-event"]')),
//       $collapsiblePanels = $targ.parent().siblings($('[class|="panel"]')),
//       isCollapsed = $($collapsiblePanels[0]).hasClass('tl-collapsed');

//   $.each($collapsiblePanels, (index, $panel) => {
//     isCollapsed ? $($panel).removeClass('tl-collapsed') : $($panel).addClass('tl-collapsed');
//   });
//   $targ.css({ transform: `scaleY(${!isCollapsed ? '-1' : '1'}` });
//   $parentListItem.css({ maxHeight: !isCollapsed ? $(evt.target).parent()[0].getClientRects()[0].height : '1000px' });
// };

const TimelineEvent = ({ evt, evtName, evtLocation, evtAlign, evtDescription, evtDate, evtFormattedDate, evtNote, logModalData, toggleModal }) => (
  <li className={ `tl-event${evtAlign}` }>
    <div className="tl-marker">
      <i className="glyphicon glyphicon-record" />
    </div>
    <div className="tl-event-panel">
      <TimelineEventToolbar
        evt={ evt }
        logModalData={ logModalData }
        toggleModal={ toggleModal } />
      <TLEventHeader
        evtName={ evtName } />
      <TLEventBody
        evtDescription={ evtDescription }
        evtLocation={ evtLocation }
        evtDate={ evtDate }
        evtFormattedDate={ evtFormattedDate } />
      <TLEventFooter
        evtNote={ evtNote } />
    </div>
  </li>
);

export default TimelineEvent;







// <li className={ `tl-event${evtAlign}` }>
//   <div className="tl-marker">
//     <i className="glyphicon glyphicon-record" />
//   </div>
//   <div className="tl-event-panel">
//     <TimelineEventToolbar
//       evt={ evt }
//       logModalData={ logModalData }
//       toggleModal={ toggleModal } />
//     <div className="panel-header">
//       <i 
//         className="collapse-up glyphicon glyphicon-chevron-up"
//         onClick={ collapseBody } />
//       <h3>{ evtName }</h3>
//     </div>
//     <div className="panel-body">
//       { evtDescription }
//       <div
//         className="tl-location"
//         onClick={ debounceToggle }>
//         <i className="glyphicon glyphicon-map-marker" />
//         <em key={ `Location_${evtLocation}` }>{ evtLocation }</em>
//         <i className="map-toggle glyphicon glyphicon-menu-right" />
//         <StaticGMap
//           evtLocation={ evtLocation } />
//       </div>
//     </div>
//     <div className="panel-footer">
//       {[
//         evtNote,
//         <i
//           key="StarGlyph"
//           className="glyphicon glyphicon-star-empty" />
//       ]}
//     </div>
//   </div>
// </li>
