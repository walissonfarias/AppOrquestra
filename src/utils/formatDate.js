import moment from 'moment';
import 'moment/locale/pt-br';

export default (date, format) =>
  moment(date)
    .format(format)
    .toLowerCase();
