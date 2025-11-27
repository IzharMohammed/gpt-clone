import { getGroqChatCompletion } from "@/lib/groq";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { webSearch } from "@/lib/tools";
import { NextResponse } from "next/server";

const baseMessages = [
    {
        role: 'system',
        content: `You are a smart personal assistant.
                    If you know the answer to a question, answer it directly in plain English.
                    If the answer requires real-time, local, or up-to-date information, or if you don’t know the answer, use the available tools to find it.
                    You have access to the following tool:
                    webSearch(query: string): Use this to search the internet for current or unknown information.
                    Decide when to use your own knowledge and when to use the tool.
                    Do not mention the tool unless needed.

                    Examples:
                    Q: What is the capital of France?
                    A: The capital of France is Paris.

                    Q: What’s the weather in Mumbai right now?
                    A: (use the search tool to find the latest weather)

                    Q: Who is the Prime Minister of India?
                    A: The current Prime Minister of India is Narendra Modi.

                    Q: Tell me the latest IT news.
                    A: (use the search tool to get the latest news)

                    current date and time: ${new Date().toUTCString()}`,
    },
] as ChatCompletionMessageParam[];

export async function POST(req: Request) {
    const { message } = await req.json();
    baseMessages.push({ role: 'user', content: message });

    const chatCompletion = await getGroqChatCompletion(baseMessages);
    const aiMessage = chatCompletion.choices[0].message;

    if (!aiMessage.content) {
        return NextResponse.json({ error: 'AI message content is missing' }, { status: 500 });
    }

    baseMessages.push({ role: 'assistant', content: aiMessage.content });

    if (aiMessage.content) {
        return NextResponse.json({ message: aiMessage.content }, { status: 200 });
    }

    if (!aiMessage.tool_calls) {
        return NextResponse.json({ error: 'AI message tool calls is missing' }, { status: 500 });
    }

    for (const toolCall of aiMessage.tool_calls) {
        if (toolCall.function.name === "webSearch") {
            const args = JSON.parse(toolCall.function.arguments);
            console.log(`Tool call received: webSearch with args: ${JSON.stringify(args)}`);
            const toolResult = await webSearch(args);

            baseMessages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                content: toolResult,
            });
        }
    }

    return NextResponse.json({ message: aiMessage.content });
}