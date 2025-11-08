'use client';

import { useEffect, useRef, JSX } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '@ai-sdk/react';
import { Button } from '@payloadcms/ui';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import React, { useState } from 'react';
const dummyMessages: any[] = [
  { role: 'assistant', content: 'Hola, interactua conmigo para encontrar lo que quierés más rápido' },
]


const MessageForm = ({messages, toolCallId, addToolResult}: {messages: any[], toolCallId: string, addToolResult: any}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const conversationHistory = messages.map((message) => {
    if (message.role === 'user') {
      return `User: ${message.content}`;
    } else if (message.role === 'assistant') {
      return `Assistant: ${message.content}`;
    }
    return message.content;
  });

  const sendForm = async () => {
    await fetch('/api/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, message, conversationHistory }),
    });
    addToolResult({ toolCallId, result: 'Form submitted' });
  };

  return (
    <form
      key={toolCallId}
      className="my-4 p-6 border rounded-xl text-default bg-background shadow-md flex flex-col gap-4 max-w-md"
    >
      <div className="text-lg font-semibold mb-2">Por favor, completa el formulario:</div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`email-${toolCallId}`}>Email</Label>
        <Input
          id={`email-${toolCallId}`}
          type="email"
          placeholder="Ingresa tu email"
          className="w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`name-${toolCallId}`}>Nombre</Label>
        <Input
          id={`name-${toolCallId}`}
          type="text"
          placeholder="Ingresa tu nombre"
          className="w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`message-${toolCallId}`}>Mensaje</Label>
        <Input
          id={`message-${toolCallId}`}
          type="text"
          placeholder="Ingresa tu mensaje"
          className="w-full"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <Button
        type="button"
        onClick={() => sendForm()}
        className="mt-4 w-full"
      >
        Enviar
      </Button>
      <Button
        type="button"
        onClick={() => addToolResult({ toolCallId, result: 'Form canceled' })}
        className="mt-4 w-full"
      >
        Cancelar
      </Button>
    </form>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat(
    {
      initialMessages: dummyMessages,
    }
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[70vh] max-h-[90vh] w-full max-w-full bg-background/50 rounded-xl shadow-md border border-foreground sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-w-0 scrollbar-hide">
        {messages?.map(m => (
          <div data-nosnippet key={m.id}>
            <strong>{m.role === "assistant" ? "Metaloss AI" : "You"}</strong>
            {m.parts?.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <ReactMarkdown key={i}>{part.text}</ReactMarkdown>;
                case 'tool-invocation':
                  const toolInvocation = part.toolInvocation;
                  const toolCallId = toolInvocation.toolCallId;
                  if (toolInvocation.toolName === 'formTool') {
                    return <MessageForm messages={messages} toolCallId={toolCallId} addToolResult={addToolResult} />
                  }

                  if (
                    toolInvocation.toolName === 'confirmationTool' &&
                    toolInvocation.state === 'call'
                  ) {
                    return (
                      <div key={toolCallId}>
                        {toolInvocation.args.title}
                        <div className="flex gap-4 mt-4">
                          <Button
                            type="button"
                            className="flex-1 bg-blue-500 text-white rounded"
                            onClick={() =>
                              addToolResult({
                                toolCallId,
                                result: 'Yes, confirmed.',
                              })
                            }
                            aria-label="Confirmar sí"
                          >
                            Sí
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 bg-white text-blue-500 border border-blue-500 rounded"
                            onClick={() =>
                              addToolResult({
                                toolCallId,
                                result: 'No, denied.',
                              })
                            }
                            aria-label="Confirmar no"
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    );
                  }
              }
            })}
            <br />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex">
        <input
          value={input}
          placeholder="Escribe aquí..."
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 rounded-xl outline-foreground focus:ring-2 focus:ring-primary bg-background"
        />
      </form>
    </div>
  );
}