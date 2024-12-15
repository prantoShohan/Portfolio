import React from 'react';
import { P5CanvasInstance, Sketch } from '@p5-wrapper/react';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import type p5 from 'p5'; // Ensure correct type import from p5 package
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ROUTES } from '@/constants/routes';

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
  static textsize: number;
  public path: any;
  public router: any;
  public focus: boolean;

  constructor(
    p5: p5,
    id: number,
    name: string,
    radius: number,
    x: number,
    y: number,
    path: any = null,
    router: any = null,
    textsize: number = 15
  ) {
    this.p5 = p5;
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.position = this.p5.createVector(x, y); // Correct access to createVector
    this.totalForce = this.p5.createVector(0, 0); // Correct access to createVector
    this.totalCollision = 1;
    this.children = [];
    this.parents = [];
    this.router = router;
    this.path = path;
    this.focus = false;
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
      for (let j = 0; j < this.children.length; j++) {
        this.children[i].collideRepulse(this.children[j], 40);
      }
    }
    //for grandChildrens
    for (let i = 0; i < this.children.length; i++) {
      if(this.children[i].children.length>0){
        for(let j = 0; j < this.children[i].children.length; j++){
          if(this.p5.windowWidth < 600){
            this.collide(this.children[i].children[j], 500);
          }else{
            this.collide(this.children[i].children[j], 300);
          }
        }
      }
    }
  }

  collideRepulse(otherNode: Node, extraDistance: number) {
    const distance = this.p5.dist(
      this.position.x,
      this.position.y,
      otherNode.position.x,
      otherNode.position.y
    ); // Correct dist usage
    if (distance < (this.radius + otherNode.radius) / 2 + extraDistance) {
      const direction = this.subtractVectors(
        this.position,
        otherNode.position
      ).normalize(); // Using custom subtraction
      const moveVector = direction.mult(
        extraDistance + (this.radius + otherNode.radius) / 2 - distance
      );
      otherNode.applyForce(moveVector.mult(-1));
    }
  }

  collide(otherNode: Node, extraDistance: number) {
    const distance = this.p5.dist(
      this.position.x,
      this.position.y,
      otherNode.position.x,
      otherNode.position.y
    ); // Correct dist usage
    const direction = this.subtractVectors(
      this.position,
      otherNode.position
    ).normalize(); // Using custom subtraction
    const moveVector = direction.mult(
      extraDistance + (this.radius + otherNode.radius) / 2 - distance
    );
    otherNode.applyForce(moveVector.mult(-1));
  }

  collideBoundary() {
    // Check if the node has gone below the bottom of the canvas
    if (this.parents.length > 0) {
      if (this.position.y + this.radius > this.p5.height) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(0, this.p5.height - (this.position.y + this.radius));
        this.applyForce(moveVector.mult(10));
      }

      // Check if the node has gone above the top of the canvas
      if (this.position.y - this.radius < 0) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(0, -this.position.y + this.radius);
        this.applyForce(moveVector.mult(10));
      }

      // Check if the node has gone to the right of the canvas
      if (this.position.x + this.radius + 50 > this.p5.width) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(this.p5.width - (this.position.x + this.radius), 0);
        this.applyForce(moveVector.mult(10));
      }

      // Check if the node has gone to the left of the canvas
      if (this.position.x - (this.radius + 50) < 0) {
        // Apply a force to bring the node back within the bounds
        const moveVector = this.p5.createVector(-this.position.x + this.radius, 0);
        this.applyForce(moveVector.mult(10));
      }
    }
  }

  applyForce(moveVector: p5.Vector) {
    this.totalForce.add(moveVector);
    this.totalCollision += 1;
  }

  move() {
    const averageForce = this.totalForce.div(this.totalCollision * this.speed); // Correct access to Vector.div
    this.position.add(averageForce);
    this.children.forEach((child) => child.move());
    this.resetForce();
  }

  resetForce() {
    this.totalForce.set(0, 0);
    this.totalCollision = 1;
  }

  isHovered(): boolean {
    return (
      this.p5.dist(
        this.position.x,
        this.position.y,
        this.p5.mouseX,
        this.p5.mouseY
      ) < 20
    );
  }

  hovered() {
    if (this.isHovered()) {
      this.p5.background('rgba(5, 5, 5, 0.9)');
      this.draw();
      this.drawParents();
    }

    // Recursively call hovered on children
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].hovered();
    }
  }

  handleClick() {
    if (this.router) {
      this.router.push(this.path);
    }
  }

  handleTouch() {
    if (this.isHovered() == true) {
      if (this.focus == true) {
        // this.handleClick();
        this.focus = false;
      } else {
        this.focus = true;
        this.p5.background('rgba(5, 5, 5, 0.9)');
        this.draw();
        this.drawParents();
      }
    }
  }

  drawNode() {
    let txtx = 0;
    let txty = 0;
    this.p5.textSize(Node.textsize);
    if (this.p5.windowWidth < 600 && this.radius <= 50 && !this.router) {
      this.p5.fill(100);
    } else {
      this.p5.fill(256);
    }

    this.p5.textFont('Courier New');
    this.p5.text(this.name, this.position.x - 30, this.position.y + 15 + txty);

    this.p5.circle(this.position.x, this.position.y, 10);

    if (this.isHovered()) {
      this.p5.textSize(Node.textsize + 10);
      this.p5.fill(256);
      this.p5.circle(this.position.x, this.position.y, 25);
      txtx = 0;
      txty = 12;
    }

    if (this.router) {
      this.p5.strokeWeight(5);
      this.p5.stroke('#00a14b');
      this.p5.fill(0, 0);
      this.p5.circle(this.position.x, this.position.y, 15);
    }
    this.p5.strokeWeight(0.5);

    // this.p5.drawingContext.shadowOffsetX = 0;
    // this.p5.drawingContext.shadowOffsetY = 0;
    // this.p5.drawingContext.shadowBlur = 50;
    // this.p5.drawingContext.shadowColor = 'black';

    if (this.id == 0) {
      this.p5.textSize(30);
      this.p5.text('Mind Map', this.position.x - 65, this.position.y - 30);
    }

    this.p5.fill(0, 0);
    this.p5.stroke('#222222');
    this.p5.circle(this.position.x, this.position.y, this.radius);
    this.p5.stroke(256);

    // this.p5.fill(this.isHovered() ? 'red' : 'white');
    // this.p5.circle(this.position.x, this.position.y, this.radius);
    // this.p5.textSize(10);
    // this.p5.fill(255);
    // this.p5.text(this.name, this.position.x + 10, this.position.y);
  }

  draw() {
    this.drawNode();

    this.children.forEach((child) => {
      this.p5.stroke(150);
      this.p5.line(
        this.position.x,
        this.position.y,
        child.position.x,
        child.position.y
      );
      child.draw();
    });
  }

  drawParents() {
    for (let i = 0; i < this.parents.length; i++) {
      this.parents[i].drawNode();
      this.p5.line(
        this.position.x,
        this.position.y,
        this.parents[i].position.x,
        this.parents[i].position.y
      );
      this.parents[i].drawParents();
    }
  }
}

