import { Course } from "@/types/disability";

/**
 * CodeFocus - 10-Day ADHD-Friendly HTML Programming Course
 * Designed specifically for people with ADHD with:
 * - Short, focused lessons
 * - Gamification elements
 * - Quick wins and rewards
 * - Visual progress tracking
 * - Engaging interactive activities
 */
export const createADHDHTMLCourse = (): Course => {
  return {
    id: "codefocus-html-adhd",
    language: "HTML",
    title: "CodeFocus - HTML for Beginners (ADHD-Friendly)",
    description: "Learn HTML with gamification, quick wins, and engaging activities! Perfect for ADHD-friendly learning with rewards and progress tracking! 🎮",
    duration: "10 days",
    difficulty: "beginner",
    progress: 0,
    modules: [
      {
        id: "adhd-day-1",
        day: 1,
        title: "Day 1: Introduction to Computers & Coding",
        description: "🎯 Quick intro to coding! Learn what coding is in fun, bite-sized chunks!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay1Content(),
      },
      {
        id: "adhd-day-2",
        day: 2,
        title: "Day 2: Understanding What a Programming Language Is",
        description: "⚡ Visual blocks and code! Learn commands and syntax the fun way!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay2Content(),
      },
      {
        id: "adhd-day-3",
        day: 3,
        title: "Day 3: Printing and Displaying Text",
        description: "🚀 Learn print() command! Quick practice with colors and numbers!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay3Content(),
      },
      {
        id: "adhd-day-4",
        day: 4,
        title: "Day 4: Variables with Real-Life Examples",
        description: "📦 Variables = boxes! Store your name, age, and hobbies!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay4Content(),
      },
      {
        id: "adhd-day-5",
        day: 5,
        title: "Day 5: Numbers and Math in Code",
        description: "🔢 Quick math! Addition, subtraction, and a fun calculator game!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay5Content(),
      },
      {
        id: "adhd-day-6",
        day: 6,
        title: "Day 6: Decision Making (If-Else)",
        description: "🎲 Make decisions! If-else statements with fun examples!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay6Content(),
      },
      {
        id: "adhd-day-7",
        day: 7,
        title: "Day 7: Loops Made Simple",
        description: "🔄 Repeat actions! Loops explained with simple pictures!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay7Content(),
      },
      {
        id: "adhd-day-8",
        day: 8,
        title: "Day 8: Combining What You Learned",
        description: "🎯 Build a chatbot! Combine everything into one fun project!",
        duration: "15-20 min",
        completed: false,
        content: getADHDDay8Content(),
      },
      {
        id: "adhd-day-9",
        day: 9,
        title: "Day 9: Understanding Errors",
        description: "💪 Errors are okay! Learn to fix mistakes like a pro!",
        duration: "10-15 min",
        completed: false,
        content: getADHDDay9Content(),
      },
      {
        id: "adhd-day-10",
        day: 10,
        title: "Day 10: Final Project & Celebration",
        description: "🎉 Fun Facts Generator! Complete your final project and celebrate!",
        duration: "20-25 min",
        completed: false,
        content: getADHDDay10Content(),
      },
    ],
  };
};

function getADHDDay1Content(): string {
  return `# 🎯 Day 1: Introduction to Computers & Coding

## ⚡ Quick Win!
You're about to learn coding in 10 minutes!

## 💡 What is Coding?

Coding = Giving instructions to computers.

**Simple example:**
- You: "Computer, say hello"
- Computer: "Hello!"

## 🎮 Think of It Like This

Coding is like playing a video game.

You press buttons (write code).
The game responds (computer does stuff).

## 🚀 Activity: Make Computer Say Your Name

**Step 1:** Open a text editor
**Step 2:** Type: \`print("Hello, YOUR NAME")\`
**Step 3:** Save and run!

**Example:**
\`\`\`
print("Hello, Alex!")
\`\`\`

**Result:** Computer says "Hello, Alex!"

## ✅ Checkpoint

- ✅ Coding = instructions for computers
- ✅ Computers follow your code
- ✅ You can make computers do things

## 🏆 Reward Unlocked!

You completed Day 1! 🎉

**Next:** Learn programming languages!`;
}

function getADHDDay2Content(): string {
  return `# ⚡ Day 2: Understanding What a Programming Language Is

## 🎯 Quick Goal
Learn what programming languages are in 5 minutes!

## 🧱 Programming = Building Blocks

Think LEGO blocks.

Each block = One command.
Put blocks together = A program!

## 📊 Visual Example

**Block 1:** Print something
**Block 2:** Store information
**Block 3:** Make a decision

**Combined:** A working program!

## 🔤 Commands

Commands tell computers what to do.

**Examples:**
- \`print()\` = Show something
- \`input()\` = Ask for information
- \`if\` = Make a choice

## 📝 Syntax = Rules

Syntax = Grammar for code.

Like sentences need periods.
Code needs proper syntax.

## 🎮 Quick Challenge

**English:** "Say hello"
**Code:** \`print("hello")\`

Same idea, different language!

## ✅ Checkpoint

- ✅ Programming languages use commands
- ✅ Commands are like building blocks
- ✅ Syntax = Rules for writing code

## 🏆 Level Up!

Day 2 complete! 🚀`;
}

