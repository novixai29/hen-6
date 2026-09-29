"use strict";


/* ==========================================================
   BAYT GATE — باب الدار

   عدّل معلومات الزبون من هنا فقط
========================================================== */

const eventConfig = {

  fatherName:
    "نزار صالح",

  groomName:
    "عمر",

  dayName:
    "الخميس",

  dateText:
    "19 نوفمبر 2026",

  dateDay:
    "19",

  dateMonth:
    "نوفمبر",

  dateYear:
    "2026",

  timeText:
    "7:30 مساءً",

  venue:
    "قاعة الرافدين",

  city:
    "الموصل",

  address:
    "الموصل - حي الجامعة",

  /*
    العراق +03:00
  */
  eventDate:
    "2026-11-19T19:30:00+03:00",

  eventDurationHours:
    4,

  /*
    ضع رابط Google Maps الحقيقي هنا
  */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mosul",

  /*
    إذا تركته فارغاً
    سيستخدم رابط الصفحة الحالية
  */
  invitationUrl:
    "",

  calendarTitle:
    "حنة عمر - باب الدار",

  calendarDescription:
    "يتشرف السيد نزار صالح بدعوتكم لحضور حنة ابنه عمر. حضوركم يزيد دارنا بهجة وفرحتنا سروراً."

};


/* ==========================================================
   READY
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyInvitationData();

    setupGate();

    setupReveal();

    setupMap();

    setupCountdown();

    setupCalendar();

    setupShare();

  }
);


/* ==========================================================
   DATA BINDING
========================================================== */

function applyInvitationData() {

  const elements =
    document.querySelectorAll(
      "[data-bind]"
    );


  elements.forEach(
    (element) => {

      const key =
        element.dataset.bind;


      if (
        key === "fatherFull"
      ) {

        element.textContent =
          `السيد ${eventConfig.fatherName}`;

        return;

      }


      if (
        key === "fatherHouse"
      ) {

        element.textContent =
          `دار السيد ${eventConfig.fatherName}`;

        return;

      }


      if (
        Object.prototype.hasOwnProperty.call(
          eventConfig,
          key
        )
      ) {

        element.textContent =
          eventConfig[key];

      }

    }
  );


  document.title =
    `باب الدار | حنة ${eventConfig.groomName}`;

}


/* ==========================================================
   GATE
========================================================== */

function setupGate() {

  const gate =
    document.getElementById(
      "gateScreen"
    );

  const button =
    document.getElementById(
      "openGate"
    );


  if (!gate || !button) {
    return;
  }


  document.body.classList.add(
    "gate-active"
  );


  button.addEventListener(
    "click",
    () => {

      if (
        gate.classList.contains(
          "is-open"
        )
      ) {
        return;
      }


      gate.classList.add(
        "is-open"
      );


      document.body.classList.remove(
        "gate-active"
      );


      window.setTimeout(
        () => {

          if (gate.parentNode) {
            gate.remove();
          }

        },
        1850
      );

    }
  );

}


/* ==========================================================
   REVEAL
========================================================== */

function setupReveal() {

  const elements =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    elements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      (
        entries,
        currentObserver
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            currentObserver.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -35px 0px"
      }

    );


  elements.forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );

}


/* ==========================================================
   MAP
========================================================== */

function setupMap() {

  const button =
    document.getElementById(
      "mapButton"
    );


  if (!button) {
    return;
  }


  button.href =
    eventConfig.mapUrl;

}


/* ==========================================================
   COUNTDOWN
========================================================== */

function setupCountdown() {

  const daysElement =
    document.getElementById(
      "days"
    );

  const hoursElement =
    document.getElementById(
      "hours"
    );

  const minutesElement =
    document.getElementById(
      "minutes"
    );

  const secondsElement =
    document.getElementById(
      "seconds"
    );

  const countdown =
    document.getElementById(
      "countdown"
    );

  const started =
    document.getElementById(
      "eventStarted"
    );


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  const target =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      target.getTime()
    )
  ) {

    console.warn(
      "Invalid event date"
    );

    return;

  }


  function updateCountdown() {

    const now =
      new Date();


    const distance =
      target.getTime() -
      now.getTime();


    if (
      distance <= 0
    ) {

      daysElement.textContent =
        "00";

      hoursElement.textContent =
        "00";

      minutesElement.textContent =
        "00";

      secondsElement.textContent =
        "00";


      if (countdown) {
        countdown.hidden = true;
      }


      if (started) {
        started.hidden = false;
      }


      return false;

    }


    const dayMs =
      1000 * 60 * 60 * 24;

    const hourMs =
      1000 * 60 * 60;

    const minuteMs =
      1000 * 60;


    const days =
      Math.floor(
        distance / dayMs
      );


    const hours =
      Math.floor(
        (
          distance %
          dayMs
        ) /
        hourMs
      );


    const minutes =
      Math.floor(
        (
          distance %
          hourMs
        ) /
        minuteMs
      );


    const seconds =
      Math.floor(
        (
          distance %
          minuteMs
        ) /
        1000
      );


    daysElement.textContent =
      formatNumber(days);

    hoursElement.textContent =
      formatNumber(hours);

    minutesElement.textContent =
      formatNumber(minutes);

    secondsElement.textContent =
      formatNumber(seconds);


    return true;

  }


  const active =
    updateCountdown();


  if (!active) {
    return;
  }


  const timer =
    window.setInterval(
      () => {

        const stillActive =
          updateCountdown();


        if (!stillActive) {

          window.clearInterval(
            timer
          );

        }

      },
      1000
    );

}


