/* TRUE CONSTANTS */
export const DEFAULT_FONTS = 'Helvetica, sans-serif';
export const HELVETICA_NEUE = `"Helvetica Neue", ${DEFAULT_FONTS}`;

/* THEME FONT STYLES */
export default {
  face: {
    arial: `Arial, ${DEFAULT_FONTS}`,
    default: DEFAULT_FONTS,
    glyphicons: `"Glyphicons Halflings", ${DEFAULT_FONTS}`,
    material: `"Material Icons", ${DEFAULT_FONTS}`,
    neue: HELVETICA_NEUE,
    raleway: `Raleway, ${HELVETICA_NEUE}`,
    roboto: `Roboto, Arial, ${DEFAULT_FONTS}`,
    slant: `oblique 1.2rem/1 Raleway, ${HELVETICA_NEUE}`,
    title: `"Raleway Light", ${HELVETICA_NEUE}`,
    vollkorn: `'Vollkorn', ${DEFAULT_FONTS}`,
  },
  size: {
    appBar: 64,
    copy: 12,
    giant: 72,
    heading: 24,
    label: 10,
    large: 16,
    listItemHeader: 22,
    medium: 14,
    modal: 32,
    subHeading: 20,
    subTitle: 36,
    title: 48,
    tooltip: 8,
  },
};
