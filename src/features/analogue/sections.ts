import { SectionType } from '@/model/sectiontype';

export const ANALOG_SECTIONS: SectionType[] = [
  {
    title: 'Overview',
    subsections: [],
  },
  {
    title: 'Modules',
    subsections: [
      {
        title: 'VCO',
        subsections: [
          {
            title: 'Circuits',
            subsections: [],
          },
          {
            title: 'Simulation',
            subsections: [],
          },
        ],
      },
      {
        title: 'Clock + Divider & ADSR',
        subsections: [
          {
            title: 'Circuits',
            subsections: [],
          },
          {
            title: 'Simulation',
            subsections: [],
          },
        ],
      },
      {
        title: '10 Step Sequencer',
        subsections: [],
      },
      {
        title: 'VCA',
        subsections: [],
      },
    ],
  },
  {
    title: 'Building From Scratch',
    subsections: [],
  },
];
