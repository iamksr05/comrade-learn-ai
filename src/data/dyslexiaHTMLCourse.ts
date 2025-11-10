import { Course } from "@/types/disability";

/**
 * CodeEase - 10-Day Dyslexia-Friendly HTML Course
 * Designed specifically for people with dyslexia with:
 * - Very short sentences (one idea per sentence)
 * - Lots of whitespace between sections
 * - Simple, everyday language
 * - Clear visual examples
 * - Step-by-step instructions
 * - Breaking complex concepts into tiny pieces
 * - Real-world analogies
 * - Repetition of key concepts
 */
export const createDyslexiaHTMLCourse = (): Course => {
  return {
    id: "codeease-html-dyslexia",
    language: "HTML",
    title: "CodeEase - HTML for Beginners (Dyslexia-Friendly)",
    description: "Learn HTML step-by-step with simple words, clear examples, and lots of space. Made easy for dyslexia-friendly learning! 🎯",
    duration: "10 days",
    difficulty: "beginner",
    progress: 0,
    modules: [
      {
        id: "day-1",
        day: 1,
        title: "Day 1: What is HTML?",
        description: "🌐 Learn what HTML is. See your first web page. Simple and easy!",
        duration: "15-20 min",
        completed: false,
        content: getDay1Content(),
      },
      {
        id: "day-2",
        day: 2,
        title: "Day 2: Your First HTML Page",
        description: "📄 Make your first web page. Learn the basic structure. Step by step!",
        duration: "15-20 min",
        completed: false,
        content: getDay2Content(),
      },
      {
        id: "day-3",
        day: 3,
        title: "Day 3: Adding Text to Your Page",
        description: "📝 Learn to add headings and paragraphs. Make words big or small!",
        duration: "15-20 min",
        completed: false,
        content: getDay3Content(),
      },
      {
        id: "day-4",
        day: 4,
        title: "Day 4: Making Lists",
        description: "📋 Learn to make lists. Bullet points and numbered lists. Easy!",
        duration: "15-20 min",
        completed: false,
        content: getDay4Content(),
      },
      {
        id: "day-5",
        day: 5,
        title: "Day 5: Adding Links",
        description: "🔗 Learn to add links. Click here to go there. Simple!",
        duration: "15-20 min",
        completed: false,
        content: getDay5Content(),
      },
      {
        id: "day-6",
        day: 6,
        title: "Day 6: Adding Images",
        description: "🖼️ Learn to add pictures. Show photos on your page. Fun!",
        duration: "15-20 min",
        completed: false,
        content: getDay6Content(),
      },
      {
        id: "day-7",
        day: 7,
        title: "Day 7: Making Things Bold and Italic",
        description: "✨ Learn to make text bold or italic. Change how words look!",
        duration: "15-20 min",
        completed: false,
        content: getDay7Content(),
      },
      {
        id: "day-8",
        day: 8,
        title: "Day 8: Adding Colors",
        description: "🎨 Learn to change colors. Make your page colorful. Beautiful!",
        duration: "20-25 min",
        completed: false,
        content: getDay8Content(),
      },
      {
        id: "day-9",
        day: 9,
        title: "Day 9: Making Tables",
        description: "📊 Learn to make tables. Organize information in rows and columns!",
        duration: "20-25 min",
        completed: false,
        content: getDay9Content(),
      },
      {
        id: "day-10",
        day: 10,
        title: "Day 10: Your First Complete Website",
        description: "🎉 Build your own website. Put everything together. Celebrate!",
        duration: "25-30 min",
        completed: false,
        content: getDay10Content(),
      },
    ],
  };
};

