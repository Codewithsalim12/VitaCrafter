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
  Briefcase,
  GraduationCap,
  Wrench,
  Laptop,
  Award,
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

  if (templateId === "elegant") {
    // Elegant Analyst template rendering (no styles.elegant reference)
    return (
      <div
        id={id}
        className="w-[210mm] min-h-[297mm] mx-auto p-10 bg-white shadow-lg text-black font-[Georgia] text-[15px] leading-normal relative"
        data-pdf-container="true"
      >
        {/* Top: Name, subtitle, photo */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-4xl font-headline font-light tracking-wide text-gray-700 leading-tight">
              <span className="text-gray-400">
                {personalInfo.name?.split(" ")[0]}
              </span>{" "}
              <span className="font-bold text-black">
                {personalInfo.name?.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            {/* Use professionalSummary as subtitle if role is not present */}
            {"role" in personalInfo && personalInfo.role ? (
              <div className="mt-1 mb-2">
                <span className="italic text-[17px] text-gray-400 underline cursor-pointer">
                  {personalInfo.role}
                </span>
              </div>
            ) : null}
            {professionalSummary && (
              <div className="text-[15px] text-gray-700 max-w-2xl mb-2">
                {professionalSummary}
              </div>
            )}
          </div>
          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              alt={personalInfo.name || "Profile photo"}
              width={120}
              height={120}
              className="rounded-full object-cover border-2 border-gray-300 shadow-md ml-4"
              unoptimized
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== "/default-avatar.png") {
                  target.src = "/default-avatar.png";
                }
              }}
            />
          )}
        </div>
        {/* Contact bar */}
        <div className="flex items-center gap-8 border-t border-b border-gray-400 py-2 mb-4 text-[15px]">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
        </div>
        {/* LANGUAGES */}
        <div className="mb-2">
          <div className="bg-gray-200 px-3 py-1 text-xs font-bold tracking-widest inline-block mb-2 uppercase text-gray-700">
            Languages
          </div>
          <div className="flex gap-8">
            {languages?.map((lang) => (
              <div
                key={lang.id}
                className="flex flex-col items-start min-w-[90px]"
              >
                <span className="text-[15px] text-gray-800 mb-1">
                  {lang.name}
                </span>
                <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={
                      lang.level === "Native" || lang.level === "Fluent"
                        ? "bg-gray-800 h-2 rounded-full w-full"
                        : lang.level === "Professional"
                        ? "bg-gray-800 h-2 rounded-full w-3/4"
                        : lang.level === "Intermediate"
                        ? "bg-gray-800 h-2 rounded-full w-1/2"
                        : "bg-gray-800 h-2 rounded-full w-1/4"
                    }
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* EDUCATION */}
        <div className="mb-2">
          <div className="bg-gray-200 px-3 py-1 text-xs font-bold tracking-widest inline-block mb-2 uppercase text-gray-700">
            Education
          </div>
          {education?.map((edu, idx) => (
            <div
              key={edu.id}
              className="flex items-baseline justify-between mb-1"
            >
              <div>
                <span className="font-bold text-[15px]">
                  {edu.startDate}-{edu.endDate}
                </span>{" "}
                <span className="text-gray-700">{edu.institution}</span>
              </div>
              <span className="text-[15px]">{edu.degree}</span>
            </div>
          ))}
        </div>
        {/* SKILLS */}
        <div className="mb-2">
          <div className="bg-gray-200 px-3 py-1 text-xs font-bold tracking-widest inline-block mb-2 uppercase text-gray-700">
            Skills
          </div>
          <div className="mb-1">
            <span className="font-bold">Hard:</span>{" "}
            {skills
              ?.filter((s) => s.category === "Hard")
              .map((s) => s.name)
              .join(", ")}
          </div>
          <div>
            <span className="font-bold">Soft:</span>{" "}
            {skills
              ?.filter((s) => s.category === "Soft")
              .map((s) => s.name)
              .join(", ")}
          </div>
        </div>
        {/* EXPERIENCE */}
        <div className="mb-2">
          <div className="bg-gray-200 px-3 py-1 text-xs font-bold tracking-widest inline-block mb-2 uppercase text-gray-700">
            Professional Experience
          </div>
          {experience?.map((exp, idx) => (
            <div key={exp.id} className="mb-2">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[15px]">
                  {exp.startDate} - {exp.endDate}
                </span>
                <span className="font-bold text-[15px] uppercase">
                  {exp.company}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-gray-500 text-[15px]">
                  {exp.location}
                </span>
                <span className="italic text-gray-400 text-[15px]">
                  {exp.role}
                </span>
              </div>
              <ul className="list-disc pl-6 text-[15px] text-gray-700 mt-1">
                {exp.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <div className="mb-2">
            <div className="bg-gray-200 px-3 py-1 text-xs font-bold tracking-widest inline-block mb-2 uppercase text-gray-700">
              Certifications
            </div>
            {certifications.map((cert, idx) => (
              <div key={cert.id} className="mb-1">
                <span className="font-bold text-[15px]">{cert.name}</span>
                {cert.description && (
                  <div className="text-[15px] text-gray-700 ml-2 inline">
                    {cert.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== "/default-avatar.png") {
                  target.src = "/default-avatar.png";
                }
              }}
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

  if (templateId === "modernIconic") {
    // Modern Iconic template rendering
    return (
      <div
        id={id}
        className="w-[210mm] h-[297mm] mx-auto p-8 bg-white shadow-lg text-black font-sans text-[15px] leading-tight relative flex flex-col gap-2"
        data-pdf-container="true"
      >
        {/* Top: Name, subtitle, contact row */}
        <div className="flex flex-col gap-1 mb-2">
          <h1 className="text-3xl font-headline font-bold text-gray-900 leading-tight">
            {personalInfo.name}
          </h1>
          {personalInfo.role && (
            <div className="text-base text-gray-700 font-medium mb-1">
              {personalInfo.role}
            </div>
          )}
          <div className="flex flex-wrap gap-4 items-center text-[14px] text-gray-700 mb-1">
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.twitter && (
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4" /> {personalInfo.twitter}
              </span>
            )}
          </div>
        </div>
        {/* Summary */}
        {professionalSummary && (
          <div className="text-[14px] text-gray-800 mb-2">
            {professionalSummary}
          </div>
        )}
        {/* Experience */}
        <div className="mb-2">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
            <Briefcase className="w-5 h-5 text-gray-700" /> Experience
          </div>
          {experience?.map((exp) => (
            <div key={exp.id} className="mb-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-[14px]">
                  {exp.startDate} - {exp.endDate}
                </span>
                <span className="font-bold text-[14px]">{exp.role}</span>
              </div>
              <div className="text-gray-700 text-[14px] font-semibold">
                {exp.company}
                {exp.location ? `, ${exp.location}` : ""}
              </div>
              <ul className="list-disc pl-6 text-[14px] text-gray-700 mt-1">
                {exp.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Education */}
        <div className="mb-2">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
            <GraduationCap className="w-5 h-5 text-gray-700" /> Education
          </div>
          {education?.map((edu) => (
            <div key={edu.id} className="mb-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-[14px]">
                  {edu.startDate} - {edu.endDate}
                </span>
                <span className="font-bold text-[14px]">{edu.degree}</span>
              </div>
              <div className="text-gray-700 text-[14px] font-semibold">
                {edu.institution}
              </div>
              {edu.gpa && (
                <div className="text-gray-600 text-[14px]">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
        {/* Skills */}
        <div className="mb-2">
          <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
            <Wrench className="w-5 h-5 text-gray-700" /> Skills
          </div>
          <div className="space-y-1">
            {skills?.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="font-semibold w-44 inline-block truncate">
                  {skill.name}
                </span>
                <div className="flex-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`inline-block w-4 h-2 rounded-sm ${
                        skill.level && skill.level >= lvl
                          ? "bg-gray-800"
                          : "bg-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Software */}
        {data.software && data.software.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
              <Laptop className="w-5 h-5 text-gray-700" /> Software
            </div>
            <div className="space-y-1">
              {data.software.map((sw) => (
                <div key={sw.id} className="flex items-center gap-2">
                  <span className="font-semibold w-44 inline-block truncate">
                    {sw.name}
                  </span>
                  <div className="flex-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className={`inline-block w-4 h-2 rounded-sm ${
                          sw.level && sw.level >= lvl
                            ? "bg-gray-800"
                            : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                  {sw.label && (
                    <span className="ml-2 text-xs text-gray-700 font-bold">
                      {sw.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
              <Globe className="w-5 h-5 text-gray-700" /> Languages
            </div>
            <div className="space-y-1">
              {languages.map((lang) => {
                let level = 2;
                if (lang.level === "Native" || lang.level === "Fluent")
                  level = 5;
                else if (lang.level === "Professional") level = 4;
                else if (lang.level === "Intermediate") level = 3;
                else if (lang.level === "Basic") level = 2;
                return (
                  <div key={lang.id} className="flex items-center gap-2">
                    <span className="font-semibold w-44 inline-block truncate">
                      {lang.name}
                    </span>
                    <div className="flex-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`inline-block w-4 h-2 rounded-sm ${
                            level >= lvl ? "bg-gray-800" : "bg-gray-300"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-700 font-bold">
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
              <Award className="w-5 h-5 text-gray-700" /> Certifications
            </div>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex flex-col">
                  <span className="font-semibold text-[14px]">{cert.name}</span>
                  {cert.description && (
                    <span className="text-[14px] text-gray-700 ml-2">
                      {cert.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (templateId === "redlineChrono") {
    return (
      <div
        id={id}
        className="w-[210mm] min-h-[297mm] mx-auto p-10 bg-white shadow-lg text-black font-serif text-[15px] leading-normal relative"
        data-pdf-container="true"
      >
        {/* Header: Name and Contact Bar */}
        <div className="mb-6 flex flex-row justify-end">
          <div className="flex flex-col items-end max-w-xl w-full">
            <h1 className="text-4xl font-extrabold tracking-wide text-black leading-tight uppercase text-right">
              <span>{personalInfo.name?.split(" ")[0]}</span>{" "}
              <span className="text-red-700">
                {personalInfo.name?.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <div className="mt-2 w-full h-8 flex items-center justify-end bg-black px-6">
              <div className="flex flex-col sm:flex-row sm:gap-6 text-white text-sm font-semibold text-right">
                {personalInfo.address && <span>{personalInfo.address}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.email && <span>{personalInfo.email}</span>}
              </div>
            </div>
          </div>
        </div>
        {/* Professional Summary */}
        {professionalSummary && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-1 border-b-2 border-red-700 pb-1">
              Professional Summary
            </div>
            <div className="text-[15px] text-black mt-2">
              {professionalSummary}
            </div>
          </div>
        )}
        {/* Work History */}
        {experience && experience.length > 0 && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-1 border-b-2 border-red-700 pb-1">
              Work History
            </div>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 px-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[16px]">{exp.role}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {exp.startDate} to {exp.endDate}
                  </span>
                </div>
                <div className="font-bold text-black">
                  {exp.company}
                  {exp.location ? (
                    <span className="font-normal text-gray-700">
                      {" "}
                      – {exp.location}
                    </span>
                  ) : null}
                </div>
                {exp.description && (
                  <ul className="list-disc pl-6 text-[15px] text-black mt-1">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-1 border-b-2 border-red-700 pb-1">
              Skills
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2 px-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center text-[15px]">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                  {skill.name}
                  {skill.level && (
                    <span className="ml-2 flex items-center">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`inline-block w-3 h-2 rounded-sm ml-0.5 ${
                            skill.level >= lvl ? "bg-black" : "bg-gray-300"
                          }`}
                        ></span>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-1 border-b-2 border-red-700 pb-1">
              Languages
            </div>
            <div className="flex flex-col gap-2 px-2">
              {languages.map((lang) => {
                let level = 2;
                if (lang.level === "Native" || lang.level === "Fluent")
                  level = 5;
                else if (lang.level === "Professional") level = 4;
                else if (lang.level === "Intermediate") level = 3;
                else if (lang.level === "Basic") level = 2;
                return (
                  <div key={lang.id} className="flex items-center gap-2">
                    <span className="font-semibold w-44 inline-block truncate">
                      {lang.name}
                    </span>
                    <div className="flex-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`inline-block w-4 h-2 rounded-sm ${
                            level >= lvl ? "bg-black" : "bg-gray-300"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-700 font-bold">
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-2">
            <div className="text-xl font-bold mb-1 border-b-2 border-red-700 pb-1">
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="mb-1 px-2">
                <div className="font-bold text-black">{edu.degree}</div>
                <div className="text-black">{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (templateId === "blueBannerConstruction") {
    return (
      <div
        id={id}
        className="w-[210mm] min-h-[297mm] mx-auto p-0 bg-white shadow-lg text-black font-sans text-[15px] leading-normal relative"
        data-pdf-container="true"
      >
        {/* Blue Banner Header */}
        <div className="w-full bg-blue-900 py-6 px-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-wide text-white leading-tight uppercase text-center">
            {personalInfo.name}
          </h1>
        </div>
        {/* Contact Bar */}
        <div className="w-full bg-blue-600 py-2 px-8 flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-6 justify-center items-center text-white text-base font-semibold">
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
        </div>
        {/* Professional Summary */}
        {professionalSummary && (
          <div className="px-10 py-6">
            <div className="text-lg font-bold mb-1 text-black uppercase">
              Professional Summary
            </div>
            <div className="text-[15px] text-black mt-2">
              {professionalSummary}
            </div>
          </div>
        )}
        {/* Work History */}
        {experience && experience.length > 0 && (
          <div className="px-10 py-4">
            <div className="text-lg font-bold mb-1 text-black uppercase">
              Work History
            </div>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[16px]">{exp.role}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="font-bold text-black">
                  {exp.company}
                  {exp.location ? (
                    <span className="font-normal text-gray-700">
                      {" "}
                      – {exp.location}
                    </span>
                  ) : null}
                </div>
                {exp.description && (
                  <ul className="list-disc pl-6 text-[15px] text-black mt-1">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="px-10 py-4">
            <div className="text-lg font-bold mb-1 text-black uppercase">
              Skills
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center text-[15px]">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Education */}
        {education && education.length > 0 && (
          <div className="px-10 py-4">
            <div className="text-lg font-bold mb-1 text-black uppercase">
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="mb-1">
                <div className="font-bold text-black">{edu.degree}</div>
                <div className="text-black">{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
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
