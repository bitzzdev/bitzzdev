import { getPublicRepos } from "@/lib/github";
import WorkGrid from "@/components/WorkGrid";

export default async function ProjectsSection() {
  const repos = await getPublicRepos();

  return (
    <section className="work" id="work">
      <div className="work-header">
        <div className="section-label">
          <span className="section-label-dot"></span>
          <span>Work</span>
        </div>
        <h2 className="section-title">Selected projects</h2>
      </div>
      <WorkGrid initialRepos={repos} />
    </section>
  );
}