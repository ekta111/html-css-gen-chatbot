
# Chatbot for HTML & CSS Generation

## Overview

This project is a chatbot application built to generate well-structured HTML and CSS code in response to user prompts, designed to facilitate rapid MVP creation for landing pages. It includes a chat interface where users can input their requirements, and the chatbot generates the code and provides a live preview.This project is powered by Next.js, TypeScript, Tailwind CSS, with authentication and data storage provided by NextAuth.js and PostgreSQL(SupaBase) via Prisma.

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI Components**: Tailwind CSS, ShadcnUI
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (Supabase) with Prisma 
- **GenAI API**: Integrated with a chosen GenAI API provider
- **Hosting**: Vercel

## Functional Requirements

### 1. **Authentication System**
   - Implemented a login/logout and signup page using **NextAuth.js**.
   - Supports email/password authentication

### 2. **Chat Interface**
   - A dedicated chat page where users can input prompts.
   - Integrated a GenAI-powered chatbot that generates HTML and CSS code based on the prompt.
   - Displays the generated HTML/CSS code with a live preview.

### 3. **HTML & CSS Code Generation**
   - The chatbot generates complete and well-structured HTML and CSS code in response to user input.
   - Users can see the live preview of the generated code within the chat interface.
   - An optional feature allows users to download the generated HTML file.

### 4. **System Prompt Optimization**
   - Fine-tuned the GenAI system prompts to optimize for landing page creation.
   - Improved chatbot responses with predefined templates and structure suggestions for landing pages.

### Bonus Features

- **Landing Page Optimization**: Incorporated predefined templates for landing page generation to enhance chatbot responses.
- **System Prompt Optimization**: Implemented strategies to improve code quality and user satisfaction.

## Non-Functional Requirements

- Adhered to **best practices for TypeScript**.
- Ensured the **UI/UX** is responsive and user-friendly.
- Implemented **secure and scalable authentication** using **NextAuth.js**.

## Setup and Installation

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatbot-html-css.git
cd chatbot-html-css
```

### 2. Install dependencies

Make sure you have Node.js and npm installed. Then, run:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following environment variables:

```plaintext
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
DATABASE_URL=your-database-connection-string
GENAI_API_KEY=your-genai-api-key
```

Replace the placeholders with your actual credentials for the database and GenAI API.

### 4. Run the development server

```bash
npm run dev
```

Now, open your browser and navigate to `http://localhost:3000` to access the application.

## Deployment

This application is deployed on **Vercel**. You can access the live demo at:

[Live Demo URL](https://your-deployed-app.vercel.app)

## Code Structure

- `pages/`: Contains Next.js pages for the authentication flow and chatbot interface.
- `components/`: Contains reusable UI components like buttons, chatbox, and live preview components.
- `lib/`: Includes utility functions, including the API integration with the GenAI API provider.
- `prisma/`: Contains Prisma schema and database migration files.
- `styles/`: Contains Tailwind CSS configurations and other styles.

## Features and Enhancements

- **Live Preview**: Users can see a real-time preview of the generated HTML/CSS code.
- **Download Option**: The HTML code can be downloaded for use in projects.
- **User Authentication**: Secure login and signup using **NextAuth.js**.
- **Chatbot Customization**: Fine-tuned system prompts to optimize chatbot responses for landing page creation.

## Future Improvements

- **Mobile-First Design**: Ensure that the UI is fully optimized for mobile devices.
- **Advanced Templates**: Add more predefined templates for users to choose from.
- **Feedback Loop**: Implement a feedback system to improve chatbot responses over time.

## Additional Libraries and Tools

- **Tailwind CSS**: Used for rapid UI development and responsiveness.
- **ShadcnUI**: Provides pre-built components to enhance the user interface.
- **Prisma**: ORM for seamless database management and interactions.
- **Vercel’s AI SDK**: Utilized to integrate the GenAI API with the application.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

---

## Conclusion

This project demonstrates how a chatbot can be integrated with AI to help users rapidly generate HTML and CSS code, streamlining the process of creating landing pages. With an intuitive interface, responsive design, and secure authentication, it provides a valuable tool for developers looking to quickly prototype landing pages.

