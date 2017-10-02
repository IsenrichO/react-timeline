import React from 'react';
import PropTypes from 'prop-types';
import { classes, ClassNamesPropType } from 'aesthetic';
import { isNil } from 'lodash';

const ImageThumbnailPure = ({ classNames, horizontalTranslation, thumbRef, thumbSource }) => (
  <div
    className={classNames.thumbWrapper}
    // ref={!isNil(thumbRef) && thumbRef}
    ref={thumbRef}
    style={{
      transform: `translateX(${horizontalTranslation}px)`,
      transition: 'all 500ms ease',
    }}
  >
    <i
      className={classes(
        'material-icons',
        classNames.bckgSelectOption,
      )}
    >
      panorama_fish_eye
    </i>
    <i
      className={classes(
        'glyphicon',
        'glyphicon-remove-circle',
      )}
    />
    <div
      className={classNames.thumb}
      style={{
        backgroundImage: `url("${thumbSource}")`,
      }}
    />
  </div>
);

ImageThumbnailPure.displayName = 'ImageThumbnail';

ImageThumbnailPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  horizontalTranslation: PropTypes.number,
  thumbRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
  thumbSource: PropTypes.string,
};

ImageThumbnailPure.defaultProps = {
  horizontalTranslation: 0,
  thumbRef: null,
  thumbSource: '',
};

export default ImageThumbnailPure;


// // createNewThumbnail(img, output) {
//   // const NewThumb = (
//   //   <div
//   //     className={classNames.thumb}
//   //     style={{
//   //       backgroundImage: `url("${img}")`,
//   //     }}
//   //   />
//   // );
//   // const ThumbWrapper = (<div className={classNames.thumbWrapper} />);
//   // const ChooseBckgGlyph = (
//   //   <i
//   //     className={classes(
//   //       'material-icons',
//   //       classNames.bckgSelectOption,
//   //     )}
//   //   >
//   //     panorama_fish_eye
//   //   </i>
//   // );
//   // const RemoveBckgGlyph = (
//   //   <i
//   //     className={classes(
//   //       'glyphicon',
//   //       'glyphicon-remove-circle',
//   //     )}
//   //   />
//   // );

//   const AppendThumbToWrapper = ({ children, classNames }) => (
//     <div className={classNames.thumbWrapper}>
//       {children}
//     </div>
//   );

//   // const wrappedThumb = () => (
//   //   <AppendThumbToWrapper>
//   //     <ChooseBckgGlyph />
//   //     <RemoveBckgGlyph />
//   //     <NewThumb />
//   //   </AppendThumbToWrapper>
//   // );

//   // let $newThumb = $('<div />').addClass('thumb').css({ backgroundImage: `url(${img})` }),
//   let $thumbWrapper = $('<div />').addClass('thumbWrapper'),
//       $chooseBckgGlyph = $('<i class="material-icons bckg-select-opt">panorama_fish_eye</i>'),
//       $removeThumbGlyph = $('<i class="glyphicon glyphicon-remove-circle" />');

//   // $thumbWrapper.append($chooseBckgGlyph, $removeThumbGlyph, $newThumb);
//   $(ThumbWrapper).append(ChooseBckgGlyph, RemoveBckgGlyph, NewThumb);
//   output.insertBefore(ThumbWrapper[0], null);

//   $('.bckg-select-opt').click(function() {
//     $(this)
//       .closest('output')
//       .find('.selected-bckg')
//       .removeClass('selected-bckg')
//       .text('panorama_fish_eye');
      
//     $(this)
//       .text($(this).hasClass('selected-bckg') ? 'panorama_fish_eye' : 'check_circle')
//       .toggleClass('selected-bckg');

//     let $bckgImgUrl = $(this)
//       .siblings('.thumb')
//       .css('backgroundImage')
//       .replace(/^url\(["|'](.+)["|']\)$/i, '$1');
//     self.props.setNeww($bckgImgUrl);
//   });

//   $('.glyphicon').click(function() {
//     $(this).closest('.thumbWrapper').remove();
//   });
// }