function getDay1Content(): string {
  return `# 🌐 Day 1: What is HTML?

## 🎯 Today You Will Learn

What HTML is.

How it works.

Why we use it.

## 💡 What is HTML?

HTML is a language.

It tells computers how to show web pages.

HTML stands for:
- H = Hyper
- T = Text
- M = Markup
- L = Language

## 🏠 Think of HTML Like a House

A house has parts.

HTML has parts too.

**House parts:**
- Walls
- Roof
- Doors
- Windows

**HTML parts:**
- Headings
- Paragraphs
- Links
- Images

## 🌍 Where is HTML Used?

HTML is everywhere.

Every website uses HTML.

- Google uses HTML
- Facebook uses HTML
- Your favorite site uses HTML

## 📱 What Can HTML Do?

HTML can show:
- Text
- Pictures
- Links
- Videos
- Forms

## 🔍 HTML Tags

HTML uses tags.

Tags are like labels.

They tell the computer what to do.

**Example:**

\`<p>\` means paragraph.

\`<h1>\` means heading.

## 💻 How HTML Works

1. You write HTML code.

2. The computer reads it.

3. The computer shows a web page.

## 🎨 Visual Example

**HTML code:**
\`\`\`html
<p>Hello World</p>
\`\`\`

**What you see:**
Hello World

## ✅ What You Learned Today

- ✅ HTML is a language
- ✅ HTML makes web pages
- ✅ HTML uses tags
- ✅ Every website uses HTML

## 🎧 Listen and Learn

Click the "Listen" button.

Hear this lesson read aloud.

## 🗣️ Talk to AI

Ask the AI: "What is HTML?"

Get a simple explanation!

## 🏆 Great Job!

Day 1 complete!

⭐ You're doing amazing!

**Remember:** Take breaks.

Learning should be fun!`;
}

function getDay2Content(): string {
  return `# 📄 Day 2: Your First HTML Page

## 🎯 Today You Will Learn

How to make an HTML page.

The basic structure.

How to save it.

## 📝 Step 1: The Basic Structure

Every HTML page needs this:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    Hello World!
</body>
</html>
\`\`\`

## 🔍 Let's Break It Down

### \`<!DOCTYPE html>\`

This tells the computer:
"This is an HTML page."

### \`<html>\`

This is the start of your page.

### \`</html>\`

This is the end of your page.

## 📋 The Head Section

The \`<head>\` section has information.

It tells the computer about your page.

**Example:**
\`\`\`html
<head>
    <title>My First Page</title>
</head>
\`\`\`

The title shows in the browser tab.

## 📄 The Body Section

The \`<body>\` section has content.

This is what people see.

**Example:**
\`\`\`html
<body>
    Hello World!
</body>
\`\`\`

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome!</h1>
    <p>This is my first web page.</p>
</body>
</html>
\`\`\`

## 💾 How to Save Your File

1. Open a text editor.

2. Type your HTML code.

3. Save the file.

4. Name it: \`my-page.html\`

5. Open it in a browser.

## 🌐 Opening Your Page

1. Find your file.

2. Double-click it.

3. It opens in your browser.

4. You see your web page!

## ✅ What You Learned Today

- ✅ HTML page structure
- ✅ The head section
- ✅ The body section
- ✅ How to save a file

## 🎧 Listen and Learn

Hear how to make a page.

## 🗣️ Talk to AI

Ask: "How do I make an HTML page?"

Get step-by-step help!

## 🏆 Awesome Work!

Day 2 complete!

⭐ You made your first page!`;
}

function getDay3Content(): string {
  return `# 📝 Day 3: Adding Text to Your Page

## 🎯 Today You Will Learn

How to add headings.

How to add paragraphs.

How to make text different sizes.

## 📰 Headings

Headings make text big.

They show important titles.

HTML has 6 heading sizes.

## 🔢 Heading Sizes

\`<h1>\` is the biggest.

\`<h2>\` is smaller.

\`<h3>\` is even smaller.

\`<h4>\`, \`<h5>\`, \`<h6>\` get smaller.

## 📝 Heading Examples

\`\`\`html
<h1>This is Big</h1>
<h2>This is Medium</h2>
<h3>This is Small</h3>
\`\`\`

## 📄 Paragraphs

Paragraphs are for regular text.

Use \`<p>\` for paragraphs.

## 🎨 Paragraph Example

\`\`\`html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
\`\`\`

## 📋 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>My Favorite Animals</h1>
    <p>I love dogs.</p>
    <p>I love cats.</p>
    <h2>Why I Love Them</h2>
    <p>They are friendly.</p>
</body>
</html>
\`\`\`

## 🎯 Try It Yourself

Make a page about yourself.

1. Add a heading with your name.

2. Add paragraphs about you.

3. Add a heading about your hobbies.

4. Add paragraphs about hobbies.

## 💡 Important Rules

- Always close your tags.

- \`<h1>\` needs \`</h1>\`

- \`<p>\` needs \`</p>\`

## ✅ What You Learned Today

- ✅ How to make headings
- ✅ How to make paragraphs
- ✅ Different heading sizes
- ✅ How to structure text

## 🎧 Listen and Learn

Hear about text in HTML.

## 🗣️ Talk to AI

Ask: "How do I add text?"

Get help with headings!

## 🏆 Excellent!

Day 3 complete!

⭐ You can add text now!`;
}

