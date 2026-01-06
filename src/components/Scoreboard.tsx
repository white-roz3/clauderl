import React, { useEffect, useState } from "react";

interface ScoreboardProps {
  onGoalScored?: (goalText: string) => void;
}

export default function Scoreboard({ onGoalScored }: ScoreboardProps) {
  const [blueScore, setBlueScore] = useState(0);
  const [purpleScore, setPurpleScore] = useState(0);
  const [lastGoal, setLastGoal] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      console.log("Scoreboard received message:", event.data, typeof event.data);
      
      // Optional: restrict origin check for security
      // if (event.origin !== "http://localhost:3000") return;
      
      // Handle Unity log format: {type: 'unity-log', text: 'GOAL|Blue'}
      if (event.data && typeof event.data === 'object' && event.data.type === 'unity-log') {
        const text = event.data.text;
        if (typeof text === 'string' && text.startsWith("GOAL|")) {
          const team = text.split("|")[1];
          console.log("⚽ Goal detected:", team);

          if (team === "Blue") {
            setBlueScore((prev) => prev + 1);
            setLastGoal("ChatGPT scores!");
            onGoalScored?.("ChatGPT scores!");
          }
          if (team === "Purple") {
            setPurpleScore((prev) => prev + 1);
            setLastGoal("GROK scores!");
            onGoalScored?.("GROK scores!");
          }
        }
      }
      
      // Handle direct string format: "GOAL|Blue"
      if (typeof event.data === "string" && event.data.startsWith("GOAL|")) {
        const team = event.data.split("|")[1];
        console.log("⚽ Goal detected:", team);

        if (team === "Blue") {
          setBlueScore((prev) => prev + 1);
          setLastGoal("ChatGPT scores!");
          onGoalScored?.("ChatGPT scores!");
        }
        if (team === "Purple") {
          setPurpleScore((prev) => prev + 1);
          setLastGoal("GROK scores!");
          onGoalScored?.("GROK scores!");
        }
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold font-mono">
        <span className="text-[#0066CC]">ChatGPT</span>
        <span className="text-gray-600 mx-4">{blueScore}:{purpleScore}</span>
        <span className="text-[#8B5CF6]">GROK</span>
      </div>
    </div>
  );
}
