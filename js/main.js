let searchBox = document.getElementById("searchBox");
let myData = "cairo";
//all inputs must be changed for day 1
let firstDay = document.getElementById("firstDay"),
  currentDate = document.getElementById("currentDate"),
  currentCity = document.getElementById("currentCity"),
  current_temp_c = document.getElementById("current_temp_c"),
  currentStatus = document.getElementById("currentStatus"),
  currentIcon = document.getElementById("currentIcon");

//all inputs must be changed for day 2
let dayName2 = document.getElementById("dayName2"),
  icon2 = document.getElementById("icon2"),
  day2_maxtemp_c = document.getElementById("day2_maxtemp_c"),
  day2_mintemp_c = document.getElementById("day2_mintemp_c"),
  status2 = document.getElementById("status2");

//all inputs must be changed for day 3
let dayName3 = document.getElementById("dayName3"),
  icon3 = document.getElementById("icon3"),
  day3_maxtemp_c = document.getElementById("day3_maxtemp_c"),
  day3_mintemp_c = document.getElementById("day3_mintemp_c"),
  status3 = document.getElementById("status3");

let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function setWhether(city) {
  let messageError = "";
  try {
    myData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=990d3dde0fcc47cb8fc130323230308&q=${city}&days=3`
    );
    myData = await myData.json();
    
    // change Day 1
    let myCurrDays = Array.from(myData.forecast.forecastday),
      date1 = new Date(myCurrDays[0].date),
      dayInd = date1.getDay(),
      monthInd = date1.getMonth(),
      dayOfMonth = date1.getDate();
    firstDay.innerHTML = Days[dayInd];
    currentDate.innerHTML = `${dayOfMonth}${months[monthInd]}`;
    currentCity.innerHTML = myData.location.name;
    current_temp_c.innerHTML = myData.current.temp_c;
    currentIcon.src = `${myData.current.condition.icon}`;
    currentStatus.innerHTML = myData.current.condition.text;

    // change day 2
    let date2 = new Date(myCurrDays[1].date),
      dayInd2 = date2.getDay();
    dayName2.innerHTML = Days[dayInd2];
    icon2.src = `${myCurrDays[1].day.condition.icon}`;
    day2_maxtemp_c.innerHTML = myCurrDays[1].day.maxtemp_c;
    day2_mintemp_c.innerHTML = myCurrDays[1].day.mintemp_c;
    status2.innerHTML = myCurrDays[1].day.condition.text;

    // change day 3
    let date3 = new Date(myCurrDays[2].date),
      dayInd3 = date3.getDay();
    dayName3.innerHTML = Days[dayInd3];
    icon3.src = `${myCurrDays[2].day.condition.icon}`;
    day3_maxtemp_c.innerHTML = myCurrDays[2].day.maxtemp_c;
    day3_mintemp_c.innerHTML = myCurrDays[2].day.mintemp_c;
    status3.innerHTML = myCurrDays[2].day.condition.text;
  } catch (err) {
    messageError = err.message;
  }
  if (messageError) console.error(`my Error is ` + messageError);
}

searchBox.addEventListener("input", () => {
  if (searchBox.value.length >= 3) {
    setWhether(searchBox.value);
  }
});

// default city
setWhether("cairo");