function getDay4Content(): string {
  return `# 📋 Day 4: Making Lists

## 🎯 Today You Will Learn

How to make bullet lists.

How to make numbered lists.

When to use each one.

## 🔘 Bullet Lists

Bullet lists show items.

Each item has a bullet.

Use \`<ul>\` for bullet lists.

\`ul\` means "unordered list".

## 📝 Bullet List Example

\`\`\`html
<ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Oranges</li>
</ul>
\`\`\`

**What you see:**
- Apples
- Bananas
- Oranges

## 🔢 Numbered Lists

Numbered lists show order.

Each item has a number.

Use \`<ol>\` for numbered lists.

\`ol\` means "ordered list".

## 📝 Numbered List Example

\`\`\`html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
\`\`\`

**What you see:**
1. First step
2. Second step
3. Third step

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Lists</title>
</head>
<body>
    <h1>My Shopping List</h1>
    <ul>
        <li>Milk</li>
        <li>Bread</li>
        <li>Eggs</li>
    </ul>
    
    <h2>How to Make Tea</h2>
    <ol>
        <li>Boil water</li>
        <li>Add tea bag</li>
        <li>Wait 3 minutes</li>
        <li>Remove tea bag</li>
    </ol>
</body>
</html>
\`\`\`

## 💡 When to Use Each

**Use bullet lists for:**
- Shopping lists
- Things that don't have order
- Simple lists

**Use numbered lists for:**
- Steps in order
- Instructions
- Things that have order

## 🎯 Try It Yourself

Make a page with lists.

1. Make a bullet list of your favorite foods.

2. Make a numbered list of your morning routine.

3. Save and open your page.

## ✅ What You Learned Today

- ✅ How to make bullet lists
- ✅ How to make numbered lists
- ✅ When to use each one
- ✅ List items with \`<li>\`

## 🎧 Listen and Learn

Hear about lists in HTML.

## 🗣️ Talk to AI

Ask: "How do I make lists?"

Get help with lists!

## 🏆 Great Progress!

Day 4 complete!

⭐ You can make lists now!`;
}

function getDay5Content(): string {
  return `# 🔗 Day 5: Adding Links

## 🎯 Today You Will Learn

How to make links.

How links work.

Different types of links.

## 🔗 What is a Link?

A link takes you somewhere.

Click the link.

Go to another page.

## 📝 Link Example

\`\`\`html
<a href="https://www.google.com">Go to Google</a>
\`\`\`

**What you see:**
Go to Google (clickable)

## 🔍 Breaking Down the Link

\`<a>\` means anchor.

It makes a link.

\`href\` tells where to go.

The text is what you click.

## 🌐 Link to Another Website

\`\`\`html
<a href="https://www.example.com">Visit Example</a>
\`\`\`

Click it.

Go to that website.

## 📄 Link to Another Page

\`\`\`html
<a href="page2.html">Go to Page 2</a>
\`\`\`

Click it.

Go to page2.html.

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Links</title>
</head>
<body>
    <h1>My Favorite Websites</h1>
    <p>Visit <a href="https://www.google.com">Google</a></p>
    <p>Visit <a href="https://www.wikipedia.org">Wikipedia</a></p>
    
    <h2>My Other Pages</h2>
    <p><a href="about.html">About Me</a></p>
    <p><a href="contact.html">Contact</a></p>
</body>
</html>
\`\`\`

## 💡 Link Tips

- Always use \`https://\` for websites.

- Put the full address.

- Make link text clear.

## 🎯 Try It Yourself

Make a page with links.

1. Add a link to Google.

2. Add a link to Wikipedia.

3. Add a link to your favorite site.

## ✅ What You Learned Today

- ✅ How to make links
- ✅ The \`<a>\` tag
- ✅ The \`href\` attribute
- ✅ Links to websites and pages

## 🎧 Listen and Learn

Hear about links in HTML.

## 🗣️ Talk to AI

Ask: "How do I make links?"

Get help with links!

## 🏆 Fantastic!

Day 5 complete!

⭐ You can add links now!`;
}

