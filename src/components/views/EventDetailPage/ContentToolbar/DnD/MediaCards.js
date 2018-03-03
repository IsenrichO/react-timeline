import React            from 'react';

// Material icons imports:
import ChecklistIcon    from 'material-ui-icons/Check';
import HistoryIcon      from 'material-ui-icons/History';
import ListIcon         from 'material-ui-icons/List';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';
import PlaceIcon        from 'material-ui-icons/Place';
import TextFieldIcon    from 'material-ui-icons/TextFields';

export const TextCardData = {
  icon: {
    fa: 'font',
    material: TextFieldIcon,
  },
  isEnabled: true,
  label: 'Text Content',
  properties: {},
};
export const GalleryCardData = {
  icon: {
    fa: 'picture-o',
    material: PhotoLibraryIcon,
  },
  isEnabled: true,
  label: 'Gallery',
  properties: {},
};
export const MapCardData = {
  icon: {
    fa: 'map-marker',
    material: PlaceIcon,
  },
  isEnabled: true,
  label: 'Map',
  properties: {},
};
export const ListCardData = {
  icon: {
    fa: 'list',
    material: ListIcon,
  },
  isEnabled: false,
  label: 'General-Purpose List',
  properties: {},
};
export const ToDoCardData = {
  icon: {
    fa: 'check-circle-o',
    material: ChecklistIcon,
  },
  isEnabled: false,
  label: 'To-Do List',
  properties: {},
};
export const HistoryCardData = {
  icon: {
    fa: 'history',
    material: HistoryIcon,
  },
  isEnabled: false,
  label: 'Chronology',
  properties: {},
};

/**
 * The `IterableMediaMap` object ― an ES6 Map object as well as a JavaScript iterable ― serves as
 * the data source from which the card-type thumbnails in the Source tab are constructed. The use
 * of a Map object was an intentional design decision, motivated by the fact that the order of its
 * key-value pairs is a direct reflection of the order in which the thumbnails will themselves be
 * rendered/ordered in the UI. (Of course, ordinary arrays can guarantee preservation of the
 * original insertion order too, but arrays get boring, #amirite?) This Map object is meant to house
 * all disparate card sub-types (alongside their requisite base data), though not all will
 * necessarily be employed. It will ultimately prove simpler to just modify the values' `isEnabled`
 * property as more clarity comes in on which card types the POs intend to include (as opposed to
 * adding, removing, re-adding entire key-value pairs). Those card types we do or do not intend to
 * support in the UI are recognizable by the value of their `isEnabled` property.
 * @type {Map}
 */
const IterableMediaMap = new Map([
  ['text', TextCardData],
  ['gallery', GalleryCardData],
  ['map', MapCardData],
  ['list', ListCardData],
  ['todo', ToDoCardData],
  ['history', HistoryCardData],
]);

export default IterableMediaMap;
