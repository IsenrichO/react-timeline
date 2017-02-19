'use strict';
import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';


// // True constants:
const MAIN_BTN_DIAM = 70,
      CHILD_BTN_DIAM = 45,
      NUM_CHILDREN = 4,
      // [MAIN_BTN_X, MAIN_BTN_Y] = [1588, 77],
      RIGHT_ADJUST = (
        42 +  // 3rem = 3 * 1rem = 3 * 14<px> => 42<px>
        15 +  // Width of right-aligned window scrollbar
        35    // Half the diameter (i.e., radius) of <button> element
      ),
      [MAIN_BTN_X, MAIN_BTN_Y] = [window.innerWidth - RIGHT_ADJUST, 77],
      SPRING_CONFIG = {
        stiffness: 400,
        damping: 28
      },
      FLY_OUT_R = 175,
      SEPARATION_ANGLE = 30,
      FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE,
      BASE_ANGLE = 90;
      // BASE_ANGLE = (180 - FAN_ANGLE) / 2;

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
       // top: spring(MAIN_BTN_Y - (CHILD_BTN_DIAM / 2), SPRING_CONFIG),
       rotate: spring(-180, SPRING_CONFIG),
       scale: spring(0.5, SPRING_CONFIG)
     };
   }
  
  initialChildBtnStylesInit() {
    return {
      width: CHILD_BTN_DIAM,
      height: CHILD_BTN_DIAM,
      left: MAIN_BTN_X - (CHILD_BTN_DIAM / 2),
      // top: MAIN_BTN_Y - (CHILD_BTN_DIAM / 2),
      bottom: MAIN_BTN_Y - (CHILD_BTN_DIAM / 2),
      rotate: -180,
      scale: 0.5
    };
  }

  finalChildBtnStylesInit(childIndex) {
    let { deltaX, deltaY } = this.finalChildPos(childIndex);
    return {
      width: CHILD_BTN_DIAM,
      height: CHILD_BTN_DIAM,
      left: MAIN_BTN_X + deltaX,
      // top: MAIN_BTN_Y - deltaY,
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
      // top: spring(MAIN_BTN_Y - deltaY, SPRING_CONFIG),
      rotate: spring(0, SPRING_CONFIG),
      scale: spring(1, SPRING_CONFIG)
    };
  }

  getRange(start = 0, stop, step = 1, inclusive = false) {
    const outputRange = (rangeLen, mapFunc) => Array.from(rangeLen, mapFunc),
          regCharSet = new RegExp('[A-Z]', 'i'),
          ALPH = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
          ];
    let rangeLen, mapFunc, isDescending = false;

    if (typeof start !== 'number' && typeof start !== 'string') {
      throw new Error(`Invalid input <${start}> of type <${typeof start}> provided. The` +
                      `\`getRange()\` function accepts either Number or String type inputs.`);
    }

    // Return empty Array literal when called without providing any input(s):
    if (arguments.length === 0) { return new Array(0); }

    if (typeof start === 'string' && regCharSet.test(start) && start.length === 1) {
      // Test that `start` parameter (if not default value) is a valid, single-unit
      //  alphabetic character:
      if (stop !== 0 && typeof stop === 'string') {
        if (start > stop) { isDescending = true; }
        let startChar = start.toUpperCase(), endChar;

        if (!regCharSet.test(stop) || stop.length !== 1) {
          throw new Error(`Invalid input: ${start}\nShould be an alphabetic character.`);
        } else {
          endChar = stop.toUpperCase();
          const startIndex = ALPH.indexOf(startChar);
          rangeLen = Math.abs(ALPH.indexOf(endChar) - startIndex + (!!inclusive ? 1 : 0));
          mapFunc = (_, i) => (isDescending ? ALPH[startIndex - (i * step)] : ALPH[startIndex + (i * step)]);
        }
      } else {
        rangeLen = ALPH.indexOf(!!inclusive ? (start + 1) : start);
        mapFunc = (_, i) => ALPH[i];
      }
    }

    if (typeof start === 'number') {
      if (stop !== undefined && start > stop) { isDescending = true; }

      if (stop !== undefined && typeof stop === 'number' && stop !== 0) {
        rangeLen = Math.abs(stop - start + (!!inclusive ? 1 : 0));
        mapFunc = (_, i) => (start + ((!!isDescending ? -1 : 1) * i * step));
      } else {
        rangeLen = Math.abs(start);
        mapFunc = (_, i) => 0 + (start < 0 ? - i : i);
      }
    }

    // Return Array literal containing only the `start` parameter value if `step` value is 0;
    if (step === 0) {
      return new Array(rangeLen).fill(start);
    }

    return outputRange(new Array(Math.ceil(rangeLen / Math.abs(step))), mapFunc);
  }

  getChildBtnGlyph(childIndex) {
    const self = this;
    const childBtnGlyphs = [
      {
        glyph: 'plus',
        func: null
      }, {
        glyph: 'minus',
        func: null
      }, {
        glyph: 'send',
        func: null
      }, {
        glyph: 'collapse-up',
        func: self.toggleAllEventCards
      }
    ];
    return `glyphicon glyphicon-${childBtnGlyphs[childIndex].glyph}`;
  }

  getChildObj(childIndex, evt, passedFunc = null) {
    const self = this;
    const childBtnGlyphs = [
      {
        glyph: 'plus',
        func: passedFunc
      }, {
        glyph: 'minus',
        func: null
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