function getDay6Content(): string {
  return `# 🖼️ Day 6: Adding Images

## 🎯 Today You Will Learn

How to add pictures.

How images work.

Different image formats.

## 🖼️ What is an Image Tag?

Images show pictures.

Use \`<img>\` for images.

## 📝 Image Example

\`\`\`html
<img src="photo.jpg" alt="A beautiful photo">
\`\`\`

## 🔍 Breaking Down the Image

\`<img>\` shows an image.

\`src\` tells which picture.

\`alt\` describes the picture.

## 📂 Image from Your Computer

\`\`\`html
<img src="my-photo.jpg" alt="My photo">
\`\`\`

Put the file in the same folder.

## 🌐 Image from the Internet

\`\`\`html
<img src="https://example.com/image.jpg" alt="Example image">
\`\`\`

Use the full web address.

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Images</title>
</head>
<body>
    <h1>My Photo Album</h1>
    <img src="photo1.jpg" alt="My first photo">
    <p>This is my first photo.</p>
    
    <img src="photo2.jpg" alt="My second photo">
    <p>This is my second photo.</p>
</body>
</html>
\`\`\`

## 💡 Image Tips

- Always use \`alt\` text.

- It helps people who can't see.

- Keep image files small.

- Common formats: .jpg, .png, .gif

## 🎯 Try It Yourself

Make a page with images.

1. Find a picture on your computer.

2. Put it in the same folder as your HTML file.

3. Add it to your page.

4. Add alt text.

## ✅ What You Learned Today

- ✅ How to add images
- ✅ The \`<img>\` tag
- ✅ The \`src\` attribute
- ✅ The \`alt\` attribute

## 🎧 Listen and Learn

Hear about images in HTML.

## 🗣️ Talk to AI

Ask: "How do I add images?"

Get help with images!

## 🏆 Amazing!

Day 6 complete!

⭐ You can add pictures now!`;
}

function getDay7Content(): string {
  return `# ✨ Day 7: Making Things Bold and Italic

## 🎯 Today You Will Learn

How to make text bold.

How to make text italic.

When to use each one.

## 💪 Bold Text

Bold text is thicker.

It stands out more.

Use \`<b>\` or \`<strong>\`.

## 📝 Bold Example

\`\`\`html
<p>This is <b>bold</b> text.</p>
\`\`\`

**What you see:**
This is **bold** text.

## 📝 Strong Example

\`\`\`html
<p>This is <strong>important</strong> text.</p>
\`\`\`

**What you see:**
This is **important** text.

## 🔤 Italic Text

Italic text is slanted.

It looks different.

Use \`<i>\` or \`<em>\`.

## 📝 Italic Example

\`\`\`html
<p>This is <i>italic</i> text.</p>
\`\`\`

**What you see:**
This is *italic* text.

## 📝 Emphasis Example

\`\`\`html
<p>This is <em>emphasized</em> text.</p>
\`\`\`

**What you see:**
This is *emphasized* text.

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Text Styles</title>
</head>
<body>
    <h1>My Story</h1>
    <p>This is a <b>very important</b> story.</p>
    <p>It happened on a <i>sunny day</i>.</p>
    <p>The <strong>main character</strong> was <em>very brave</em>.</p>
</body>
</html>
\`\`\`

## 💡 When to Use Each

**Use bold for:**
- Important words
- Key points
- Things that stand out

**Use italic for:**
- Book titles
- Foreign words
- Emphasis

## 🎯 Try It Yourself

Make a page with styles.

1. Write a paragraph.

2. Make some words bold.

3. Make some words italic.

4. Save and open your page.

## ✅ What You Learned Today

- ✅ How to make text bold
- ✅ How to make text italic
- ✅ The \`<b>\` and \`<strong>\` tags
- ✅ The \`<i>\` and \`<em>\` tags

## 🎧 Listen and Learn

Hear about text styles.

## 🗣️ Talk to AI

Ask: "How do I make text bold?"

Get help with styles!

## 🏆 Wonderful!

Day 7 complete!

⭐ You can style text now!`;
}

