import React from 'react';
import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch: Sketch = (p5: P5CanvasInstance) => {

  p5.setup = () => {

  }

  p5.draw = () => {

    
  };
};

const HeroSection = () => {
  return (
    <div className="min-h-[70vh] responsive-padding">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default HeroSection;
