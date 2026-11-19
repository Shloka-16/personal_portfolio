import React from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
  ];

  return (
    <header className="no-print border-b border-[#E5E5E2] pb-4 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Brand Zone: Clean text wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
          }}
          className="font-serif text-[19px] sm:text-[21px] font-medium text-[#222222] hover:text-[#245B8F] transition-colors whitespace-nowrap tracking-tight"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Navigation & Action */}
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
          <nav className="flex items-center gap-5 sm:gap-7 text-[14px]">
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.id ||
                (link.id === 'projects' && currentRoute.startsWith('project:'));

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#245B8F]'
                      : 'text-[#666666] hover:text-[#222222]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#245B8F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick email affordance */}
          <button
            onClick={handleCopyEmail}
            title={`Copy ${PERSONAL_INFO.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-[#666666] hover:text-[#245B8F] transition-colors px-2 py-1 rounded cursor-pointer border border-transparent hover:border-[#E5E5E2] hover:bg-[#FAFAF8]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied Email</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
