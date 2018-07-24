var count = 0
var config = {
    apiKey: "AIzaSyCcnYsUl9ZJ-xeYx9m4Pyl9F_9yTW6oDqI",
    authDomain: "my-awson-project.firebaseapp.com",
    databaseURL: "https://my-awson-project.firebaseio.com",
    projectId: "my-awson-project",
    storageBucket: "my-awson-project.appspot.com",
    messagingSenderId: "1045330612371"
    };
    firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    date = $("#start-date").val().trim();
    salary = $("#salary").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      role: role,
      date: date,
      salary: salary,
    });
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var monthRate = Math.floor(parseInt(sv.salary)/12)

    var monthStart = new Date (sv.date)
    var today = new Date();

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
    var monthWorked = monthDiff(monthStart, today)
    
    var total = monthRate * monthWorked

    $(".table tbody").append($("<tr>").addClass(count).html(`<td>${sv.name}</td><td>${sv.role}</td><td>${sv.date}</td><td>${monthWorked}</td><td>${monthRate}</td><td>${total}</td>`))
    // Change the HTML to reflect

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


$( document ).ready(function() {
    console.log( "ready!" );
});

var btn = document.querySelector("button");
var ctx;

var colorInfoElem = document.querySelector("#colorInfo");
html2canvas(btn).then(canvas => {
  ctx = canvas.getContext("2d");
  
  createParticleCanvas();
  
  let reductionFactor = 17;
  btn.addEventListener("click", e => {
    // Get the color data for our button
    let width = btn.offsetWidth;
    let height = btn.offsetHeight;
    let colorData = ctx.getImageData(0, 0, width, height).data;

    // Keep track of how many times we've iterated (in order to reduce
    // the total number of particles create)
    let count = 0;

    // Go through every location of our button and create a particle
    for(let localX = 0; localX < width; localX++) {
      for(let localY = 0; localY < height; localY++) {
        if(count % reductionFactor === 0) {
          let index = (localY * width + localX) * 4;
          let rgbaColorArr = colorData.slice(index, index + 4);

          let bcr = btn.getBoundingClientRect();
          let globalX = bcr.left + localX;
          let globalY = bcr.top + localY;

          createParticleAtPoint(globalX, globalY, rgbaColorArr);
        }
        count++;
      }
    }
  });
});


/* An "exploding" particle effect that uses circles */
var ExplodingParticle = function() {
  // Set how long we want our particle to animate for
  this.animationDuration = 1000; // in ms

  // Set the speed for our particle
  this.speed = {
    x: -5 + Math.random() * 10,
    y: -5 + Math.random() * 10
  };
  
  // Size our particle
  this.radius = 5 + Math.random() * 5;
  
  // Set a max time to live for our particle
  this.life = 30 + Math.random() * 10;
  this.remainingLife = this.life;
  
  // This function will be called by our animation logic later on
  this.draw = ctx => {
    let p = this;

    if(this.remainingLife > 0
    && this.radius > 0) {
      // Draw a circle at the current location
      ctx.beginPath();
      ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
      ctx.fill();
      
      // Update the particle's location and life
      p.remainingLife--;
      p.radius -= 0.25;
      p.startX += p.speed.x;
      p.startY += p.speed.y;
    }
  }
}

var particles = [];
function createParticleAtPoint(x, y, colorData) {
  let particle = new ExplodingParticle();
  particle.rgbArray = colorData;
  particle.startX = x;
  particle.startY = y;
  particle.startTime = Date.now();
  
  particles.push(particle);
}


var particleCanvas, particleCtx;
function createParticleCanvas() {
  // Create our canvas
  particleCanvas = document.createElement("canvas");
  particleCtx = particleCanvas.getContext("2d");
  
  // Size our canvas
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  
  // Position out canvas
  particleCanvas.style.position = "absolute";
  particleCanvas.style.top = "0";
  particleCanvas.style.left = "0";
  
  // Make sure it's on top of other elements
  particleCanvas.style.zIndex = "1001";
  
  // Make sure other elements under it are clickable
  particleCanvas.style.pointerEvents = "none";
  
  // Add our canvas to the page
  document.body.appendChild(particleCanvas);
}



function update() {
  // Clear out the old particles
  if(typeof particleCtx !== "undefined") {
    particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // Draw all of our particles in their new location
  for(let i = 0; i < particles.length; i++) {
    particles[i].draw(particleCtx);
    
    // Simple way to clean up if the last particle is done animating
    if(i === particles.length - 1) {
      let percent = (Date.now() - particles[i].startTime) / particles.animationDuration;
      
      if(percent > 1) {
        particles = [];
      }
    }
  }
  
  // Animate performantly
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

