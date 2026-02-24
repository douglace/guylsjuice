"use client";

import { useState, useCallback } from "react";
import { quizQuestions, calculateProfile, type Profile } from "@/lib/calculator";
import QuestionStep from "./QuestionStep";
import ResultScreen from "./ResultScreen";
import ProgressIndicator from "./ProgressIndicator";

export default function CalculatorFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [direction, setDirection] = useState(1);

  const handleAnswer = useCallback(
    (scores: Record<string, number>) => {
      const newAnswers = [...answers, scores];
      setAnswers(newAnswers);

      if (step < quizQuestions.length - 1) {
        setDirection(1);
        setStep(step + 1);
      } else {
        setProfile(calculateProfile(newAnswers));
      }
    },
    [answers, step]
  );

  const reset = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setProfile(null);
    setDirection(-1);
  }, []);

  if (profile) {
    return <ResultScreen profile={profile} onReset={reset} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <ProgressIndicator current={step} total={quizQuestions.length} />
      <QuestionStep
        question={quizQuestions[step]}
        onAnswer={handleAnswer}
        direction={direction}
      />
    </div>
  );
}
