"use strict"

 // Constants
    const CANVAS_ELEMENT = document.getElementById('clock');
    const CANVAS_CTX = CANVAS_ELEMENT.getContext('2d');
    const CLOCK_RADIUS = 100;
    const LABEL_FONT = '20px sans-serif';
    const LABEL_ALIGN = 'center';
    const LABEL_BASELINE = 'middle';
    const UPDATE_INTERVAL = 1000; // milliseconds

    // Helper functions
    function clearCanvas() {
      CANVAS_CTX.clearRect(0, 0, CANVAS_ELEMENT.width, CANVAS_ELEMENT.height);
    }

    function drawClockFace() {
      CANVAS_CTX.beginPath();
      CANVAS_CTX.arc(100, 100, CLOCK_RADIUS, 0, 2 * Math.PI);
      CANVAS_CTX.stroke();
    }

    function drawHand(length, angle) {
      CANVAS_CTX.beginPath();
      CANVAS_CTX.moveTo(100, 100);
      CANVAS_CTX.lineTo(
        100 + Math.cos(angle) * length,
        100 + Math.sin(angle) * length,
      );
      CANVAS_CTX.stroke();
    }

    function drawLabels() {
      // Draw the labels for the clock positions
      CANVAS_CTX.font = LABEL_FONT;
      CANVAS_CTX.textAlign = LABEL_ALIGN;
      CANVAS_CTX.textBaseline = LABEL_BASELINE;

      for (let i = 1; i <= 12; i += 1) {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x = 100 + Math.cos(angle) * CLOCK_RADIUS * 0.8;
        const y = 100 + Math.sin(angle) * CLOCK_RADIUS * 0.8;
        CANVAS_CTX.fillText(i.toString(), x, y);
      }
    }

    function drawClock(currentTime) {
      clearCanvas();
      drawClockFace();

      // Draw the hands of the clock
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const second = currentTime.getSeconds();

      // Calculate the angles for the hands
      const hourAngle = (hour / 12) * 2 * Math.PI - (Math.PI / 2);
      const minuteAngle = (minute / 60) * 2 * Math.PI - (Math.PI / 2);
      const secondAngle = (second / 60) * 2 * Math.PI - (Math.PI / 2);

      drawHand(CLOCK_RADIUS * 0.5, hourAngle);
      drawHand(CLOCK_RADIUS * 0.7, minuteAngle);
      drawHand(CLOCK_RADIUS * 0.9, secondAngle);

      drawLabels();
    }

    // Update the clock every second
    setInterval(function () {
      drawClock(new Date());
    }, UPDATE_INTERVAL);