import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';

// // True constants:
const MAIN_BTN_DIAM = 70,
      CHILD_BTN_DIAM = 45,
      NUM_CHILDREN = 4,
      RIGHT_ADJUST = (
        42 +  // 3rem = 3 * 1rem = 3 * 14<px> => 42<px>
        15 +  // Width of right-aligned window scrollbar
        35    // Half the diameter (i.e., radius) of <button> element
      ),
      [MAIN_BTN_X, MAIN_BTN_Y] = [window.innerWidth - RIGHT_ADJUST, 77],
      SPRING_CONFIG = {
        stiffness: 600,
        damping: 36
      },
      FLY_OUT_R = 175,
      SEPARATION_ANGLE = 30,
      FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE,
      BASE_ANGLE = 90;

// Should be between 0 and 0.5. Its maximum value is difference between `scale` in
//  `finalChildBtnStyles` and `initialChildBtnStyles`.
const OFFSET = 0.05;


export default class MotionComponent extends Component {
  constructor(props) {
    super(props);
  }

  toRadians(degs) {
    return degs * (Math.PI / 180);
  }

  finalChildPos(childIndex) {
    let childAngle = BASE_ANGLE + (SEPARATION_ANGLE * childIndex);
    return {
      deltaX: FLY_OUT_R * Math.cos(this.toRadians(childAngle)) - (CHILD_BTN_DIAM / 2),
      deltaY: FLY_OUT_R * Math.sin(this.toRadians(childAngle)) - (CHILD_BTN_DIAM / 2)
    };
  }

  mainBtnStyles() {
    return {
      width: MAIN_BTN_DIAM,
      height: MAIN_BTN_DIAM,
      left: MAIN_BTN_X - (MAIN_BTN_DIAM / 2),
      top: MAIN_BTN_Y - (MAIN_BTN_DIAM / 2)
    };
  }

  initialChildBtnStyles() {
     return {
       width: CHILD_BTN_DIAM,
       height: CHILD_BTN_DIAM,
       left: spring(MAIN_BTN_X - (CHILD_BTN_DIAM / 2), SPRING_CONFIG),
       bottom: spring(MAIN_BTN_Y - (CHILD_BTN_DIAM / 2), SPRING_CONFIG),
       rotate: spring(-180, SPRING_CONFIG),
       scale: spring(0.5, SPRING_CONFIG)
     };
   }
  
  initialChildBtnStylesInit() {
    return {
      width: CHILD_BTN_DIAM,
      height: CHILD_BTN_DIAM,
      left: MAIN_BTN_X - (CHILD_BTN_DIAM / 2),
      bottom: MAIN_BTN_Y - (CHILD_BTN_DIAM / 2),
      rotate: -180,
      scale: 0.5
    };
  }

  childBtns() {
    return [
      {
        key: 'plus-btn',
        data: { text: 'Plus' }
      }, {
        key: 'minus-btn',
        data: { text: 'Minus' }
      }, {
        key: 'send-btn',
        data: { text: 'Send' }
      }, {
        key: 'collapse-up-btn',
        data: { text: 'Collapse Up' }
      }
    ];
  }

  finalChildBtnStylesInit(childIndex) {
    let { deltaX, deltaY } = this.finalChildPos(childIndex);
    return {
      width: CHILD_BTN_DIAM,
      height: CHILD_BTN_DIAM,
      left: MAIN_BTN_X + deltaX,
      bottom: MAIN_BTN_Y + deltaY,
      rotate: 0,
      scale: 1
    };
  }

  finalChildBtnStyles(childIndex) {
    let { deltaX, deltaY } = this.finalChildPos(childIndex);
    return {
      width: CHILD_BTN_DIAM,
      height: CHILD_BTN_DIAM,
      left: spring(MAIN_BTN_X + deltaX, SPRING_CONFIG),
      bottom: spring(MAIN_BTN_Y + deltaY, SPRING_CONFIG),
      rotate: spring(0, SPRING_CONFIG),
      scale: spring(1, SPRING_CONFIG),
      zIndex: NUM_CHILDREN + 1 - childIndex
    };
  }

  getChildBtnGlyph(childIndex) {
    const self = this;
    const childBtnGlyphs = [
      {
        glyph: 'plus',
        tooltip: 'Add',
        func: null
      }, {
        glyph: 'minus',
        tooltip: 'Batch Delete',
        func: null
      }, {
        glyph: 'send',
        tooltip: 'Send',
        func: null
      }, {
        glyph: 'collapse-up',
        tooltip: 'Collapse',
        func: self.toggleAllEventCards
      }
    ];
    return {
      glyphName: () => `glyphicon glyphicon-${childBtnGlyphs[childIndex].glyph}`,
      tooltipText: () => `${childBtnGlyphs[childIndex].tooltip}`
    };
  }

  getChildObj(childIndex, evt, passedFuncPlus = null, passedFuncMinus = null, ...passedArgs) {
    const self = this;
    const childBtnGlyphs = [
      {
        glyph: 'plus',
        func: passedFuncPlus
      }, {
        glyph: 'minus',
        func: passedFuncMinus
      }, {
        glyph: 'send',
        func: () => ::self.toggleAllLocationAccordions(evt)
      }, {
        glyph: 'collapse-up',
        func: () => ::self.toggleAllEventCards(evt)
      }
    ];
    return childBtnGlyphs[childIndex];
  }

  toggleAllLocationAccordions(evt) {
    evt.stopPropagation();
    let $targ = $(evt.currentTarget);
    let $targ2 = $(evt.currentTarget).children('.glyphicon');
    console.log('targ', $targ, $targ2);
    $('.tl-location').trigger('click');
  }

  toggleAllEventCards(evt) {
    evt.stopPropagation();
    let $glyph = $(evt.currentTarget).children('.glyphicon');
    console.log('hit: ', $glyph, $('[class$="up"]', $glyph));

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
};
