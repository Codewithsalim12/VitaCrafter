"use client";

import React from "react";
import Image from "next/image";
import type { ResumeData } from "./types";
import {
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Home,
} from "lucide-react";
import type { TemplateId } from "./templates";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  id?: string;
  className?: string;
}

export function ResumePreview({
  data,
  templateId = "classic",
  id = "resume-preview",
  className,
}: ResumePreviewProps) {
  const {
    personalInfo,
    professionalSummary,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
  } = data;

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!skill.category || !skill.name) return acc;
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const styles = {
    classic: {
      container:
        "w-[210mm] min-h-[297mm] mx-auto p-8 bg-white shadow-lg text-black font-[Georgia] text-sm leading-normal",
      header: "text-left mb-2",
      name: "text-3xl font-bold tracking-normal",
      address: "text-xs mt-1",
      sectionTitle:
        "text-xs font-bold tracking-widest border-b border-black pb-1 mb-0 uppercase",
      jobTitle: "text-sm",
      jobCompany: "text-sm font-bold",
      section: "mb-2",
      contactLink: "inline-flex items-center gap-4 text-xs",
    },
    modern: {
      container:
        "w-[210mm] min-h-[297mm] mx-auto p-6 bg-white shadow-lg text-slate-800 font-['PT_Sans'] text-base leading-relaxed",
      header: "text-left mb-4",
      name: "text-3xl font-bold font-headline text-primary",
      address: "text-sm text-slate-600 mt-1 mb-3",
      sectionTitle:
        "text-sm font-bold tracking-wider text-slate-800 pb-1 mb-3 uppercase border-b-2 border-slate-200",
      jobTitle: "text-md",
      jobCompany: "text-md font-bold",
      section: "mb-4",
      contactLink:
        "text-sm text-slate-600 hover:text-primary flex items-center gap-2",
    },
    creative: {
      container:
        "w-[210mm] min-h-[297mm] mx-auto p-8 bg-white shadow-lg text-slate-700 font-['Garamond'] text-base leading-relaxed",
      header: "text-center mb-6",
      name: "text-4xl font-thin tracking-widest text-slate-800 uppercase",
      address: "text-sm text-slate-500 mt-2 mb-4",
      sectionTitle:
        "text-md font-semibold tracking-widest text-primary border-b border-primary/50 pb-2 mb-4 text-center",
      jobTitle: "text-md italic text-slate-600",
      jobCompany: "text-md font-bold text-slate-800",
      section: "mb-5",
      contactLink:
        "inline-flex items-center gap-2 text-sm text-slate-600 hover:text-accent mx-2",
    },
    photo: {
      container:
        "w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg text-slate-800 font-['PT_Sans'] text-base leading-relaxed flex",
      sidebar: "w-1/3 bg-slate-100 p-8 flex flex-col",
      mainContent: "w-2/3 p-8",
      photo:
        "w-36 h-36 rounded-full object-cover border-4 border-white shadow-md mx-auto",
      header: "text-center mb-6",
      name: "text-2xl font-bold font-headline text-slate-900 mt-4",
      address: "text-sm text-slate-600 mt-2",
      sectionTitle:
        "text-sm font-bold tracking-wider text-slate-800 pb-1 mb-3 uppercase border-b-2 border-slate-200",
      section: "mb-4",
      jobTitle: "text-md",
      jobCompany: "text-md font-bold",
      contactLink:
        "text-sm text-slate-600 hover:text-primary flex items-center gap-2",
    },
  };

  const selectedStyle: (typeof styles)[TemplateId] =
    styles[templateId] || styles.classic;

  type ContactItem = {
    text: string;
    href: string;
  };

  const renderContactInfo = () => {
    const contactItems: (ContactItem | undefined | false | null)[] = [
      personalInfo.email
        ? {
            text: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
          }
        : null,
      personalInfo.phone
        ? {
            text: personalInfo.phone,
            href: `tel:${personalInfo.phone}`,
          }
        : null,
      personalInfo.address
        ? {
            text: personalInfo.address,
            href: "#",
          }
        : null,
      personalInfo.linkedin
        ? {
            text: "LinkedIn",
            href: personalInfo.linkedin,
          }
        : null,
      personalInfo.github
        ? {
            text: "GitHub",
            href: personalInfo.github,
          }
        : null,
      personalInfo.website
        ? {
            text: "Portfolio",
            href: personalInfo.website,
          }
        : null,
    ];

    const validContactItems = contactItems.filter(
      (item): item is ContactItem => !!item
    );

    return (
      <div className={`${selectedStyle.address} flex items-center gap-x-2`}>
        {validContactItems.map((item, index) => (
          <React.Fragment key={index}>
            <a
              href={item.href}
              data-pdf-link={item.text !== personalInfo.address}
              target={item.text !== personalInfo.address ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={selectedStyle.contactLink}
            >
              <span>{item.text}</span>
            </a>
            {index < validContactItems.length - 1 && (
              <span className="text-gray-400">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderDescription = (description: string) => (
    <ul className="mt-1 space-y-1 list-disc pl-5 text-sm">
      {description
        .split("\n")
        .filter((line) => line.trim())
        .map((line, i) => (
          <li key={i}>{line}</li>
        ))}
    </ul>
  );

  const renderExperience = () => {
    if (!experience || experience.length === 0) return null;

    if (templateId === "classic") {
      return experience.map((exp, index) => (
        <div
          key={exp.id}
          className={index === experience.length - 1 ? "mb-0" : "mb-2"}
        >
          <div className="flex justify-between items-baseline">
            <h3 className={`${selectedStyle.jobCompany}`}>{exp.company}</h3>
            <p className="text-sm font-semibold pl-4 text-right">{`${exp.startDate} - ${exp.endDate}`}</p>
          </div>
          <p className={`${selectedStyle.jobTitle} mt-0`}>{exp.role}</p>
          {exp.description && renderDescription(exp.description)}
        </div>
      ));
    }
    return experience.map((exp, index) => (
      <div
        key={exp.id}
        className={`relative ${
          index === experience.length - 1 ? "mb-0" : "mb-2"
        }`}
      >
        <div
          className="text-right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "150px",
          }}
        >
          <p className="text-sm font-semibold">{`${exp.startDate} - ${exp.endDate}`}</p>
        </div>
        <div style={{ marginRight: "160px" }}>
          <h3 className={`${selectedStyle.jobCompany}`}>{exp.company}</h3>
          <p className={`${selectedStyle.jobTitle} mt-0`}>{exp.role}</p>
          {exp.description && renderDescription(exp.description)}
        </div>
      </div>
    ));
  };

  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    if (templateId === "classic") {
      return education.map((edu, index) => (
        <div
          key={edu.id}
          className={index === education.length - 1 ? "mb-0" : "mb-2"}
        >
          <div className="flex justify-between items-baseline">
            <h3 className={`${selectedStyle.jobCompany} mb-1`}>
              {edu.institution}
            </h3>
            <p className="text-sm font-semibold pl-4 text-right">{`${edu.startDate} - ${edu.endDate}`}</p>
          </div>
          <div className="flex justify-between items-baseline">
            <p className={`${selectedStyle.jobTitle} mt-0`}>{edu.degree}</p>
            {edu.gpa && (
              <p className="text-sm text-gray-600 mt-1 pl-4">GPA: {edu.gpa}</p>
            )}
          </div>
        </div>
      ));
    }
    return education.map((edu, index) => (
      <div
        key={edu.id}
        className={`relative ${
          index === education.length - 1 ? "mb-0" : "mb-2"
        }`}
      >
        <div
          className="text-right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "150px",
          }}
        >
          <p className="text-sm font-semibold">{`${edu.startDate} - ${edu.endDate}`}</p>
          {edu.gpa && <p className="text-sm text-gray-600 mt-1">{edu.gpa}</p>}
        </div>
        <div style={{ marginRight: "160px" }}>
          <h3 className={`${selectedStyle.jobCompany} mb-1`}>
            {edu.institution}
          </h3>
          <p className={`${selectedStyle.jobTitle} mt-0`}>{edu.degree}</p>
        </div>
      </div>
    ));
  };

  if (templateId === "photo") {
    // Photo template specific layout
    const photoStyle = styles.photo;
    return (
      <div id={id} className={photoStyle.container} data-pdf-container="true">
        {/* Sidebar */}
        <aside className={photoStyle.sidebar}>
          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              alt={personalInfo.name || "Profile photo"}
              width={144}
              height={144}
              className={photoStyle.photo}
              unoptimized
              priority
            />
          )}
          <div className={photoStyle.header}>
            <h1 className={photoStyle.name}>{personalInfo.name}</h1>
          </div>
          <div className="text-left w-full">
            <section className={photoStyle.section}>
              <h2 className={photoStyle.sectionTitle}>Contact</h2>
              <div className="space-y-2 mt-2">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={photoStyle.contactLink}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className={photoStyle.contactLink}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{personalInfo.phone}</span>
                  </a>
                )}
                {personalInfo.address && (
                  <p className={photoStyle.contactLink}>
                    <Home className="w-4 h-4" />
                    <span>{personalInfo.address}</span>
                  </p>
                )}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={photoStyle.contactLink}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={photoStyle.contactLink}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={photoStyle.contactLink}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </section>
            {skills?.length > 0 && (
              <section className={photoStyle.section}>
                <h2 className={photoStyle.sectionTitle}>Skills</h2>
                <div className="space-y-2 mt-2">
                  {Object.entries(groupedSkills).map(
                    ([category, skillsList]) => (
                      <div key={category} className="text-sm">
                        <h3 className="font-bold mb-1">{category}</h3>
                        <ul className="list-disc pl-4 space-y-1">
                          {skillsList.map((skill, i) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
          </div>
        </aside>
        {/* Main Content */}
        <main className={photoStyle.mainContent}>
          {professionalSummary && (
            <section className={photoStyle.section}>
              <h2 className={photoStyle.sectionTitle}>Professional Summary</h2>
              <p className="text-sm">{professionalSummary}</p>
            </section>
          )}
          {experience?.length > 0 && (
            <section className={photoStyle.section}>
              <h2 className={photoStyle.sectionTitle}>Experience</h2>
              {renderExperience()}
            </section>
          )}
          {education?.length > 0 && (
            <section className={photoStyle.section}>
              <h2 className={photoStyle.sectionTitle}>Education</h2>
              {renderEducation()}
            </section>
          )}
          {projects?.length > 0 && (
            <section className={photoStyle.section}>
              <h2 className={photoStyle.sectionTitle}>Projects</h2>
              {projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className={`relative ${
                    index === projects.length - 1 ? "mb-0" : "mb-2"
                  }`}
                >
                  <h3 className={photoStyle.jobCompany}>
                    <span>{proj.name}</span>
                    {proj.url && (
                      <a
                        href={proj.url}
                        data-pdf-link="true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:underline align-middle"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  {proj.description && renderDescription(proj.description)}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    );
  }

  // Layout for Classic, Modern, Creative templates
  return (
    <>
      <div
        id={id}
        className={`${selectedStyle.container} ${className}`}
        data-pdf-container="true"
      >
        <header className={selectedStyle.header}>
          <h1 className={selectedStyle.name}>{personalInfo.name}</h1>
          {renderContactInfo()}
        </header>

        <main className="mt-4">
          {professionalSummary && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>
                Professional Summary
              </h2>
              <p className="text-sm">{professionalSummary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Experience</h2>
              {renderExperience()}
            </section>
          )}

          {education?.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Education</h2>
              {renderEducation()}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Projects</h2>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={index === projects.length - 1 ? "mb-0" : "mb-2"}
                >
                  <h3 className={selectedStyle.jobCompany}>
                    <span>{project.name}</span>
                    {project.url && (
                      <a
                        href={project.url}
                        data-pdf-link="true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:underline align-middle"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  {project.description &&
                    renderDescription(project.description)}
                </div>
              ))}
            </section>
          )}

          {skills?.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Skills</h2>
              <div className="mt-1 space-y-1 text-sm">
                {Object.entries(groupedSkills).map(([category, skillsList]) => (
                  <div key={category}>
                    <span className="font-bold">{category}:</span>{" "}
                    <span>{skillsList.join(", ")}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications?.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Certifications</h2>
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className={
                    index === certifications.length - 1 ? "mb-0" : "mb-2"
                  }
                >
                  <p className="font-semibold">{cert.name}</p>
                  {cert.description && renderDescription(cert.description)}
                </div>
              ))}
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className={selectedStyle.section}>
              <h2 className={selectedStyle.sectionTitle}>Languages</h2>
              <ul className="mt-1 space-y-1 list-disc pl-5 text-sm">
                {languages.map((lang) => (
                  <li key={lang.id}>
                    {lang.name} ({lang.level})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
