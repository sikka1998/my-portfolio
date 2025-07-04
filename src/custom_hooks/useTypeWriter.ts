import { useEffect, useState } from "react";

export function useTypewriter(
  lines: string[],
  speed = 100,
  pause = 2000
) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      // All lines typed – wait and restart
      const restart = setTimeout(() => {
        setText("");
        setLineIndex(0);
        setCharIndex(0);
      }, pause);
      return () => clearTimeout(restart);
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    // Finished typing current line
    if (charIndex === currentLine.length && lineIndex < lines.length-1) {
      const lineBreak = setTimeout(() => {
        setText((prev) => prev + "\n");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(lineBreak);
    }else{
        const lineBreak = setTimeout(() => {
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(lineBreak);
    }
  }, [charIndex, lineIndex, lines, speed, pause]);

  return text;
}
