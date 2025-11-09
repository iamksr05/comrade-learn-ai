import { Course } from "@/types/disability";

/**
 * CodeEase - 10-Day Dyslexia-Friendly HTML Programming Course
 * Designed specifically for people with dyslexia with:
 * - Short, spaced-out sentences
 * - Visual cues and icons
 * - Color-coded content
 * - Text-to-speech support
 * - Step-by-step learning
 */
export const createDyslexiaHTMLCourse = (): Course => {
  return {
    id: "codeease-html-dyslexia",
    language: "HTML",
    title: "CodeEase - HTML for Beginners (Dyslexia-Friendly)",
    description: "Learn HTML step-by-step with visual cues, audio support, and AI tutor help. Designed specifically for dyslexia-friendly learning! 🎯",
    duration: "10 days",
    difficulty: "beginner",
    progress: 0,
    modules: [
      {
        id: "day-1",
        day: 1,
        title: "Day 1: Introduction to Computers & Coding",
        description: "💡 What is coding? How computers understand instructions. Small interactive activity!",
        duration: "15-20 min",
        completed: false,
        content: getDay1Content(),
      },
      {
        id: "day-2",
        day: 2,
        title: "Day 2: Understanding What a Programming Language Is",
        description: "🧩 Visual explanation using blocks and code comparison. Learn about commands and syntax.",
        duration: "15-20 min",
        completed: false,
        content: getDay2Content(),
      },
      {
        id: "day-3",
        day: 3,
        title: "Day 3: Printing and Displaying Text",
        description: "📝 Learn print() command. Practice: print your favorite color, number, etc.",
        duration: "15-20 min",
        completed: false,
        content: getDay3Content(),
      },
      {
        id: "day-4",
        day: 4,
        title: "Day 4: Variables with Real-Life Examples",
        description: "📦 Compare to 'boxes that hold things'. Activities: store your name, age, favorite hobby.",
        duration: "15-20 min",
        completed: false,
        content: getDay4Content(),
      },
      {
        id: "day-5",
        day: 5,
        title: "Day 5: Numbers and Math in Code",
        description: "🔢 Simple addition, subtraction. Visual calculator game made with Python.",
        duration: "15-20 min",
        completed: false,
        content: getDay5Content(),
      },
      {
        id: "day-6",
        day: 6,
        title: "Day 6: Decision Making (If-Else)",
        description: "🤔 Simple examples like 'If it's raining, take an umbrella.' Interactive quiz with choices.",
        duration: "15-20 min",
        completed: false,
        content: getDay6Content(),
      },
      {
        id: "day-7",
        day: 7,
        title: "Day 7: Loops Made Simple",
        description: "🔄 Explain repetition using pictures (e.g., brushing teeth every day). Practice: repeat printing 'Hello' five times.",
        duration: "15-20 min",
        completed: false,
        content: getDay7Content(),
      },
      {
        id: "day-8",
        day: 8,
        title: "Day 8: Combining What You Learned",
        description: "🎯 Mini project: a simple chatbot that greets users.",
        duration: "20-25 min",
        completed: false,
        content: getDay8Content(),
      },
      {
        id: "day-9",
        day: 9,
        title: "Day 9: Understanding Errors",
        description: "💪 Teach them not to fear mistakes. Show examples of errors and fixes. AI explains errors in simple language.",
        duration: "15-20 min",
        completed: false,
        content: getDay9Content(),
      },
      {
        id: "day-10",
        day: 10,
        title: "Day 10: Final Project & Celebration",
        description: "🎉 Project: make a 'Fun Facts Generator.' AI helps step-by-step. Celebrate completion with certificate!",
        duration: "25-30 min",
        completed: false,
        content: getDay10Content(),
      },
    ],
  };
};

