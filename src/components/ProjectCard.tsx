import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolio';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (slug: string) => void;
  showDivider?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  showDivider = true,
}) => {
  return (
    <article className={`${showDivider ? 'border-b border-[#E5E5E2] pb-7 sm:pb-9' : ''}`}>
      <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#222222] mb-1.5 tracking-tight">
        <button
          onClick={() => onSelectProject(project.slug)}
          className="hover:text-[#245B8F] text-left transition-colors cursor-pointer"
        >
          {project.title}
        </button>
      </h3>

      <p className="text-[15px] sm:text-[16px] text-[#222222] leading-relaxed mb-2.5">
        {project.summary}
      </p>

      {/* Clean unboxed metadata with typographic separators - strictly no pills */}
      <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[12px] sm:text-[13px] text-[#666666] font-mono mb-3">
        <span>{project.category}</span>
        {project.organization && (
          <>
            <span aria-hidden="true" className="text-[#BBBBBB]">/</span>
            <span>{project.organization}</span>
          </>
        )}
        <span aria-hidden="true" className="text-[#BBBBBB]">/</span>
        <span className="text-[#777777]">{project.status}</span>
        {project.period && (
          <>
            <span aria-hidden="true" className="text-[#BBBBBB]">/</span>
            <span>{project.period}</span>
          </>
        )}
      </div>

      <p className="text-[12px] sm:text-[13px] text-[#666666] font-mono mb-3">
        <span className="text-[#888888]">Technologies:</span> {project.technologies}
      </p>

      {/* Action links */}
      <div className="flex items-center gap-5 text-[14px]">
        <button
          onClick={() => onSelectProject(project.slug)}
          className="inline-flex items-center gap-1 text-[#245B8F] hover:text-[#173E63] font-medium transition-colors cursor-pointer"
        >
          <span>Project Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
};
