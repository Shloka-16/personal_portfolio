import React, { useState } from 'react';
import { Printer, Copy, Check, FileDown, ExternalLink } from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCES,
  PROJECTS,
  TECHNICAL_SKILLS,
} from '../data/portfolio';

export const CVView: React.FC = () => {
  const [copiedText, setCopiedText] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextCV = () => {
    return `${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.email} | ${PERSONAL_INFO.affiliation} | West Lafayette, IN
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

============================================================
EDUCATION
============================================================
${EDUCATION_DATA.institution}, ${EDUCATION_DATA.location}
- ${EDUCATION_DATA.degrees[0]}
- ${EDUCATION_DATA.degrees[1]}
- Minor: ${EDUCATION_DATA.minor}
- Relevant Coursework: ${EDUCATION_DATA.coursework.join(', ')}

============================================================
RESEARCH EXPERIENCE
============================================================
Purdue CLAN Labs — Machine Learning Research Assistant
July 2026 – Present | West Lafayette, IN
* Developing machine learning systems for EEG-based seizure forecasting using the CHB-MIT Scalp EEG dataset.
* Building leakage-safe preprocessing pipelines for 23-channel EEG data.
* Preparing datasets and benchmarking baseline classification models for preictal vs interictal prediction.

============================================================
PROFESSIONAL EXPERIENCE
============================================================
PULSE — Cloud Engineering Intern
May 2026 – August 2026 | West Lafayette, IN
* Built an end-to-end cloud data pipeline using Terraform and Google Cloud infrastructure.
* Provisioned BigQuery, Cloud Storage, Artifact Registry, Cloud Run, and Cloud Scheduler for automated ingestion and processing.

ALTCloud.ai — Software Engineering Intern
December 2025 – May 2026 | Remote
* Developed Python and FastAPI backend services for an AI-powered cloud migration platform serving 5+ enterprise customers.
* Built an extensible RVTools parser mapping spreadsheet schemas to validated Pydantic models.

Purdue University — Course Teaching Assistant
January 2026 – August 2026 | West Lafayette, IN
* Supported 50+ students in Python, NumPy, Pandas, and Matplotlib; led lab debugging sessions.

Tippecanoe Legal Aid Center — Software / Automation Project Lead
Fall 2025 | Lafayette, IN
* Built an automated intake application processing system to eliminate manual data entry.

============================================================
SELECTED PROJECTS
============================================================
* StyleGAN Face Detector: ResNet-50 classifier distinguishing real photos from StyleGAN-generated faces (94.69% accuracy on 20k locked test set, 95.995% ROC-AUC, CIE Lab fairness audit).
* EEG Seizure Forecasting: Multi-channel physiological time-series ML pipelines.

============================================================
TECHNICAL SKILLS
============================================================
${TECHNICAL_SKILLS.map((s) => `${s.category}: ${s.skills}`).join('\n')}
`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainTextCV());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatePlainTextCV()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Shloka_Kandukuri_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-2xl">
      {/* Interactive Controls Bar (Hidden during print) */}
      <div className="no-print mb-8">
        <h1 className="font-serif text-[30px] sm:text-[34px] md:text-[38px] font-medium text-[#222222] mb-3 tracking-tight">
          Resume
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed mb-6">
          A comprehensive record of my academic coursework, research appointments, engineering experience, and technical proficiencies.
        </p>

        <div className="bg-[#FAFAF8] p-4 sm:p-5 border border-[#E5E5E2] rounded-sm flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px] text-[#555555]">
            <span className="font-medium text-[#222222]">Print or Export</span>
            <p className="text-[12px] text-[#777777] mb-0 mt-0.5">
              Formatted with custom print CSS for clean 2-page PDF export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium bg-[#222222] text-[#FFFFFF] rounded-sm hover:bg-[#383838] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium bg-[#FFFFFF] border border-[#D5D5D2] text-[#333333] rounded-sm hover:bg-[#F5F5F3] transition-colors cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium bg-[#FFFFFF] border border-[#D5D5D2] text-[#333333] rounded-sm hover:bg-[#F5F5F3] transition-colors cursor-pointer"
              title="Download Plain Text Resume"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>.TXT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Formatted CV Document (Beautiful both on screen and when printed) */}
      <div className="cv-document bg-[#FFFFFF] print:p-0 print:border-0 border border-[#E5E5E2] p-6 sm:p-10 rounded-sm shadow-xs print:shadow-none space-y-7 sm:space-y-8 text-[14px] leading-relaxed">
        {/* CV Header */}
        <div className="border-b border-[#222222] pb-4">
          <h2 className="font-serif text-[26px] sm:text-[30px] font-semibold text-[#222222] tracking-tight">
            {PERSONAL_INFO.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#555555] mt-1.5 font-mono">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#245B8F] hover:underline">
              {PERSONAL_INFO.email}
            </a>
            <span aria-hidden="true" className="text-[#CCCCCC]">·</span>
            <span>{PERSONAL_INFO.affiliation}</span>
            <span aria-hidden="true" className="text-[#CCCCCC]">·</span>
            <span>West Lafayette, IN</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#666666] mt-1 font-mono">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-[#245B8F]">
              github.com/shlokakandukuri
            </a>
            <span aria-hidden="true" className="text-[#CCCCCC]">·</span>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#245B8F]">
              linkedin.com/in/shlokakandukuri
            </a>
          </div>
        </div>

        {/* Education Section */}
        <section className="print-break-inside-avoid">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#222222] border-b border-[#E5E5E2] pb-1 mb-2.5">
            Education
          </h3>
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
              <span className="font-bold text-[#222222] text-[15px]">{EDUCATION_DATA.institution}</span>
              <span className="text-[12px] font-mono text-[#666666]">{EDUCATION_DATA.location}</span>
            </div>
            <div className="text-[13.5px] text-[#444444] mt-0.5 space-y-0.5">
              <p className="mb-0">
                <strong>Bachelor of Science</strong> in Computer Science and Artificial Intelligence (Expected May 2027)
              </p>
              <p className="mb-0">
                <strong>Master of Science</strong> in Computer Science (Expected May 2028)
              </p>
              <p className="mb-0 text-[#666666]">Minor in Philosophy</p>
            </div>
            <div className="mt-2 text-[12.5px] text-[#555555]">
              <span className="font-medium text-[#333333]">Relevant Coursework:</span>{' '}
              {EDUCATION_DATA.coursework.join(', ')}
            </div>
          </div>
        </section>

        {/* Research Experience */}
        <section className="print-break-inside-avoid">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#222222] border-b border-[#E5E5E2] pb-1 mb-2.5">
            Research Appointments
          </h3>
          <div className="space-y-3.5">
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <span className="font-bold text-[#222222]">Purdue CLAN Labs</span>
                <span className="text-[12px] font-mono text-[#666666]">July 2026 – Present</span>
              </div>
              <div className="italic text-[#555555] text-[13px] mb-1.5">Machine Learning Research Assistant · West Lafayette, IN</div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-[#333333]">
                <li>Developing machine learning systems for real-time epileptic seizure forecasting using the CHB-MIT Scalp EEG dataset.</li>
                <li>Building leakage-safe preprocessing pipelines for 23-channel EEG data to ensure rigorous causal cross-validation.</li>
                <li>Preparing datasets and benchmarking baseline classification models for preictal versus interictal prediction.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Professional & Industry Experience */}
        <section className="print-break-inside-avoid">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#222222] border-b border-[#E5E5E2] pb-1 mb-2.5">
            Professional Experience
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <span className="font-bold text-[#222222]">PULSE</span>
                <span className="text-[12px] font-mono text-[#666666]">May 2026 – August 2026</span>
              </div>
              <div className="italic text-[#555555] text-[13px] mb-1.5">Cloud Engineering Intern · West Lafayette, IN</div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-[#333333]">
                <li>Built an end-to-end cloud data pipeline using Terraform and Google Cloud infrastructure.</li>
                <li>Provisioned BigQuery, Cloud Storage, Artifact Registry, Cloud Run, and Cloud Scheduler for automated ingestion and processing.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <span className="font-bold text-[#222222]">ALTCloud.ai</span>
                <span className="text-[12px] font-mono text-[#666666]">December 2025 – May 2026</span>
              </div>
              <div className="italic text-[#555555] text-[13px] mb-1.5">Software Engineering Intern · Remote</div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-[#333333]">
                <li>Developed Python and FastAPI backend services for an AI-powered cloud migration platform serving five or more enterprise clients.</li>
                <li>Built an extensible RVTools parser dynamically mapping spreadsheet schemas and normalizing infrastructure data into validated Pydantic models.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <span className="font-bold text-[#222222]">Purdue University</span>
                <span className="text-[12px] font-mono text-[#666666]">January 2026 – August 2026</span>
              </div>
              <div className="italic text-[#555555] text-[13px] mb-1.5">Course Teaching Assistant · West Lafayette, IN</div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-[#333333]">
                <li>Mentored and supported 50+ students in computational problem solving with Python, NumPy, Pandas, and Matplotlib.</li>
                <li>Facilitated laboratory troubleshooting and held instructional review sessions.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                <span className="font-bold text-[#222222]">Tippecanoe Legal Aid Center</span>
                <span className="text-[12px] font-mono text-[#666666]">Fall 2025</span>
              </div>
              <div className="italic text-[#555555] text-[13px] mb-1.5">Software / Automation Project · Lafayette, IN</div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-[#333333]">
                <li>Built an automated system to process legal aid applications, eliminating manual transcription bottlenecks for caseworkers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="print-break-inside-avoid">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#222222] border-b border-[#E5E5E2] pb-1 mb-2.5">
            Selected Engineering Projects
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#222222]">StyleGAN Face Detector</span>
                <span className="text-[12px] font-mono text-[#666666]">PyTorch, ResNet-50</span>
              </div>
              <p className="text-[13px] text-[#333333] mb-0 mt-0.5">
                Developed a deep convolutional classifier distinguishing authentic portrait photography from StyleGAN synthetic faces. Achieved 94.69% test accuracy on locked 20,000-image evaluation set and 95.995% ROC-AUC; audited demographic fairness across phenotypic features using CIE Lab space.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[#222222]">EEG Seizure Forecasting</span>
                <span className="text-[12px] font-mono text-[#666666]">Python, scikit-learn, MNE</span>
              </div>
              <p className="text-[13px] text-[#333333] mb-0 mt-0.5">
                Constructed causal signal preprocessing pipelines on CHB-MIT Scalp EEG dataset for preictal classification; benchmarked baseline algorithms to establish performance baselines.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="print-break-inside-avoid">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#222222] border-b border-[#E5E5E2] pb-1 mb-2.5">
            Technical Skills
          </h3>
          <div className="space-y-1 text-[13px] text-[#333333]">
            {TECHNICAL_SKILLS.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-semibold text-[#222222]">{item.category}:</span>
                <span className="font-mono text-[12px] text-[#444444]">{item.skills}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export const ResumeView = CVView;
