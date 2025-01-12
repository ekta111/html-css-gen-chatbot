import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';

// Load the API key from the environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages } = await req.json();

    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system', content: `
            You are a landing page design assistant. Your task is to generate high-conversion landing page code.
            Based on the user input, suggest the best layout and structure. Below are some common landing page types with recommended structures:
            
            - **eCommerce Page**: Product image, benefits, pricing, CTA (e.g., "Buy Now")
            - **SaaS Page**: Features, benefits, pricing, testimonials, CTA (e.g., "Start Free Trial")
            - **Lead Generation Page**: Headline, lead capture form, value proposition, CTA (e.g., "Get Your Free Guide")
            
            Please output the code in a structured format (HTML/CSS/JS/React), with clear comments and explanations for customization.
            Ensure the code is clean, reusable, and properly formatted. If applicable, suggest additional sections the user could add.
            
            If a specific landing page type is requested (e.g., eCommerce, SaaS, Lead Generation), provide recommendations tailored to that type.
           `},
        ...messages,
      ],
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return new Response('Error generating response', { status: 500 });
  }
}
