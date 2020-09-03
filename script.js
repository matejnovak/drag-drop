window.onload = function() {

  // Variables
  const fill = document.querySelector('.fill');
  const emptys = document.querySelectorAll('.empty');
  const body = document.getElementsByTagName('body')[0];
  let f;

  // Get document position of dragable object
  function getPos(el) {
    var rect = el.getBoundingClientRect();
    return { x:rect.left, y:rect.top };
  }

  // Get absolute position of dragable object
  var x = fill.offsetTop;
  var y = fill.offsetTop;


  /**
    * Mouse move
    */
  function moveElement() {
    // Update document position of gragable object
    var coords = getPos(fill);

    // Start
    body.addEventListener('mousemove', f=function(e) {
      // Grab element under mouse (mouse.position - object position - object width/2
      fill.style.top = ((e.clientY) - (coords.y)) - (fill.offsetHeight / 2) +'px';
      fill.style.left = ((e.clientX - coords.x)) - (fill.offsetWidth / 2) +'px';
      
      fill.style.pointerEvents = 'none';

      // Hover element under
      var element = document.elementFromPoint(e.clientX, e.clientY);
      // If element under = empty
      if (element.classList.contains('empty') && !element.classList.contains('hovered')) {
        // If not filled
        //if (!element.children.length > 0) {
          element.className += ' hovered';
        //}
      } else {
        // Remove hovered class on all empty classes
        for (i = 0; i < emptys.length; ++i) {
          if (!element.classList.contains('hovered')) {
            emptys[i].className = 'empty';
          }
        }
      }
    }, false);
  }


  /**
    * Mouse down
    */
  fill.addEventListener('mousedown', function(e) { 
    this.className += ' hold';
    moveElement();
  }, false);


  /**
    * Move up
    */
  body.addEventListener('mouseup', function(e) { 
      // Get element under mouse
      var element = document.elementFromPoint(e.clientX, e.clientY);

      // Add empty class
      if (element.classList.contains('empty')) {
        element.className = 'empty';
      }
      
      // If element under = empty
      if (element.classList.contains('empty')) {
        // Move element to new (empty) position
        element.append(fill);
        fill.style.top = '0px';
        fill.style.left = '0px';
      } else {
        // Move element to orginal position
        fill.style.top = y +'px';
        fill.style.left = x +'px';
      }

      fill.className = 'fill';
      fill.style.pointerEvents = 'inherit';

    // Remove mousemove listener
    body.removeEventListener('mousemove', f);
  }, false);
}