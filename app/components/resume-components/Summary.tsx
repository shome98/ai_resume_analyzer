import React from 'react'
import ScoreGauge from './ScoreGauge';
import Category from './Category';
interface FeedbackProps{
    feedback: Feedback;
}
const Summary:React.FC<FeedbackProps> = ({feedback}) => {
    return (
      <section className="summary-section">
        <div className="flex flex-row items-center gap-8">
          <ScoreGauge score={feedback.overallScore} />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Your Resume Score</h2>
            <p className="text-sm text-gray-500">
              This score is calculated based on the variables listed below.
            </p>
          </div>
        </div>
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </section>
    );
}

export default Summary