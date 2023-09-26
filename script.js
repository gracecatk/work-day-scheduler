// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    
    // Add a click event listener to the document and delegate it to the save buttons
    $(document).on('click', '.saveBtn', function() {
        // Get the parent time-block element and its ID
        var timeBlock = $(this).closest('.time-block');
        var timeBlockId = timeBlock.attr('id');
        
        // Get the user input from the textarea within this time-block
        var userInput = timeBlock.find('textarea').val();
        
        // Save the user input in local storage using the timeBlockId as a key
        localStorage.setItem(timeBlockId, userInput);
    });

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();
    
    // Loop through each time-block and compare its hour with the current hour
    $('.time-block').each(function() {
        var timeBlockId = $(this).attr('id');
        var hour = parseInt(timeBlockId.split('-')[1]);
    
        // Add past, present, or future class based on the comparison
        if (hour < currentHour) {
            $(this).addClass('past');
        } else if (hour === currentHour) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    
    // Loop through each time-block to set user input from local storage
    $('.time-block').each(function() {
        var timeBlockId = $(this).attr('id');
        var userInput = localStorage.getItem(timeBlockId);
    
        // Set the value of the textarea if user input is found
        if (userInput !== null) {
            $(this).find('textarea').val(userInput);
        }
    });

    // TODO: Add code to display the current date in the header of the page.
    // Get the current date using Day.js and display it in the header
    var currentDate = dayjs().format('MMMM D, YYYY');
    $('#currentDate').text(currentDate);
});