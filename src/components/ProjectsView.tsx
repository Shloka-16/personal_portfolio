import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';

interface ProjectsViewProps {
  onSelectProject: (slug: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Machine Learning',
    'Computer Vision',
    'Cloud & Infrastructure',
    'Applied Automation',
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Machine Learning') return project.category.includes('Machine Learning');
      if (selectedCategory === 'Computer Vision') return project.category.includes('Computer Vision');
      if (selectedCategory === 'Cloud & Infrastructure') return project.category.includes('Cloud');
      if (selectedCategory === 'Applied Automation') return project.category.includes('Automation');
      return true;
    });
  }, [selectedCategory]);

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="font-serif text-[30px] sm:text-[34px] md:text-[38px] font-medium text-[#222222] mb-3 tracking-tight">
          Projects &amp; Research
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
          A selection of projects and research involving machine learning, applied AI, software engineering, and cloud data systems.
        </p>
      </header>

      {/* Category filter buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-1.5 text-[13px]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-sm transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-[#222222] text-[#FFFFFF] border-[#222222]'
                    : 'bg-[#FAFAF8] text-[#555555] border-[#E5E5E2] hover:bg-[#F0F0EE] hover:text-[#222222]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-8 sm:space-y-10">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onSelectProject={onSelectProject}
              showDivider={idx !== filteredProjects.length - 1}
            />
          ))
        ) : (
          <div className="py-12 text-center text-[#777777] bg-[#FAFAF8] border border-[#E5E5E2] rounded-sm">
            <p className="text-[15px] mb-1">No projects matched your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="text-[13px] text-[#245B8F] hover:underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