function getDay1Content(): string {
  return `# 🎯 Day 1: Introduction to Computers & Coding

## 💡 What is Coding?

Coding is like giving instructions to a computer.

Think of it like talking to a robot friend.

You tell the computer what to do.

The computer follows your instructions.

## 🖥️ How Computers Understand Instructions

Computers understand special languages.

These languages are like codes.

We write these codes using words and symbols.

The computer reads our code.

Then it does what we asked.

## 🎮 Small Interactive Activity

### Activity: "Make the computer say your name!"

Let's try this together:

1. Open a text editor
2. Type: print("Hello, My Name")
3. Replace "My Name" with YOUR name
4. Save the file
5. Run it!

**Example:**
\`\`\`
print("Hello, Sarah!")
\`\`\`

The computer will say: Hello, Sarah!

## 🧩 Visual Example

Imagine coding like this:

**You:** "Computer, say hello"
**Computer:** "Hello!"

**You:** "Computer, add 2 + 2"
**Computer:** "4"

## ✅ What You Learned Today

- ✅ Coding is giving instructions to computers
- ✅ Computers understand special languages
- ✅ We can make computers do things with code

## 🎧 Listen and Learn

Click the "Listen" button to hear this lesson read aloud.

## 🗣️ Talk to AI

Ask the AI tutor: "What is coding?"

The AI will explain it in a simple way just for you!

## 🏆 Your Progress

You completed Day 1! Great job!

⭐ You're doing amazing!

**Remember:** Take breaks when you need them. Learning should be fun!`;
}

function getDay2Content(): string {
  return `# 🧩 Day 2: Understanding What a Programming Language Is

## 🎯 Today's Goal

Learn what a programming language is.

See how it's like building blocks.

## 🧱 Programming Languages are Like Blocks

Think of programming like LEGO blocks.

Each block is a command.

You put blocks together to build something.

## 📊 Visual Explanation

### Blocks and Code Comparison

**Building Blocks:**
- Red block = Print something
- Blue block = Store information
- Green block = Make a decision

**Code:**
- print() = Print something
- variable = Store information
- if = Make a decision

## 🔤 What are Commands?

Commands are instructions.

They tell the computer what to do.

**Example commands:**
- print() - Show something
- input() - Ask for information
- if - Make a choice

## 📝 What is Syntax?

Syntax is like grammar for code.

It's the rules of writing code.

Just like sentences need periods.

Code needs proper syntax.

## 🎮 Try It Yourself

Let's compare:

**English:** "Say hello"
**Code:** print("hello")

See? They're similar!

## 💡 Real-Life Example

**English:** "If it's sunny, go outside"
**Code:** if sunny: go_outside()

Same idea, different language!

## ✅ What You Learned

- ✅ Programming languages use commands
- ✅ Commands are like building blocks
- ✅ Syntax is the grammar of code

## 🎧 Listen and Learn

Listen to this lesson for better understanding.

## 🗣️ Talk to AI

Ask: "What is a programming language?"

The AI will explain with examples!

## 🏆 Progress Update

Day 2 complete! You're learning so much!

⭐ Keep up the great work!`;
}

function getDay3Content(): string {
  return `# 📝 Day 3: Printing and Displaying Text

## 🎯 Today's Goal

Learn the print() command.

Practice printing different things.

## 📢 What is print()?

print() shows text on the screen.

It's like talking out loud.

But the computer writes it down.

## 🎨 Simple Example

\`\`\`
print("Hello!")
\`\`\`

This shows: Hello!

## 🌈 Practice Time

### Exercise 1: Print Your Favorite Color

\`\`\`
print("My favorite color is blue!")
\`\`\`

Try it with YOUR favorite color!

### Exercise 2: Print a Number

\`\`\`
print("My favorite number is 7")
\`\`\`

Change 7 to YOUR favorite number!

### Exercise 3: Print Multiple Things

\`\`\`
print("Hello")
print("World")
print("!")
\`\`\`

This prints three lines!

## 💡 Tips

- Use quotes around text: "like this"
- Each print() makes a new line
- You can print anything!

## 🎮 Interactive Exercise

Try this:

1. Print your name
2. Print your age
3. Print your favorite food

**Example:**
\`\`\`
print("My name is Alex")
print("I am 10 years old")
print("I love pizza")
\`\`\`

## ✅ What You Learned

- ✅ print() shows text on screen
- ✅ Use quotes around text
- ✅ Each print() makes a new line

## 🎧 Listen and Learn

Hear how print() works with audio.

## 🗣️ Talk to AI

Ask: "How do I use print()?"

Get help from your AI tutor!

## 🏆 Great Job!

Day 3 done! You're becoming a coder!

⭐ You're doing fantastic!`;
}

