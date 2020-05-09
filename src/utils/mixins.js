import moment from 'moment';

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime? moment(datetime).fromNow(): '-';
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'http://via.placeholder.com/300X300?test=No+Image'
    }
  }
}