function getADHDDay3Content(): string {
  return `# 🚀 Day 3: Printing and Displaying Text

## 🎯 Mission
Learn to print text in 5 minutes!

## 📢 print() Command

\`print()\` shows text on screen.

**Example:**
\`\`\`
print("Hello!")
\`\`\`

Shows: Hello!

## 🎨 Quick Exercises

### Exercise 1: Print Your Favorite Color

\`\`\`
print("My favorite color is blue!")
\`\`\`

Change "blue" to YOUR color!

### Exercise 2: Print a Number

\`\`\`
print("My favorite number is 7")
\`\`\`

Change 7 to YOUR number!

### Exercise 3: Print Multiple Times

\`\`\`
print("Hello")
print("World")
print("!")
\`\`\`

Prints 3 lines!

## 💡 Pro Tip

- Use quotes: "like this"
- Each print() = New line
- Print anything you want!

## 🎮 Challenge

Print:
1. Your name
2. Your age
3. Your favorite food

**Go!** ⚡

## ✅ Checkpoint

- ✅ print() shows text
- ✅ Use quotes around text
- ✅ Each print() = New line

## 🏆 Achievement Unlocked!

Day 3 done! 🎮`;
}

function getADHDDay4Content(): string {
  return `# 📦 Day 4: Variables with Real-Life Examples

## 🎯 Quick Goal
Learn variables in 5 minutes!

## 📦 Variables = Labeled Boxes

**Box "name"** → Contains "Sarah"
**Box "age"** → Contains "10"
**Box "hobby"** → Contains "drawing"

## 💻 In Code

\`\`\`
name = "Sarah"
age = 10
hobby = "drawing"
\`\`\`

## 🎮 Quick Activities

### Activity 1: Store Your Name

\`\`\`
name = "Your Name"
print("Hello, " + name)
\`\`\`

### Activity 2: Store Your Age

\`\`\`
age = 10
print("I am " + str(age) + " years old")
\`\`\`

### Activity 3: Store Your Hobby

\`\`\`
hobby = "reading"
print("I love " + hobby)
\`\`\`

## ⚡ Rules

- No spaces in variable names
- Use letters and numbers
- Start with a letter
- Use _ for spaces: my_name

## 🎯 Quick Challenge

Create 3 variables:
1. Your name
2. Your age
3. Your favorite color

Print them all!

## ✅ Checkpoint

- ✅ Variables = Labeled boxes
- ✅ Store information
- ✅ Use them later

## 🏆 Level Complete!

Day 4 done! 🎉`;
}

function getADHDDay5Content(): string {
  return `# 🔢 Day 5: Numbers and Math in Code

## 🎯 Mission
Do math with code in 5 minutes!

## ➕ Addition

\`\`\`
result = 5 + 3
print(result)
\`\`\`

Shows: 8

## ➖ Subtraction

\`\`\`
result = 10 - 4
print(result)
\`\`\`

Shows: 6

## ✖️ Multiplication

\`\`\`
result = 3 * 4
print(result)
\`\`\`

Shows: 12

## ➗ Division

\`\`\`
result = 12 / 3
print(result)
\`\`\`

Shows: 4

## 🎮 Calculator Game

\`\`\`
num1 = 5
num2 = 3

addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
division = num1 / num2

print("Addition:", addition)
print("Subtraction:", subtraction)
print("Multiplication:", multiplication)
print("Division:", division)
\`\`\`

## 🎨 Try It!

Change the numbers:
\`\`\`
num1 = 10
num2 = 2
\`\`\`

What do you get?

## 💡 Math Symbols

- + = Add
- - = Subtract
- * = Multiply
- / = Divide

## ✅ Checkpoint

- ✅ Can add numbers
- ✅ Can subtract numbers
- ✅ Can multiply and divide

## 🏆 Achievement!

Day 5 complete! 🚀`;
}

function getADHDDay6Content(): string {
  return `# 🎲 Day 6: Decision Making (If-Else)

## 🎯 Quick Goal
Learn if-else in 5 minutes!

## 🤔 Real Example

**If it's raining** → Take umbrella
**Otherwise** → No umbrella needed

## 💻 In Code

\`\`\`
weather = "raining"

if weather == "raining":
    print("Take an umbrella!")
else:
    print("No umbrella needed!")
\`\`\`

## 🎮 Quick Examples

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
color = "blue"

if color == "blue":
    print("Blue is awesome!")
else:
    print("That's nice too!")
\`\`\`

## 🎯 Quick Quiz

\`\`\`
answer = "yes"

if answer == "yes":
    print("Correct! 🎉")
else:
    print("Try again! 💪")
\`\`\`

## ⚡ Rules

- Use == to check if equal
- Use : after if and else
- Indent the code inside

## 🎮 Challenge

Create a program:
1. Ask if you like coding
2. If yes → "Awesome!"
3. If no → "That's okay!"

## ✅ Checkpoint

- ✅ Can make decisions
- ✅ Using if-else
- ✅ Checking conditions

## 🏆 Level Up!

Day 6 complete! 🎮`;
}

