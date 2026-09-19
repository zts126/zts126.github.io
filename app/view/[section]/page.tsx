/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";

type ProjectSlice = {
  src: string;
  width: number;
  height: number;
};

const buildPage = (
  section: "web" | "mobile" | "car" | "profile",
  page: number,
  sliceCount: number,
  lastSliceHeight: number,
): ProjectSlice[] =>
  Array.from({ length: sliceCount }, (_, index) => ({
    src: `/projects-hq/${section}/page-${String(page).padStart(2, "0")}-slice-${String(index + 1).padStart(3, "0")}.webp`,
    width: 2560,
    height: index === sliceCount - 1 ? lastSliceHeight : 6000,
  }));

const projects = {
  web: {
    title: "网页端作品",
    pages: [
      buildPage("web", 1, 13, 4386),
      buildPage("web", 2, 7, 111),
      buildPage("web", 3, 3, 3555),
    ],
  },
  mobile: {
    title: "移动端作品",
    pages: [buildPage("mobile", 1, 9, 1420), buildPage("mobile", 2, 6, 4231)],
  },
  car: {
    title: "车机端作品",
    pages: [buildPage("car", 1, 9, 5776)],
  },
  profile: {
    title: "张天粟个人简历",
    pages: [buildPage("profile", 1, 1, 3623)],
  },
} as const;

type ProjectKey = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((section) => ({ section }));
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!(section in projects)) notFound();

  const project = projects[section as ProjectKey];

  return (
    <main className="document-viewer-page">
      <article className="document-viewer" aria-label={project.title}>
        {project.pages.map((page, pageIndex) => (
          <section
            className="project-page"
            key={`${section}-${pageIndex + 1}`}
            aria-label={`${project.title}${project.pages.length > 1 ? ` ${pageIndex + 1}` : ""}`}
          >
            {page.map((slice, sliceIndex) => {
              const isFirst = pageIndex === 0 && sliceIndex === 0;

              return (
                <img
                  key={slice.src}
                  className="project-long-image"
                  src={slice.src}
                  width={slice.width}
                  height={slice.height}
                  loading={isFirst ? "eager" : "lazy"}
                  fetchPriority={isFirst ? "high" : "auto"}
                  decoding="async"
                  alt={sliceIndex === 0 ? `${project.title}${project.pages.length > 1 ? ` ${pageIndex + 1}` : ""}` : ""}
                />
              );
            })}
          </section>
        ))}
      </article>
    </main>
  );
}
