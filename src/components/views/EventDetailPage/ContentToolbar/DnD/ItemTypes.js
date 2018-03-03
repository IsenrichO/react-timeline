import { getEmptyImage, NativeTypes } from 'react-dnd-html5-backend';

/* DRAG SOURCE TYPES */
export const CARD = Symbol('MEDIA_CONTENT_CARD');
export const GALLERY = Symbol('PHOTO_REEL');
export const LIST = Symbol('CHECKLIST');
export const MAP = Symbol('INTERACTIVE_MAP');
export const TEXT = Symbol('TEXT_BLOCK');

export const SOURCES = [GALLERY, LIST, MAP, TEXT];

/* DROP TARGET TYPES */
export const SEQUENCER = 'CONTENT_SEQUENCER';
export const COVER_CARD = 'FEED_CARD';

/* EXPORTS */
export const EMPTY = getEmptyImage;
export const { FILE, TEXT: NATIVE_TEXT, URL } = NativeTypes;

export const NATIVES = [FILE, TEXT, URL];

export default {
  EMPTY, // Fallback transparent Image drag preview
  NATIVES: { FILE, NATIVE_TEXT, URL },
  SOURCES: { CARD, GALLERY, LIST, MAP, TEXT },
  TARGETS: { COVER_CARD, SEQUENCER },
};
