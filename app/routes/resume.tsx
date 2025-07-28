import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: "ResuAi | Review " },
  { name: "description", content: "Detailed overview of your resume" },
];
const resume = () => {
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const { auth, isLoading, fs, kv } = usePuterStore();

    const loadResume = async () => {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) return;

        const data = JSON.parse(resume);

        const resumeblob = await fs.read(data.resumePath);
        if (!resumeblob) return;

        //handle errors
        const pdfBlob = new Blob([resumeblob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) return;
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);

        setFeedback(data.feedback);
        console.log("url-", resumeUrl, "imageUrl-", imageUrl, "data-", data.feedback);
    }
    return (
      <main className="!pt-0">
        <nav className="resume-nav">
          <Link to="/" className="back-button">
            <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
            <span className="text-gray-800 text-sm font-semibold">
              Back to Homepage
            </span>
          </Link>
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
          <section className="feedback-section resume-pic-bg">
            {imageUrl && resumeUrl && (
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={imageUrl}
                    className="w-full h-full object-contain rounded-2xl"
                    title="resume"
                  />
                </a>
              </div>
            )}
          </section>
        </div>
        <div>
          resume {id}
          <button onClick={loadResume}>{"-"}get resume</button>
        </div>
      </main>
    );
}

export default resume