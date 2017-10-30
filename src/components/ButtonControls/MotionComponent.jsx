import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, StaggeredMotion } from 'react-motion';

// // True constants:
const MAIN_BTN_DIAM = 70;
const CHILD_BTN_DIAM = 45;
const NUM_CHILDREN = 4;
const RIGHT_ADJUST = (
  42 +  // 3rem = 3 * 1rem = 3 * 14<px> => 42<px>
  15 +  // Width of right-aligned window scrollbar
  35    // Half the diameter (i.e., radius) of <button> element
);
const [MAIN_BTN_X, MAIN_BTN_Y] = [window.innerWidth - RIGHT_ADJUST, 77];
const SPRING_CONFIG = {
  damping: 36,
  stiffness: 600,
};
const FLY_OUT_R = 175;
const SEPARATION_ANGLE = 30;
const FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE;
const BASE_ANGLE = 90;

// Should be between 0 and 0.5. Its maximum value is difference between `scale` in
//  `finalChildBtnStyles` and `initialChildBtnStyles`.
const OFFSET = 0.05;


export default class MotionComponent extends Component {
  static displayName = 'MotionComponent';

  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'base',
  };

  static toRadians = (degs) => degs * (Math.PI / 180);

  getChildBtnGlyph(childIndex) {
    const self = this;
    const childBtnGlyphs = [{
      func: null,
      icon: {
        glyphClass: 'plus',
        materialClass: 'add_circle_outline',
      },
      tooltip: 'Add',
    }, {
      func: null,
      icon: {
        glyphClass: 'minus',
        materialClass: 'remove_circle_outline',
      },
      tooltip: 'Batch Delete',
    }, {
      func: null,
      icon: {
        glyphClass: 'send',
        materialClass: 'send',
      },
      tooltip: 'Send',
    }, {
      func: self.toggleAllEventCards,
      icon: {
        glyphClass: 'collapse-up',
        materialClass: 'border_all',
      },
      tooltip: 'Collapse',
    }];

    return {
      glyphName() { return childBtnGlyphs[childIndex].icon.materialClass; },
      tooltipText: () => `${childBtnGlyphs[childIndex].tooltip}`,
    };
  }

  getChildObj(childIndex, evt, passedFuncPlus = null, passedFuncMinus = null, ...passedArgs) {
    const self = this;
    const childBtnGlyphs = [{
      func: passedFuncPlus,
      glyph: 'plus',
    }, {
      func: passedFuncMinus,
      glyph: 'minus',
    }, {
      func: () => ::self.toggleAllLocationAccordions(evt),
      glyph: 'send',
    }, {
      func: () => ::self.toggleAllEventCards(evt),
      glyph: 'collapse-up',
    }];

    return childBtnGlyphs[childIndex];
  }

  finalChildPos = (childIndex) => {
    const childAngle = BASE_ANGLE + (SEPARATION_ANGLE * childIndex);

    return {
      deltaX: (FLY_OUT_R * Math.cos(MotionComponent.toRadians(childAngle))) - (CHILD_BTN_DIAM / 2),
      deltaY: (FLY_OUT_R * Math.sin(MotionComponent.toRadians(childAngle))) - (CHILD_BTN_DIAM / 2),
    };
  };

  mainBtnStyles = () => ({
    height: MAIN_BTN_DIAM,
    left: MAIN_BTN_X - (MAIN_BTN_DIAM / 2),
    top: MAIN_BTN_Y - (MAIN_BTN_DIAM / 2),
    width: MAIN_BTN_DIAM,
  });

  initialChildBtnStyles = () => ({
    bottom: spring(MAIN_BTN_Y - (CHILD_BTN_DIAM / 2), SPRING_CONFIG),
    height: CHILD_BTN_DIAM,
    left: spring(MAIN_BTN_X - (CHILD_BTN_DIAM / 2), SPRING_CONFIG),
    rotate: spring(-180, SPRING_CONFIG),
    scale: spring(0.5, SPRING_CONFIG),
    width: CHILD_BTN_DIAM,
  });

  initialChildBtnStylesInit = () => ({
    bottom: MAIN_BTN_Y - (CHILD_BTN_DIAM / 2),
    height: CHILD_BTN_DIAM,
    left: MAIN_BTN_X - (CHILD_BTN_DIAM / 2),
    rotate: -180,
    scale: 0.5,
    width: CHILD_BTN_DIAM,
  });

  childBtns = () => [{
    data: { text: 'Plus' },
    key: 'plus-btn',
  }, {
    data: { text: 'Minus' },
    key: 'minus-btn',
  }, {
    data: { text: 'Send' },
    key: 'send-btn',
  }, {
    data: { text: 'Collapse Up' },
    key: 'collapse-up-btn',
  }];

  finalChildBtnStylesInit(childIndex) {
    const { deltaX, deltaY } = this.finalChildPos(childIndex);

    return {
      bottom: MAIN_BTN_Y + deltaY,
      height: CHILD_BTN_DIAM,
      left: MAIN_BTN_X + deltaX,
      rotate: 0,
      scale: 1,
      width: CHILD_BTN_DIAM,
    };
  }

  finalChildBtnStyles(childIndex) {
    const { deltaX, deltaY } = this.finalChildPos(childIndex);

    return {
      bottom: spring(MAIN_BTN_Y + deltaY, SPRING_CONFIG),
      height: CHILD_BTN_DIAM,
      left: spring(MAIN_BTN_X + deltaX, SPRING_CONFIG),
      rotate: spring(0, SPRING_CONFIG),
      scale: spring(1, SPRING_CONFIG),
      width: CHILD_BTN_DIAM,
      zIndex: NUM_CHILDREN + 1 - childIndex,
    };
  }

  toggleAllLocationAccordions(evt) {
    evt.stopPropagation();
    let $targ = $(evt.currentTarget);
    let $targ2 = $(evt.currentTarget).children('.glyphicon');

    $('.tl-location').trigger('click');
  }

  toggleAllEventCards(evt) {
    evt.stopPropagation();
    let $glyph = $(evt.currentTarget).children('.glyphicon');

    $glyph.hasClass('glyphicon-collapse-up')
      ? $glyph.removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down')
      : $glyph.hasClass('glyphicon-collapse-down')
      ? $glyph.removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up')
      : null;

    // let allEvtsOpen = ($('.tl-collapsed').length === 0);
    // if (allEvtsOpen) {
    //   $.each($('.panel-header .collapse-up'), function(index, obj) {
    //     $(this).trigger('click');
    //   });  
    // }

    $.each($('.panel-header .collapse-up'), function(index, obj) {
      $(this).parent().siblings('.tl-collapsed').length
        ? null
        : $(this).trigger('click');
    });
    // .trigger('click');

    // if ($('[class$="up"]', $glyph)) {
    //   console.log('hitting if');
    //   $glyph
    //     .removeClass('glyphicon-collapse-up')
    //     .addClass('glyphicon-collapse-down');
    //   return null;
    // }
    // if ($('[class="down"]', $glyph)) {
    //   console.log('hitting else');
    //   $glyph
    //     .removeClass('glyphicon-collapse-down')
    //     .addClass('glyphicon-collapse-up');
    //   return null;
    // }

    return null;
  }
}
