'use client';

import Image from 'next/image';
import CompareSlider from './CompareSlider';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';
import CodeBlock from '../CodeBlock';
import Link from 'next/link';


const EmergenceDetails = () => {

  const code = `
import ghpythonlib.components as gh
import Rhino.Geometry as R


#if "IdCount" not in globals() or Reset:
#    IdCount = 0




class Point:
    idCount = 0
    def __init__(self, p):
        self.id = Point.idCount
        self.geo = p
        self.Force = R.Vector3d(0, 0, 0)
        self.TotalCollision = 0
        Point.idCount += 1

    def __str__(self):
        return "Circle:" + str(self.id)

    def applyForce(self, force):
        self.Force += force
        self.TotalCollision += 1
        
    def collide(self, other, Radius):
        distance = self.geo.DistanceTo(other.geo)
        if (distance < Radius):
            #print(distance, Radius)
            direction = R.Vector3d(self.geo - other.geo)
            direction.Unitize()
            move = direction * 0.5 * (Radius - distance)
            self.applyForce((move))
            other.applyForce(-move)
            print(str(self) + " collides with " + str(other) + " Force: "+ str(self.Force) + " Distance: " + str(distance))
            
    def bound(self):
        for b in Boundary:
            dis = R.Curve.ClosestPoint(b, self.geo, Radius)
            if(dis[0]):
                Result = gh.CurveClosestPoint(self.geo, b)
                point = Result[0]
                direction = R.Vector3d(self.geo - point)
                direction.Unitize()
                move = direction * 0.005 * Result[1]
                self.applyForce((move))
    #            self.collide(dis[1], Radius)
    def move(self):
        temp = self.Force / self.TotalCollision
        self.geo += temp
        print("Moved with force: " + str(temp))
        self.Force = R.Vector3d(0,0,0)
        self.TotalCollision = 1

class Island:
    def __init__(self, pointList):
        self.points = []
        for p in pointList:
            self.points.append(Point(p))

    def grow(self):
        for i in range(len(self.points)):
            if(i < len(self.points)-1):
                dis = self.points[i].geo.DistanceTo(self.points[i+1].geo)
                if (dis > Radius):
                    ngeo = (self.points[i].geo + self.points[i+1].geo)/2
                    new = Point(ngeo)
                    self.points.insert(i+1, new)
                    PointList.append(new)


# Instantiate or reset persistent variable
if "T" not in globals() or Reset:
    T = 0

if "Islands" not in globals() or Reset:
    Islands = []
    for curve in IslandCurves:
        points = gh.DivideDistance(curve, 60)[0]
        Islands.append(Island(points))

if "PointList" not in globals() or Reset:
    PointList = []
    for i in Islands:
        for p in i.points:
            PointList.append(p)







def main():
    for point in PointList:
        for other in PointList:
            if point != other:
                print("Attempting to collide:", T)
                point.collide(other, Radius)

    for point in PointList:
        point.bound()
    for point in PointList:
        point.move()

    for i in Islands:
        i.grow()
#    
#    PointList = []
#    for i in Islands:
#        for p in i.points:
#            PointList.append(p)





# Update the variable and component
if T < Iterations:
    T = T + 1
    main()


I = []
for i in Islands:
    points = []
    for p in i.points:
        points.append(p.geo)
    
    crv = gh.PolyLine(points, True)
    I.append(crv)

#
#r = []
#for p in PointList:
#    r.append(p.geo)

Time = T
Relaxed = I

`
const codeZoning = `


__author__ = "prantoShohan"
__version__ = "2024.05.19"

import rhinoscriptsyntax as rs
import ghpythonlib.treehelpers as TH
import Grasshopper as gh
import Rhino.Geometry as R
import random as rand
import math

DistGraph = TH.tree_to_list(DISTANCES_GRAPH, retrieve_base=lambda y: y)
NbrhdGraph = TH.tree_to_list(NEIGHBOURHOOD_GRAPH, retrieve_base=lambda y: y)

DG = DistGraph

if "NG" not in globals() or RESET:
    NG = []
    for n in range(len(NbrhdGraph)):
        N = []
        for m in range(len(NbrhdGraph[n])):
            N.append(int(NbrhdGraph[n][m][1:]))
        NG.append(N)




MetroId = 302

InfluenceFactor = {
                #Demand per unit residential
                "Residential_Residential" : 1/150,
                "Residential_Educational" : 1/1500,
                "Residential_Healthcare" : 1/400,
                "Residential_SocioCultural" : 1/400,
                #Demand for commercial from different landuses
                "Residential_Commercial" : 1/50,
                "Commercial_Commercial" : -1,
                "Educational_Commercial" : 5,
                "Healthcare_Commercial" : 3,
                "SocioCultural_Commercial" : 2,
                #Self distance
                "Educational_Educational" : -1.5,
                "Healthcare_Healthcare" : -1.5,
                "SocioCultural_SocioCultural" : -1,
                #With metro
                "Metro_Residential" : 3,
                "Metro_Commercial" : 5,
                "Metro_Educational" : .5
                
            }

DistanceFactor = {
                #(B, d) d average walking distance(m)
                "Residential_Residential" : (1.71, 756),
                "Residential_Educational" : (2.01, 289),
                "Residential_Healthcare" : (1.71, 756),
                "Residential_SocioCultural" : (1.93, 289),
                
                "Residential_Commercial" : (2.14, 128),
                "Commercial_Commercial" : (2.14, 128),
                "Educational_Commercial" : (2.14, 128),
                "Healthcare_Commercial" : (2.14, 128),
                "SocioCultural_Commercial" : (2.14, 128),
                
                "Educational_Educational" : (2.01, 289),
                "Healthcare_Healthcare" : (1.71, 756),
                "SocioCultural_SocioCultural" : (2.14, 128),
                
                "Metro_Residential" : (1.71, 756),
                "Metro_Commercial" : (3, 756),
                "Metro_Educational" : (3, 128)
            }

class Block:
    def __init__(self, position, id):
        self.position = position
        self.id = int(id[1:])
        self.neighbours = [] 
        
        self.capacity = 20
        self.maxCapacity = 30
        
        self.demand = {
            "Residential" : 0.0,
            "Commercial" : 0.0,
            "Healthcare" : 0.0,
            "Educational" : 0.0,
            "SocioCultural" : 0.0
            }
        
        self.distribution = {
            "Residential" : 0.0,
            "Commercial" : 0.0,
            "Healthcare" : 0.0,
            "Educational" : 0.0,
            "SocioCultural" : 0.0, 
            "Metro" : 0.0
            }
        
        
       
    def addNeighbour(self, nbr, distance):
        self.neighbours.append((nbr, distance))
    
    def addNeighbours(self, nbrList, distanceList, blockList):
        assert(len(nbrList) == len(distanceList))
        for i in range(len(nbrList)):
            self.addNeighbour(blockList[nbrList[i] - 1], distanceList[i])
    
    def findNearest(self, type):
        distance = 500
        closestId = 301
        for nbr in self.neighbours:
            if(nbr[0].distribution[type] > 1):
                if (nbr[1] < distance):
                    closestId = nbr[0].id
                    distance = nbr[1]
        return((closestId, distance))
    
    def findNearestAll(self):
        print("Commercial: ", self.findNearest("Commercial")[1], " id: ", self.findNearest("Commercial")[0])
        print("Educational: ", self.findNearest("Educational")[1], " id: ", self.findNearest("Educational")[0])
        print("Healthcare: ", self.findNearest("Healthcare")[1], " id: ", self.findNearest("Healthcare")[0])
        print("SocioCultural: ", self.findNearest("SocioCultural")[1], " id: ", self.findNearest("SocioCultural")[0])
    
    def evaluateDemand(self):
        #print("##########Evaluating id:", self.id)
        
        for nbr in self.neighbours:
            if(nbr[1] != None):
                #print("Against id: ", nbr[0].id, " Distance: ", nbr[1])
                
                
                
                self.demand["Residential"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Residential"] * self.calculateDistanceFactor(nbr[1], "Residential_Residential")
                self.demand["Residential"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Residential"] * self.calculateDistanceFactor(nbr[1], "Metro_Residential") 
                self.demand["Residential"] = min(10, max(-10, self.demand["Residential"]))
                
                self.demand["Commercial"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Commercial"] * self.calculateDistanceFactor(nbr[1], "Metro_Commercial") 
                self.demand["Commercial"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Commercial"] * self.calculateDistanceFactor(nbr[1], "Residential_Commercial")
                self.demand["Commercial"] += nbr[0].distribution["Commercial"] * InfluenceFactor["Commercial_Commercial"] * self.calculateDistanceFactor(nbr[1], "Commercial_Commercial")
                self.demand["Commercial"] += nbr[0].distribution["Educational"] * InfluenceFactor["Educational_Commercial"] * self.calculateDistanceFactor(nbr[1], "Educational_Commercial")
                self.demand["Commercial"] += nbr[0].distribution["Healthcare"] * InfluenceFactor["Healthcare_Commercial"] * self.calculateDistanceFactor(nbr[1], "Healthcare_Commercial")
                self.demand["Commercial"] = min(10, max(-10, self.demand["Commercial"]))
                
                self.demand["Educational"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Educational"] * self.calculateDistanceFactor(nbr[1], "Metro_Educational")
                self.demand["Educational"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Educational"] * self.calculateDistanceFactor(nbr[1], "Residential_Educational")
                self.demand["Educational"] += nbr[0].distribution["Educational"] * InfluenceFactor["Educational_Educational"] * self.calculateDistanceFactor(nbr[1], "Educational_Educational")
                self.demand["Educational"] = min(10, max(-10, self.demand["Educational"]))
                
                self.demand["Healthcare"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Healthcare"] * self.calculateDistanceFactor(nbr[1], "Residential_Healthcare")
                self.demand["Healthcare"] += nbr[0].distribution["Healthcare"] * InfluenceFactor["Healthcare_Healthcare"] * self.calculateDistanceFactor(nbr[1], "Healthcare_Healthcare")
                self.demand["Healthcare"] = min(10, max(-10, self.demand["Healthcare"]))
                
                self.demand["SocioCultural"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_SocioCultural"] * self.calculateDistanceFactor(nbr[1], "Residential_SocioCultural")
                self.demand["SocioCultural"] += nbr[0].distribution["SocioCultural"] * InfluenceFactor["SocioCultural_SocioCultural"] * self.calculateDistanceFactor(nbr[1], "SocioCultural_SocioCultural")
                self.demand["SocioCultural"] = min(10, max(-10, self.demand["SocioCultural"]))
                
                
        occupiedSpace = self.distribution["Residential"] + self.distribution["Commercial"] * .5 + 5 * self.distribution["Educational"] + 5 * self.distribution["Healthcare"] + 3*self.distribution["SocioCultural"] 
        demandMultiplier = 1
        if (occupiedSpace > self.capacity):
            x = occupiedSpace - self.capacity
            demandMultiplier = -(x/self.capacity) + 1
        
#        demandMultiplier = min(1, max(-2, demandMultiplier))
        
        self.demand["Residential"] *= demandMultiplier
        self.demand["Commercial"] *= demandMultiplier
        self.demand["Educational"] *= demandMultiplier
        self.demand["Healthcare"] *= demandMultiplier
        self.demand["SocioCultural"] *= demandMultiplier

#        
#        self.demand["Residential"] = min(10, max(-10, self.demand["Residential"]))
#        self.demand["Commercial"] = min(10, max(-10, self.demand["Commercial"]))
#        self.demand["Educational"] = min(5, max(-5, self.demand["Educational"]))
        
    def evaluateDemandWithMetro(self):
#        print("##########Evaluating id:", self.id)
        
        for nbr in self.neighbours:
            if(nbr[1] != None):
#                print("Against id: ", nbr[0].id, " Distance: ", nbr[1])
#                print("Residential_Residential","distribution",nbr[0].distribution["Residential"],  "influence_factor:", InfluenceFactor["Residential_Residential"], "distance Factor:", self.calculateDistanceFactor(nbr[1], "Residential_Residential"))
                self.demand["Residential"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Residential"] * self.calculateDistanceFactor(nbr[1], "Residential_Residential")
                self.demand["Residential"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Residential"] * self.calculateDistanceFactor(nbr[1], "Metro_Residential") 
                
                self.demand["Commercial"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Commercial"] * self.calculateDistanceFactor(nbr[1], "Metro_Commercial") 
                self.demand["Commercial"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Commercial"] * self.calculateDistanceFactor(nbr[1], "Residential_Commercial") 
                self.demand["Commercial"] += nbr[0].distribution["Commercial"] * InfluenceFactor["Commercial_Commercial"] * self.calculateDistanceFactor(nbr[1], "Commercial_Commercial") 
                self.demand["Commercial"] += nbr[0].distribution["Educational"] * InfluenceFactor["Educational_Commercial"] * self.calculateDistanceFactor(nbr[1], "Educational_Commercial")
                
                self.demand["Educational"] += nbr[0].distribution["Metro"] * InfluenceFactor["Metro_Educational"] * self.calculateDistanceFactor(nbr[1], "Metro_Educational")
                self.demand["Educational"] += nbr[0].distribution["Residential"] * InfluenceFactor["Residential_Educational"] * self.calculateDistanceFactor(nbr[1], "Residential_Educational")
                self.demand["Educational"] += nbr[0].distribution["Educational"] * InfluenceFactor["Educational_Educational"] * self.calculateDistanceFactor(nbr[1], "Educational_Educational")
    

    def grow(self):
        self.distribution["Residential"] += int(self.demand["Residential"] * 1)
        self.distribution["Commercial"] += int(self.demand["Commercial"] * 1)
        self.distribution["Educational"] += int(self.demand["Educational"] * 1)
        self.distribution["Healthcare"] += int(self.demand["Healthcare"] * 1)
        self.distribution["SocioCultural"] += int(self.demand["SocioCultural"] * 1)
        
        self.distribution["Residential"] = max(0, self.distribution["Residential"])
        self.distribution["Commercial"] = max(0, self.distribution["Commercial"])
        self.distribution["Educational"] = max(0, self.distribution["Educational"])
        self.distribution["Healthcare"] = max(0, self.distribution["Healthcare"])
        self.distribution["SocioCultural"] = max(0, self.distribution["SocioCultural"])
        
        if (self.distribution["Educational"] >= 1):
            self.distribution["Commercial"] = 0
            self.distribution["Residential"] = 0
            self.distribution["Healthcare"] = 0
            self.distribution["SocioCultural"] = 0
        
        if (self.distribution["Healthcare"] >= 1):
            self.distribution["Commercial"] = 0
            self.distribution["Residential"] = 0
            self.distribution["Educational"] = 0
            self.distribution["SocioCultural"] = 0

    def calculateDistanceFactor(self, distance, relationship):
        #Distance influences P(d) = e^(-Bd)
        #https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377942/
        distanceInfluence = math.e ** ( - DistanceFactor[relationship][0] * distance/1609.34 ) # meter to miles
        return distanceInfluence 
    
    def __str__(self):
        s = " ID: "+str(self.id) + ", Neighbours: "
        for n in self.neighbours:
            s += " id: "+str(n[0].id) +  "- distance: "+str(n[1])
        return s


################## ID = index+1  #################

def initial_influence():
    for b in range(len(Blocks)):
        Blocks[b].evaluateDemandWithMetro()

def demand_loop():
    for b in range(len(Blocks)):
        Blocks[b].evaluateDemand()
def grow_loop():
    for b in range(len(Blocks)):
        Blocks[b].grow()

def main():

    demand_loop()
    grow_loop()





# Instantiate or reset persistent counter variable
if "c" not in globals() or RESET:
    c = 0

if "Blocks" not in globals() or RESET:
    Blocks = []
    for n in range(len(BLOCKS)):
        Blocks.append(Block(BLOCKS[n], BLOCKS_ID[n]))
    for b in range(len(Blocks)):
        Blocks[b].addNeighbours(NG[b], DG[b], Blocks)
        
    Blocks[MetroId-1].distribution["Metro"] = 1
    Blocks[246].distribution["Metro"] = 1
    initial_influence()


# Update the variable and component
if (c < ITERATIONS):
    c = c + 1
    main()

COUNTER = c


Points = []
Ids = []
RD = []
CD = []
ED = []
HD = []
SD = []

RDist = []
CDist = []
EDist = []
HDist = []
SDist = []

for p in Blocks:
    Points.append(p.position)
    Ids.append(p.id)
    RD.append(p.demand["Residential"])
    CD.append(p.demand["Commercial"])
    ED.append(p.demand["Educational"])
    HD.append(p.demand["Healthcare"])
    SD.append(p.demand["SocioCultural"])
    
    RDist.append(p.distribution["Residential"])
    CDist.append(p.distribution["Commercial"])
    EDist.append(p.distribution["Educational"])
    HDist.append(p.distribution["Healthcare"])
    SDist.append(p.distribution["SocioCultural"])

points = Points
ids = Ids

RESIDENTIAL_DEMAND = RD
COMMERCIAL_DEMAND = CD
EDUCATIONAL_DEMAND = ED
HEALTHCARE_DEMAND = HD
SOCIOCULTURAL_DEMAND = SD

RESIDENTIAL_DISTRIBUTION = RDist
COMMERCIAL_DISTRIBUTION = CDist
EDUCATIONAL_DISTRIBUTION = EDist
HEALTHCARE_DISTRIBUTION = HDist
SOCIOCULTURAL_DISTRIBUTION = SDist

Blocks[287].findNearestAll()
    
#Blocks = []
#
#for b in range(len(BLOCKS)):
#    Blocks.append(Block(BLOCKS[b], BLOCKS_ID[b]))
#
#def findBlock(blocks, id):
#    for b in blocks:
#        if b.id == id:
#            return b
#        else:
#            print ("not found")
#
#for n in range(len(Blocks)):
#    for m in range(len(NbrhdGraph[n])):
#        Blocks[n].addNeighbour(findBlock(Blocks, int(NbrhdGraph[n][m][1:])), DistGraph[n][m])
#
#
#print(Blocks[1])

`
  const overviewRef = useRef(null);
  const ContextRef = useRef(null);
  const SiteRef = useRef(null);
  const Urban_OrganismRef = useRef(null);
  const LandformRef = useRef(null);
  const ConnectivityRef = useRef(null);
  const ZoningRef = useRef(null);
  const EfficiencyRef = useRef(null);
  const LandscapeRef = useRef(null);


  const sectionRefs = [
    overviewRef, ContextRef, SiteRef, Urban_OrganismRef,
    LandformRef, ConnectivityRef, ZoningRef, EfficiencyRef,
    LandscapeRef

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const EMERGENCE_SECTIONS: SectionType[] = [
    {
      title: 'Overview',
      ref: overviewRef,
      subsections: [],
    },
    {
      title: 'Context',
      ref: ContextRef,
      subsections: [{
        title: 'Site',
        ref: SiteRef,
        subsections: [],
      }],
    },
    {
      title: 'Urban Organism',
      ref: Urban_OrganismRef,
      subsections: [{
        title: 'Landform System',
        ref: LandformRef,
        subsections: [],
      },
      {
        title: 'Connectivity System',
        ref: ConnectivityRef,
        subsections: [],
      },
      {
        title: 'Zoning System',
        ref: ZoningRef,
        subsections: [],
      }],
    },
    {
      title: 'Efficiency',
      ref: EfficiencyRef,
      subsections: [],
    },
    {
      title: 'Landscape',
      ref: LandscapeRef,
      subsections: [],
    }

  ]
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Update active section based on `id`
          }
        });
      },
      { threshold: 0.75 } // Adjust this to control how much of the section needs to be visible
    );

    // Observe all sections
    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Cleanup
    return () => observer.disconnect();
  }, [sectionRefs]);




  return (


    <div className="bg-white min-h-screen relative">
      {/* Cover */}
      <div className="relative h-[460px] bg-gray-900">
        <Image
          src={'/images/emergence/Cover animation.gif'}
          className="object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/20 responsive-padding">
          <div className="w-full pb-4  space-y-2">
            <div className="text-5xl font-bold">Emergence</div>
            <div className="text-base font-bold top-40 ">
              Computational Growth of Urban Organism
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
          sections={EMERGENCE_SECTIONS}
          activeSection={activeSection}
        />
{/* <div className="font-style:italic pt-16 max-w-prose text-xl text-justify"></div> */}
      <div className='relative'>
        <div className=" font-style: italic pt-24 max-w-prose text-3xl text-gray-500 font-extrabold text-justify">
          &quot;The ecological neighbourhood is a living system, one
          that is never static. It displays the same evolutionary
          characters as living organisms and thus evolves over time&quot;.
          
        </div>
        <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
          <div className='text-gray-500 text-[12px]'> RESILIENCE AND EVOLUTION</div>
          Neighbourhood Design Guidelines
        </div>
      </div>


        {/*Overview  */}
        <div>
          <div className="section-title"id="Overview"ref={overviewRef}>Overview</div>
          <div className='font-style: italic text:xl  py-4 text-gray-600'>What distinguishes the organic growth of a city from its planned development?</div>
          <div className="section-text">
            My undergraduate final year thesis explores the concept that cities function as living organisms,
            with interdependent layers of systems that can be designed computationally.
            Living in Dhaka, one of the fastest-growing cities in the world,
            I witnessed firsthand the pressing need for sustainable urban development.
            Over the past 30 years, Dhaka&apos;s rapid expansion has severely impacted its ecology, environment and livability.
            Addressing these challenges requires a novel approach to urban planning that considers Dhaka&apos;s unique landform and ecology.
            I employed computational simulation methods to mimic natural systems,
            optimizing various urban layers such as landform, connectivity, and zoning.
          </div>
        </div>

        {/* Context */}
        <div className="md:space-x-5 relative text-section"
          >
          <div className="relative">
            {/* this header needs to have a custom class */}
            <div className="section-title" id="Context"
          ref={ContextRef}>
              Context
            </div>
            <div className='font-style: italic text:xl  py-4 text-gray-600'>Dhaka’s urban expansion vs. wetland geography and ecologicaly.</div>
            <div className="section-text">
              Dhaka is one of the most densely populated cities in the world,
              experiencing rapid growth over the past 30 years alongside a steady decline in its wetlands and natural landscapes.
              Despite its distinct geographical characteristics,
              the predominant growth strategy has been to landfill wetlands and impose a rigid grid-like road pattern.
              However, the outskirts of Dhaka reveal a contrasting narrative—a more organic and adaptive form of settlement growth.
            </div>
          </div>
        </div>

        <div className='relative mt-8'>
          <div className="w-full">
            <img
              src="/images/emergence/Growth graph.png"
              className="w-full h-auto object-contain border border-gray-300/50"
              alt="Reaction Diffusion"
            />
          </div>
          <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
            <div className='text-gray-500 text-[12px]'> Land use and land cover change map of Dhaka for the years 1990, 1995, 2000, 2005, 2010, 2015, and 2020.</div>
            Rahman, Md & Szabó, György. (2021)
          </div>
        </div>



        <div className='relative mt-12'>
          <div id="multimedia" className="relative md:mt-8 h-[300px] md:h-[600px]">
            <Image
              src={'/images/emergence/dhaka timelapse small.gif'}
              className="object-cover"
              alt=""
              fill
              unoptimized
            />
          </div>
          <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
            <div className='text-gray-500 text-[12px]'> land cover change 1990-2020.</div>
            Google Earth
          </div>
        </div>


        <div
         >
          <div className="subsection-title"  id="Site"
          ref={SiteRef}>Site</div>
          <div className="section-text">
            Uttara Phase-3 is one of the three largest housing projects undertaken by RAJUK, Dhaka&apos;s planning body,
            but the extent of wetland destruction it has caused is alarming.
          </div>
          <div className='relative mt-12'>
            <div className="relative w-full h-auto py-4">
              <CompareSlider
                beforeImage="/images/emergence/before.jpg"
                afterImage="/images/emergence/after.jpg"
              />
            </div>
            <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] md:mb-4 text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
              <div className='text-gray-500 text-[12px]'>Uttara Phase-3 Before and After: 2004-2023</div>
              Google Earth
            </div>
          </div>
        </div>


        {/*Urban Organism */}
        <div>
          <div className="section-title" id="Urban Organism"
          ref={Urban_OrganismRef}>Urban Organism</div>
          <div className='font-style: italic text:xl  py-4 text-gray-600'>Like organisms, cities function through interdependent systems.</div>
          <div className="section-text">
            Cities and organisms share many similarities in terms of circulation, resource cycles, information networks, and the positioning of their components. 
            While organisms have evolved to develop highly efficient and intelligent designs, cities have grown through the collective intelligence of people. 
            By mimicking organic systems in the planning process, we can find more effective solutions through computational methods.
          </div>

          {/* Landform System */}
          <div className="w-full">
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/3 relative">
                <div className="text-3xl font-bold py-4 text-gray-600" id="Landform System"
            ref={LandformRef}>Landform System</div>
                <div className="section-text">
                  Dhaka has a unique landscape. The Madhupur Tract in greater Dhaka is surrounded by rivers that flood every year, 
                  bringing fresh water inland. Over thousands of years, these floods have shaped the land into amoeboid patterns. 
                  The highlands are bordered by lower-lying areas that are used for agriculture during the dry season. 
                  Water has seeped into every nook and cranny of the land, creating a distinctive geography.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                <img
                  src="/images/emergence/Dhaka grid.jpg"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
                <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] md:mb-4 text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                  <div className='text-gray-500 text-[12px]'>Natural Landform of Madhupur Tract</div>
                  Google Earth
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="section-text">
              This is Reaction-Diffusion and it occurs in many other places in nature, both organic and inorganic.
            </div>

            <div className='relative'>
              <div className=' md:flex md:flex-row pt-8 md:space-x-0'>
                <div className="w-full ">
                  <img
                    src="/images/emergence/microvilli.png"
                    className="w-full h-auto object-contain pt-6"
                    alt="Reaction Diffusion"
                  />
                </div>

                <div className="w-full ">
                  <img
                    src="/images/emergence/dielectric.png"
                    className="w-full h-auto object-contain pb-6"
                    alt="Reaction Diffusion"
                  />
                </div>
              </div>
              <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px] md:mb-4 text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                  <div className='text-gray-500 text-[12px]'>Fish Intestine and Effects of Magnetic and Electric Fields</div>
                  Boonanuntanasarn, Surintorn & Khaomek, Pranorm & Pitaksong, Taratip & Hua, Yanling. (2014).
                </div>
            </div>


          </div>

          <div className="w-full">
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              <div className="md:w-[20%] md:basis-1/3 relative">
                <div className="section-text mr-4">
                  Differential growth or reaction diffusion can be simulated with an algorithm and it can give us a pattern similar to the landform of Dhaka.

                </div>
              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0">
                <img
                  src="/images/emergence/diff growth demo.gif"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
                <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                  <div className='text-gray-500 text-[12px]'>Algorithmic representation of differential growth</div>
                </div>
              </div>
            </div>
            <div className='pt-8'>
              <CodeBlock code={code} language="python" />
            </div>
          </div>

          <div className="pt-8">
            <div className="section-text">
              Relating the natural geography with the differential growth, we can use this model to design landform that will maintain the
              flow of water during flooding season. This pattern also maximizes the lenght of edge ecology.
            </div>

            <div className="relative w-full mt-4">
              <img
                src="/images/emergence/differential growth.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
              <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                <div className='text-gray-500 text-[12px]'>Differential growth in the site</div>

              </div>
            </div>
          </div>

          {/* Connectivity System */}
          <div className='pt-8'>
            <div className='subsection-title' id="Connectivity System"
            ref={ConnectivityRef}>
              Connectivity System
            </div>
            <div className="section-text">
              This basic connectivity problem is not new in nature. almost every organism deals with the transportation problem in some way.
              Slime molds can optimize connectivity among the food sources. Ants can collectively create more efficient routes.
              Swarm intelligence where the knowledge of multiple individuals collectively creates an emergent pattern is seen in nature in abundance.
            </div>
            <div className="w-full mt-4 relative">
              <img
                src="/images/emergence/slime mold japan.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
              <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                <div className='text-gray-500 text-[12px]'>Tokyo rail network formation with Physarum polycephalum</div>
                Awad, Abubakr & Pang, Wei & Lusseau, David & Coghill, George. (2021).  
              </div>
            </div>
            <div className="w-full mt-4 relative">
              <img
                src="/images/emergence/Ants path.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
              <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                <div className='text-gray-500 text-[12px]'>Shape and efficiency of wood ant foraging networks</div>
                Buhl, Jerome & Hicks, Kerri & Miller, Esther & Persey, Sophie & Alinvi, Ola & Sumpter, David. (2009). 
              </div>
            </div>
            <div className="section-text mt-4">
              These systems can also be modeled computationally to address connectivity challenges. 
              In such landforms, designing an efficient road network is a complex task. 
              However, by mimicking the collective intelligence found in nature, 
              we can explore multiple approaches to develop a road network that aligns with the unique characteristics of the terrain.
              On our site, we can create analogs of these systems. By defining the metro stations as sources and the higher land as food, 
              we can simulate collective intelligence to guide the design process.
            </div>
            <div className="w-full mt-4 relative">
              <img
                src="/images/emergence/Slime mold.gif"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
              <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                <div className='text-gray-500 text-[12px]'>Slime mold algorithm applied to site</div>
              </div>
            </div>
          </div>

          {/* Zoning system */}
          <div className="w-full">
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              {/* Text Section */}
              <div className="md:w-[20%] md:basis-1/2 relative">
                <div className="text-3xl font-bold py-4 text-gray-600"  id="Zoning System"
            ref={ZoningRef}>Zoning System</div>
                <div className="section-text">
                Natural settlements tend to grow organically in this type of landform. However, designing an efficient and walkable neighborhood in such areas is challenging. 
                To address this, the natural settlement growth pattern can be simulated using walkability metrics.
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                <img
                  src="/images/emergence/Dhaka settlement.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              <div className="flex flex-col justify-between md:w-[20%] md:basis-1/2 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                Using walkability metrics, we can determine the optimal walking distances between different zones and calculate the demand for amenities based on the surrounding context. This natural growth process is driven by the relationship between demand and development. 
                As a zone grows, it generates demand for additional amenities, creating a continuous cycle that shapes the settlement.

                </div>
                <div className="md:w-[80%] relative grow mt-4 w-full h-auto">
                  <img
                    src="/images/emergence/Cycle.png"
                    className="object-contain w-full h-auto"
                    alt="Dhaka Landform"
                  />
                </div>

              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0 border border-gray-300/50">
                <img
                  src="/images/emergence/entities.png"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
              </div>

            </div>
          </div>
          <div className="w-full mt-4 border border-gray-300/50">
            <img
              src="/images/emergence/steps.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="section-text mt-4">
          For example, in step one, the presence of residential units creates a demand for schools and shops nearby. 
          In step two, new commercial and educational facilities emerge to meet this demand. 
          However, this growth generates additional demand, which is addressed in step three, continuing the cycle.
          </div>
          <div className='pt-8'>
              <CodeBlock code={codeZoning} language="python" />
            </div>

          <div className="w-full mt-4">
            <img
              src="/images/emergence/formula.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="section-text mt-4">
          The demand is calculated using this formula: the demand for any amenity depends on three factors—the number of requesters for that amenity, 
          the required number of amenities per requester unit, and the walkability distance factor.
          </div>


          <div className="w-full">
            <div className="md:flex md:flex-row md:space-x-5 relative text-section">
              <div className="md:w-[20%] md:basis-1/3 md:ml-4 md:py-4 relative md:order-last">
                <div className="section-text ">
                The algorithm is tested on a small network, following the cycle of calculating demand and adding the required zones. Over time, the cycle stabilizes, reaching equilibrium after approximately 50 steps. 
                At this point, the required amenities are positioned to serve the maximum number of people within a walkable distance.

                </div>
              </div>
              <div className="md:w-[80%] relative grow mt-4 w-full h-auto !ml-0">
                <img
                  src="/images/emergence/zoning example.gif"
                  className="object-contain w-full h-auto"
                  alt="Dhaka Landform"
                />
                <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
                  <div className='text-gray-500 text-[12px]'>Organic growth algorithm applied on a simple network</div>
                </div>
              </div>

            </div>
          </div>

          <div className="section-text mt-4">
            Then it is applied to our site which has a much larger area and more complex network. It also reaches an equilibrium in around step 35.
          </div>

          <div className="w-full mt-4 relative">
            <img
              src="/images/emergence/zoning animation.gif"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
            <div className='md:absolute md:bottom-0 md:left-full md:ml-4 text-[10px]  text-gray-400 whitespace-normal md:w-[100px] lg:w-[200px] font-style: italic'>
              <div className='text-gray-500 text-[12px]'>Organic growth algorithm applied on the network</div>
            </div>
          </div>
        </div>

        {/* Efficiency of Urban Organism */}
        <div className="w-full">

          <div className="md:flex md:flex-row md:space-x-5 relative text-section">
            {/* Text Section */}
            <div className="md:w-[20%] md:basis-1/3 relative">
              <div className="text-5xl font-bold pb-4 text-gray-800" 
                id="Efficiency"
                ref={EfficiencyRef}>
                Efficiency of Urban Organism
              </div>
              <div className='font-style: italic text:xl  py-4 text-gray-600'>Effecient systems designed through collective intelligence.</div>

              <div className="section-text">
                This is a kind of swarm intelligent or cellular automata, where each agent reacts with its neighbours. The cycle of growth and demand is a dynamical system.
                After the system reaches an equilibrium, a solution is found.
              </div>
            </div>

            {/* Image Section */}
            <div className="md:w-[80%] relative grow mt-4 w-full h-auto border border-gray-300/50" >
              <img
                src="/images/emergence/mp.png"
                className="object-contain w-full h-auto "

                alt="Dhaka Landform"
              />
            </div>
          </div>



          <div className='md:flex md:flex-row pt-8 md:space-x-5'>
            <div className="w-full mt-4 border border-gray-300/50">
              <img
                src="/images/emergence/ex1.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4 border border-gray-300/50">
              <img
                src="/images/emergence/ex2.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>
          <div className="section-text mt-4">
            In these two examples, the distance from different amenities are shown. All amenities are within walking distance.
          </div>

        </div>

        {/* Landscape System */}
        <div className="w-full">
          <div className="section-title"
            id="Landscape"
            ref={LandscapeRef}>Landscape and Walkability</div>
          <div className='font-style: italic text:xl  py-4 text-gray-600'>The land water interface supports the most important ecosystems.</div>

          <div className="section-text mt-4">
          The ecosystem of the edge plays a vital role in these landscapes. 
          Along the long edge, vegetable gardens, wild plants, and ponds create a rich and diverse environment. The roads are designed to encourage walking and cycling, 
          with public trails running along the edge to enhance accessibility and connection to nature.
          </div>

          <div className="w-full mt-4">
            <img
              src="/images/emergence/masterplan annotated.jpg"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className='md:flex md:flex-row pt-8 md:space-x-5'>
            <div className="w-full mt-4">
              <img
                src="/images/emergence/cake 1.jpeg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>

            <div className="w-full mt-4">
              <img
                src="/images/emergence/cake 2.jpeg"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>
          </div>

          <div className="section-text mt-4">
          The extensive network of water channels allows for connectivity across the region, as all water bodies are interlinked. 
          This makes water-based transportation a viable option, a method that was historically prevalent in Dhaka.
          </div>


          <div className="w-full">
            <img
              src="/images/emergence/section.png"
              className="w-full h-auto object-contain"
              alt="Reaction Diffusion"
            />
          </div>

          <div className="section-text mt-4">
          This project explores how computational modeling can mimic organic systems to design more efficient and sustainable urban environments. By simulating natural processes like resource cycles and growth patterns, we can optimize city planning for better connectivity, walkability, and ecosystem integration. The use of water-based transportation and edge ecosystems, 
          inspired by Dhaka’s unique landscape, demonstrates how cities can grow intelligently, much like organisms, through a dynamic, demand-driven approach.
          </div>


        </div>



        <div className="h-[80px]"></div>

        <div className="flex justify-between mt-8 font-bold text-xl">
          <Link href="/">
            <div className="text-blue-500 hover:underline">Previous Project</div>
          </Link>
          <Link href="/projects/evolution">
            <div className="text-blue-500 hover:underline">Next Project</div>
          </Link>
        </div>

        <div className="h-[80px]"></div>

        


      </div>
    </div>





  );
};

export default EmergenceDetails;
