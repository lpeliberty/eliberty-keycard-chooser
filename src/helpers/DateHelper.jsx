import moment from 'moment';

const getEndDate = (startDate, validityCategory) => {
  const end = moment(startDate);

  let duration = 0;
  if (validityCategory !== null) {
    duration = validityCategory.get('value') - 1;
  }

  return end.add(duration, 'day');
};

export default getEndDate;
