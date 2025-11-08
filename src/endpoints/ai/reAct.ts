import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import fs from 'fs';

const formTool = tool(
    async (input): Promise<string> => {
        return "created form"
    },
    {
        name: "create_form",
        description: "Use this to create a form on the frontend.",
        schema: z.object({
          title: z.string().describe("The title of the form"),
        }),
    }
)

const contextTool = tool(
    async (input): Promise<string> => {
        const context = fs.readFileSync('./src/endpoints/ai/prompts/metaloss-agent-landing-chatbot-context-ES.md', 'utf-8')
        return context;
    },
    {
        name: "get_context",
        description: "Use this to get context information about the company.",
        schema: z.object({}),
    }
)

const tools = [formTool, contextTool];

const websiteAgent = createReactAgent({
    llm: new ChatOpenAI({ model: "gpt-4.1-nano-2025-04-14", temperature: 3 }),
    prompt: `You are a AI marketing agent helping users gain insights about Metaloss Intelligence in the website.`,
    tools: tools,
});

export default websiteAgent;