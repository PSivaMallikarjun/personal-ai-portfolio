import React from 'react';
import { LLMWorkspace } from '@/src/llm/LLMWorkspace';

export const metadata = {
  title: 'AI Model Atlas | Siva Parvatham',
  description: 'Browse 732 searchable AI model profiles and their interactive learning visualizations, with a token walkthrough available.',
};

export default function Page() {
    return <LLMWorkspace initialView="models" />;
}
