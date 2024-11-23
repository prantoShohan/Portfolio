import React from 'react';

export interface SectionType {
  title: string;
  subsections?: SectionType[];
  ref?: React.MutableRefObject<any>;
}