function getDay4Content(): string {
  return `# 📦 Day 4: Variables with Real-Life Examples

## 🎯 Today's Goal

Learn what variables are.

Think of them as boxes that hold things.

## 📦 Variables are Like Boxes

Imagine you have a box.

You put something in the box.

You write a name on the box.

Later, you can find it by the name.

Variables work the same way!

## 🎨 Real-Life Example

**Box labeled "name"** contains "Sarah"
**Box labeled "age"** contains "10"
**Box labeled "hobby"** contains "drawing"

In code:
\`\`\`
name = "Sarah"
age = 10
hobby = "drawing"
\`\`\`

## 🔤 How to Use Variables

### Step 1: Create a variable

\`\`\`
my_name = "Alex"
\`\`\`

### Step 2: Use the variable

\`\`\`
print(my_name)
\`\`\`

This prints: Alex

## 🎮 Activities

### Activity 1: Store Your Name

\`\`\`
name = "Your Name Here"
print("Hello, " + name)
\`\`\`

### Activity 2: Store Your Age

\`\`\`
age = 10
print("I am " + str(age) + " years old")
\`\`\`

### Activity 3: Store Your Favorite Hobby

\`\`\`
hobby = "reading"
print("I love " + hobby)
\`\`\`

## 💡 Important Rules

- Variable names can't have spaces
- Use letters and numbers
- Start with a letter
- Use underscore for spaces: my_name

## 🎯 Challenge

Create three variables:
1. Your name
2. Your age
3. Your favorite color

Then print them all!

## ✅ What You Learned

- ✅ Variables are like labeled boxes
- ✅ They store information
- ✅ You can use them later

## 🎧 Listen and Learn

Hear about variables with audio help.

## 🗣️ Talk to AI

Ask: "What is a variable?"

The AI will explain with examples!

## 🏆 Awesome Work!

Day 4 complete! You understand variables!

⭐ Keep going, you're amazing!`;
}

function getDay5Content(): string {
  return `# 🔢 Day 5: Numbers and Math in Code

## 🎯 Today's Goal

Learn to do math in code.

Make a simple calculator.

## ➕ Simple Addition

Adding numbers is easy!

\`\`\`
result = 5 + 3
print(result)
\`\`\`

This shows: 8

## ➖ Subtraction

Taking away numbers:

\`\`\`
result = 10 - 4
print(result)
\`\`\`

This shows: 6

## ✖️ Multiplication

Multiplying numbers:

\`\`\`
result = 3 * 4
print(result)
\`\`\`

This shows: 12

## ➗ Division

Dividing numbers:

\`\`\`
result = 12 / 3
print(result)
\`\`\`

This shows: 4

## 🎮 Visual Calculator Game

Let's make a simple calculator!

### Step 1: Ask for numbers

\`\`\`
num1 = 5
num2 = 3
\`\`\`

### Step 2: Do math

\`\`\`
addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
division = num1 / num2
\`\`\`

### Step 3: Show results

\`\`\`
print("Addition:", addition)
print("Subtraction:", subtraction)
print("Multiplication:", multiplication)
print("Division:", division)
\`\`\`

## 🎨 Try It Yourself

Change the numbers:

\`\`\`
num1 = 10
num2 = 2
\`\`\`

What do you get?

## 💡 Math Symbols

- + means add
- - means subtract
- * means multiply
- / means divide

## 🎯 Challenge

Make a calculator that:
1. Adds two numbers
2. Subtracts two numbers
3. Shows both results

## ✅ What You Learned

- ✅ How to add numbers
- ✅ How to subtract numbers
- ✅ How to multiply and divide

## 🎧 Listen and Learn

Hear about math in code.

## 🗣️ Talk to AI

Ask: "How do I do math in code?"

Get help from your AI tutor!

## 🏆 Excellent!

Day 5 done! You can do math with code!

⭐ You're learning so fast!`;
}

