$(document).ready(function () {
  // Display Current Day
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  //Past, Present, Future time-block colors
  function updateColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Update colors on page load
  updateColors();

  // Save Buttons
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id").split("-")[1];
    var description = $(this).siblings(".description").val();

  // Save Data to local storage
  localStorage.setItem("event_" + hour, description);
});

  //Display saved event from local stoarge 
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id").split("-")[1];
      var savedEvent = localStorage.getItem("event_" + hour);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }
// Load events on page load
loadEvents();

// Periodically update time-block colors (every minute in this example)
setInterval(updateColors, 60000);
});
