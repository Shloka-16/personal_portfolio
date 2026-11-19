import React from 'react';
import { EXPERIENCES, TECHNICAL_SKILLS } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export const ExperienceView: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <header className="mb-8 sm:mb-10">
        <h1 className="font-serif text-[30px] sm:text-[34px] md:text-[38px] font-medium text-[#222222] mb-3 tracking-tight">
          Experience
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
          Research appointments, software engineering internships, teaching, and applied engineering systems.
        </p>
      </header>

      {/* Chronological Experience */}
      <div className="space-y-9 sm:space-y-12">
        {EXPERIENCES.map((item, idx) => (
          <section
            key={idx}
            className="border-b border-[#E5E5E2] pb-9 sm:pb-12 last:border-0 last:pb-0"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1 gap-0.5 sm:gap-4">
              <h2 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#222222]">
                {item.organization}
              </h2>
              <span className="text-[13px] sm:text-[14px] text-[#666666] font-mono shrink-0">
                {item.period}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3 text-[14px] sm:text-[15px]">
              <span className="italic text-[#555555] font-serif">{item.role}</span>
              {item.location && (
                <>
                  <span className="text-[#BBBBBB]" aria-hidden="true">·</span>
                  <span className="text-[#777777] text-[13px]">{item.location}</span>
                </>
              )}
            </div>

            <ul className="list-disc list-outside ml-4 sm:ml-5 space-y-2 text-[15px] sm:text-[16px] text-[#222222] leading-relaxed">
              {item.highlights.map((highlight, hIdx) => (
                <li key={hIdx}>{highlight}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Technical Competencies & Skills */}
      <section className="mt-14 pt-10 border-t border-[#E5E5E2]">
        <SectionHeading subtitle="Proficiencies across machine learning, backend architectures, and cloud environments.">
          Technical Skills
        </SectionHeading>

        <div className="bg-[#FAFAF8] p-5 sm:p-6 border border-[#E5E5E2] rounded-sm space-y-4 text-[14px]">
          {TECHNICAL_SKILLS.map((group, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 border-b border-[#EBEBE8] pb-3 last:border-0 last:pb-0"
            >
              <span className="font-medium text-[#444444] font-serif">{group.category}</span>
              <span className="text-[#222222] font-mono text-[13px]">{group.skills}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
