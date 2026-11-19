import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ExperienceView } from './components/ExperienceView';
import { CVView } from './components/CVView';
import { PROJECTS } from './data/portfolio';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('about');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  // Parse location hash on mount and hashchange for deep-linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash || hash === 'about') {
        setCurrentRoute('about');
        setSelectedProjectSlug(null);
      } else if (hash === 'projects') {
        setCurrentRoute('projects');
        setSelectedProjectSlug(null);
      } else if (hash.startsWith('projects/')) {
        const slug = hash.replace('projects/', '');
        const exists = PROJECTS.find((p) => p.slug === slug);
        if (exists) {
          setCurrentRoute(`project:${slug}`);
          setSelectedProjectSlug(slug);
        } else {
          setCurrentRoute('projects');
          setSelectedProjectSlug(null);
        }
      } else if (hash === 'experience') {
        setCurrentRoute('experience');
        setSelectedProjectSlug(null);
      } else if (hash === 'resume' || hash === 'cv') {
        setCurrentRoute('resume');
        setSelectedProjectSlug(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route: string) => {
    if (route === 'about') {
      window.location.hash = 'about';
      setCurrentRoute('about');
      setSelectedProjectSlug(null);
    } else if (route === 'projects') {
      window.location.hash = 'projects';
      setCurrentRoute('projects');
      setSelectedProjectSlug(null);
    } else if (route.startsWith('project:')) {
      const slug = route.replace('project:', '');
      window.location.hash = `projects/${slug}`;
      setCurrentRoute(route);
      setSelectedProjectSlug(slug);
    } else if (route === 'experience') {
      window.location.hash = 'experience';
      setCurrentRoute('experience');
      setSelectedProjectSlug(null);
    } else if (route === 'resume' || route === 'cv') {
      window.location.hash = 'resume';
      setCurrentRoute('resume');
      setSelectedProjectSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectProject = (slug: string) => {
    navigateTo(`project:${slug}`);
  };

  const currentProject = selectedProjectSlug
    ? PROJECTS.find((p) => p.slug === selectedProjectSlug)
    : null;

  return (
    <div className="min-h-screen flex flex-col justify-between pt-[38px] sm:pt-[48px] bg-[#FFFFFF] text-[#222222]">
      {/* 900px constrained academic container with generous padding */}
      <div className="w-full max-w-[900px] mx-auto px-5 sm:px-7 md:px-8 flex-1">
        <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

        <main className="min-h-[60vh]">
          {currentRoute === 'about' && (
            <HomeView
              onNavigate={navigateTo}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentRoute === 'projects' && (
            <ProjectsView onSelectProject={handleSelectProject} />
          )}

          {currentRoute.startsWith('project:') && currentProject && (
            <ProjectDetailView
              project={currentProject}
              onBack={() => navigateTo('projects')}
            />
          )}

          {currentRoute === 'experience' && <ExperienceView />}

          {(currentRoute === 'resume' || currentRoute === 'cv') && <CVView />}
        </main>
      </div>

      <Footer />
    </div>
  );
}
