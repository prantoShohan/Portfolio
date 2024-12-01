import React from 'react';
import { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import type p5 from 'p5';  // Ensure correct type import from p5 package

// Define the Node class in TypeScript
class Node {
  private p5: p5; // Correct usage of p5 type
  public id: number;
  public name: string;
  public radius: number;
  public position: p5.Vector;
  public totalForce: p5.Vector;
  public totalCollision: number;
  public children: Node[];
  public parents: Node[];
  public speed: number = 2;

  constructor(p5: p5, id: number, name: string, radius: number, x: number, y: number) {
    this.p5 = p5;
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.position = this.p5.createVector(x, y); // Correct access to createVector
    this.totalForce = this.p5.createVector(0, 0); // Correct access to createVector
    this.totalCollision = 1;
    this.children = [];
    this.parents = [];
    
  }

  // Custom vector subtraction method within the Node class
  private subtractVectors(v1: p5.Vector, v2: p5.Vector): p5.Vector {
    return this.p5.createVector(v1.x - v2.x, v1.y - v2.y);
  }

  addChild(childNode: Node) {
    this.children.push(childNode);
    childNode.parents.push(this);
  }

  callChildren() {
    //for children
    for (let i = 0; i < this.children.length; i++) {
      this.collide(this.children[i], 20);
      this.children[i].callChildren();
    }
    //for sibilings
    for (let i = 0; i < this.children.length; i++) {
      for(let j = 0; j < this.children.length; j++){
        this.children[i].collideRepulse(this.children[j], 40)
      }
    }
    //for grandChildrens
    for (let i = 0; i < this.children.length; i++) {
      if(this.children[i].children.length>0){
        for(let j = 0; j < this.children[i].children.length; j++){
          this.collide(this.children[i].children[j], 300)
        }
      }
    }
  }

  collideRepulse(otherNode: Node, extraDistance: number) {
    const distance = this.p5.dist(this.position.x, this.position.y, otherNode.position.x, otherNode.position.y); // Correct dist usage
    if (distance < (this.radius + otherNode.radius) / 2 + extraDistance) {
      const direction = this.subtractVectors(this.position, otherNode.position).normalize(); // Using custom subtraction
      const moveVector = direction.mult((extraDistance + (this.radius + otherNode.radius) / 2) - distance);
      otherNode.applyForce(moveVector.mult(-1));
    }
  }

  collide(otherNode: Node, extraDistance: number) {
    const distance = this.p5.dist(this.position.x, this.position.y, otherNode.position.x, otherNode.position.y); // Correct dist usage
    const direction = this.subtractVectors(this.position, otherNode.position).normalize(); // Using custom subtraction
    const moveVector = direction.mult((extraDistance + (this.radius + otherNode.radius) / 2) - distance);
    otherNode.applyForce(moveVector.mult(-1));
  }

  collideBoundary() {
    // Check if the node has gone below the bottom of the canvas
    if(this.parents.length >0){
      if (this.position.y + this.radius > this.p5.height) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(0, this.p5.height - (this.position.y + this.radius));
        this.applyForce(moveVector);
      }
      
      // Check if the node has gone above the top of the canvas
      if (this.position.y - this.radius < 0) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(0, -this.position.y + this.radius);
        this.applyForce(moveVector);
      }
    
      // Check if the node has gone to the right of the canvas
      if (this.position.x + this.radius > this.p5.width) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(this.p5.width - (this.position.x + this.radius), 0);
        this.applyForce(moveVector);
      }
      
      // Check if the node has gone to the left of the canvas
      if (this.position.x - this.radius < 0) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(-this.position.x + this.radius, 0);
        this.applyForce(moveVector);
      }
    }
    
  }
  

  applyForce(moveVector: p5.Vector) {
    this.totalForce.add(moveVector);
    this.totalCollision += 1;
  }

  move() {
    const averageForce = this.totalForce.div(this.totalCollision*this.speed); // Correct access to Vector.div
    this.position.add(averageForce);
    this.children.forEach((child) => child.move());
    this.resetForce();
  }

  resetForce() {
    this.totalForce.set(0, 0);
    this.totalCollision = 1;
  }

  isHovered(): boolean {
    return this.p5.dist(this.position.x, this.position.y, this.p5.mouseX, this.p5.mouseY) < 20; // Correct dist usage
  }

  hovered() {
    if (this.isHovered()) {
      this.p5.background('rgba(5, 5, 5, 0.5)');
      this.draw();
      this.drawParents();
    }

    // Recursively call hovered on children
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].hovered();
    }
  }

  drawNode() {
    if(this.isHovered()){
      this.p5.fill('red');
      this.p5.circle(this.position.x, this.position.y, 20);
    }

    this.p5.fill(256)
    this.p5.circle(this.position.x, this.position.y, 10);

    this.p5.fill(0, 0)
    this.p5.stroke(25);
    this.p5.circle(this.position.x, this.position.y, this.radius);
    this.p5.stroke(256);

    this.p5.fill(256);
    this.p5.textSize(15);
    this.p5.textFont('Courier New');
    this.p5.text(this.name, this.position.x-30, this.position.y+15);

    // this.p5.fill(this.isHovered() ? 'red' : 'white');
    // this.p5.circle(this.position.x, this.position.y, this.radius);
    // this.p5.textSize(10);
    // this.p5.fill(255);
    // this.p5.text(this.name, this.position.x + 10, this.position.y);
  }

  draw() {
    this.drawNode();
    this.children.forEach((child) => {
      this.p5.line(this.position.x, this.position.y, child.position.x, child.position.y);
      child.draw();
    });
  }

  drawParents() {
    for (let i = 0; i < this.parents.length; i++) {
      this.parents[i].drawNode();
      this.p5.line(this.position.x, this.position.y, this.parents[i].position.x, this.parents[i].position.y);
      this.parents[i].drawParents();
    }
  }
}

