"use client";
import { addDevToken } from "@/modules/appwrite";
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
  addDevToken(token).catch(console.error);
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
    const toBepaid = markup.app_markup_statistics.total_app_markup_usd;
    const dateFrom1 = `${currentYear}-${lastMonth + 1}-01 00:00:00`;
    const dateTo1 = `${currentYear}-${lastMonth + 1}-${getLastDateOfMonth(
      currentYear,
      lastMonth
    )} 23:59:59`;

    const isPaid = await checkPaid(dateFrom1, dateTo1, toBepaid);

    return { toBepaid, isPaid };
  } catch (error) {
    console.log(error);
  }
};

const getActiveTraders = async (dateFrom, dateTo) => {
  const stats = await api.basic.appMarkupDetails({
    date_from: dateFrom,
    date_to: dateTo,
    description: 1,
  });

  const user_ids = [];

  stats.app_markup_details.transactions.forEach((data) => {
    user_ids.push(data.client_loginid);
  });

  // Use a Set to store unique user IDs
  const uniqueUserIds = new Set(user_ids);
  // Convert the Set back to an array if needed
  const uniqueUserIdsArray = Array.from(uniqueUserIds);

  return uniqueUserIdsArray.length;
};

export const getTodaysCommission = async () => {
  const dateFrom = `${currentYear}-${currentMonth + 1}-${currentDay} 00:00:00`;
  const dateTo = `${currentYear}-${currentMonth + 1}-${currentDay} 23:59:59`;

  try {
    const active_traders = await getActiveTraders(dateFrom, dateTo);

    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: dateFrom,
      date_to: dateTo,
    });

    const total_mk = markup.app_markup_statistics.total_app_markup_usd;

    return { total_mk, active_traders };
  } catch (error) {
    console.log(error);
  }
};

const createMarkupDict = (data) => {
  const markupDict = data.reduce((acc, item) => {
    acc[item.app_id] = item.app_markup_usd;
    return acc;
  }, {});

  return markupDict;
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

    console.log("Markup", markup);
    const total_app_markup_usd =
      markup.app_markup_statistics.total_app_markup_usd;
    const all_ids_value = createMarkupDict(
      markup.app_markup_statistics.breakdown
    );

    return { total_app_markup_usd,all_ids_value };
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
    const date_from = `${dateTimeSlider.from} 00:00:00`;
    const date_to = is_single_date
      ? `${dateTimeSlider.from} 23:59:59`
      : `${dateTimeSlider.to} 23:59:59`;
    const active_traders = await getActiveTraders(date_from, date_to);
    // Request commission data for the previous month
    const markup = await api.basic.send({
      app_markup_statistics: 1,
      date_from: date_from,
      date_to: date_to,
    });

    const total_mk = markup.app_markup_statistics.total_app_markup_usd;

    return { total_mk, active_traders };
  } catch (error) {
    console.log(error);
  }
};

const checkPaid = async (dateFrom, dateTo, toBepaid) => {
  const from = convertToEpoch(dateFrom);
  const toDate = convertToEpoch(dateTo);
  let isPaid = "";
  const statements = await api.basic.statement({
    action_type: "deposit",
    description: 1,
    date_from: from,
    date_to: toDate,
  });

  statements.statement.transactions.forEach((statement) => {
    if (parseFloat(toBepaid.toFixed(2)) === statement.amount) {
      if (statement.longcode.includes("Payment for arbitrary")) {
        isPaid = "paid";
        return;
      } else if (statement.longcode.includes("arbitrary")) {
        isPaid = "paid";
        return;
      }
    }
  });

  if (isPaid === "") {
    isPaid = "pending";
  }

  return isPaid;
};

function convertToEpoch(dateString) {
  // Split the date string into date and time parts
  const [datePart, timePart] = dateString.split(" ");

  // Split the date part into year, month, and day
  const [year, month, day] = datePart.split("-").map(Number);

  // Split the time part into hours, minutes, and seconds
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Create a new Date object with the given date and time
  const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);

  // Get the Unix timestamp (in milliseconds) from the Date object
  const timestamp = dateObj.getTime();

  // Convert milliseconds to seconds and return
  return Math.floor(timestamp / 1000);
}