function getDay6Content(): string {
  return `# 🤔 Day 6: Decision Making (If-Else)

## 🎯 Today's Goal

Learn to make decisions in code.

Use if-else statements.

## 🌧️ Real-Life Example

**If it's raining, take an umbrella.**

**Otherwise, don't take an umbrella.**

This is decision making!

## 💻 In Code

\`\`\`
weather = "raining"

if weather == "raining":
    print("Take an umbrella!")
else:
    print("No umbrella needed!")
\`\`\`

## 🔍 How It Works

1. Check the condition
2. If true, do this
3. If false, do that

## 🎨 Simple Examples

### Example 1: Age Check

\`\`\`
age = 10

if age >= 10:
    print("You are 10 or older!")
else:
    print("You are younger than 10!")
\`\`\`

### Example 2: Favorite Color

\`\`\`
favorite_color = "blue"

if favorite_color == "blue":
    print("Blue is awesome!")
else:
    print("That's a nice color too!")
\`\`\`

## 🎮 Interactive Quiz

Let's make a quiz!

\`\`\`
answer = "yes"

if answer == "yes":
    print("Correct! 🎉")
else:
    print("Try again! 💪")
\`\`\`

## 💡 Important Rules

- Use == to check if equal
- Use : after if and else
- Indent the code inside

## 🎯 Challenge

Create a program that:
1. Asks if you like coding
2. If yes, say "Awesome!"
3. If no, say "That's okay!"

## ✅ What You Learned

- ✅ How to make decisions
- ✅ Using if-else statements
- ✅ Checking conditions

## 🎧 Listen and Learn

Hear about decision making.

## 🗣️ Talk to AI

Ask: "What is if-else?"

The AI will explain step by step!

## 🏆 Great Progress!

Day 6 complete! You can make decisions!

⭐ You're doing so well!`;
}

function getDay7Content(): string {
  return `# 🔄 Day 7: Loops Made Simple

## 🎯 Today's Goal

Learn what loops are.

Understand repetition in code.

## 🦷 Real-Life Example

**Brushing your teeth every day.**

You repeat the same action.

Every single day.

That's a loop!

## 💻 In Code

Loops repeat code.

Instead of writing the same thing many times.

You write it once in a loop.

## 🔄 Simple Loop Example

### Repeat 5 Times

\`\`\`
for i in range(5):
    print("Hello")
\`\`\`

This prints "Hello" five times!

## 🎨 Visual Explanation

**Without loop:**
\`\`\`
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")
\`\`\`

**With loop:**
\`\`\`
for i in range(5):
    print("Hello")
\`\`\`

Much shorter!

## 🎮 Practice Exercises

### Exercise 1: Count to 5

\`\`\`
for i in range(5):
    print(i + 1)
\`\`\`

This prints: 1, 2, 3, 4, 5

### Exercise 2: Print Your Name 3 Times

\`\`\`
for i in range(3):
    print("Your Name")
\`\`\`

### Exercise 3: Countdown

\`\`\`
for i in range(5, 0, -1):
    print(i)
print("Blast off!")
\`\`\`

## 💡 How Loops Work

1. Start at the beginning
2. Do the action
3. Go to the next
4. Repeat until done

## 🎯 Challenge

Create a loop that:
1. Prints "I love coding!" 10 times
2. Numbers each line
3. Adds an emoji to each line

## ✅ What You Learned

- ✅ Loops repeat actions
- ✅ They save time
- ✅ They make code shorter

## 🎧 Listen and Learn

Hear about loops with audio.

## 🗣️ Talk to AI

Ask: "What is a loop?"

Get a simple explanation!

## 🏆 Amazing Work!

Day 7 done! You understand loops!

⭐ You're becoming a programmer!`;
}

