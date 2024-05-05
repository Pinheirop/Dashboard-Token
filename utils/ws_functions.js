"use client";
import { monthNames } from "@/shared/months";
import { dateTimeSlider } from "@/shared/temp_vars";
import DerivAPI from "@deriv/deriv-api/dist/DerivAPI";
const connection = new WebSocket(
  "wss://ws.derivws.com/websockets/v3?app_id=1089"
);
const api = new DerivAPI({ connection });

const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("user_token") : "";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

function getLastDateOfMonth(year, month) {
  // The month parameter is 0-indexed (0 for January, 1 for February, etc.)
  return new Date(year, month, 0).getDate();
}

export const authorizeAPI = async () => {
  await api.account(token);
};

export const loginUser = async (token) => {
  try {
    await api.account(token.trim());
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("user_token", token.trim());
    location.reload();
  } catch (error) {
    console.log("An error occured while logging in", error);
  }
};

export const getPreviousMonthCommission = async () => {
  const lastMonth = currentMonth;

  const dateFrom = `${currentYear}-${lastMonth}-01 00:00:00`;
  const dateTo = `${currentYear}-${lastMonth}-${getLastDateOfMonth(
    currentYear,
    lastMonth
  )} 23:59:59`;

  try {
    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: dateFrom,
      date_to: dateTo,
    });

    return markup.app_markup_statistics.total_app_markup_usd;
  } catch (error) {
    console.log(error);
  }
};

export const getTodaysCommission = async () => {
  const dateFrom = `${currentYear}-${currentMonth + 1}-${currentDay} 00:00:00`;
  const dateTo = `${currentYear}-${currentMonth + 1}-${currentDay} 23:59:59`;

  try {
    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: dateFrom,
      date_to: dateTo,
    });

    return markup.app_markup_statistics.total_app_markup_usd;
  } catch (error) {
    console.log(error);
  }
};

export const getThisMonthCommissions = async () => {
  const dateFrom = `${currentYear}-${currentMonth + 1}-01 00:00:00`;
  const dateTo = `${currentYear}-${currentMonth + 1}-${getLastDateOfMonth(
    currentYear,
    currentMonth + 1
  )} 23:59:59`;

  try {
    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: dateFrom,
      date_to: dateTo,
    });

    return markup.app_markup_statistics.total_app_markup_usd;
  } catch (error) {
    console.log(error);
  }
};

export const check_monthly_commission = async () => {
  const monthsList = [];
  try {
    // Loop from January to the current month
    for (let month = 0; month <= currentMonth; month++) {
      // Calculate the first date of the month
      const firstDate = new Date(currentYear, month, 1);
      // Calculate the last date of the month
      const lastDate = new Date(currentYear, month + 1, 0);

      // Format dates to YYYY-MM-DD HH:MM:SS
      const dateFrom = `${firstDate.getFullYear()}-${String(
        firstDate.getMonth() + 1
      ).padStart(2, "0")}-${String(firstDate.getDate()).padStart(
        2,
        "0"
      )} 00:00:00`;
      const dateTo = `${lastDate.getFullYear()}-${String(
        lastDate.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDate.getDate()).padStart(
        2,
        "0"
      )} 23:59:59`;

      // Request commission data for the month
      const markup = await api.basic.send({
        app_markup_statistics: 1,
        date_from: dateFrom,
        date_to: dateTo,
      });

      monthsList.push({
        name: monthNames[month],
        total:
          typeof markup.app_markup_statistics.total_app_markup_usd ===
          "undefined"
            ? 0
            : markup.app_markup_statistics.total_app_markup_usd,
      });
    }

    return monthsList;
  } catch (error) {
    console.log(error);
  }
};

export const customDateCommissionCheck = async () => {
  const is_single_date =
    dateTimeSlider.to == "undefined-undefined-undefined" ||
    dateTimeSlider.to == "undefined-NaN-undefined"
      ? true
      : false;
  try {
    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: `${dateTimeSlider.from} 00:00:00`,
      date_to: is_single_date
        ? `${dateTimeSlider.from} 23:59:59`
        : `${dateTimeSlider.to} 23:59:59`,
    });

    return markup.app_markup_statistics.total_app_markup_usd;
  } catch (error) {
    console.log(error);
  }
};
