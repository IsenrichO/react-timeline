'use strict';
import React from 'react';


const collapseBody = (evt) => {
  const $targ = $(evt.target),
      $parentListItem = $targ.closest($('li[class^="tl-event"]')),
      $collapsiblePanels = $targ.parent().siblings($('[class|="panel"]')),
      isCollapsed = $($collapsiblePanels[0]).hasClass('tl-collapsed');

  $.each($collapsiblePanels, (index, $panel) => {
    isCollapsed ? $($panel).removeClass('tl-collapsed') : $($panel).addClass('tl-collapsed');
  });
  $targ.css({ transform: `scaleY(${!isCollapsed ? '-1' : '1'}` });
  $parentListItem.css({ maxHeight: !isCollapsed ? $(evt.target).parent()[0].getClientRects()[0].height : '1000px' });
};

const TLEventHeader = ({ evtName }) => (
  <div className="panel-header">
    <i 
      className="collapse-up glyphicon glyphicon-chevron-up"
      onClick={ collapseBody } />
    <h3>{ evtName }</h3>
  </div>
);

export default TLEventHeader;