// Define the p5.js sketch
const sketch: Sketch = (p5: p5) => {
  let rootNode: Node;
  let allNodes: Node[];

  p5.setup = () => {
    let width = p5.windowWidth;
    let height = p5.windowHeight
    p5.createCanvas(p5.windowWidth -15, p5.windowHeight);
    // if(width > height){
    //   p5.createCanvas(p5.windowWidth -15, p5.windowHeight);
    // }else{
    //   p5.createCanvas(p5.windowWidth, p5.windowWidth*2);
    // }
    
    rootNode = new Node(p5, 0, "Root", 600, p5.width / 2, p5.height-50);

    

    // Initialize nodes
    let Nature = new Node(p5, 1, "Nature", 150, 2 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Nature);
    let Observation = new Node(p5, 1, "Observation", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Nature.addChild(Observation);
    let Aquascaping = new Node(p5, 1, "Aquascaping", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Nature.addChild(Aquascaping);
    let Landscaping = new Node(p5, 1, "Landscaping", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Nature.addChild(Landscaping);
    let EmergentBehaviour = new Node(p5, 1, "EmergentBehaviour", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Nature.addChild(EmergentBehaviour);

    let Architecture = new Node(p5, 2, "Architecture", 150, 3 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Architecture);
    let ArchitecturalProjects = new Node(p5, 2, "ArchitecturalProjects", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Architecture.addChild(ArchitecturalProjects);
    let UrbanDesign = new Node(p5, 2, "UrbanDesign", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Architecture.addChild(UrbanDesign);
    let ComputationalDesign = new Node(p5, 2, "ComputationalDesign", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Architecture.addChild(ComputationalDesign);
    Architecture.addChild(Landscaping);

    let Highrise = new Node(p5, 4, "Highrise", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    ArchitecturalProjects.addChild(Highrise);
    let SportsCenter = new Node(p5, 4, "SportsCenter", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    ArchitecturalProjects.addChild(SportsCenter);
    let Mawa = new Node(p5, 4, "Mawa", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    UrbanDesign.addChild(Mawa);
    let PlaceHolder = new Node(p5, 4, "", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Emergence = new Node(p5, 4, "Emergence", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Evolution = new Node(p5, 4, "Evolution", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Exploration = new Node(p5, 4, "Exploration", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    ComputationalDesign.addChild(PlaceHolder);
    ComputationalDesign.addChild(Exploration);
    EmergentBehaviour.addChild(PlaceHolder);
    PlaceHolder.addChild(Emergence);
    PlaceHolder.addChild(Evolution);

    let Programming = new Node(p5, 3, "Programming", 150, 4 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Programming);
    let Languages = new Node(p5, 3, "Languages", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Programming.addChild(Languages);
    let MachineLearning = new Node(p5, 3, "MachineLearning", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Programming.addChild(MachineLearning);
    let Android = new Node(p5, 3, "Android", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Programming.addChild(Android);
    let EmbeddedSystem = new Node(p5, 3, "EmbeddedSystem", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    let Python = new Node(p5, 4, "Python", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Cpp = new Node(p5, 4, "Cpp", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Processing = new Node(p5, 4, "Processing", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Kaleidoscope = new Node(p5, 4, "Kaleidoscope", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let Tabulature = new Node(p5, 4, "Tabulature", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    let QuietQuotes = new Node(p5, 4, "QuietQuotes", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    Android.addChild(QuietQuotes);
    MachineLearning.addChild(Tabulature);
    Cpp.addChild(Kaleidoscope);
    Languages.addChild(Python);
    Languages.addChild(Cpp);
    Languages.addChild(Processing);
    Programming.addChild(EmbeddedSystem);
    Programming.addChild(ComputationalDesign);

    let Electronics = new Node(p5, 4, "Electronics", 150, 5 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Electronics);
    let AnalogElectronics = new Node(p5, 4, "AnalogElectronics", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Electronics.addChild(AnalogElectronics);
    let ModularSynthesizer = new Node(p5, 4, "ModularSynthesizer", 20, p5.random(0, p5.width), p5.random(0, p5.height));
    AnalogElectronics.addChild(ModularSynthesizer);
    Electronics.addChild(EmbeddedSystem);

    let Music = new Node(p5, 4, "Music", 150, 6 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Music);
    let Instruments = new Node(p5, 4, "Instruments", 50, p5.random(0, p5.width), p5.random(0, p5.height));
    Music.addChild(Instruments);
    Instruments.addChild(ModularSynthesizer);

    let Art = new Node(p5, 4, "Art", 150, 7 * p5.width / 7, p5.height / 2);
    rootNode.addChild(Art);

    let Interests = new Node(p5, 4, "Interests", 150, p5.width / 7, p5.height / 2);
    rootNode.addChild(Interests);

    // Add all nodes to the allNodes array
    allNodes = [
      Nature, Architecture, Programming, Electronics, Music, Art, Interests, 
      Observation, Aquascaping, Landscaping, EmergentBehaviour, 
      ArchitecturalProjects, UrbanDesign, ComputationalDesign, 
      Languages, MachineLearning, Android, EmbeddedSystem, AnalogElectronics, 
      ModularSynthesizer, Instruments, Highrise, SportsCenter, Mawa, Emergence, 
      PlaceHolder, Evolution, Exploration, Python, Cpp, Processing, Kaleidoscope, 
      Tabulature, QuietQuotes
    ];
  };

  p5.draw = () => {
    p5.background(25);

    rootNode.draw();
    rootNode.hovered();
    rootNode.resetForce();
    rootNode.callChildren();

    // Boundary check and movement for all nodes
    allNodes.forEach((node) => {
      node.collideBoundary();
    });

    rootNode.move();
  };

  // Mouse dragged function to move nodes
  p5.mouseDragged = () => {
    allNodes.forEach((node) => {
      if (p5.dist(node.position.x, node.position.y, p5.mouseX, p5.mouseY) < 20) {
        node.position.set(p5.mouseX, p5.mouseY);
      }
    });
  };

  p5.windowResized = () => {
    // p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.setup()
  };
};


// HeroSection component
const HeroSection: React.FC = () => {
  return (
    <div className=" w-auto h-auto ">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default HeroSection;
