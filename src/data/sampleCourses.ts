import { Course } from "@/types/disability";

export const sampleCourses: Course[] = [
  {
    id: "python-basics",
    language: "Python",
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with hands-on exercises",
    duration: "30 days",
    difficulty: "beginner",
    progress: 0,
    modules: Array.from({ length: 30 }, (_, i) => ({
      id: `python-day-${i + 1}`,
      day: i + 1,
      title: `Day ${i + 1}: ${getPythonModuleTitle(i + 1)}`,
      description: getPythonModuleDescription(i + 1),
      duration: "15-20 min",
      completed: false,
      content: getPythonModuleContent(i + 1),
    })),
  },
  {
    id: "javascript-basics",
    language: "JavaScript",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript with interactive lessons and real-world projects",
    duration: "30 days",
    difficulty: "beginner",
    progress: 0,
    modules: Array.from({ length: 30 }, (_, i) => ({
      id: `js-day-${i + 1}`,
      day: i + 1,
      title: `Day ${i + 1}: ${getJSModuleTitle(i + 1)}`,
      description: getJSModuleDescription(i + 1),
      duration: "15-20 min",
      completed: false,
      content: getJSModuleContent(i + 1),
    })),
  },
];

function getPythonModuleTitle(day: number): string {
  const titles = [
    "Introduction to Python",
    "Variables and Data Types",
    "Basic Operators",
    "Strings and Text",
    "Lists and Arrays",
    "Conditional Statements",
    "Loops and Iteration",
    "Functions Basics",
    "Function Parameters",
    "Return Values",
    "Dictionaries",
    "Sets and Tuples",
    "List Comprehensions",
    "File Operations",
    "Error Handling",
    "Classes Introduction",
    "Object-Oriented Programming",
    "Inheritance",
    "Modules and Packages",
    "Working with APIs",
    "JSON Data",
    "Regular Expressions",
    "Debugging Techniques",
    "Testing Your Code",
    "Virtual Environments",
    "Package Management",
    "Web Scraping Basics",
    "Data Analysis Intro",
    "Building a Project",
    "Course Review & Next Steps",
  ];
  return titles[day - 1] || `Module ${day}`;
}

function getPythonModuleDescription(day: number): string {
  return `Learn ${getPythonModuleTitle(day).toLowerCase()} with practical examples`;
}

function getPythonModuleContent(day: number): string {
  return `# ${getPythonModuleTitle(day)}\n\nWelcome to Day ${day} of your Python journey!\n\n## Learning Objectives\n- Understand key concepts\n- Practice with examples\n- Build mini-projects\n\n## Let's Get Started\n\nThis is a placeholder for the actual lesson content. In a real implementation, this would include:\n- Detailed explanations\n- Code examples\n- Interactive exercises\n- Quizzes\n- Practice problems`;
}

function getJSModuleTitle(day: number): string {
  const titles = [
    "JavaScript Basics",
    "Variables: let, const, var",
    "Data Types",
    "Operators",
    "Conditional Logic",
    "Loops",
    "Functions",
    "Arrow Functions",
    "Arrays",
    "Array Methods",
    "Objects",
    "Object Methods",
    "DOM Manipulation",
    "Event Listeners",
    "Forms and Input",
    "Async JavaScript",
    "Promises",
    "Async/Await",
    "Fetch API",
    "ES6 Features",
    "Destructuring",
    "Spread Operator",
    "Template Literals",
    "Modules",
    "Error Handling",
    "Local Storage",
    "JSON",
    "Building a Web App",
    "Project Work",
    "Review & Next Steps",
  ];
  return titles[day - 1] || `Module ${day}`;
}

function getJSModuleDescription(day: number): string {
  return `Master ${getJSModuleTitle(day).toLowerCase()} through hands-on practice`;
}

function getJSModuleContent(day: number): string {
  return `# ${getJSModuleTitle(day)}\n\nWelcome to Day ${day} of JavaScript!\n\n## Today's Focus\n- Core concepts\n- Practical examples\n- Hands-on coding\n\n## Content\n\nThis is a placeholder for lesson content. A complete implementation would include:\n- Step-by-step tutorials\n- Code snippets\n- Interactive challenges\n- Mini-projects\n- Assessment quizzes`;
}
