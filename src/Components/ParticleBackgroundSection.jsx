import React, { useRef, useEffect } from 'react';

const ParticleBackgroundSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Placeholder values for width and height
    canvas.width = 300;
    canvas.height = 150;

    let animationFrameId;

    // Setup resize observer to adjust canvas size
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length) {
        // Assuming canvas is a direct child, use the parent's dimensions
        const { width, height } = entries[0].contentRect;
        canvas.width = width;
        canvas.height = height;

        // Re-initialize particles and animation to adjust for new size
        init();
        animate();
      }
    });

    // Observe the parent element of the canvas
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
      constructor() {
        // Position
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Velocity
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        // Size
        this.size = Math.random() * 5 + 1;
      }

      // Method to update particle's position
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      // Method to draw a particle
      draw() {
        ctx.fillStyle = '#4682b4';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particlesArray.splice(0, particlesArray.length); // Clear existing particles
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default ParticleBackgroundSection;
