import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Copy, Check, FileText } from 'lucide-react';
import { Project, PERSONAL_INFO } from '../data/portfolio';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
}) => {
  const [copiedBib, setCopiedBib] = useState(false);

  const bibtex = `@article{kandukuri${project.slug.replace(/[^a-zA-Z0-9]/g, '')},
  author    = {Kandukuri, Shloka},
  title     = {${project.title}},
  institution = {Purdue University},
  year      = {2026},
  url       = {${project.githubUrl || window.location.href}}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <article className="max-w-2xl">
      {/* Navigation breadcrumb */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[14px] text-[#666666] hover:text-[#222222] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] font-medium text-[#222222] mb-3 leading-tight tracking-tight">
          {project.title}
        </h1>
        <p className="text-[16px] sm:text-[18px] text-[#555555] leading-relaxed mb-6 font-serif italic">
          {project.summary}
        </p>

        {/* Structured metadata block */}
        <div className="bg-[#FAFAF8] p-4 sm:p-5 rounded-sm border border-[#E5E5E2] text-[13px] text-[#222222] space-y-2.5">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-2 items-baseline">
            <span className="text-[#666666] font-medium">Category</span>
            <span>{project.category}</span>
          </div>
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-2 items-baseline">
            <span className="text-[#666666] font-medium">Technologies</span>
            <span className="font-mono text-[12px] text-[#333333]">{project.technologies}</span>
          </div>
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-2 items-baseline">
            <span className="text-[#666666] font-medium">Status</span>
            <span>
              {project.status} {project.period ? `(${project.period})` : ''}
            </span>
          </div>
          {project.organization && (
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-2 items-baseline">
              <span className="text-[#666666] font-medium">Organization</span>
              <span className="font-medium text-[#222222]">{project.organization}</span>
            </div>
          )}
          {project.githubUrl && (
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-2 items-baseline">
              <span className="text-[#666666] font-medium">Code Repository</span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#245B8F] hover:text-[#173E63] inline-flex items-center gap-1 font-mono text-[12px]"
              >
                <span>{project.githubUrl.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Structured Sections */}
      <div className="space-y-8 sm:space-y-10">
        {project.sections.map((section, idx) => (
          <section key={idx} className="border-t border-[#E5E5E2] pt-6 first:border-0 first:pt-0">
            <h2 className="font-serif text-[20px] sm:text-[23px] font-medium text-[#222222] mb-3 tracking-tight">
              {section.title}
            </h2>

            {section.paragraphs && (
              <div className="space-y-3.5 text-[15px] sm:text-[16px] text-[#222222] leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="mb-0">{p}</p>
                ))}
              </div>
            )}

            {/* Benchmark / Highlights Metrics */}
            {section.highlightMetrics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {section.highlightMetrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 bg-[#FAFAF8] border border-[#E5E5E2] rounded-sm"
                  >
                    <div className="font-mono text-[22px] sm:text-[24px] font-semibold text-[#222222] tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-[13px] text-[#666666] mt-0.5 leading-snug">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.bullets && (
              <ul className="list-disc list-outside ml-5 mt-3 space-y-2 text-[15px] sm:text-[16px] text-[#222222]">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Academic Citation Box */}
        <section className="border-t border-[#E5E5E2] pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[17px] sm:text-[19px] font-medium text-[#222222]">
              BibTeX Citation
            </h3>
            <button
              onClick={copyBibtex}
              className="inline-flex items-center gap-1.5 text-[12px] text-[#666666] hover:text-[#245B8F] transition-colors cursor-pointer"
            >
              {copiedBib ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy BibTeX</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 bg-[#FAFAF8] border border-[#E5E5E2] rounded-sm text-[12px] font-mono text-[#444444] overflow-x-auto whitespace-pre leading-relaxed">
            {bibtex}
          </pre>
        </section>

        {/* Bottom navigation */}
        <div className="pt-6 border-t border-[#E5E5E2] flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[14px] text-[#245B8F] hover:text-[#173E63] font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </button>
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry regarding ${encodeURIComponent(project.title)}`}
            className="text-[13px] text-[#666666] hover:text-[#245B8F] transition-colors"
          >
            Inquire about this work →
          </a>
        </div>
      </div>
    </article>
  );
};
