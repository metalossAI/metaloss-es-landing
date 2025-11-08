import fs from 'fs';
import payload from 'payload'
import { Endpoint } from "payload"
import { CoreMessage, generateText, streamText, tool } from 'ai';
import {deepseek} from '@ai-sdk/deepseek';
import {openai} from '@ai-sdk/openai';

import z from "zod";
import path from 'path';

const formTool = tool({
    description: 'Tool to spawn a contact form so that the user can contact the team.',
    parameters: z.object({
        title: z.string().describe('The title of the form'),
    }),
})

const confirmationTool = tool({
    description: 'Tool gather input from the user like confirmation or new data',
    parameters: z.object({
        title: z.string().describe('The title of the form'),
    }),
})

const contextTool = tool({
    description: "Tool returning a document with the company's information. Useful for context in the conversation.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const filePath = path.join(process.cwd(), 'public', 'llms.txt');
        const context = fs.readFileSync(filePath, 'utf-8');
        return context;
      } catch (error) {
        console.error('Error reading file:', error);
        return 'Error reading file';
      }
    }
});

const chatEndpoint : Endpoint = {
    path: '/chat',
    method: 'post',
    handler: async (req) => {
        if (!req.json) {
            return Response.json({ error: 'Invalid request' }, { status: 400 })
        }
        const data = await req.json() as any
        const slicedMessages = data.messages.slice(-4)
        console.log(slicedMessages.map((message: any) => message.parts))
        const response = streamText({
            model: openai('gpt-4.1-nano-2025-04-14', {}),
            temperature: 0.33,
            maxTokens: 1000,
            system: `You are a AI marketing agent helping users gain insights about Metaloss Intelligence.`,
            messages: slicedMessages,
            maxSteps:2,
            tools: {
                confirmationTool,
                contextTool,
                formTool,
            }
        });
        return response.toDataStreamResponse();
    }
}

export default chatEndpoint