function getADHDDay7Content(): string {
  return `# 🔄 Day 7: Loops Made Simple

## 🎯 Mission
Learn loops in 5 minutes!

## 🔄 What are Loops?

Loops repeat code.

Instead of writing the same thing many times.
Write it once in a loop.

## 🎮 Simple Loop

\`\`\`
for i in range(5):
    print("Hello")
\`\`\`

Prints "Hello" 5 times!

## 🎨 Visual

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

## 🚀 Quick Exercises

### Exercise 1: Count to 5

\`\`\`
for i in range(5):
    print(i + 1)
\`\`\`

Prints: 1, 2, 3, 4, 5

### Exercise 2: Print Name 3 Times

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

1. Start at beginning
2. Do the action
3. Go to next
4. Repeat until done

## 🎯 Challenge

Create a loop that:
1. Prints "I love coding!" 10 times
2. Numbers each line
3. Adds an emoji

## ✅ Checkpoint

- ✅ Loops repeat actions
- ✅ They save time
- ✅ They make code shorter

## 🏆 Achievement!

Day 7 complete! 🎉`;
}

function getADHDDay8Content(): string {
  return `# 🎯 Day 8: Combining What You Learned

## 🎯 Mission
Build a chatbot in 10 minutes!

## 🤖 Simple Chatbot

**What it does:**
1. Asks for name
2. Says hello
3. Asks a question
4. Responds to answer

## 📝 Step-by-Step

### Step 1: Greet User

\`\`\`
print("Hello! I'm a chatbot!")
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")
\`\`\`

### Step 2: Ask Question

\`\`\`
feeling = input("How are you today? ")

if feeling == "good":
    print("That's great!")
else:
    print("I hope you feel better!")
\`\`\`

### Step 3: Complete Chatbot

\`\`\`
print("Hello! I'm a chatbot!")
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")

feeling = input("How are you today? ")

if feeling == "good":
    print("That's wonderful!")
else:
    print("I'm here to help!")

color = input("What's your favorite color? ")
print("I like " + color + " too!")
\`\`\`

## 🎮 Make It Better

Add a loop to keep talking:

\`\`\`
print("Hello! I'm a chatbot!")
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")

for i in range(3):
    question = input("Ask me something: ")
    print("That's interesting!")
\`\`\`

## ✅ What We Used

- ✅ Variables (store name)
- ✅ print() (show messages)
- ✅ input() (get answers)
- ✅ if-else (make decisions)
- ✅ loops (repeat questions)

## 🎯 Your Turn!

Create your chatbot:
1. Ask name
2. Ask age
3. Ask favorite hobby
4. Say something nice about each

## 🏆 Achievement Unlocked!

Day 8 complete! 🚀`;
}

function getADHDDay9Content(): string {
  return `# 💪 Day 9: Understanding Errors

## 🎯 Quick Goal
Learn errors are okay in 5 minutes!

## ❌ What are Errors?

Errors = Mistakes in code.

**Everyone makes them!**
Even expert programmers.

## 💡 Important Message

**Don't be afraid of errors!**

They help you learn.
They show what to fix.

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

## 🎮 Practice: Fix These

### Fix 1
\`\`\`
print(Hello World)
\`\`\`
**Hint:** Add quotes!

### Fix 2
\`\`\`
name = Alex
print(name)
\`\`\`
**Hint:** Add quotes around Alex!

### Fix 3
\`\`\`
if age == 10
print("Correct!")
\`\`\`
**Hint:** Add colon and indentation!

## 💪 Remember

- ✅ Errors are normal
- ✅ Everyone makes mistakes
- ✅ Errors help you learn
- ✅ Don't give up!

## ✅ Checkpoint

- ✅ Errors are okay
- ✅ Know common errors
- ✅ Can fix mistakes

## 🏆 Level Complete!

Day 9 done! 🎉`;
}

function getADHDDay10Content(): string {
  return `# 🎉 Day 10: Final Project & Celebration

## 🎯 Final Mission
Build Fun Facts Generator!

## 🎁 Project: Fun Facts Generator

**What it does:**
1. Shows fun facts
2. Lets you pick a fact
3. Displays the fact
4. Asks if you want another

## 📝 Complete Project

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
        print("\\nThanks for playing!")
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

You completed 10 days!
You learned to code!
You built projects!
You're a programmer!

## 🏅 Certificate

**Certificate of Completion**

You completed:
**CodeFocus - HTML for Beginners**
**10-Day ADHD-Friendly Programming Course**

**Congratulations!** 🎉

## ✅ Final Words

You completed 10 days!
You learned so much!
You should be proud!

**You're amazing!** ⭐⭐⭐

**Congratulations, programmer!** 🎉🎊🎈`;
}

