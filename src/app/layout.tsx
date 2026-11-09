'use client';
import React from 'react';
import s from './layout.module.scss';
import '@/styles/main.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <html lang="en" className={s.html} suppressHydrationWarning>
        <head>
            <title>Siva Parvatham | Generative AI &amp; Agentic AI Engineer</title>
            <meta name="description" content="Siva Mallikarjun Parvatham is a senior software developer building production-ready generative AI, multi-agent, and RAG systems for financial services." />
            <meta property="og:title" content="Siva Parvatham | Generative AI & Agentic AI" />
            <meta property="og:description" content="Building production-ready agentic AI and RAG systems for real-world problems." />
            <meta property="og:image" content="/siva-profile.png" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&family=Merriweather:ital@0;1&display=optional" />
        </head>
        <body className={s.body} suppressHydrationWarning>{children}</body>
    </html>;
}

/* <head>
    <link rel="preload" href="/fonts/font-atlas.png" as="image" />
    <link rel="preload" href="/fonts/font-def.json" as="fetch" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&family=Merriweather:ital@0;1" />
</head> */
