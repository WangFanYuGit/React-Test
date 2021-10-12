 window.onload = function () {
      var list = document.getElementById("slider-list");
      var next = document.getElementById("p-slider-next");
      var prev = document.getElementById("p-slider-prev");
      var imgWidth = document.body.clientWidth;
      var img = document.getElementsByClassName('slide-p');
      var autoHeight = window.getComputedStyle(img).height;
      var container = document.getElementById('slider-container');
      for (let i = 0; i < img.length; i++) {
        img[i].style.width = imgWidth + 'px';
      }
      list.style.left = -imgWidth + 'px';
      container.style.height = autoHeight + 'px';
      window.onresize = function () { 
        imgWidth = document.body.clientWidth;
        img = document.getElementsByClassName('slide-p');
        autoHeight = window.getComputedStyle(img).height;
        container = document.getElementById('slider-container');
        for (let i = 0; i < img.length; i++) {
          img[i].style.width = imgWidth + 'px';
        }
        list.style.left = -imgWidth + 'px';
        container.style.height = autoHeight + 'px';
      }
      
      function animate (offset) {
        var newLeft = parseFloat(list.style.left) + offset;
        if (newLeft < -imgWidth * 3) {
          list.style.left = -imgWidth + "px";
        } else if (newLeft > -imgWidth) {
          list.style.left = -imgWidth * 3 + "px";
        } else {
          list.style.left = newLeft + "px";
        }
      }
      var timer;
      function play () {
        timer = setInterval(function () {
          next.onclick();
        }, 4000)
      }
      play();


      var container = document.getElementById('slider-container');
      
      function stop () {
        clearInterval(timer);
      }
      container.onmouseover = stop;
      container.onmouseout = play;



      var buttons = document.getElementById("slider-buttons").getElementsByTagName("span");
      var index = 1;
      function buttonsShow () {

        for (var i = 0; i < buttons.length; i++) {
          if (buttons[i].className === "on") {
            buttons[i].className = '';
          }
        }

        buttons[index - 1].className = 'on';
      }
      prev.onclick = function () {
        index -= 1;
        if (index < 1) {
          index = 3;
        }
        buttonsShow();
        animate(imgWidth);
      }
      next.onclick = function () {
        index += 1;
        if (index > 3) {
          index = 1;
        }
        buttonsShow();
        animate(-imgWidth);
      }


      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
          var clickIndex = parseInt(this.getAttribute('index'));
          var offset = imgWidth * (index - clickIndex);
          animate(offset); 
          index = clickIndex;
          buttonsShow();
        }
      }
}