'use client';

import { FormEvent, useRef, useState } from 'react';
import s from './AboutMeChat.module.scss';

type Topic = {
    id: string;
    title: string;
    prompt: string;
    answer: string;
    keywords: string[];
};

const topics: Topic[] = [
    {
        id: 'background',
        title: 'My background',
        prompt: 'What is your background?',
        answer: 'I’m Siva Mallikarjun Parvatham, a software developer based in Hyderabad, India. I have 4+ years of software development experience, including 2+ years focused on generative AI.',
        keywords: ['background', 'experience', 'career', 'journey', 'about', 'who', 'developer'],
    },
    {
        id: 'ai-work',
        title: 'My AI work',
        prompt: 'What kind of AI systems do you build?',
        answer: 'I work on agentic AI and retrieval-augmented generation (RAG), with a focus on financial-services use cases. I enjoy turning complex ideas into practical, production-minded products.',
        keywords: ['ai', 'agent', 'rag', 'generative', 'genai', 'build', 'work', 'focus'],
    },
    {
        id: 'projects',
        title: 'Projects',
        prompt: 'Which projects can I explore?',
        answer: 'The portfolio features an interactive GPT-style token walkthrough, a source-linked AI Model Atlas, and ClearanceAI—a multi-agent quality platform for planning tests and investigating failures.',
        keywords: ['project', 'portfolio', 'llm', 'atlas', 'clearance', 'demo', 'work'],
    },
    {
        id: 'skills',
        title: 'Skills & approach',
        prompt: 'What are your strengths and approach?',
        answer: 'My work brings together software development, generative AI, agentic workflows, and RAG. I focus on making complex systems useful, understandable, and ready for real-world needs.',
        keywords: ['skill', 'strength', 'approach', 'technology', 'stack', 'software'],
    },
    {
        id: 'learning',
        title: 'Learning & credentials',
        prompt: 'What are you learning?',
        answer: 'I keep learning across AI, cloud, data, and software engineering. My portfolio lists 38 credentials and learning achievements from organizations including Microsoft, AWS, Google, Databricks, Anthropic, GitHub, Cisco, and others.',
        keywords: ['learn', 'learning', 'certificate', 'certification', 'credential', 'study'],
    },
    {
        id: 'opportunities',
        title: 'What’s next',
        prompt: 'What opportunities are you looking for?',
        answer: 'I’m open to senior AI roles where I can help build reliable, useful AI products and bring my software-development and generative-AI experience to a team.',
        keywords: ['goal', 'next', 'role', 'job', 'opportunity', 'hire', 'contact', 'location'],
    },
];

type Message = {
    id: number;
    question: string;
    answer: string;
};

function findTopic(value: string) {
    const query = value.toLowerCase();
    return topics.find((topic) => topic.keywords.some((keyword) => query.includes(keyword)));
}

export function AboutMeChat() {
    const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [draft, setDraft] = useState('');
    const nextMessageId = useRef(0);

    function ask(question: string, topic: Topic) {
        setActiveTopic(topic);
        nextMessageId.current += 1;
        const id = nextMessageId.current;
        setMessages((current) => [...current, { id, question, answer: topic.answer }]);
        setDraft('');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const question = draft.trim();
        if (!question) return;
        const topic = findTopic(question);
        if (topic) {
            ask(question, topic);
            return;
        }
        nextMessageId.current += 1;
        const id = nextMessageId.current;
        setMessages((current) => [...current, {
            id,
            question,
            answer: 'This profile guide covers my background, AI work, projects, skills, learning, and career interests. Pick a topic from the left to explore one of those areas.',
        }]);
        setDraft('');
    }

    return <section className={s.aboutSection} id="about-chat" aria-labelledby="about-title">
        <div className={s.sectionIntro}>
            <p>BEYOND THE PROJECTS</p>
            <h2 id="about-title">A little more about me.</h2>
            <span>A guided profile explorer—choose a question or ask about a topic.</span>
        </div>

        <div className={s.chatWindow}>
            <aside className={s.sidebar} aria-label="About Siva topics">
                <div className={s.sidebarBrand}>
                    <span className={s.brandMark}>SM</span>
                    <span><strong>Meet Siva</strong><small>Profile guide</small></span>
                </div>
                <p className={s.sidebarLabel}>EXPLORE</p>
                <div className={s.topicList}>
                    {topics.map((topic) => <button
                        key={topic.id}
                        type="button"
                        className={activeTopic?.id === topic.id ? s.activeTopic : s.topic}
                        aria-pressed={activeTopic?.id === topic.id}
                        onClick={() => ask(topic.prompt, topic)}
                    >
                        <span aria-hidden="true">{topic.id === 'projects' ? '▧' : topic.id === 'opportunities' ? '↗' : '○'}</span>
                        {topic.title}
                    </button>)}
                </div>
                <div className={s.sidebarNote}>
                    <span>ABOUT THIS GUIDE</span>
                    <p>Answers are curated from the information shared on this portfolio.</p>
                </div>
            </aside>

            <div className={s.conversation}>
                <header className={s.conversationHeader}>
                    <span>PERSONAL PROFILE</span>
                    <a href="mailto:sivamallikarjun2601@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
                </header>

                <div className={s.conversationBody} aria-live="polite">
                    {messages.length === 0 ? <div className={s.welcome}>
                        <div className={s.welcomeMark} aria-hidden="true">SM</div>
                        <p className={s.welcomeEyebrow}>HELLO, I’M SIVA</p>
                        <h3>What would you like to know about me?</h3>
                        <p className={s.welcomeText}>Explore my background, the AI systems I build, and what I’m learning next.</p>
                        <div className={s.suggestions}>
                            {topics.slice(0, 4).map((topic) => <button key={topic.id} type="button" onClick={() => ask(topic.prompt, topic)}>
                                {topic.prompt}<span aria-hidden="true">↗</span>
                            </button>)}
                        </div>
                    </div> : <div className={s.messageList}>
                        {messages.map((message) => <article className={s.messagePair} key={message.id}>
                            <p className={s.userMessage}>{message.question}</p>
                            <div className={s.answerMessage}>
                                <span className={s.answerMark}>SM</span>
                                <p>{message.answer}</p>
                            </div>
                        </article>)}
                    </div>}
                </div>

                <form className={s.composer} onSubmit={handleSubmit}>
                    <label className={s.composerLabel} htmlFor="about-question">ASK ABOUT SIVA</label>
                    <div className={s.composerInput}>
                        <input
                            id="about-question"
                            type="text"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            placeholder="Ask about my experience, projects, or skills..."
                        />
                        <button type="submit" disabled={!draft.trim()} aria-label="Send question">↑</button>
                    </div>
                    <p>Guided answers based on the information published on this portfolio.</p>
                </form>
            </div>
        </div>
    </section>;
}