// Define the p5.js sketch

// HeroSection component
const HeroSection: React.FC = () => {
  const router = useRouter();

  const sketch: Sketch = (p5: p5) => {
    let rootNode: Node;
    let hi: Node;
    let allNodes: Node[] = [];
    let width: number = p5.windowWidth;
    let height: number = p5.windowHeight;

    p5.setup = () => {
      let width = p5.windowWidth;
      let height = p5.windowHeight;
      let scalefactor = 1;
      if (width < 500) {
        scalefactor = 0.5;
        Node.textsize = 8;
      } else {
        scalefactor = 1;
        Node.textsize = 15;
      }

      p5.createCanvas(p5.windowWidth - 15, p5.windowHeight);

      // if(width > height){
      //   p5.createCanvas(p5.windowWidth -15, p5.windowHeight);
      // }else{
      //   p5.createCanvas(p5.windowWidth, p5.windowWidth*2);
      // }

      rootNode = new Node(
        p5,
        0,
        '',
        600 * scalefactor,
        p5.width / 2,
        p5.height - 50
      );

      // hi = new Node(p5, 0, "Hi", 200, p5.random(0, p5.width), p5.random(0, p5.height), 30)

      // Initialize nodes
      let Nature = new Node(
        p5,
        1,
        'Nature',
        150 * scalefactor,
        (2 * p5.width) / 6,
        p5.height / 2
      );
      rootNode.addChild(Nature);
      let Observation = new Node(
        p5,
        1,
        'Observation',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.PHOTOGRAPHY,
        router
      );
      Nature.addChild(Observation);
      let Aquascaping = new Node(
        p5,
        1,
        'Aquascaping',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Nature.addChild(Aquascaping);
      let Landscaping = new Node(
        p5,
        1,
        'Landscaping',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Nature.addChild(Landscaping);
      let EmergentBehaviour = new Node(
        p5,
        1,
        'EmergentBehaviour',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Nature.addChild(EmergentBehaviour);

      let Architecture = new Node(
        p5,
        2,
        'Architecture',
        150 * scalefactor,
        (3 * p5.width) / 6,
        p5.height / 2
      );
      rootNode.addChild(Architecture);
      let ArchitecturalProjects = new Node(
        p5,
        2,
        'ArchitecturalProjects',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.ARCHITECTURE,
        router
      );
      Architecture.addChild(ArchitecturalProjects);
      let UrbanDesign = new Node(
        p5,
        2,
        'UrbanDesign',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Architecture.addChild(UrbanDesign);
      let ComputationalDesign = new Node(
        p5,
        2,
        'ComputationalDesign',
        80,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Architecture.addChild(ComputationalDesign);
      Architecture.addChild(Landscaping);

      // let Highrise = new Node(p5, 4, "Highrise", 50, p5.random(0, p5.width), p5.random(0, p5.height), ROUTES.ARCHITECTURE, router);
      // ArchitecturalProjects.addChild(Highrise);
      // let SportsCenter = new Node(p5, 4, "SportsCenter", 50, p5.random(0, p5.width), p5.random(0, p5.height),ROUTES.ARCHITECTURE, router);
      // ArchitecturalProjects.addChild(SportsCenter);
      // let Mawa = new Node(p5, 4, "Mawa", 50, p5.random(0, p5.width), p5.random(0, p5.height),ROUTES.ARCHITECTURE, router);
      // UrbanDesign.addChild(Mawa);
      let PlaceHolder = new Node(
        p5,
        4,
        '',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      let Emergence = new Node(
        p5,
        4,
        'Emergence',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.EMERGENCE,
        router
      );
      let Evolution = new Node(
        p5,
        4,
        'Evolution',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.EVOLUTION,
        router
      );
      let Exploration = new Node(
        p5,
        4,
        'Exploration',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.EXPLORATION,
        router
      );
      ComputationalDesign.addChild(PlaceHolder);
      ComputationalDesign.addChild(Exploration);
      EmergentBehaviour.addChild(PlaceHolder);
      PlaceHolder.addChild(Emergence);
      PlaceHolder.addChild(Evolution);

      let Programming = new Node(
        p5,
        3,
        'Programming',
        150 * scalefactor,
        (4 * p5.width) / 6,
        p5.height / 2
      );
      rootNode.addChild(Programming);
      let Languages = new Node(
        p5,
        3,
        'Languages',
        70,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Programming.addChild(Languages);
      let MachineLearning = new Node(
        p5,
        3,
        'MachineLearning',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Programming.addChild(MachineLearning);
      let Android = new Node(
        p5,
        3,
        'Android',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Programming.addChild(Android);
      let EmbeddedSystem = new Node(
        p5,
        3,
        'EmbeddedSystem',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      let Python = new Node(
        p5,
        4,
        'Python',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      let Cpp = new Node(
        p5,
        4,
        'Cpp',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      let Processing = new Node(
        p5,
        4,
        'Processing',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      let Kaleidoscope = new Node(
        p5,
        4,
        'Kaleidoscope',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.KALEIDOSCOPE,
        router
      );
      let Tabulature = new Node(
        p5,
        4,
        'Tabulature',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.TABULATURE,
        router
      );
      let QuietQuotes = new Node(
        p5,
        4,
        'QuietQuotes',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Android.addChild(QuietQuotes);
      MachineLearning.addChild(Tabulature);
      Cpp.addChild(Kaleidoscope);
      Languages.addChild(Python);
      Languages.addChild(Cpp);
      Languages.addChild(Processing);
      Programming.addChild(EmbeddedSystem);
      Programming.addChild(ComputationalDesign);

      let Electronics = new Node(
        p5,
        4,
        'Electronics',
        150 * scalefactor,
        (5 * p5.width) / 6,
        p5.height / 2
      );
      rootNode.addChild(Electronics);
      let AnalogElectronics = new Node(
        p5,
        4,
        'AnalogElectronics',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Electronics.addChild(AnalogElectronics);
      let ModularSynthesizer = new Node(
        p5,
        4,
        'ModularSynthesizer',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height),
        ROUTES.ANALOG,
        router
      );
      AnalogElectronics.addChild(ModularSynthesizer);
      Electronics.addChild(EmbeddedSystem);

      let Music = new Node(
        p5,
        4,
        'Music',
        150 * scalefactor,
        (6 * p5.width) / 6,
        p5.height / 2
      );
      rootNode.addChild(Music);
      let Instruments = new Node(
        p5,
        4,
        'Instruments',
        50,
        p5.random(0, p5.width),
        p5.random(0, p5.height)
      );
      Music.addChild(Instruments);
      Music.addChild(Tabulature);
      Instruments.addChild(ModularSynthesizer);

      let Art = new Node(
        p5,
        4,
        'Art',
        150 * scalefactor,
        (1 * p5.width) / 6,
        p5.height / 2
      );
      let TravelSketches = new Node(
        p5,
        4,
        'TravelSketches',
        50,
        (7 * p5.width) / 7,
        p5.height / 2,
        ROUTES.TRAVELSKETCHES,
        router
      );
      rootNode.addChild(Art);
      Art.addChild(TravelSketches);
      Art.addChild(Observation);

      // let Interests = new Node(p5, 4, "Interests", 150*scalefactor, p5.width / 7, p5.height / 2);
      // rootNode.addChild(Interests);

      // Add all nodes to the allNodes array
      allNodes = [
        Nature,
        Architecture,
        Programming,
        Electronics,
        Music,
        Art,
        Observation,
        Aquascaping,
        Landscaping,
        EmergentBehaviour,
        ArchitecturalProjects,
        UrbanDesign,
        ComputationalDesign,
        Languages,
        MachineLearning,
        Android,
        EmbeddedSystem,
        AnalogElectronics,
        ModularSynthesizer,
        Instruments,
        Emergence,
        PlaceHolder,
        Evolution,
        Exploration,
        Python,
        Cpp,
        Processing,
        Kaleidoscope,
        Tabulature,
        QuietQuotes,
        TravelSketches,
      ];
    };

    p5.draw = () => {
      p5.background('#222222');

      rootNode.draw();
      rootNode.hovered();
      // hi.draw();
      // hi.hovered();

      // for(let i = 0; i < allNodes.length; i++){
      //   allNodes[i].collide(hi, 200);
      // }

      rootNode.resetForce();
      // hi.resetForce();

      rootNode.callChildren();

      // hi.callChildren();

      allNodes.forEach((node) => {
        allNodes.forEach((othernode) => {
          if (node != othernode) {
            node.collideRepulse(othernode, 50);
          }
        });
      });

      // Boundary check and movement for all nodes
      allNodes.forEach((node) => {
        node.collideBoundary();
      });

      rootNode.move();
    };

    // Mouse dragged function to move nodes
    p5.mouseDragged = () => {
      allNodes.forEach((node) => {
        if (
          p5.dist(node.position.x, node.position.y, p5.mouseX, p5.mouseY) < 20
        ) {
          node.position.set(p5.mouseX, p5.mouseY);
        }
      });
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      if (p5.abs(width - p5.windowWidth) / width > 0.2) {
        p5.setup();
        width = p5.windowWidth;
      }
      if (p5.abs(height - p5.windowHeight) / height > 0.2) {
        p5.setup();
        height = p5.windowHeight;
      }
    };

    p5.mouseClicked = () => {
      allNodes.forEach((node) => {
        if (node.isHovered()) {
          if (p5.windowWidth > 800) {
            node.handleClick(); // Check if a node is clicked and navigate
          }
        }
      });
    };

    p5.touchStarted = () => {
      allNodes.forEach((node) => {
        node.handleTouch();
      });
    };
  };

  return (
    <div className=" w-auto h-screen bg-[#222222]">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default HeroSection;
