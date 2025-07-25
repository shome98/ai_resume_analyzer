import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyse Your Resume" },
    { name: "description", content: "Get feedback on your resume!." },
  ];
}

export default function Home() {
  return (
    // need to change the bg as it is rounded on top side make it bit eye friendly
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
        <div className="page-heading">
          <h1>Track your Appliaction & Resume Ratings</h1>
          <h2>Review your submissions and receive AI-powered feedback.</h2>
        </div>
      </section>
    </main>
  );
}
