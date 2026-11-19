import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`mb-4 sm:mb-5 ${className}`}>
      <h2 className="font-serif text-[21px] sm:text-[24px] md:text-[26px] font-medium text-[#222222] tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="text-[14px] text-[#666666] mt-1 mb-0">{subtitle}</p>
      )}
    </div>
  );
};
