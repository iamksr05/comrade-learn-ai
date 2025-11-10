# Comrade Learn AI 🎓✨

<div align="center">

![Comrade Learn AI](https://img.shields.io/badge/Comrade-Learn%20AI-blue?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-Love-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-Non%20Profit-green?style=for-the-badge)

**An inclusive AI-powered learning platform designed to support students with diverse learning needs**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 🌟 About

Comrade Learn AI is a compassionate, AI-driven educational platform created to make learning accessible for students with diverse learning needs, including ADHD, Dyslexia, and hearing impairments. Built with love and dedication, this platform aims to break down barriers in education and provide personalized learning experiences for every student.

### Our Journey

This project was born during the **Polaris x Replit Hackathon**, where our team poured 36 hours of intense coding, collaboration, and passion into creating something meaningful. What started as a hackathon project has evolved into something we're truly proud of - a tool that can genuinely make a difference in students' lives.

We're incredibly grateful for the opportunity to build this and are excited to share it with the world. After much consideration, we've decided to open-source this project and release it as a **non-profit initiative** for students who need it most. Education should be accessible to everyone, regardless of their learning differences, and we hope Comrade Learn AI can play a small part in making that vision a reality.

We're humbled by the positive impact this could have and are committed to continuously improving it based on feedback from the community. Every student deserves the tools and support they need to succeed, and we're honored to contribute to that mission.

---

## ✨ Features

### 🎯 Core Features

- **🤖 AI-Powered Learning Companion**
  - Interactive AI assistant to guide students through their learning journey
  - Personalized learning recommendations
  - Real-time assistance and support

- **📚 Specialized Learning Modules**
  - Customized courses for ADHD learners
  - Dyslexia-friendly content and resources
  - Adaptive learning paths based on individual needs

- **👋 Sign Language Support**
  - Real-time sign language recognition for input
  - Sign language output and visualization
  - Seamless communication for hearing-impaired students

- **🎨 Interactive Course Generator**
  - AI-generated personalized courses
  - Dynamic content adaptation
  - Engaging multimedia learning experiences

- **📊 Progress Tracking**
  - Visual progress indicators
  - Learning analytics and insights
  - Achievement tracking

- **👤 User Dashboard**
  - Personalized learning hub
  - Course management
  - Profile and settings customization

- **🌙 Modern UI/UX**
  - Beautiful, accessible interface
  - Dark/light theme support
  - Responsive design for all devices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with **TypeScript** - Modern, type-safe UI development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing

### Backend & Services
- **Supabase** - Backend-as-a-Service (Authentication, Database)
- **AI Integration** - Advanced AI models for personalized learning

### Features & Libraries
- **Sign Language Recognition** - Real-time gesture detection
- **Progress Tracking** - Learning analytics
- **Theme Management** - Dark/light mode support
- **Responsive Design** - Mobile-first approach

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/comrade-learn-ai.git
   cd comrade-learn-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

---

## 📁 Project Structure

```
comrade-learn-ai/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── DisabilityCard.tsx
│   │   ├── SignLanguageInput.tsx
│   │   ├── SignLanguageOutput.tsx
│   │   └── ...
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── AICompanion.tsx
│   │   ├── LearningModule.tsx
│   │   └── ...
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── data/               # Course data and content
├── public/                 # Static assets
└── dist/                   # Build output
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's fixing bugs, adding features, improving documentation, or sharing feedback, your help makes this project better for everyone.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

We're grateful for every contribution, no matter how small. Together, we can make education more accessible for everyone.

---

## 🎯 Roadmap

- [ ] Enhanced AI companion capabilities
- [ ] Additional learning disability support
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Community features and forums
- [ ] Integration with more educational tools
- [ ] Accessibility improvements

---

## 🙏 Acknowledgments

- **Polaris x Replit Hackathon** - For providing the platform and inspiration
- **Our Amazing Team** - For the incredible collaboration and dedication
- **Open Source Community** - For the amazing tools and libraries that made this possible
- **Students and Educators** - For inspiring us to build something meaningful

---

## 📝 License

This project is open-source and released under a non-profit license. We're committed to keeping this project free and accessible for students who need it most.

---

## 💬 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/your-username/comrade-learn-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/comrade-learn-ai/discussions)

---

## 🌈 Our Mission

We believe that every student, regardless of their learning differences, deserves access to quality education and the tools they need to succeed. Comrade Learn AI is our humble contribution to making that vision a reality.

We're honored to be part of this journey and are grateful for the opportunity to serve students who need support the most. If this project helps even one student learn more effectively, we'll consider it a success.

Thank you for being part of this mission. Together, we can make education more inclusive, accessible, and empowering for everyone.

---

<div align="center">

**Made with ❤️ by the Comrade Learn AI Team**

*"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela*

⭐ **Star this repo if you find it helpful!** ⭐

</div>

