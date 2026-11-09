import Image from 'next/image';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { ParticleSpiral } from './ParticleSpiral';
import { AboutMeChat } from './AboutMeChat';
import s from './HomePage.module.scss';

const credentials = [
    { name: 'Microsoft Certified: Machine Learning Operations Engineer Associate', issuer: 'Microsoft', date: 'Issued Nov 2026 · Expires Nov 2027' },
    { name: 'AWS Certified AI Business Strategist', issuer: 'Amazon Web Services (AWS)', date: 'Issued Nov 2026 · Expires Nov 2029' },
    { name: 'Innovation and Creativity', issuer: 'Harvard Business Impact Enterprise', date: 'Issued Nov 2026' },
    { name: 'Leveraging Your Networks', issuer: 'Harvard Business Impact Enterprise', date: 'Issued Nov 2026' },
    { name: 'Claude Academy: Claude Code 101', issuer: 'Anthropic', date: 'Issued Jul 2026' },
    { name: 'Claude Academy: Claude Code in action', issuer: 'Anthropic', date: 'Issued Jul 2026' },
    { name: 'Claude Academy: Introduction to agent skills', issuer: 'Anthropic', date: 'Issued Jul 2026' },
    { name: 'Claude Academy: Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'Issued Jul 2026' },
    { name: 'Claude Academy: Claude 101', issuer: 'Anthropic', date: 'Issued Jul 2026' },
    { name: 'Microsoft Certified: Fabric Data Engineer Associate', issuer: 'Microsoft', date: 'Issued Oct 2026 · Expires Oct 2027' },
    { name: 'Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', date: 'Issued Oct 2026 · Expires Oct 2027' },
    { name: 'Microsoft Certified: Azure AI Apps and Agents Developer Associate', issuer: 'Microsoft', date: 'Issued Oct 2026 · Expires Oct 2027' },
    { name: 'Microsoft Certified: Agentic AI Business Solutions Architect Expert', issuer: 'Microsoft', date: 'Issued Oct 2026 · Expires Oct 2027' },
    { name: 'Microsoft Certified: Fabric Analytics Engineer Associate', issuer: 'Microsoft', date: 'Issued Oct 2026 · Expires Oct 2027' },
    { name: 'Gemini Enterprise Forward Deployed Engineer Bootcamp', issuer: 'Google', date: 'Issued Oct 2026' },
    { name: 'Build with Gemini - Track 2: Platform IT Developer', issuer: 'Google Cloud Community India', date: 'Issued Oct 2026' },
    { name: 'Build with Gemini - Track 2: Platform IT Developer', issuer: 'Explore Google Cloud', date: 'Issued Oct 2026' },
    { name: 'Databricks Certified Generative AI Engineer Associate', issuer: 'Databricks', date: 'Issued Sep 2026 · Expires Sep 2028' },
    { name: 'Certified Partner Specialist Gemini Enterprise Agent Development', issuer: 'Google', date: 'Issued Aug 2026 · Expires Feb 2027' },
    { name: 'Associate Data Practitioner Certification', issuer: 'Google', date: 'Issued Jun 2025 · Expires Jun 2028' },
    { name: 'Professional Machine Learning Engineer Certification', issuer: 'Google', date: 'Issued May 2025 · Expires May 2027' },
    { name: 'Microsoft Certified: Azure Data Scientist Associate', issuer: 'Microsoft', date: 'Issued Apr 2025 · Expires Apr 2027' },
    { name: 'AWS Certified Developer - Associate', issuer: 'Amazon', date: 'Issued Mar 2025 · Expires Mar 2028' },
    { name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services (AWS)', date: 'Issued Mar 2025 · Expires Mar 2027' },
    { name: 'Microsoft Certified: Azure AI Fundamentals', issuer: 'Microsoft', date: 'Issued Feb 2025 · Expires Feb 2028' },
    { name: 'Associate Cloud Engineer Certification', issuer: 'Google Cloud Skills Boost', date: 'Issued Feb 2025 · Expires Feb 2028' },
    { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', date: 'Issued Jan 2025 · Expires Jan 2027' },
    { name: 'AI Tools and ChatGPT workshop', issuer: 'Be10x', date: 'Issued Jan 2025' },
    { name: 'AI General Intelligence', issuer: 'Oxford Home Study Center (OHSC)', date: 'Issued Dec 2024' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services (AWS)', date: 'Issued Dec 2024 · Expires Dec 2027' },
    { name: 'GitHub Administration', issuer: 'GitHub', date: 'Issued Dec 2024 · Expires Dec 2027' },
    { name: 'GitHub Copilot', issuer: 'GitHub', date: 'Issued Dec 2024 · Expires Dec 2027' },
    { name: 'GitHub Foundations', issuer: 'GitHub', date: 'Issued Dec 2024 · Expires Dec 2027' },
    { name: 'The Complete Java Certification Course', issuer: 'Udemy', date: 'Issued Jul 2024' },
    { name: 'Artificial Intelligence Projects with Python', issuer: 'Udemy', date: 'Issued Jan 2024' },
    { name: 'Python Essentials 2', issuer: 'Cisco', date: 'Issued May 2023' },
    { name: 'Python Essentials 1', issuer: 'Cisco', date: 'Issued May 2023' },
    { name: 'Crash course on Python', issuer: 'Coursera', date: 'Issued Mar 2022' },
];

const profiles = [
    { name: 'GitHub', href: 'https://github.com/PSivaMallikarjun' },
    { name: 'Hugging Face', href: 'https://huggingface.co/SivaMallikarjun' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sivamallikarjun/' },
    { name: 'Kaggle', href: 'https://www.kaggle.com/work/code' },
    { name: 'Credly', href: 'https://www.credly.com/users/parvatham-siva-mallikarjun' },
];

type Project = {
    title: string;
    description: string;
    href: string;
    kind: 'llm' | 'models' | 'clearance' | 'drone' | 'bio' | 'assistant' | 'retail' | 'vision' | 'manufacturing';
    label: string;
    visualTitle?: string;
    flow?: [string, string, string];
};

const projects: Project[] = [
    {
        title: 'LLM Visualization',
        description: 'An interactive walkthrough of how a GPT-style language model processes and predicts text.',
        href: '/llm',
        kind: 'llm',
        label: 'Interactive learning',
    },
    {
        title: 'Public Model Explorer',
        description: 'A source-linked atlas of AI models, with an interactive learning illustration for every entry.',
        href: '/llm/models',
        kind: 'models',
        label: 'Model research',
    },
    {
        title: 'ClearanceAI',
        description: 'Multi-agent QA automation with Laya confidence scoring, human approval checkpoints, and generated test plans, synthetic data, and execution reports.',
        href: 'https://github.com/PSivaMallikarjun/ClearanceAI',
        kind: 'clearance',
        label: 'Agentic quality engineering',
    },
    {
        title: 'AeroDynamics-X Drone Simulator',
        description: 'An ultra-realistic 3D quadcopter flight simulator built for immersive flight experiences.',
        href: 'https://github.com/PSivaMallikarjun/AeroDynamics-X-3D-Drone-Simulator-Game',
        kind: 'drone',
        label: '3D simulation · TypeScript',
        visualTitle: 'QUADCOPTER FLIGHT SIM',
        flow: ['3D WORLD', 'FLIGHT MODEL', 'PILOT'],
    },
    {
        title: 'BioGuard for Responsible AI',
        description: 'Explores bio-inspired minimal neural architectures as a defense against prompt injection and jailbreak attacks.',
        href: 'https://github.com/PSivaMallikarjun/BioGuard-for-Responsible-AI',
        kind: 'bio',
        label: 'AI safety · Python',
        visualTitle: 'RESPONSIBLE AI DEFENSE',
        flow: ['PROMPT', 'BIO-INSPIRED GUARD', 'SAFE RESPONSE'],
    },
    {
        title: 'LinkedIn AI Responder',
        description: 'A personal AI agent designed to help draft LinkedIn message replies in the author\'s own voice.',
        href: 'https://github.com/PSivaMallikarjun/Siva-LinkedIn-AI-Responder',
        kind: 'assistant',
        label: 'Personal AI agent · Python',
        visualTitle: 'VOICE-MATCHED ASSISTANT',
        flow: ['MESSAGE', 'PERSONAL CONTEXT', 'DRAFT REPLY'],
    },
    {
        title: 'Super-market AI',
        description: 'An AI retail intelligence platform for bringing smarter insights to supermarket operations.',
        href: 'https://github.com/PSivaMallikarjun/Super-market-AI',
        kind: 'retail',
        label: 'Retail intelligence · TypeScript',
        visualTitle: 'RETAIL INTELLIGENCE',
        flow: ['STORE DATA', 'AI INSIGHTS', 'DECISIONS'],
    },
    {
        title: 'GuardianVision AI',
        description: 'Real-time CCTV intelligence for traffic-incident detection, emergency coordination, and insurance workflows.',
        href: 'https://github.com/PSivaMallikarjun/GuardianVision-AI',
        kind: 'vision',
        label: 'Vision AI · TypeScript',
        visualTitle: 'INCIDENT RESPONSE',
        flow: ['VIDEO', 'INCIDENT DETECTED', 'COORDINATE'],
    },
    {
        title: 'AccidentGuard AI',
        description: 'An end-to-end agentic response concept for detecting road incidents and coordinating emergency and insurance support.',
        href: 'https://github.com/PSivaMallikarjun/AccidentGuard-AI',
        kind: 'vision',
        label: 'Agentic response · TypeScript',
        visualTitle: 'ROAD-SAFETY WORKFLOW',
        flow: ['ROAD EVENT', 'AGENT ROUTING', 'RESPONSE'],
    },
    {
        title: 'Panchakarma Manufacturing Agent',
        description: 'A multi-agent manufacturing workflow for coordinating production across stone, wood, metal, tools, and gold.',
        href: 'https://github.com/PSivaMallikarjun/Panchakarma-Manufacturing-Agent',
        kind: 'manufacturing',
        label: 'Multi-agent manufacturing',
        visualTitle: 'COORDINATED PRODUCTION',
        flow: ['WORK ORDER', 'SPECIALIST AGENTS', 'PRODUCTION'],
    },
];

const renderProjectCard = (project: Project, index: number): ReactNode => {
    const flow = project.flow;
    const contents = <>
        <div className={`${s.projectVisual} ${s[project.kind]}`}>
            {project.kind === 'llm' && <div className={s.neuralGraphic} aria-hidden="true">
                <span className={s.flowLabel}>TEXT IN</span>
                <div className={s.flowNodes}>
                    <i className={s.flowInput}>TOKENS</i>
                    <i className={s.flowTransform}>TRANSFORM</i>
                    <i className={s.flowOutput}>NEXT TOKEN</i>
                </div>
                <svg viewBox="0 0 420 150" preserveAspectRatio="none">
                    <path d="M56 75 H142 M278 75 H364" />
                    <path d="M142 75 C176 28 244 28 278 75 M142 75 C176 122 244 122 278 75" />
                </svg>
                <span className={s.flowCaption}>A small model, made explorable</span>
            </div>}
            {project.kind === 'models' && <div className={s.modelGraphic} aria-hidden="true">
                <span className={s.modelCore}>AI</span>
                <i /><i /><i /><i />
                <span className={s.modelLabel}>PUBLIC MODEL ARCHITECTURES</span>
            </div>}
            {project.kind === 'clearance' && <div className={s.qaGraphic} aria-hidden="true">
                <div className={s.qaTopline}><span /><span /><span /><b>ClearanceAI</b></div>
                <div className={s.qaPanel}><small>TEST PLAN</small><strong>Quality review</strong><span className={s.qaLine} /><span className={s.qaLine} /><span className={s.qaLineShort} /></div>
                <div className={s.qaPanel}><small>ROOT-CAUSE ANALYSIS</small><strong>Failure investigation</strong><div className={s.qaPass}>Analysis complete <span>✓</span></div></div>
            </div>}
            {project.visualTitle && flow && <div className={s.projectSchematic} aria-hidden="true">
                <span className={s.schematicEyebrow}>{project.label}</span>
                <strong>{project.visualTitle}</strong>
                <div className={s.schematicFlow}>
                    {flow.map((step, stepIndex) => <span key={step}>
                        {step}
                        {stepIndex < flow.length - 1 && <i aria-hidden="true">→</i>}
                    </span>)}
                </div>
            </div>}
            <span className={s.visualIndex}>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className={s.projectMeta}>
            <div className={s.projectMetaTop}>
                <h2>{project.title}</h2>
                <span className={s.projectArrow} aria-hidden="true">↗</span>
            </div>
            <p>{project.description}</p>
            <span className={s.projectLabel}>{project.label}</span>
        </div>
    </>;

    const className = s.projectCard;
    if (project.href.startsWith('/')) {
        return <Link className={className} href={project.href}>
            {contents}
        </Link>;
    }

    return <a className={className} href={project.href} target="_blank" rel="noopener noreferrer">
        {contents}
    </a>;
};

export const HomePage: FC = () => {
    return <>
    <main className={s.portfolio}>
        <section className={s.introPanel} aria-labelledby="intro-heading">
            <header className={s.identity}>
                <Image
                    className={s.avatar}
                    src="/siva-profile-2026.png"
                    alt=""
                    width={44}
                    height={44}
                    unoptimized
                />
                <div className={s.identityText}>
                    <strong>Siva Mallikarjun Parvatham</strong>
                    <span>Senior software developer</span>
                </div>
            </header>

            <div className={s.introBody}>
                <p className={s.eyebrow}><span /> Hyderabad, India <i /> Open to AI Lead roles</p>
                <h1 id="intro-heading">I build AI systems people can <span>trust.</span></h1>
                <p className={s.introText}>
                    I&apos;m Siva, a software developer with 4+ years of experience, including 2+ years in generative AI. I build agentic AI and RAG for financial services—turning complex ideas into useful, production-minded products.
                </p>
                <div className={s.actions}>
                    <a className={s.primaryAction} href="#selected-work">Explore selected work <span aria-hidden="true">↗</span></a>
                    <a className={s.emailAction} href="#about-chat">Get to know me <span aria-hidden="true">↓</span></a>
                    <a className={s.emailAction} href="mailto:sivamallikarjun2601@gmail.com">sivamallikarjun2601@gmail.com</a>
                </div>
            </div>

            <footer className={s.introFooter}>
                <div className={s.credentials}>
                    <span className={s.footerLabel}>LEARNING, ALWAYS</span>
                    <div className={s.credentialNames}>
                        <span>Databricks GenAI Engineer</span>
                        <span>Google Cloud ML Engineer</span>
                        <span>AWS AI Practitioner</span>
                    </div>
                    <details className={s.credentialsDetails}>
                        <summary>View all {credentials.length} credentials <span aria-hidden="true">↗</span></summary>
                        <div className={s.credentialsPopover}>
                            {credentials.map((credential, index) => <article key={`${credential.issuer}-${credential.name}-${index}`}>
                                <strong>{credential.name}</strong>
                                <span>{credential.issuer} · {credential.date}</span>
                            </article>)}
                        </div>
                    </details>
                </div>
                <nav className={s.profileLinks} aria-label="Professional profiles">
                    {profiles.map(profile => <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer">{profile.name}<span aria-hidden="true">↗</span></a>)}
                </nav>
                <div className={s.copyright}>© 2026 Siva Parvatham · Built with curiosity</div>
            </footer>
        </section>

        <section className={s.showcase} id="selected-work" aria-label="Selected projects">
            <ParticleSpiral className={s.particleBackdrop} />
            <div className={s.fieldLabels} aria-hidden="true">
                <span>Ideas</span>
                <span>In motion</span>
            </div>
            <div className={s.showcaseHeading}>
                <span>SELECTED WORK</span>
                <div className={s.showcaseActions}>
                    <a href="https://github.com/PSivaMallikarjun?tab=repositories" target="_blank" rel="noopener noreferrer">More on GitHub <i aria-hidden="true">↗</i></a>
                    <span className={s.scrollHint}>Scroll to explore <i aria-hidden="true">↓</i></span>
                </div>
            </div>
            <div className={s.showcaseWindow}>
                <div className={s.showcaseLane}>
                    <div className={s.showcaseTrack}>
                        {projects.map((project, index) => <div key={project.title}>{renderProjectCard(project, index)}</div>)}
                    </div>
                </div>
            </div>
        </section>
    </main>
    <AboutMeChat />
    </>;
};
