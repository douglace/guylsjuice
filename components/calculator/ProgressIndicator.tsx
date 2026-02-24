"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Question {current + 1}/{total}
        </span>
        <span className="text-sm font-semibold text-brand-green">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-green rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
