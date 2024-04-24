document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.rating').forEach(function (input) {
    input.addEventListener('change', function () {
        let rating = this.value;
        let sno = this.closest('tr').querySelector('.sno').textContent;
        let saveButton = this.parentNode.nextElementSibling.querySelector('.myButton');
        saveButton.disabled = false;
    });

    let saveButton = input.parentNode.nextElementSibling.querySelector('.myButton');
    saveButton.disabled = true;

    saveButton.addEventListener('click', function () {
        let ratingInput = this.parentNode.previousElementSibling.querySelector('.rating');
        let rating = ratingInput.value;
        let sno = this.closest('tr').querySelector('.sno').textContent;
        console.log("New rating:", rating);

        // AJAX request to save rating
        fetch('/save_rating/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}' // Include CSRF token
            },
            body: JSON.stringify({ 'sno': sno, 'rating': rating })
        })
        .then(response => {
            if (response.ok) {
                console.log("Rating saved successfully");
                saveButton.disabled = true;
            } else {
                console.error("Failed to save rating");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
  });
  
  function sortTableSnoAsc() {
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
    
  function sortTableSourceAsc() {
    console.log("sortTableSourceAsc");
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector('table');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByClassName("td-sentences")[1].textContent || rows[i].getElementsByClassName("td-sentences")[1].innerText;
            y = rows[i + 1].getElementsByClassName("td-sentences")[1].textContent || rows[i + 1].getElementsByClassName("td-sentences")[1].innerText;
            if (x.localeCompare(y, 'hi') < 0) {   
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
  
  function sortTableSourceDesc() {
    console.log("sortTableSourceDesc");
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector('table');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByClassName("td-sentences")[1].textContent || rows[i].getElementsByClassName("td-sentences")[1].innerText;
            y = rows[i + 1].getElementsByClassName("td-sentences")[1].textContent || rows[i + 1].getElementsByClassName("td-sentences")[1].innerText;
            if (x.localeCompare(y,) > 0) { 
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
  
    function sortTableTargetAsc() {
      console.log("sortTableTargetAsc");
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.querySelector('table');
      switching = true;
      while (switching) {
          switching = false; 
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
              shouldSwitch = false; 
              x = rows[i].getElementsByClassName("td-sentences")[0].textContent || rows[i].getElementsByClassName("td-sentences")[0].innerText;
              y = rows[i + 1].getElementsByClassName("td-sentences")[0].textContent || rows[i + 1].getElementsByClassName("td-sentences")[0].innerText;
              if (x.localeCompare(y) < 0) {
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
  
  function sortTableTargetDesc() {
    console.log("sortTableTargetDesc");
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector('table');
    switching = true;
    while (switching) {
        switching = false; 
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false; 
            x = rows[i].getElementsByClassName("td-sentences")[0].textContent || rows[i].getElementsByClassName("td-sentences")[0].innerText;
            y = rows[i + 1].getElementsByClassName("td-sentences")[0].textContent || rows[i + 1].getElementsByClassName("td-sentences")[0].innerText;
            if (x.localeCompare(y) > 0) {
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
  