'use client';


import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import CustomSections from './custom-sections';
import { SectionType } from '@/model/sectiontype';

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-python';
import CodeBlock from '../CodeBlock';
import MidiPlayer from '../Mp3Player';
import Mp3Player from '../Mp3Player';


const Tabulature = () => {
  useEffect(() => {
    Prism.highlightAll(); // Highlights all code blocks after render
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };



  const code = `
from music21 import *
import music21
import math
from itertools import combinations
from functools import lru_cache

class MIDIHandler:
    def __init__(self, midi_file_path):
        self.midi_file_path = midi_file_path
        self.stream = self._midi_to_stream()

    def _midi_to_stream(self):
        mf = midi.MidiFile()
        mf.open(self.midi_file_path)
        mf.read()
        mf.close()
        return midi.translate.midiFileToStream(mf)

    def get_note_times(self):
        times = []
        for voice in self.stream[0][3:]:
            tt = []
            for note in voice:
                tt.append(int(note.offset / (.25 / 3)))
            times.append(tt)
        return times


class Fretboard:
    def __init__(self, fret_number=21):
        self.board = self._create_fretboard(fret_number)
        self.octave = {
            'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11,
            'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E#': 5, 'B#': 0, 'E-': 3, 'F-': 4,
            'G-': 6, 'A-': 8, 'B-': 10, 'C-': 11, 'D-': 1
        }

    def _create_fretboard(self, fret_number):
        return [list(range(4 + i * 5, 4 + i * 5 + fret_number)) for i in range(6)]

    def search_note_position(self, note):
        for i, string in enumerate(self.board):
            for j, fret in enumerate(string):
                if fret == note:
                    return (i, j)
        return None

    @lru_cache
    def note_to_number(self, note, octave):
        return self.octave[note] + 12 * (octave - 2)

    def get_note_positions(self):
        positions = []
        for i in range(max(self.board[-1])):
            pos = self.search_note_position(i)
            if pos:
                positions.append(pos)
        return positions


class TabGenerator:
    def __init__(self, fretboard, midi_handler):
        self.fretboard = fretboard
        self.midi_handler = midi_handler
        self.timeline = self._stream_to_timeline()
        self.timeline_numbers = self._process_notes(self.timeline, as_names=False)
        self.positions = self._get_positions(self.timeline_numbers)
        self.with_chords = self._compile_min_timeline(self.positions)
        self.reduced_chords = self._reduce_chords(self.with_chords)
        self.final_tab = self._create_tab(self.reduced_chords)

    def _stream_to_timeline(self):
        times = self.midi_handler.get_note_times()
        tracks = []
        for voice in self.midi_handler.stream[0][3:]:
            tline = [[] for _ in range(max(map(max, times)) + 1)]
            for note in voice:
                if not isinstance(note, music21.note.Rest):
                    tline[int(note.offset / (.25 / 3))] = note
            tracks.append(tline)
        return [list(filter(None, i)) for i in zip(*tracks)]

    def _process_notes(self, timeline, as_names=False):
        tline = []
        for time in timeline:
            temp = []
            for note in time:
                if isinstance(note, music21.chord.Chord):
                    temp.extend(
                        f"{i.name}{i.octave}" if as_names else self.fretboard.note_to_number(i.name, i.octave)
                        for i in note.pitches
                    )
                else:
                    temp.append(f"{note.name}{note.octave}" if as_names else self.fretboard.note_to_number(note.name, note.octave))
            tline.append(temp)
        return tline

    def _get_positions(self, tline_numbers):
        return [
            [self.fretboard.search_note_position(note) for note in time if note]
            for time in tline_numbers
        ]

    def _compile_min_timeline(self, timeline_positions):
        def cross_reference(a, b):
            return [[i, j] for i in a for j in b]

        def cross_reference_multiple(time):
            l = time[0]
            for i in range(1, len(time)):
                l = cross_reference(l, time[i])
            return [self._flatten(i) for i in l]

        def max_of_list(l):
            return max(self._distance(i[0], i[1]) for i in combinations(l, 2))

        def min_dist(single_res):
            return single_res[min(range(len(single_res)), key=lambda i: max_of_list(single_res[i]))]

        return [min_dist(cross_reference_multiple(i)) if len(i) > 1 else i for i in timeline_positions]

    def _reduce_chords(self, with_chords):
        def centroid(chord):
            x, y = zip(*chord)
            return ((max(x) + min(x)) / 2, (max(y) + min(y)) / 2)

        return [
            [centroid(i)] if len(i) > 1 else i for i in with_chords if i
        ]

    def _create_tab(self, reduced_chords):
        tab = []
        for time in reduced_chords:
            t = ['-'] * 6
            for note in time:
                t[note[0]] = str(note[1])
            tab.append(t)
        return [list(i) for i in zip(*tab)]

    def text_tab(self):
        return [
            "".join(f"-{time}-" if time != '-' else "----" for time in string)
            for string in self.final_tab
        ]

    @staticmethod
    def _distance(a, b):
        return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

    @staticmethod
    def _flatten(lst):
        return [item for sublist in lst for item in sublist]



midi_path = r'C:\Users\PRANTO\Desktop\Junks\mary.mid'
fretboard = Fretboard(fret_number=21)
midi_handler = MIDIHandler(midi_path)
tab_generator = TabGenerator(fretboard, midi_handler)

# Generate tablature
text_tab = tab_generator.text_tab()

# Write to file
output_path = r'C:\Users\PRANTO\Desktop\output.txt'
with open(output_path, 'w') as f:
    for line in text_tab:
        f.write(line + '\n')




`

  const OverviewRef = useRef(null);
  const StructureRef = useRef(null);
  const AudioMidiRef = useRef(null);
  const MidiTabRef = useRef(null);
  const ResultsRef = useRef(null);


  const sectionRefs = [
    OverviewRef, StructureRef, AudioMidiRef, MidiTabRef, ResultsRef

  ];

  const [activeSection, setActiveSection] = useState<string>();

  const TABULATURE_SECTIONS: SectionType[] = [

    {
      title: 'Overview',
      ref: OverviewRef,
      subsections: [],
    },
    {
      title: 'Code Structure',
      ref: StructureRef,
      subsections: [],
    },
    {
      title: 'Audio to MIDI',
      ref: AudioMidiRef,
      subsections: [],
    },
    {
      title: 'MIDI to Tab',
      ref: MidiTabRef,
      subsections: [],
    },
    {
      title: 'Results',
      ref: ResultsRef,
      subsections: [],
    },

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
    <div className = "bg-white min-h-screen relative ">
      {/* Cover */}
      <div className="relative h-[460px] bg-white">
        <Image
          src={'/images/tabulature/Cover.png'}
          className="object-cover md:object-cover"
          alt=""
          fill
          unoptimized
        />
        <div className="absolute bottom-0 backdrop-blur-sm w-full bg-black/30 ">
          <div className="w-full pb-4  space-y-2 responsive-padding">
            <div className="text-5xl font-bold ">Tabulature</div>
            <div className="text-base font-bold top-40 ">
                Audio to Guitar Tab Generation
            </div>
          </div>
        </div>
      </div>



      <div className="text-black relative px-4 responsive-padding">
        <CustomSections
              sections={TABULATURE_SECTIONS}
              activeSection={activeSection}
            />
      
        
        <div>

          <div>
            <div className="section-title"    
              id="Overview"
              ref={OverviewRef}>Overview</div>
            <div className="section-text">
              This is a command line application I developed in python that explores machine learning model to identify 
              the musical notes in form of MIDI and transforms the MIDI data into a guitar tabulature that is playable. So there is 2 seperate processes.
            </div>
            <div className='pt-8'>
              <div className="subsection-title">Audio-Midi-Tab</div>
            </div>
            
          </div>


          <div>
            <div className="section-title"
              id="Code Structure"
              ref={StructureRef}>Code Structure</div>
            <div className="w-full mt-4">
              <img 
                src="/images/tabulature/tabmaker.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div>           
          </div>

          <div>
            <div className="section-title"
              id="Audio to MIDI"
              ref={AudioMidiRef}>Audio to MIDI</div>
            <div className="section-text">
              This part is based on a project from Google Magenta platform. and a part of a paper called “Onset and Frames.” They use the spectographs from audio for training a Convulational Neural Network(CNN) to identify the starting and length of each notes and converts that into MIDI.

              Hawthorne, C., Elsen, E., Song, J., Roberts, A., Simon, I., Raffel, C., Engel, J., Oore, S., & Eck, D. (2017). Onsets and Frames: Dual-Objective Piano Transcription. ArXiv, abs/1710.11153.
            </div>  
            <div className="w-full mt-4">
              <img 
                src="/images/tabulature/Onset.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div> 
                    
          </div>

          <div>
            <div className="section-title"
              id="MIDI to Tab"
              ref={MidiTabRef}>MIDI to Tab</div>
            <div className="section-text">
              The TabGenerator class takes the sequence of notes and maps it out on a guitar fretboard.
               Then it calculates all the possible ways to play a note and finds the optimal position by 
               calculating the distance from the current hand position. 

              Then it writes the notes as position in standard guitar tab notation and outputs as an text file.
            </div>  
            <div className="w-full mt-4">
              <img 
                src="/images/tabulature/fret.png"
                className="w-full h-auto object-contain"
                alt="Reaction Diffusion"
              />
            </div> 
            <CodeBlock code={code} language="python" />

          </div>

          <div>
            <div className="section-title"
              id="Results"
              ref={ResultsRef}>Results</div>
              <div className="section-text">
                Though the audio to MIDI conversion is not accurate but it is close enough. And the tab generation is optimized
                for playability. It finds notes that is closest to the last note.
                I am providing 2 samples.
              </div> 
              
              <div className='pt-1'>
                <div className="subsection-title">Sample 1: Comptine d’un Autre Été - Yann Tiersen</div>
                <div className="section-subtitle">Original audio is played by me:</div>
                <div className="flex justify-center items-center w-full h-full pt-4">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/eZDRve8uAEk?si=19aDySOeYSwyS2dA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="section-subtitle mt-8">This is converted to MIDI</div>
                <Mp3Player mp3FilePath="/audios/1.mp3" title="MIDI" />
                <div className="section-subtitle mt-8">The algorithm converts the MIDI to playable guitar tab </div>
                <div className="w-full mt-4">
                  <img 
                    src="/images/tabulature/yantab.png"
                    className="w-full h-auto object-contain"
                    alt="Reaction Diffusion"
                  />
                </div> 
              </div>

              <div className='pt-1'>
                <div className="subsection-title">Sample 2: </div>
                <div className="section-subtitle">Original audio :</div>
                <Mp3Player mp3FilePath="/audios/m_wav.mp3" title="WAV" />
                <div className="section-subtitle mt-8">This is converted to MIDI</div>
                <Mp3Player mp3FilePath="/audios/m_midi.mp3" title="MIDI" />
                <div className="section-subtitle mt-8">The algorithm converts the MIDI to playable guitar tab </div>
                <div className="w-full mt-4">
                  <img 
                    src="/images/tabulature/mtab.png"
                    className="w-full h-auto object-contain"
                    alt="Reaction Diffusion"
                  />
                </div> 
              </div>

             
            
                    
          </div>


                    



          

          

          

          

          <div className= "h-[30px]"></div>

          
          
          

          


          

        </div>

        
      



        

        






      </div>

      

    </div>

  );
};

export default Tabulature;
