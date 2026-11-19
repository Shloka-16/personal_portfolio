import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_DATA } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';

interface HomeViewProps {
  onNavigate: (route: string) => void;
  onSelectProject: (slug: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  const selectedProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-[42px] sm:space-y-[52px]">
      {/* 5.2 Introduction */}
      <section className="max-w-2xl">
        <h1 className="font-serif text-[30px] sm:text-[38px] md:text-[42px] font-medium text-[#222222] mb-1.5 tracking-tight">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#666666] mb-6 leading-snug">
          {PERSONAL_INFO.title}
          <br />
          {PERSONAL_INFO.affiliation}
        </p>

        <div className="space-y-4 text-[15px] sm:text-[16px] text-[#222222] leading-relaxed">
          {PERSONAL_INFO.bio.map((paragraph, idx) => (
            <p key={idx} className="mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Clean text links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-[14px]">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[#245B8F] hover:text-[#173E63] font-medium transition-colors"
          >
            Email
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#245B8F] hover:text-[#173E63] font-medium transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#245B8F] hover:text-[#173E63] font-medium transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={() => onNavigate('resume')}
            className="text-[#245B8F] hover:text-[#173E63] font-medium transition-colors cursor-pointer"
          >
            Resume
          </button>
        </div>
      </section>

      {/* 5.3 About */}
      <section className="max-w-2xl border-t border-[#E5E5E2] pt-8 sm:pt-10">
        <SectionHeading>About</SectionHeading>
        <div className="space-y-4 text-[15px] sm:text-[16px] text-[#222222] leading-relaxed">
          {PERSONAL_INFO.extendedBio.map((paragraph, idx) => (
            <p key={idx} className="mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 5.5 Selected Projects */}
      <section className="border-t border-[#E5E5E2] pt-8 sm:pt-10">
        <SectionHeading>Selected Projects</SectionHeading>
        <div className="space-y-7 sm:space-y-8">
          {selectedProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onSelectProject={onSelectProject}
              showDivider={idx !== selectedProjects.length - 1}
            />
          ))}
        </div>

        <div className="mt-8 pt-4">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#245B8F] hover:text-[#173E63] transition-colors cursor-pointer"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5.6 Education */}
      <section className="max-w-2xl border-t border-[#E5E5E2] pt-8 sm:pt-10">
        <SectionHeading>Education</SectionHeading>
        <div className="space-y-4 text-[15px] sm:text-[16px]">
          <div>
            <h3 className="font-serif text-[17px] sm:text-[19px] font-semibold text-[#222222]">
              {EDUCATION_DATA.institution}
            </h3>
            <div className="text-[#555555] space-y-0.5 mt-1 leading-relaxed">
              {EDUCATION_DATA.degrees.map((degree, idx) => (
                <p key={idx} className="mb-0">{degree}</p>
              ))}
              {EDUCATION_DATA.minor && (
                <p className="mb-0 text-[#666666]">Minor: {EDUCATION_DATA.minor}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[14px] text-[#666666] mb-1.5 font-medium">
              Relevant Coursework:
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[13px] sm:text-[14px] text-[#333333]">
              {EDUCATION_DATA.coursework.map((course, idx) => (
                <React.Fragment key={idx}>
                  <span>{course}</span>
                  {idx < EDUCATION_DATA.coursework.length - 1 && (
                    <span className="text-[#BBBBBB]" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
