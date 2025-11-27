import { getGroqChatCompletion } from "@/lib/groq";
import { webSearch } from "@/lib/tools";
import { NextResponse } from "next/server";
import { baseMessages } from "@/lib/constant";

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