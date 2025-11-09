import { Course } from "@/types/disability";

export const sampleCourses: Course[] = [
  {
    id: "html-basics",
    language: "HTML",
    title: "HTML Fundamentals - ADHD Friendly",
    description: "Learn HTML step by step! Fun, short lessons designed just for you! 🎨✨",
    duration: "30 days",
    difficulty: "beginner",
    progress: 25,
    modules: Array.from({ length: 30 }, (_, i) => ({
      id: `html-day-${i + 1}`,
      day: i + 1,
      title: `Day ${i + 1}: ${getHTMLModuleTitle(i + 1)}`,
      description: getHTMLModuleDescription(i + 1),
      duration: "10-15 min",
      completed: i < 7,
      content: getHTMLModuleContent(i + 1),
    })),
  },
  {
    id: "javascript-basics",
    language: "JavaScript",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript with interactive lessons and real-world projects",
    duration: "30 days",
    difficulty: "beginner",
    progress: 15,
    modules: Array.from({ length: 30 }, (_, i) => ({
      id: `js-day-${i + 1}`,
      day: i + 1,
      title: `Day ${i + 1}: ${getJSModuleTitle(i + 1)}`,
      description: getJSModuleDescription(i + 1),
      duration: "15-20 min",
      completed: i < 4,
      content: getJSModuleContent(i + 1),
    })),
  },
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

function getHTMLModuleTitle(day: number): string {
  const titles = [
    "🌟 What is HTML?",
    "📝 Your First HTML File",
    "🎯 Let's Build Something!",
    "🏷️ Tags are Like Labels",
    "⚙️ Making Tags Do More",
    "🎨 Tag Challenge Time!",
    "📰 Big Headings, Small Headings",
    "📄 Writing Paragraphs",
    "✨ Your First Web Page!",
    "🔗 Links Take You Places",
    "🖼️ Adding Pictures",
    "🎪 Link & Image Fun!",
    "📋 Making Lists",
    "🔢 Numbered Lists",
    "🎁 List Master Challenge!",
    "📊 Tables are Organized",
    "📐 Building Tables",
    "🏆 Table Challenge!",
    "📝 Forms Ask Questions",
    "⌨️ Text Boxes & Buttons",
    "🎯 Form Fun Time!",
    "📦 Div: The Container Box",
    "🎨 Span: The Tiny Box",
    "🌟 Layout Challenge!",
    "🌈 Adding Colors",
    "💅 Making Things Pretty",
    "🎨 Style Your Page!",
    "🚀 Build Your Website - Part 1",
    "🎉 Build Your Website - Part 2",
    "🏆 You Did It! Celebration!",
  ];
  return titles[day - 1] || `Day ${day}`;
}

function getHTMLModuleDescription(day: number): string {
  const descriptions = [
    "Discover what HTML is and why it's awesome! 🎉",
    "Create your very first HTML file! You can do it! ✨",
    "Build something cool and see it work! 🚀",
    "Learn about tags - they're like labels for everything! 🏷️",
    "Make your tags do special things! So cool! ⚡",
    "Test your tag skills with a fun challenge! 🎮",
    "Make big, bold headings that stand out! 📰",
    "Write paragraphs that tell stories! 📖",
    "Create your first complete web page! Amazing! 🌟",
    "Add links that take you to fun places! 🔗",
    "Put pictures on your page! So colorful! 🖼️",
    "Combine links and images! Wow! 🎪",
    "Make lists of your favorite things! 📋",
    "Number your lists like a pro! 🔢",
    "Become a list master! You're awesome! 🎁",
    "Organize information in tables! 📊",
    "Build cool tables step by step! 📐",
    "Table challenge - you've got this! 🏆",
    "Create forms that ask questions! 📝",
    "Add text boxes and buttons! So fun! ⌨️",
    "Form fun time - let's play! 🎯",
    "Use div to organize your page! 📦",
    "Use span for tiny adjustments! 🎨",
    "Layout challenge - show your skills! 🌟",
    "Add colors to make it beautiful! 🌈",
    "Make everything look pretty! 💅",
    "Style your page like a pro! 🎨",
    "Build your own website - part 1! 🚀",
    "Finish your amazing website - part 2! 🎉",
    "Celebrate - you learned HTML! 🏆",
  ];
  return descriptions[day - 1] || `Day ${day} learning adventure!`;
}

function getHTMLModuleContent(day: number): string {
  // This is a placeholder function - the actual ADHD-friendly content would be extensive
  // For now, returning a basic structure that can be expanded
  const contentMap: Record<number, string> = {
    1: `# 🌟 Day 1: What is HTML?

## 🎯 Today's Goal
Learn what HTML is in a super fun way!

## 💡 What is HTML?
HTML stands for **HyperText Markup Language**.

Think of HTML like building blocks for websites! 🧱

Just like you use blocks to build a tower, you use HTML to build web pages!

## 🎨 Fun Example
When you visit a website, HTML tells the computer:
- What words to show 📝
- Where pictures go 🖼️
- How things look 🎨

## ✅ Quick Check
HTML helps build:
- ✅ Websites
- ✅ Web pages
- ✅ Cool online stuff!

**You're doing great! Keep going! 🎉**`,
    2: `# 📝 Day 2: Your First HTML File

## 🎯 Today's Goal
Create your very first HTML file!

## 🚀 Let's Start!
Every HTML file starts with special tags:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
\`\`\`

## 💡 What's Happening?
- \`<!DOCTYPE html>\` tells the computer "This is HTML!"
- \`<html>\` is like the main box
- \`<body>\` is where your content goes

## 🎨 Try It!
1. Create a file called \`myfirstpage.html\`
2. Copy the code above
3. Open it in a browser!

**You created your first web page! Amazing! 🌟**`,
    3: `# 🎯 Day 3: Let's Build Something!

## 🎯 Today's Goal
Build something cool you can see!

## 🎨 Mini Project
Let's make a page about your favorite animal!

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My Favorite Animal</title>
</head>
<body>
  <h1>I Love Dogs! 🐕</h1>
  <p>Dogs are so friendly and fun!</p>
</body>
</html>
\`\`\`

## ✅ Challenge Time!
1. Change "Dogs" to your favorite animal
2. Add a sentence about why you like it
3. Save and open in your browser!

## 🎉 You Did It!
You just built your first real web page!

**Keep going - you're awesome! ✨**`,
  };

  // Return content for specific days, or a default message
  if (contentMap[day]) {
    return contentMap[day];
  }

  // Default content structure for other days
  return `# ${getHTMLModuleTitle(day)}

## 🎯 Today's Goal
${getHTMLModuleDescription(day)}

## 💡 Let's Learn!

Welcome to Day ${day}! You're doing amazing! 

This lesson will teach you something new about HTML.

## 🎨 Practice Time

Try building something with what you learned!

## ✅ You're Awesome!

Keep learning, keep growing! 🚀

**Remember: You can do this! 💪**`;
}