/* ==========================================================
   NUMBER
========================================================== */

function formatNumber(value) {

  return String(value)
    .padStart(
      2,
      "0"
    );

}


/* ==========================================================
   CALENDAR
========================================================== */

function setupCalendar() {

  const button =
    document.getElementById(
      "calendarButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    downloadCalendar
  );

}


function downloadCalendar() {

  const startDate =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      startDate.getTime()
    )
  ) {

    showToast(
      "تعذر إنشاء الموعد"
    );

    return;

  }


  const endDate =
    new Date(
      startDate.getTime() +
      eventConfig.eventDurationHours *
      60 *
      60 *
      1000
    );


  const location =
    [
      eventConfig.venue,
      eventConfig.city,
      eventConfig.address
    ].join(" - ");


  const description =
    `${eventConfig.calendarDescription}\n${getInvitationUrl()}`;


  const content = [

    "BEGIN:VCALENDAR",

    "VERSION:2.0",

    "PRODID:-//Bayt Gate//Henna Invitation//AR",

    "CALSCALE:GREGORIAN",

    "METHOD:PUBLISH",

    "BEGIN:VEVENT",

    `UID:${Date.now()}@bayt-gate`,

    `DTSTAMP:${toICSDate(new Date())}`,

    `DTSTART:${toICSDate(startDate)}`,

    `DTEND:${toICSDate(endDate)}`,

    `SUMMARY:${escapeICSText(eventConfig.calendarTitle)}`,

    `DESCRIPTION:${escapeICSText(description)}`,

    `LOCATION:${escapeICSText(location)}`,

    "STATUS:CONFIRMED",

    "END:VEVENT",

    "END:VCALENDAR"

  ].join("\r\n");


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `henna-${slugify(eventConfig.groomName)}.ics`;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  window.setTimeout(
    () => {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );


  showToast(
    "تم إنشاء موعد التقويم"
  );

}


/* ==========================================================
   ICS
========================================================== */

function toICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICSText(text) {

  return String(text)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}


/* ==========================================================
   SHARE
========================================================== */

function setupShare() {

  const button =
    document.getElementById(
      "shareButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const url =
    getInvitationUrl();


  const title =
    `باب الدار | حنة ${eventConfig.groomName}`;


  const text =
    `يتشرف السيد ${eventConfig.fatherName} بدعوتكم لحضور حنة ابنه ${eventConfig.groomName}، وذلك ${eventConfig.dayName} ${eventConfig.dateText} الساعة ${eventConfig.timeText} في ${eventConfig.venue}.`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title,
        text,
        url
      });


      return;

    }
    catch (error) {

      if (
        error &&
        error.name ===
        "AbortError"
      ) {
        return;
      }

    }

  }


  const copied =
    await copyToClipboard(
      `${text}\n${url}`
    );


  if (copied) {

    showToast(
      "تم نسخ رابط الدعوة"
    );

  }
  else {

    showToast(
      "تعذر نسخ الرابط تلقائياً"
    );

  }

}


/* ==========================================================
   CLIPBOARD
========================================================== */

async function copyToClipboard(text) {

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    try {

      await navigator.clipboard.writeText(
        text
      );


      return true;

    }
    catch (error) {

      console.warn(
        "Clipboard API failed",
        error
      );

    }

  }


  try {

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;


    textarea.setAttribute(
      "readonly",
      ""
    );


    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    textarea.style.pointerEvents =
      "none";


    document.body.appendChild(
      textarea
    );


    textarea.select();


    textarea.setSelectionRange(
      0,
      textarea.value.length
    );


    const successful =
      document.execCommand(
        "copy"
      );


    textarea.remove();


    return successful;

  }
  catch (error) {

    console.warn(
      "Clipboard fallback failed",
      error
    );


    return false;

  }

}


/* ==========================================================
   URL
========================================================== */

function getInvitationUrl() {

  if (
    eventConfig.invitationUrl &&
    eventConfig.invitationUrl.trim()
  ) {

    return eventConfig
      .invitationUrl
      .trim();

  }


  return window
    .location
    .href
    .split("#")[0];

}


/* ==========================================================
   TOAST
========================================================== */

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  const toastText =
    document.getElementById(
      "toastText"
    );


  if (!toast || !toastText) {
    return;
  }


  toastText.textContent =
    message;


  toast.classList.add(
    "show"
  );


  if (toastTimer) {

    window.clearTimeout(
      toastTimer
    );

  }


  toastTimer =
    window.setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* ==========================================================
   FILE NAME
========================================================== */

function slugify(value) {

  return String(value)

    .trim()

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /[^\u0600-\u06FFa-zA-Z0-9-_]/g,
      ""
    )

    || "event";

}
