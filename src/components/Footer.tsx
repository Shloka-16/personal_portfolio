import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print w-full max-w-[900px] mx-auto px-5 sm:px-7 md:px-8 mt-24 mb-10">
      <div className="border-t border-[#E5E5E2] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13px] text-[#888888]">
        <div>
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span className="mx-2 text-[#CCCCCC]">·</span>
          <span>Purdue University</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px]">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            Email
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'resume';
            }}
            className="text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
};
