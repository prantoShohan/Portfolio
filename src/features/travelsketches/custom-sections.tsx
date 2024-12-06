import { cn } from '@/lib/utils';
import { SectionType } from '@/model/sectiontype';
import React from 'react';

export interface SectionProps {
  sections: SectionType[];
  activeSection?: string;
}

const CustomSections = ({ sections, activeSection }: SectionProps) => {
  return (
    <div className="hidden lg:block fixed rounded-xl p-4 w-[10%] bottom-10 left-[10%] text-black bg-gry-100 border border-border/20 space-y-3">
      {sections.map((section: SectionType) => (
        <div
          className={cn('text-base cursor-pointer space-y-3')}
          key={section.title}
        >
          <div
            className={cn('', activeSection === section.title && 'font-bold')}
            onClick={() =>
              section.ref?.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center',
              })
            }
          >
            {section.title}
          </div>
          {section.subsections?.map((section: SectionType) => (
            <div
              className={cn('text-black/70 pl-4 text-sm cursor-pointer')}
              key={section.title}
            >
              <div
                className={cn(
                  '',
                  activeSection === section.title && 'font-bold'
                )}
                onClick={() =>
                  section.ref?.current.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'center',
                  })
                }
              >
                {section.title}
              </div>
              {section.subsections?.map((section: SectionType) => (
                <div
                  className={cn(
                    'text-black/70 pl-4 text-sm cursor-pointer py-[2px]'
                  )}
                  key={section.title}
                >
                  <div
                    className={cn(
                      '',
                      activeSection === section.title && 'font-bold'
                    )}
                    onClick={() =>
                      section.ref?.current.scrollIntoView({
                        behavior: 'auto',
                        block: 'center',
                        inline: 'center',
                      })
                    }
                  >
                    {section.title}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomSections;
