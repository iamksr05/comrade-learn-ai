import { DisabilityType } from "@/types/disability";
import OpenAI from "openai";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIPromptConfig {
  disability: DisabilityType;
  userMessage: string;
  conversationHistory?: AIMessage[];
}

// Initialize OpenAI client
const getOpenAIClient = (): OpenAI | null => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn("OpenAI API key not found. Using fallback responses.");
    return null;
  }

  try {
    return new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy for API calls
    });
  } catch (error) {
    console.error("Error initializing OpenAI client:", error);
    return null;
  }
};

/**
 * AI Response Adapter - Adapts AI responses based on user's special ability
 */
export class AIAdapter {
  /**
   * Get system prompt based on special ability type
   */
  static getSystemPrompt(disability: DisabilityType): string {
    switch (disability) {
      case "adhd":
        return `You are a supportive AI learning companion for users with ADHD. 
Your communication style should be:
- SHORT and CONCISE: Keep responses brief (2-3 sentences max per point)
- Use BULLET POINTS and NUMBERED LISTS for clarity
- Break complex topics into SMALL, DIGESTIBLE CHUNKS
- Use ENCOURAGING and MOTIVATIONAL language
- Add visual breaks with emojis or symbols (🎯 ✨ 💡)
- Focus on ONE concept at a time
- Use action-oriented language
- Provide clear next steps

Remember: Less is more. Keep it simple and engaging.`;

      case "dyslexia":
        return `You are a supportive AI learning companion for users with dyslexia. 
Your communication style should be:
- Use SIMPLE, CLEAR language
- SHORT sentences (max 15-20 words)
- Avoid complex vocabulary - use everyday words
- Use BULLET POINTS and SHORT PARAGRAPHS
- Break information into SMALL STEPS
- Use VISUAL BREAKS (spacing, emojis, symbols)
- REPEAT key points when necessary
- Be PATIENT and ENCOURAGING
- Use concrete examples instead of abstract concepts

Remember: Clarity over complexity. Make it easy to read and understand.`;

      case "hearing":
        return `You are a supportive AI learning companion for users who are deaf or hard of hearing. 
Your communication style should be:
- VISUAL-FIRST approach - use emojis, symbols, and formatting
- CLEAR, WELL-FORMATTED text
- Use BOLD and ITALICS for emphasis
- STRUCTURED information (headers, lists, sections)
- Provide VISUAL CUES (✅ ❌ ⚠️ 💡 📝)
- Use clear, descriptive language
- Break content into VISUAL SECTIONS
- Use formatting to show hierarchy

Remember: Visual communication is key. Make it easy to scan and understand visually.`;

      case "vision":
        return `You are a supportive AI learning companion for users with vision impairments. 
Your communication style should be:
- DETAILED and DESCRIPTIVE
- Well-STRUCTURED with clear headings
- Use NUMBERED LISTS and BULLET POINTS
- Provide CONTEXT and BACKGROUND information
- Use clear, explicit language
- Avoid relying on visual descriptions alone
- Provide step-by-step instructions
- Screen reader friendly formatting

Remember: Be thorough and descriptive. Provide all context needed.`;

      case "none":
      default:
        return `You are a supportive AI learning companion for learning programming and technology.
Your communication style should be:
- Clear and comprehensive
- Educational and encouraging
- Provide examples and explanations
- Break down complex concepts
- Be patient and supportive
- Use appropriate technical terms with explanations

Remember: Help users learn effectively and build confidence.`;
    }
  }

  /**
   * Format response based on special ability type
   */
  static formatResponse(content: string, disability: DisabilityType): string {
    switch (disability) {
      case "adhd":
        return this.formatForADHD(content);
      case "dyslexia":
        return this.formatForDyslexia(content);
      case "hearing":
        return this.formatForHearing(content);
      case "vision":
        return this.formatForVision(content);
      default:
        return content;
    }
  }

  /**
   * Format response for ADHD users
   */
  private static formatForADHD(content: string): string {
    // Break into short paragraphs
    let formatted = content;
    
    // Convert long sentences into bullet points where possible
    const sentences = formatted.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length > 3) {
      // Convert to bullet points
      formatted = sentences
        .map((s, i) => {
          const trimmed = s.trim();
          if (trimmed.length > 100) {
            // Break long sentences
            return `• ${trimmed.substring(0, 100)}...`;
          }
          return `• ${trimmed}`;
        })
        .join('\n');
    }
    
