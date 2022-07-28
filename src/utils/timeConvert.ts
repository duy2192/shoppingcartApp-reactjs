import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
export const getDate = (date?: Date) => {
  return moment(date).format('DD/MM/YYYY');
};
export const getTime = (date: Date) => {
  return moment(date).format('LT');
};

