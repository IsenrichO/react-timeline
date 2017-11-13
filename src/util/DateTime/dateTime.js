import moment from 'moment';

export const parseAndFormatIsoDateTime = (dateTime) => moment(dateTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  .format('DD/MM/YYYY');

/* COMPILED DEFAULT EXPORT */
export default {
  parseAndFormatIsoDateTime,
};
