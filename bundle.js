// // the current position of mouse
// let x = 0;
// let y = 0;
// let leftWidth = 0;

// // query the element (Query = request for data of element)
// const ele = document.getElementById('dragMe');
// const leftSide = ele.previousElementSibling;
// const rightSide = ele.nextElementSibling;

// // handle the mousedown event that triggers when user drags element
// const mouseDownHandler = function (e) {
//     // get the current mouse position
//     x = e.clientX;
//     y = e.clientY;
//     leftWidth = leftSide.getBoundingClientRect().width;

//     // attach the listeners to 'document'
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
// };

// // attach the handler
// ele.addEventListener('mousedown', mouseDownHandler);

// const mouseMoveHandler = function (e) {
//     // function for how far the move has moved
//     const dx = e.clientX - x;
//     const dy = e.clientY - y;

//     // set the position of the element
//     // ele.style.top = `${ele.offsetTop + dy}px`;
//     // ele.style.left = `${ele.offsetLeft + dx}px`;

//     const newLeftWidth = ((leftWidth + dx) * 100) / ele.parentNode.getBoundingClientRect().width;
//     leftSide.style.width = `${newLeftWidth}%`;

//     // // reassign the position of the mouse
//     // x = e.clientX;
//     // y = e.clientY;
// };

// const mouseUpHandler = function () {
//     document.removeEventListener('mousemove', mouseMoveHandler);
//     document.removeEventListener('mouseup', mouseUpHandler);

// https://htmldom.dev/create-resizable-split-views/
// };

// _______________________________________

// function addTime() {
// const timePara = document.createElement("div");
// const timeNode = document.createTextNode("Test");
// timeAdder.appendChild(node);
// const timeEle = document.getElementById("time-log");
// timeEle.appendChild(timePara);
// }

// function startTimer() {
//     var hoursLabel = document.getElementById("hours");
//     var minutesLabel = document.getElementById("minutes");
//     var secondsLabel = document.getElementById("seconds");
//     var totalSeconds = 0;
//     setInterval(setTime, 1000);

//     function setTime()
//     {
//         ++totalSeconds;
//         secondsLabel.innerHTML = pad(totalSeconds%60);
//         minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
//         hoursLabel.innerHTML = pad(parseInt(totalSeconds/3600));
//     }

//     function pad(val)
//     {
//         var valString = val + "";
//         if(valString.length < 2)
//         {
//             return "0" + valString;
//         }
//         else
//         {
//             return valString;
//         }
//     }
// }

// $('#startTimer').click(function(){ startTimer(); return false;});

var hours, minutes, seconds;
var startStopTimer = document.getElementById("startStopTimer");
startStopTimer.addEventListener("click", startTimer);

function startTimer() {
  console.log("Started");
  startStopTimer.removeEventListener("click", startTimer);
  startStopTimer.addEventListener("click", stopTimer);
  startStopTimer.value = "stopTimer";
  document.getElementById("startStopTimer").className = "stop-timer";
  document.getElementById("startStopTimer").innerHTML = "Stop";
  hours = 0;
  minutes = 0;
  seconds = 0;

  var hoursLabel = document.getElementById("hours");
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");

  var startTime = new Date();

  timeInt = setInterval(function () {
    var currentTime = new Date();
    seconds = currentTime.getSeconds() - startTime.getSeconds();

    if (seconds < 0) {
      seconds += 60;
    } else if (seconds === 0) {
      minutes = currentTime.getMinutes() - startTime.getMinutes();
      hours = currentTime.getHours() - startTime.getHours();
    }

    secondsLabel.innerHTML = pad(seconds);
    minutesLabel.innerHTML = pad(minutes);
    hoursLabel.innerHTML = pad(hours);

    // function pad(val) {
    //     var valString = val + "";
    //     if(valString.length < 2) {
    //         return "0" + valString;
    //     }else{
    //         return valString;
    //     }
    // }

    //console.log(hours + ':' + minutes + ':' + seconds);
  }, 100);
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function stopTimer() {
  console.log("Stopped");
  startStopTimer.removeEventListener("click", stopTimer);
  startStopTimer.addEventListener("click", startTimer);
  startStopTimer.value = "startTimer";
  document.getElementById("startStopTimer").className = "start-timer";
  document.getElementById("startStopTimer").innerHTML = "Start";
  clearInterval(timeInt);
  addLog();
}

function addLog() {
  var timeDiv = document.getElementById("time-log");
  var firstChild = timeDiv.firstChild;
  var timeLog = document.createElement("div");
  timeLog.classList.add("time-card");
  
  // if(hours >= 2) {
  //   timeLog.appendChild(
  //     document.createTextNode(
  //       hours + " hours " + minutes + " minutes"
  //     )
  //   );
  // }else if(hours = 0) {
  //   timeLog.appendChild(
  //     document.createTextNode(
  //       hours + " hour " + minutes + " minutes"
  //     )
  //   );
  // }else if(minutes >= 2) {
  //   timeLog.appendChild(
  //     document.createTextNode(
  //       minutes + " minutes " + seconds + " seconds"
  //     )
  //   );
  // }else if(minutes = 1) {
  //   timeLog.appendChild(
  //     document.createTextNode(
  //       minutes + " minute " + seconds + " seconds"
  //     )
  //   );
  // }else{
  //   timeLog.appendChild(
  //     document.createTextNode(
  //       seconds + " seconds"
  //     )
  //   );
  // }

  timeLog.appendChild(
    document.createTextNode(
      isZero(lowerThanTen(hours)) + isZero(lowerThanTen(minutes)) + isZero(lowerThanTen(seconds))
    )
  );

  timeDiv.insertBefore(timeLog, firstChild);
}

function isZero(val) {
  if(val == hours && val != 0) {
    return val + " hours ";
  } else if(val == minutes && val != 0) {
    return val + " minutes ";
  } else if(val == seconds && val != 0) {
    return val + " seconds";
  } else {
    return null;
  }
}

function lowerThanTen(val) {
  if(val > 0 && val < 10) {
    return val % 10;
  } else {
    return val;
  }
}

// function convertTimeToMinutes() {
//   // var hms = createTextNode(pad(hours) + ":" + pad(minutes) + ":" + pad(seconds));
//   var hms = '02:04:00';
//   var a = hms.split(':');
//   var hourInt = parseInt((+a[0]));
//   var minuteInt = parseInt((+a[1]));
  
//   var minutes = hourInt * 60 + minuteInt;

//   // console.log(minutes + "," + ((+a[2]) / 60));

//   return minutes;
// }