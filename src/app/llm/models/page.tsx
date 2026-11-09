import React from 'react';
import { LLMWorkspace } from '@/src/llm/LLMWorkspace';

export const metadata = {
    title: 'AI Model Atlas | Siva Parvatham',
    description: 'Compare selected source-linked AI model profiles, capabilities, and public architecture details.',
};

export default function Page() {
    return <LLMWorkspace initialView="models" />;
}