function getDay8Content(): string {
  return `# 🎯 Day 8: Combining What You Learned

## 🎯 Today's Goal

Use everything you learned.

Build a simple chatbot!

## 🤖 Mini Project: Simple Chatbot

Let's build a chatbot that greets users.

It will:
1. Ask for the user's name
2. Say hello
3. Ask a question
4. Respond to the answer

## 📝 Step-by-Step

### Step 1: Greet the User

\`\`\`
print("Hello! I'm a chatbot!")
print("What's your name?")
name = input("Enter your name: ")
print("Nice to meet you, " + name + "!")
\`\`\`

### Step 2: Ask a Question

\`\`\`
print("How are you today?")
feeling = input("Enter your feeling: ")

if feeling == "good":
    print("That's great! I'm glad!")
else:
    print("I hope you feel better soon!")
\`\`\`

### Step 3: Put It Together

\`\`\`
# Greet user
print("Hello! I'm a chatbot!")
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")

# Ask how they are
feeling = input("How are you today? ")

if feeling == "good":
    print("That's wonderful!")
else:
    print("I'm here to help!")

# Ask favorite color
color = input("What's your favorite color? ")
print("I like " + color + " too!")
\`\`\`

## 🎨 Make It Better

Add a loop to keep talking:

\`\`\`
print("Hello! I'm a chatbot!")
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")

for i in range(3):
    question = input("Ask me something: ")
    print("That's interesting! Tell me more!")
\`\`\`

## 💡 What We Used

- ✅ Variables (to store name)
- ✅ print() (to show messages)
- ✅ input() (to get answers)
- ✅ if-else (to make decisions)
- ✅ loops (to repeat questions)

## 🎯 Your Turn!

Create your own chatbot that:
1. Asks the user's name
2. Asks their age
3. Asks their favorite hobby
4. Says something nice about each answer

## ✅ What You Learned

- ✅ How to combine different concepts
- ✅ Building a complete program
- ✅ Using everything together

## 🎧 Listen and Learn

Hear about combining concepts.

## 🗣️ Talk to AI

Ask: "How do I build a chatbot?"

Get step-by-step help!

## 🏆 Fantastic!

Day 8 complete! You built a chatbot!

⭐ You're a real programmer now!`;
}

function getDay9Content(): string {
  return `# 💪 Day 9: Understanding Errors

## 🎯 Today's Goal

Learn that errors are okay.

Understand how to fix them.

## ❌ What are Errors?

Errors are mistakes in code.

Everyone makes them!

Even experienced programmers.

## 💡 Important Message

**Don't be afraid of errors!**

They help us learn.

They show us what to fix.

## 🎨 Common Errors

### Error 1: Forgot Quotes

**Wrong:**
\`\`\`
print(Hello)
\`\`\`

**Right:**
\`\`\`
print("Hello")
\`\`\`

### Error 2: Forgot Colon

**Wrong:**
\`\`\`
if age == 10
    print("You are 10!")
\`\`\`

**Right:**
\`\`\`
if age == 10:
    print("You are 10!")
\`\`\`

### Error 3: Wrong Indentation

**Wrong:**
\`\`\`
if age == 10:
print("You are 10!")
\`\`\`

**Right:**
\`\`\`
if age == 10:
    print("You are 10!")
\`\`\`

## 🤖 AI Explains Errors

When you get an error:

1. Read the error message
2. Find the line number
3. Check that line
4. Look for common mistakes
5. Ask the AI tutor for help!

## 🎮 Practice: Fix These Errors

### Exercise 1

**Broken code:**
\`\`\`
print(Hello World)
\`\`\`

**Fix it!** (Hint: Add quotes)

### Exercise 2

**Broken code:**
\`\`\`
name = Alex
print(name)
\`\`\`

**Fix it!** (Hint: Add quotes around Alex)

### Exercise 3

**Broken code:**
\`\`\`
if age == 10
print("Correct!")
\`\`\`

**Fix it!** (Hint: Add colon and indentation)

## 💪 Remember

- ✅ Errors are normal
- ✅ Everyone makes mistakes
- ✅ Errors help us learn
- ✅ Don't give up!

## 🎧 Listen and Learn

Hear about errors and how to fix them.

## 🗣️ Talk to AI

If you get an error, ask the AI:
"Help me fix this error: [your error]"

The AI will explain it simply!

## 🏆 Great Job!

Day 9 done! You're not afraid of errors!

⭐ Mistakes are how we learn!`;
}

