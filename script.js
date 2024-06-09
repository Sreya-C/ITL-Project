function storeRating(){
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('myButton')){ // This line checks whether the element that triggered the click event (event.target is the element which has been clicked) has the class "myButton" by using the classList.contains() method. If the clicked element has this class, it means it's a "Save" button. {
            let row = event.target.parentNode.parentNode; // If the clicked element is a "Save" button, this line retrieves the parent node of the clicked button twice (parentNode.parentNode). This is done to traverse up the DOM tree and get the parent <tr> element (row) that contains the clicked button.
            let ratingInput = row.querySelector('.rating');
            // Get the value from the rating input
            let rating = ratingInput.value;
            console.log("New rating:", rating);
            // Here you can save the rating value or perform any other desired action
            saveButton.disabled = true;
        } 
  });
});
}


function sortTableSnoAsc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector('table');
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = parseFloat(rows[i].getElementsByClassName("sno")[0].innerHTML); // in the ith row takes the first column named as Sno.
      y = parseFloat(rows[i + 1].getElementsByClassName("sno")[0].innerHTML);
      if (x > y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
  

function sortTableSnoDesc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector('table');
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = parseFloat(rows[i].getElementsByClassName("sno")[0].innerHTML);
      y = parseFloat(rows[i + 1].getElementsByClassName("sno")[0].innerHTML);
      if (x < y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
  

function sortTableRatingAsc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector('table');
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = parseFloat(rows[i].getElementsByTagName("input")[0].value);
      y = parseFloat(rows[i + 1].getElementsByTagName("input")[0].value);
      if (x > y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

  function sortTableRatingDesc() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector('table');
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = parseFloat(rows[i].getElementsByTagName("input")[0].value);
        y = parseFloat(rows[i + 1].getElementsByTagName("input")[0].value);
        if (x < y) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  let counterSNO = 0;
  let counterSOURCE = 0;
  let counterTARGET = 0;
  let counterRATING = 0;

  document.addEventListener('click', function(event){
    if(event.target.classList.contains('sort-SNO'))
    {
      if(counterSNO % 2 == 0)
      {
        sortTableSnoAsc();
        counterSNO++;
      }
      else
      {
        sortTableSnoDesc();
        counterSNO++;
      }
    }

    else if(event.target.classList.contains('sort-SOURCE'))
    {
      if(counterSOURCE % 2 == 0)
      {
        sortTableSourceAsc();
        counterSOURCE++;
      }
      else
      {
        sortTableSourceDesc();
        counterSOURCE++;
      } 
    }

    else if(event.target.classList.contains('sort-TARGET'))
    {
      if(counterTARGET % 2 == 0)
      {
        sortTableTargetAsc();
        counterTARGET++;
      }
      else
      {
        sortTableTargetDesc();
        counterTARGET++;
      } 
    }

    else if(event.target.classList.contains('sort-RATING'))
    {
      if(counterRATING % 2 == 0)
      {
        sortTableRatingAsc();
        counterRATING++;
      }
      else
      {
        sortTableRatingDesc();
        counterRATING++;
      } 
    }

  });

const sliders = document.querySelectorAll('.rating');
sliders.forEach(slider => {
  slider.addEventListener('input', function() {
    const saveButton = this.closest('tr').querySelector('.myButton');
    saveButton.disabled = false;
    storeRating();
    });
  });