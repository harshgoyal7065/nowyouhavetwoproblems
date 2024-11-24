import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Bug, Zap, Coffee, Brain } from "lucide-react";
import { Card } from "@/components/Card";
import { Header } from "./containers/Header";

const App = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [testStrings, setTestStrings] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [matches, setMatches] = useState<
    {
      matchString: string;
      matches: {
        match: string;
        index: number;
        length: number;
      }[];
    }[]
  >([]);

  const patternExplanations: Record<string, Record<string, string>> = {
    characters: {
      ".": "Matches any character except newline",
      "\\w": "Matches any word character (equivalent to [a-zA-Z0-9_])",
      "\\W": "Matches any non-word character",
      "\\d": "Matches any digit (equivalent to [0-9])",
      "\\D": "Matches any non-digit",
      "\\s": "Matches any whitespace character",
      "\\S": "Matches any non-whitespace character",
      "\\t": "Matches a tab character",
      "\\r": "Matches a carriage return",
      "\\n": "Matches a linefeed",
    },
    anchors: {
      "^": "Matches the beginning of the string",
      $: "Matches the end of the string",
      "\\b": "Matches a word boundary",
      "\\B": "Matches a non-word boundary",
    },
    quantifiers: {
      "*": "Matches 0 or more times",
      "+": "Matches 1 or more times",
      "?": "Matches 0 or 1 time",
      "{n}": "Matches exactly n times",
      "{n,}": "Matches n or more times",
      "{n,m}": "Matches from n to m times",
    },
    groups: {
      "(...)": "Groups multiple tokens together and creates a capture group",
      "(?:...)":
        "Groups multiple tokens together without creating a capture group",
      "(?=...)": "Positive lookahead",
      "(?!...)": "Negative lookahead",
      "(?<=...)": "Positive lookbehind",
      "(?<!...)": "Negative lookbehind",
    },
    characterSets: {
      "[...]": "Matches any character in the set",
      "[^...]": "Matches any character not in the set",
      "[a-z]": "Matches any character in the range",
      "|": "Acts as an OR operator",
    },
  };

  const analyzePattern = (pattern: string) => {
    const explanations: Record<string, string>[] = [];

    // Analyze each category
    Object.entries(patternExplanations).forEach(([category, patterns]) => {
      Object.entries(patterns).forEach(([token, explanation]) => {
        if (pattern.includes(token)) {
          explanations.push({ category, token, explanation });
        }
      });
    });

    // Special analysis for character sets
    const customCharacterSets = pattern.match(/\[([^\]]+)\]/g);
    if (customCharacterSets) {
      customCharacterSets.forEach((set) => {
        explanations.push({
          category: "characterSets",
          token: set,
          explanation: `Matches any of: ${set.slice(1, -1)}`,
        });
      });
    }

    return explanations;
  };

  const testRegex = () => {
    if (!pattern) return;
    try {
      const regex = new RegExp(pattern, "g");
      const newMatches = testStrings.map((str) => {
        const matches = [...str.matchAll(regex)];
        return {
          matchString: str,
          matches: matches.map((m) => ({
            match: m[0],
            index: m.index,
            length: m[0].length,
          })),
        };
      });
      setMatches(newMatches);
      setError("");
    } catch (e: unknown) {
      setError((e as { message: string }).message);
    }
  };

  useEffect(() => {
    testRegex();
  }, [pattern, testStrings]);

  const addTestString = () => {
    if (testString.trim()) {
      setTestStrings([...testStrings, testString.trim()]);
      setTestString("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-purple-800 font-mono">
            Now You Have Two Problems
          </h1>
          <p className="text-gray-600 italic">
            "Some people, when confronted with a problem, think 'I know, I'll
            use regular expressions.'. Now they have 2 problems"
          </p>
        </div>

        <Card size="lg">
          <>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Bug className="text-purple-600" />
                <label className="text-lg font-medium text-purple-800">
                  Your Regular Expression:
                </label>
              </div>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono text-lg border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                placeholder="/your regex pattern/g"
              />
              {error && (
                <div className="flex items-center space-x-2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="text-purple-600" />
                  <h2 className="text-lg font-medium text-purple-800">
                    Pattern Breakdown
                  </h2>
                </div>
                <div className="space-y-4">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    Object.entries(patternExplanations).map(([category, _]) => {
                      const explanations = analyzePattern(pattern).filter(
                        (e) => e.category === category
                      );
                      if (explanations.length === 0) return null;

                      return (
                        <div key={category} className="space-y-2">
                          <h3 className="text-sm font-medium text-purple-600 uppercase">
                            {category}
                          </h3>
                          {explanations.map((e, i) => (
                            <div
                              key={i}
                              className="bg-white rounded-lg p-3 shadow-sm border border-purple-100"
                            >
                              <code className="text-purple-700 font-mono">
                                {e.token}
                              </code>
                              <p className="text-sm text-gray-600 mt-1">
                                {e.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Zap className="text-purple-600" />
                  <h2 className="text-lg font-medium text-purple-800">
                    Test Laboratory
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    className="font-mono border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    placeholder="Enter test string..."
                    onKeyPress={(e) => e.key === "Enter" && addTestString()}
                  />
                  <Button
                    onClick={addTestString}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>

                <div className="space-y-3">
                  {matches.map((result, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-3 shadow-sm border border-purple-100"
                    >
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {result.matchString.split("").map((char, i) => {
                          const match = result.matches.find(
                            (m) => i >= m.index && i < m.index + m.length
                          );
                          return (
                            <span
                              key={i}
                              className={
                                match
                                  ? "bg-yellow-200 text-purple-800"
                                  : "text-gray-600"
                              }
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {result.matches.length
                          ? `Found ${result.matches.length} match${
                              result.matches.length > 1 ? "es" : ""
                            }`
                          : "No matches"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </Card>
      </div>
    </div>
  );
};

export default App;