function getDay10Content(): string {
  return `# 🎉 Day 10: Final Project & Celebration

## 🎯 Today's Goal

Build your final project!

Celebrate your achievement!

## 🎁 Final Project: Fun Facts Generator

Let's build a program that:
1. Shows fun facts
2. Lets users pick a fact
3. Displays the fact
4. Asks if they want another

## 📝 Step-by-Step Project

### Step 1: Create Fun Facts

\`\`\`
facts = [
    "Did you know? Bees can fly up to 15 miles per hour!",
    "Fun fact: Octopuses have three hearts!",
    "Wow! A group of flamingos is called a flamboyance!",
    "Amazing! Honey never spoils!",
    "Cool! Bananas are berries, but strawberries aren't!"
]
\`\`\`

### Step 2: Show Menu

\`\`\`
print("Welcome to Fun Facts Generator!")
print("Choose a number from 1 to 5:")
choice = input("Enter your choice: ")
\`\`\`

### Step 3: Show the Fact

\`\`\`
if choice == "1":
    print(facts[0])
elif choice == "2":
    print(facts[1])
elif choice == "3":
    print(facts[2])
elif choice == "4":
    print(facts[3])
elif choice == "5":
    print(facts[4])
else:
    print("Please choose 1-5!")
\`\`\`

### Step 4: Add a Loop

\`\`\`
while True:
    print("\\nFun Facts Generator!")
    print("Choose 1-5 for a fact, or 'quit' to exit")
    choice = input("Your choice: ")
    
    if choice == "quit":
        print("Thanks for playing!")
        break
    elif choice == "1":
        print(facts[0])
    elif choice == "2":
        print(facts[1])
    elif choice == "3":
        print(facts[2])
    elif choice == "4":
        print(facts[3])
    elif choice == "5":
        print(facts[4])
    else:
        print("Please choose 1-5 or 'quit'!")
\`\`\`

## 🎨 Complete Project

\`\`\`
# Fun Facts Generator
# Final Project - Day 10

facts = [
    "Did you know? Bees can fly up to 15 miles per hour!",
    "Fun fact: Octopuses have three hearts!",
    "Wow! A group of flamingos is called a flamboyance!",
    "Amazing! Honey never spoils!",
    "Cool! Bananas are berries, but strawberries aren't!"
]

print("=" * 40)
print("🎉 WELCOME TO FUN FACTS GENERATOR! 🎉")
print("=" * 40)

while True:
    print("\\nChoose a fun fact:")
    print("1. Fact 1")
    print("2. Fact 2")
    print("3. Fact 3")
    print("4. Fact 4")
    print("5. Fact 5")
    print("Type 'quit' to exit")
    
    choice = input("\\nYour choice: ")
    
    if choice.lower() == "quit":
        print("\\nThanks for using Fun Facts Generator!")
        print("You completed the course! 🎉")
        break
    elif choice == "1":
        print("\\n" + facts[0])
    elif choice == "2":
        print("\\n" + facts[1])
    elif choice == "3":
        print("\\n" + facts[2])
    elif choice == "4":
        print("\\n" + facts[3])
    elif choice == "5":
        print("\\n" + facts[4])
    else:
        print("\\nPlease choose 1-5 or 'quit'!")
    
    print("\\n" + "=" * 40)
\`\`\`

## 🏆 What You Learned in 10 Days

- ✅ What coding is
- ✅ Programming languages
- ✅ Printing text
- ✅ Variables
- ✅ Math in code
- ✅ Decision making
- ✅ Loops
- ✅ Combining concepts
- ✅ Fixing errors
- ✅ Building projects

## 🎉 Celebration!

### 🎊 You Did It! 🎊

You completed the 10-day course!

You learned to code!

You built projects!

You're a programmer now!

## 🏅 Your Certificate

**Certificate of Completion**

This certifies that you have completed:
**CodeEase - HTML for Beginners**
**10-Day Dyslexia-Friendly Programming Course**

**Congratulations!** 🎉

## 🎧 Listen and Learn

Hear your celebration message!

## 🗣️ Talk to AI

Ask the AI: "I finished the course!"

Get a special congratulations message!

## 🌟 Next Steps

Keep learning!
Keep coding!
Keep building!

You can do anything!

## ✅ Final Words

You completed 10 days of coding!

You learned so much!

You should be proud!

**You're amazing!** ⭐⭐⭐

**Congratulations, programmer!** 🎉🎊🎈`;
}

