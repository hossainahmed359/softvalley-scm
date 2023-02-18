import moment from "moment";

export const getDateRangeSearchUrlParam = (data) => {
  return `${moment(data[0]).format("YYYY-MM-DD")}|${moment(data[1]).format(
    "YYYY-MM-DD"
  )}`;
};

export const parseDateRangeSearchUrlParam = (data) => {
  if (!data) return [new Date(), new Date()];

  const startDate = moment(data?.split("|")?.[0], "YYYY-MM-DD").toDate();
  const endDate = moment(data?.split("|")?.[1], "YYYY-MM-DD").toDate();
  return [startDate, endDate];
};