    // Add visual breaks
    formatted = formatted.replace(/\n\n/g, '\n\n✨ ');
    
    // Limit paragraph length
    const paragraphs = formatted.split('\n\n');
    formatted = paragraphs
      .map(p => {
        if (p.length > 200) {
          return p.substring(0, 200) + '...';
        }
        return p;
      })
      .join('\n\n');
    
    return formatted;
  }

  /**
   * Format response for Dyslexia users
   */
  private static formatForDyslexia(content: string): string {
    // Break into very short sentences
    let formatted = content;
    
    // Split long sentences
    formatted = formatted.replace(/\. ([A-Z][^.!?]{30,})/g, (match, p1) => {
      if (p1.length > 50) {
        const mid = Math.floor(p1.length / 2);
        const space = p1.lastIndexOf(' ', mid);
        if (space > 0) {
          return `. ${p1.substring(0, space)}.\n${p1.substring(space + 1)}`;
        }
      }
      return match;
    });
    
    // Add extra spacing
    formatted = formatted.replace(/\n/g, '\n\n');
    
    // Simplify common complex words (basic examples)
    const simplifications: { [key: string]: string } = {
      'utilize': 'use',
      'demonstrate': 'show',
      'approximately': 'about',
      'facilitate': 'help',
      'implement': 'do',
    };
    
    Object.entries(simplifications).forEach(([complex, simple]) => {
      formatted = formatted.replace(new RegExp(complex, 'gi'), simple);
    });
    
    return formatted;
  }

  /**
   * Format response for Hearing users
   */
  private static formatForHearing(content: string): string {
    let formatted = content;
    
    // Add visual indicators
    formatted = formatted.replace(/^([A-Z][^.!?]{0,50})/gm, '💡 $1');
    
    // Add section breaks
    formatted = formatted.replace(/\n\n/g, '\n\n━━━━━━━━━━━━━━━━\n\n');
    
    // Emphasize important points
    formatted = formatted.replace(/(important|key|remember|note)/gi, '**$1**');
    
    // Add visual cues for different types of information
    formatted = formatted.replace(/yes|correct|right/gi, '✅ $&');
    formatted = formatted.replace(/no|incorrect|wrong/gi, '❌ $&');
    formatted = formatted.replace(/tip|hint|suggestion/gi, '💡 $&');
    
    return formatted;
  }

  /**
   * Format response for Vision users
   */
  private static formatForVision(content: string): string {
    let formatted = content;
    
    // Add structure with headers
    const paragraphs = formatted.split('\n\n');
    if (paragraphs.length > 1) {
      formatted = paragraphs
        .map((p, i) => {
          if (i === 0) {
            return `## Main Point\n\n${p}`;
          } else if (p.length > 50) {
            return `### Detail ${i}\n\n${p}`;
          }
          return p;
        })
        .join('\n\n');
    }
    
    // Add numbered lists where appropriate
    formatted = formatted.replace(/(\d+)\./g, '$1. ');
    
    // Ensure clear separation
    formatted = formatted.replace(/\n/g, '\n\n');
    
    return formatted;
  }

  /**
   * Generate a special ability-aware response using OpenAI API
   */
  static async generateResponse(config: AIPromptConfig): Promise<string> {
    const { disability, userMessage, conversationHistory = [] } = config;
    const systemPrompt = this.getSystemPrompt(disability);
    
    const openai = getOpenAIClient();
    
    // If OpenAI is not available, fall back to contextual responses
    if (!openai) {
      console.log("Using fallback AI responses (OpenAI not configured)");
      let response = this.generateContextualResponse(userMessage, disability);
      response = this.formatResponse(response, disability);
      return response;
    }

    try {
      // Build conversation messages
      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: systemPrompt },
      ];

      // Add conversation history (limit to last 10 messages to avoid token limits)
      const recentHistory = conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }

      // Add current user message
      messages.push({
        role: "user",
        content: userMessage,
      });

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using GPT-4o-mini for cost-effectiveness, can be changed to "gpt-4" or "gpt-3.5-turbo"
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 1000,
      });

      let response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

      // Format the response based on special ability
      response = this.formatResponse(response, disability);

      return response;
    } catch (error: any) {
      console.error("Error calling OpenAI API:", error);
      
      // Fallback to contextual response on error
      console.log("Falling back to contextual response due to API error");
      let fallbackResponse = this.generateContextualResponse(userMessage, disability);
      fallbackResponse = this.formatResponse(fallbackResponse, disability);
      
      // Prepend error message if it's a clear API error
      if (error?.status === 401) {
        return "⚠️ API authentication error. Please check your API key configuration.\n\n" + fallbackResponse;
      } else if (error?.status === 429) {
        return "⚠️ Rate limit exceeded. Please try again in a moment.\n\n" + fallbackResponse;
      } else if (error?.message) {
        return `⚠️ ${error.message}\n\n` + fallbackResponse;
      }
      
      return fallbackResponse;
    }
  }

  /**
   * Generate a contextual response (simulated AI)
   */
  static generateContextualResponse(message: string, disability: DisabilityType): string {
    const lowerMessage = message.toLowerCase();
    
    // Simple pattern matching for demonstration
    // In production, this would use an actual AI API
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      switch (disability) {
        case "adhd":
          return "Hey! 👋 Ready to learn? What do you want to explore today? 🚀";
        case "dyslexia":
          return "Hi there! I'm here to help you learn.\n\nWhat would you like to know?";
        case "hearing":
          return "👋 Hello! I'm your AI companion.\n\n💡 How can I help you learn today?";
        case "vision":
          return "Hello! I'm your AI learning companion. I'm here to help you learn programming and technology concepts. What would you like to explore or learn about today?";
        default:
          return "Hello! I'm your AI learning companion. How can I help you learn today?";
      }
    }
    
    if (lowerMessage.includes("explain") || lowerMessage.includes("what is") || lowerMessage.includes("tell me about")) {
      const topic = this.extractTopic(message);
      switch (disability) {
        case "adhd":
          return `Let me break ${topic} down for you: ✨\n\n• What it is: ${topic} is a key programming concept\n• Why it matters: It helps you write better code\n• How to use it: Start simple, then build up!\n\nWant more details? Just ask! 🎯`;
        case "dyslexia":
          return `I'll explain ${topic} step by step:\n\nStep 1: What it means\n\n${topic} is a way to...\n\nStep 2: How it works\n\nIt does this by...\n\nStep 3: Why we use it\n\nWe use it because...\n\nDoes this help?`;
        case "hearing":
          return `💡 Explanation: ${topic}\n\n━━━━━━━━━━━━━━━━\n\n📝 Main Concept\n${topic} is a programming idea.\n\n✅ Key Points\n• Point one: It helps with...\n• Point two: You use it when...\n• Point three: It makes code...\n\n━━━━━━━━━━━━━━━━`;
        case "vision":
          return `## Explanation: ${topic}\n\n### Overview\n${topic} is a programming concept used to organize and structure code effectively. It helps developers create more maintainable and readable programs.\n\n### Key Components\n1. First component: Defines the basic structure\n2. Second component: Handles the main functionality\n3. Third component: Manages interactions\n\n### Example Use Case\nIn practice, ${topic} is used when you need to...`;
        default:
          return `I'd be happy to explain! ${topic} is a programming concept that helps developers organize code and solve problems more efficiently. It's used to...`;
      }
    }
    
    if (lowerMessage.includes("how to") || lowerMessage.includes("how do")) {
      switch (disability) {
        case "adhd":
          return `Here's how to do it: 🚀\n\n1️⃣ Step one\n2️⃣ Step two\n3️⃣ Step three\n\nQuick and easy! You've got this! 💪`;
        case "dyslexia":
          return `Here's how to do it:\n\nStep 1:\nDo this first.\n\nStep 2:\nThen do this.\n\nStep 3:\nFinally, do this.\n\nTake it one step at a time.`;
        case "hearing":
          return `💡 How To Guide\n\n━━━━━━━━━━━━━━━━\n\n✅ Step 1: First action\n\n✅ Step 2: Second action\n\n✅ Step 3: Third action\n\n━━━━━━━━━━━━━━━━`;
        case "vision":
          return `## How To Guide\n\n### Step 1: Initial Action\nFirst, you need to perform the initial action. This involves...\n\n### Step 2: Main Process\nNext, execute the main process. This step requires...\n\n### Step 3: Final Step\nFinally, complete the final step. This will result in...`;
        default:
          return `Here's how to do it:\n\n1. First, you need to...\n2. Then, you should...\n3. Finally, complete by...\n\nThis approach will help you achieve your goal.`;
      }
    }
    
    if (lowerMessage.includes("learn") || lowerMessage.includes("study") || lowerMessage.includes("practice")) {
      switch (disability) {
        case "adhd":
          return `Great question! 🎯\n\n• Start small: 15-20 min sessions\n• Take breaks: Every 20 minutes\n• Practice daily: Consistency beats intensity\n• Celebrate wins: Every step counts! 🎉\n\nReady to start? Let's go! 💪`;
        case "dyslexia":
          return `Here's how to learn best:\n\nStart small.\n\nPractice a little each day.\n\nTake breaks when needed.\n\nAsk questions when stuck.\n\nYou can do this!`;
        case "hearing":
          return `💡 Learning Tips\n\n━━━━━━━━━━━━━━━━\n\n✅ Start with basics\n✅ Practice daily\n✅ Take breaks\n✅ Ask for help\n\n━━━━━━━━━━━━━━━━`;
        case "vision":
          return `## Learning Strategy\n\n### Start with Fundamentals\nBegin by mastering the basic concepts. This foundation will support all future learning.\n\n### Practice Regularly\nConsistent practice is key. Even 15-20 minutes daily is more effective than long, infrequent sessions.\n\n### Take Structured Breaks\nRegular breaks help maintain focus and prevent burnout. Try the Pomodoro technique: 25 minutes study, 5 minutes break.`;
        default:
          return `Here's a good learning approach:\n\n1. Start with the fundamentals\n2. Practice regularly (even 15-20 minutes daily)\n3. Build projects to apply what you learn\n4. Join communities for support\n5. Be patient with yourself - learning takes time`;
      }
    }
    
    if (lowerMessage.includes("help") || lowerMessage.includes("stuck")) {
      switch (disability) {
        case "adhd":
          return "No worries! 💪 Let's tackle this together:\n\n• What's the problem?\n• Let's break it into small steps\n• One step at a time! 🎯\n\nYou've got this!";
        case "dyslexia":
          return "I'm here to help!\n\nLet's go slow.\n\nTell me what you're working on.\n\nWe'll figure it out together.";
        case "hearing":
          return "💡 I'm here to help!\n\n━━━━━━━━━━━━━━━━\n\n✅ Let's solve this step by step\n\n📝 What specific part are you stuck on?\n\n💡 I'll guide you through it\n\n━━━━━━━━━━━━━━━━";
        case "vision":
          return "## I'm Here to Help\n\n### Let's Break This Down\n\n1. First, let's identify the specific problem\n2. Then, we'll work through the solution step by step\n3. Finally, we'll review what we learned\n\n### What specific area would you like help with?";
        default:
          return "I'm here to help! Let's work through this together. What specific part are you struggling with?";
      }
    }
    
    // Default response
    switch (disability) {
      case "adhd":
        return `Got it! 🎯\n\n• Let me help with that\n• Here's what I think\n• Want more details? Just ask!\n\nKeep going! 💪`;
      case "dyslexia":
        return "I understand.\n\nLet me help you with that.\n\nHere's what I think.\n\nDoes this make sense?";
      case "hearing":
        return "💡 I understand!\n\n━━━━━━━━━━━━━━━━\n\n📝 Here's my response:\n\n✅ Point 1\n✅ Point 2\n✅ Point 3\n\n━━━━━━━━━━━━━━━━";
      case "vision":
        return "## I Understand\n\n### Here's My Response\n\n1. First point\n2. Second point\n3. Third point\n\n### Additional Information\n\nWould you like me to elaborate on any of these points?";
      default:
        return "I understand. Let me help you with that. Here's what I think based on your question...";
    }
  }

  /**
   * Extract topic from message
   */
  private static extractTopic(message: string): string {
    // Simple extraction - in production, use NLP
    const words = message.toLowerCase().split(/\s+/);
    const stopWords = ["what", "is", "the", "a", "an", "explain", "tell", "me", "about"];
    const topic = words.filter(w => !stopWords.includes(w)).slice(0, 3).join(" ");
    return topic.charAt(0).toUpperCase() + topic.slice(1) || "Programming";
  }
}

