// Function to create the window that follows the mouse
function createMouseFollowingWindow() {
  // Create a new window with the updated dimensions (200x200)
  const windowName = 'mouseWindow_' + Math.random(); // Ensure unique name
  const mouseWindow = window.open('', windowName, 'width=200,height=200');
  
  // Add content to the window
  mouseWindow.document.write('<h1>I\'m following your mouse!</h1>');

  // Function to update the position of the mouse-following window based on mouse movement
  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    mouseWindow.moveTo(mouseX + 10, mouseY + 10); // Add offset to prevent covering the mouse pointer
  });

  // Event listener for clicking on the mouse-following window
  mouseWindow.addEventListener('click', function() {
    createAnnoyingWindow(); // When the sticky window is clicked, open the bouncing window
  });
}

// Function to create the annoying window that moves around the screen like the DVD logo
function createAnnoyingWindow() {
  // Create a new window with the updated dimensions (555x270)
  const windowName = 'annoyingWindow_' + Math.random(); // Ensure unique name
  const newWindow = window.open('', windowName, 'width=555,height=270');
  
  // Add the initial message to the new window
  newWindow.document.write('<h1>I have currently hacked your computer.</h1>');
  newWindow.document.write('<p>Your information is now compromised. Power off this computer before your files are sent to Telegram in 10 seconds.</p>');
  
  // Set initial position for the window
  let posX = Math.floor(Math.random() * (window.innerWidth - 555)); // 555 is the width of the new window
  let posY = Math.floor(Math.random() * (window.innerHeight - 270)); // 270 is the height of the new window

  // Initial velocity in both x and y directions (moving diagonally)
  let velocityX = 5; // Horizontal speed
  let velocityY = 3; // Vertical speed

  // Store the window's width and height for collision detection
  const windowWidth = 555;
  const windowHeight = 270;

  newWindow.moveTo(posX, posY); // Move the window to its initial position

  // Function to move the window and make it bounce like the DVD logo
  const moveWindow = setInterval(() => {
    const currentPosX = newWindow.screenX;
    const currentPosY = newWindow.screenY;

    // Check for collision with the right or left edges
    if (currentPosX + windowWidth >= window.innerWidth || currentPosX <= 0) {
      velocityX = -velocityX; // Reverse the horizontal direction (bounce)
    }

    // Check for collision with the top or bottom edges
    if (currentPosY + windowHeight >= window.innerHeight || currentPosY <= 0) {
      velocityY = -velocityY; // Reverse the vertical direction (bounce)
    }

    // Update position based on velocity
    posX += velocityX;
    posY += velocityY;

    // Move the window to the new position, updating by velocity
    newWindow.moveTo(posX, posY);
  }, 50); // Every 50ms to create smooth motion

  // Countdown from 10 to 1
  let countdown = 10;
  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      newWindow.document.body.innerHTML = `<h1>I have currently hacked your computer.</h1><p>Your information is now compromised. Power off this computer before your files are sent to Telegram in <strong>${countdown}</strong> seconds.</p>`;
      countdown--; // Decrement the countdown
    } else {
      // When countdown finishes, display the final message
      newWindow.document.body.innerHTML = '<h1>Your files have now been sent to Telegram :3</h1>';
      clearInterval(countdownInterval); // Stop the countdown interval
    }
  }, 1000); // Update every 1 second
}

// Event listener for page click to trigger the creation of the mouse-following window
document.addEventListener('click', function() {
  createMouseFollowingWindow(); // Open the mouse-following window when the user clicks anywhere on the page
});