function getDay8Content(): string {
  return `# 🎨 Day 8: Adding Colors

## 🎯 Today You Will Learn

How to change text color.

How to change background color.

How to use color names.

## 🎨 Colors in HTML

Colors make pages pretty.

You can change text color.

You can change background color.

## 📝 Text Color Example

\`\`\`html
<p style="color: red;">This text is red.</p>
\`\`\`

**What you see:**
This text is red.

## 🎨 Background Color Example

\`\`\`html
<p style="background-color: yellow;">This has a yellow background.</p>
\`\`\`

**What you see:**
This has a yellow background.

## 🌈 Color Names

You can use color names:

- red
- blue
- green
- yellow
- orange
- purple
- pink
- black
- white

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Colors</title>
</head>
<body>
    <h1 style="color: blue;">Blue Heading</h1>
    <p style="color: red;">Red text.</p>
    <p style="background-color: yellow;">Yellow background.</p>
    <p style="color: green; background-color: pink;">Green text on pink background.</p>
</body>
</html>
\`\`\`

## 💡 Color Tips

- Use simple color names.

- Make sure text is readable.

- Don't use too many colors.

- Keep it simple and clear.

## 🎯 Try It Yourself

Make a colorful page.

1. Make a heading with blue text.

2. Make a paragraph with red text.

3. Make a paragraph with yellow background.

4. Save and open your page.

## ✅ What You Learned Today

- ✅ How to change text color
- ✅ How to change background color
- ✅ Using the style attribute
- ✅ Color names

## 🎧 Listen and Learn

Hear about colors in HTML.

## 🗣️ Talk to AI

Ask: "How do I add colors?"

Get help with colors!

## 🏆 Beautiful!

Day 8 complete!

⭐ You can add colors now!`;
}

function getDay9Content(): string {
  return `# 📊 Day 9: Making Tables

## 🎯 Today You Will Learn

How to make tables.

Table rows and columns.

When to use tables.

## 📊 What is a Table?

Tables organize information.

They have rows and columns.

Like a spreadsheet.

## 📝 Simple Table

\`\`\`html
<table>
    <tr>
        <td>Name</td>
        <td>Age</td>
    </tr>
    <tr>
        <td>John</td>
        <td>10</td>
    </tr>
</table>
\`\`\`

## 🔍 Breaking Down the Table

\`<table>\` makes a table.

\`<tr>\` makes a row.

\`<td>\` makes a cell.

## 📋 Table Headers

Headers label columns.

Use \`<th>\` for headers.

## 📝 Table with Headers

\`\`\`html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John</td>
        <td>10</td>
        <td>New York</td>
    </tr>
    <tr>
        <td>Sarah</td>
        <td>9</td>
        <td>Los Angeles</td>
    </tr>
</table>
\`\`\`

## 🎨 Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Table</title>
</head>
<body>
    <h1>My Friends</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Favorite Color</th>
        </tr>
        <tr>
            <td>Emma</td>
            <td>10</td>
            <td>Blue</td>
        </tr>
        <tr>
            <td>Lucas</td>
            <td>9</td>
            <td>Red</td>
        </tr>
        <tr>
            <td>Mia</td>
            <td>10</td>
            <td>Green</td>
        </tr>
    </table>
</body>
</html>
\`\`\`

## 💡 When to Use Tables

**Use tables for:**
- Lists of information
- Data that fits in rows and columns
- Organizing information
- Schedules
- Grades

## 🎯 Try It Yourself

Make a table.

1. Make a table of your friends.

2. Include their names and ages.

3. Add headers.

4. Save and open your page.

## ✅ What You Learned Today

- ✅ How to make tables
- ✅ Table rows with \`<tr>\`
- ✅ Table cells with \`<td>\`
- ✅ Table headers with \`<th>\`

## 🎧 Listen and Learn

Hear about tables in HTML.

## 🗣️ Talk to AI

Ask: "How do I make tables?"

Get help with tables!

## 🏆 Excellent!

Day 9 complete!

⭐ You can make tables now!`;
}

