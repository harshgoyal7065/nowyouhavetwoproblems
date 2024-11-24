import { Button } from "@/components/ui/button";
import { Code, FileText, Hash, Menu, User, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-purple-600" />
            <span className="ml-2 font-mono text-lg font-bold text-purple-800">
              NowYouHaveTwoProblems
            </span>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-800"
            >
              <Hash className="h-4 w-4 mr-2" />
              Common Patterns
            </Button>
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-800"
            >
              <FileText className="h-4 w-4 mr-2" />
              Cheatsheet
            </Button>
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-800"
            >
              <User className="h-4 w-4 mr-2" />
              Community Patterns
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-purple-200 py-4 px-4 space-y-2">
          <Button variant="ghost" className="w-full text-left text-purple-600">
            <Hash className="h-4 w-4 mr-2" />
            Common Patterns
          </Button>
          <Button variant="ghost" className="w-full text-left text-purple-600">
            <FileText className="h-4 w-4 mr-2" />
            Cheatsheet
          </Button>
          <Button variant="ghost" className="w-full text-left text-purple-600">
            <User className="h-4 w-4 mr-2" />
            Community Patterns
          </Button>
        </div>
      )}
    </div>
  );
};
