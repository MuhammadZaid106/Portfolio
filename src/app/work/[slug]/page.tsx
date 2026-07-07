import React from "react";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static site generation
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Case Study`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyTemplate project={project} />;
}