function getDay10Content(): string {
  return `# 🎉 Day 10: Your First Complete Website

## 🎯 Today You Will Build

Your own website.

Put everything together.

Make it beautiful.

## 🏗️ Plan Your Website

Think about what you want.

- What is it about?
- What pages do you need?
- What information to include?

## 📄 Example: About Me Website

Make a website about yourself.

Include:
- Your name
- Your hobbies
- Your favorite things
- Your photos

## 🎨 Complete Website Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
</head>
<body style="background-color: lightblue;">
    <h1 style="color: darkblue;">Welcome to My Website!</h1>
    
    <h2>About Me</h2>
    <p>Hi! My name is <strong>Alex</strong>.</p>
    <p>I am 10 years old.</p>
    <p>I love <em>coding</em> and <em>reading</em>.</p>
    
    <h2>My Hobbies</h2>
    <ul>
        <li>Reading books</li>
        <li>Playing soccer</li>
        <li>Learning HTML</li>
    </ul>
    
    <h2>My Favorite Things</h2>
    <ol>
        <li>Pizza</li>
        <li>Dogs</li>
        <li>Video games</li>
    </ol>
    
    <h2>My Photos</h2>
    <img src="my-photo.jpg" alt="My photo">
    
    <h2>Links</h2>
    <p>Visit <a href="https://www.google.com">Google</a></p>
    <p>Visit <a href="https://www.wikipedia.org">Wikipedia</a></p>
    
    <h2>Contact Me</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
        </tr>
        <tr>
            <td>Alex</td>
            <td>alex@example.com</td>
        </tr>
    </table>
</body>
</html>
\`\`\`

## 🎨 Make It Yours

Change everything.

- Put your name.
- Put your hobbies.
- Put your favorite things.
- Add your photos.
- Add your links.

## 🏆 What You Learned in 10 Days

- ✅ What HTML is
- ✅ How to make HTML pages
- ✅ How to add text
- ✅ How to make lists
- ✅ How to add links
- ✅ How to add images
- ✅ How to style text
- ✅ How to add colors
- ✅ How to make tables
- ✅ How to build a website

## 🎉 Celebration!

### 🎊 You Did It! 🎊

You completed 10 days!

You learned HTML!

You built a website!

You're a web developer now!

## 🏅 Your Certificate

**Certificate of Completion**

This certifies that you have completed:

**CodeEase - HTML for Beginners**

**10-Day Dyslexia-Friendly HTML Course**

**Congratulations!** 🎉

## 🎧 Listen and Learn

Hear your celebration message!

## 🗣️ Talk to AI

Tell the AI: "I finished the course!"

Get a special congratulations!

## 🌟 Next Steps

Keep learning!

Keep building!

Keep creating!

You can do anything!

## ✅ Final Words

You completed 10 days!

You learned so much!

You should be proud!

**You're amazing!** ⭐⭐⭐

**Congratulations, web developer!** 🎉🎊🎈

## 🚀 Keep Going!

Now you can:
- Make more websites
- Learn CSS (styling)
- Learn JavaScript (interactivity)
- Build amazing things!

**You're a coder now!** 🎉`;
}
