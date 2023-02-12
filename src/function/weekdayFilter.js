export function isOpenChecked(dayArr) {
  const isOpen = dayArr.includes("?")
    ? "?"
    : dayArr.includes(new Date().getDay().toString());
  return isOpen;
}

export function translateWeekday(weekday) {
  let weekdayZH;
  switch (weekday) {
    case "1":
      weekdayZH = "周一";
      break;
    case "2":
      weekdayZH = "周二";
      break;
    case "3":
      weekdayZH = "周三";
      break;
    case "4":
      weekdayZH = "周四";
      break;
    case "5":
      weekdayZH = "周五";
      break;
    case "6":
      weekdayZH = "周六";
      break;
    case "0":
      weekdayZH = "周日";
      break;
    case "?":
      weekdayZH = "不定休";
      break;
    default:
      console.error("請輸入0-6的字串");
  }
  return weekdayZH;
}
