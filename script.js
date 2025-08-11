// Fallback for script errors
    window.addEventListener('error', function(e) {
      console.error('Script loading error:', e.message);
      document.body.style.display = 'block';
      document.body.style.opacity = '1';
    }, true);

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true
      });
    } else {
      console.warn('AOS not loaded, animations disabled');
    }

    // Trailing Cursor Animation Logic + Blinking Dot only while moving
    document.addEventListener('DOMContentLoaded', function() {
      const cursor = document.querySelector('.sparkle-cursor');
      const blinkDot = cursor.querySelector('.blink-dot');
      const trailDots = [
        document.getElementById('orbit1'),
        document.getElementById('orbit2'),
        document.getElementById('orbit3'),
        document.getElementById('orbit4'),
        document.getElementById('orbit5'),
        document.getElementById('orbit6')
      ];
      let mouseX = 0, mouseY = 0;
      let positions = Array(trailDots.length).fill({x: 0, y: 0});

      let blinkTimeout;
      function showBlinkDot() {
        blinkDot.style.opacity = '1';
        clearTimeout(blinkTimeout);
        blinkTimeout = setTimeout(() => {
          blinkDot.style.opacity = '0';
        }, 400);
      }

      document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        showBlinkDot();
      });

      function animateTrail() {
        let prevX = mouseX, prevY = mouseY;
        for (let i = 0; i < trailDots.length; i++) {
          positions[i] = {
            x: positions[i].x + (prevX - positions[i].x) * 0.25,
            y: positions[i].y + (prevY - positions[i].y) * 0.25
          };
          trailDots[i].style.left = (positions[i].x - mouseX + 12) + 'px';
          trailDots[i].style.top = (positions[i].y - mouseY + 12) + 'px';
          prevX = positions[i].x;
          prevY = positions[i].y;
        }
        requestAnimationFrame(animateTrail);
      }
      animateTrail();

      // Navbar scroll effect
      window.addEventListener('scroll', function() {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      });

      // Scroll animations
      const sections = document.querySelectorAll('section');
      
      const checkVisibility = () => {
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            section.classList.add('visible');
          }
        });
      };

      window.addEventListener('scroll', checkVisibility);
      checkVisibility();

      // Animate skill bars
      const skillBars = document.querySelectorAll('.skill-progress');
      window.addEventListener('scroll', function() {
        skillBars.forEach(bar => {
          const rect = bar.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            bar.style.width = bar.getAttribute('data-level') || '80%';
          }
        });
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });

      // Back to top button particle effect
      const backToTop = document.querySelector('.back-to-top');
      function createSprinkle(x, y) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        backToTop.appendChild(sprinkle);
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;
        sprinkle.style.left = `calc(50% + ${offsetX}px)`;
        sprinkle.style.top = `calc(50% + ${offsetY}px)`;
        setTimeout(() => sprinkle.remove(), 600); // Match sprinkleAnim duration
      }

      backToTop.addEventListener('mouseover', () => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createSprinkle(0, 0), i * 100);
        }
      });

      backToTop.addEventListener('click', () => {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => createSprinkle(0, 0), i * 50);
        }
      });

      // Back to top button visibility
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.style.opacity = '1';
          backToTop.style.visibility = 'visible';
        } else {
          backToTop.style.opacity = '0';
          backToTop.style.visibility = 'hidden';
        }
      });

      // Typewriter effect for hero name
      const nameText = "Shaik Sahil Kishwar";
      const typewriterName = document.getElementById('typewriter-name');
      let idx = 0;
      typewriterName.textContent = "";
      function typeNextLetter() {
        if (idx <= nameText.length) {
          typewriterName.textContent = nameText.slice(0, idx);
          idx++;
          setTimeout(typeNextLetter, 110);
        }
      }
      typeNextLetter();
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", {
        particles: {
          number: { 
            value: 80, 
            density: { 
              enable: true, 
              value_area: 800 
            } 
          },
          color: { 
            value: "#7f5af0" 
          },
          shape: { 
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: { 
            value: 0.5, 
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: { 
            value: 3, 
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#7f5af0", 
            opacity: 0.3, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 2, 
            direction: "none", 
            random: true, 
            straight: false, 
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              color: "#7f5af0",
              divisor: 100
            },
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    } else {
      console.warn('particles.js not loaded, background animation disabled');
    }
  


document.addEventListener('DOMContentLoaded', function() {
  const taglineText = "Code, Creativity & Clean Architecture";
  const typewriterTagline = document.getElementById('typewriter-tagline');
  let index = 0;
  let deleting = false;

  function typeEffect() {
    if (!deleting && index <= taglineText.length) {
      typewriterTagline.textContent = taglineText.slice(0, index);
      index++;
      setTimeout(typeEffect, 100);
    } else if (deleting && index >= 0) {
      typewriterTagline.textContent = taglineText.slice(0, index);
      index--;
      setTimeout(typeEffect, 50);
    } else {
      deleting = !deleting;
      setTimeout(typeEffect, 1000); // pause before switching
    }
  }

  typeEffect();
});


AOS.init();


document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var form = this;
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert("✅ Your message has been sent!");
            form.reset();
        } else {
            alert("❌ Failed to send message. Please try again later.");
        }
    }).catch(error => {
        console.error("Formspree error:", error);
        alert("❌ An error occurred. Please try again later.");
    });
});


// Ensure particles settings adjust after initialization
function adjustParticlesForMobile() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length) {
        var pJS = pJSDom[0].pJS;
        if (window.innerWidth < 768) {
            pJS.particles.number.value = 40;
            pJS.particles.number.density.value_area = 500;
            pJS.particles.move.speed = 1.2; // slower for mobile
        } else {
            pJS.particles.number.value = 80;
            pJS.particles.number.density.value_area = 800;
            pJS.particles.move.speed = 2.5; // default for desktop
        }
        pJS.fn.particlesRefresh();
    }
}

// Run once after particles load
window.addEventListener('load', adjustParticlesForMobile);

// Run on resize
window.addEventListener('resize', adjustParticlesForMobile);
