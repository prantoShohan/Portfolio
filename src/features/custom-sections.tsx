import { cn } from '@/lib/utils';
import { SectionType } from '@/model/sectiontype';
import React from 'react';

export interface SectionProps {
  sections: SectionType[];
  activeSection?: string;
}

const CustomSections = ({ sections, activeSection }: SectionProps) => {
  return (
    <nav
      className="hidden lg:block fixed rounded-xl p-4 w-[10%] bottom-20 left-[10%] text-black border border-border/5 space-y-3 shadow-md"
      role="navigation"
      aria-label="Section Navigation"
    >
      {sections.map((section: SectionType) => (
        <div
          className={cn('text-base cursor-pointer space-y-3')}
          key={section.title}
        >
          <div
            className={cn(
              'hover:text-blue-600 transition-colors duration-200',
              activeSection === section.title && 'font-bold text-blue-600'
            )}
            onClick={() =>
              section.ref?.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              })
            }
          >
            {section.title}
          </div>
          {section.subsections?.map((subsection: SectionType) => (
            <div
              className={cn('text-black/70 pl-4 text-sm cursor-pointer')}
              key={subsection.title}
            >
              <div
                className={cn(
                  'hover:text-blue-500 transition-colors duration-200',
                  activeSection === subsection.title && 'font-bold text-blue-500'
                )}
                onClick={() =>
                  subsection.ref?.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                  })
                }
              >
                {subsection.title}
              </div>
              {subsection.subsections?.map((subSubsection: SectionType) => (
                <div
                  className={cn(
                    'text-black/60 pl-6 text-sm cursor-pointer py-[2px] hover:text-blue-400 transition-colors duration-200',
                    activeSection === subSubsection.title && 'font-bold text-blue-400'
                  )}
                  key={subSubsection.title}
                >
                  <div
                    onClick={() =>
                      subSubsection.ref?.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                      })
                    }
                  >
                    {subSubsection.title}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default CustomSections;
