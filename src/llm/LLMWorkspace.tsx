'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModelCatalog } from '@/src/model-catalog/ModelCatalog';
import { modelProfiles } from '@/src/model-catalog/models';
import { LayerView } from './LayerView';
import { InfoButton } from './WelcomePopup';
import s from './LLMWorkspace.module.scss';

export type LLMWorkspaceView = 'gpt' | 'models';

export function LLMWorkspace({ initialView }: { initialView: LLMWorkspaceView }) {
    const [activeView, setActiveView] = useState(initialView);
    const router = useRouter();

    function selectView(view: LLMWorkspaceView) {
        setActiveView(view);
        router.push(view === 'models' ? '/llm/models' : '/llm');
    }

    return <div className={s.workspace}>
        <header className={s.appHeader}>
            <Link className={s.brand} href="/">
                <span className={s.brandMark}>SM</span>
                <span>
                    <strong>Siva Mallikarjun</strong>
                    <small>AI systems field guide</small>
                </span>
            </Link>
            <div className={s.headerActions}>
                {activeView === 'gpt' && <InfoButton />}
                <Link href="/" className={s.homeLink}>Portfolio <span aria-hidden="true">↗</span></Link>
            </div>
        </header>
        <nav className={s.tabs} aria-label="Explore the model field guide">
            <button
                type="button"
                className={activeView === 'gpt' ? s.activeTab : s.tab}
                aria-pressed={activeView === 'gpt'}
                onClick={() => selectView('gpt')}
            >
                <span>01</span> Token walkthrough · 4 examples
            </button>
            <button
                type="button"
                className={activeView === 'models' ? s.activeTab : s.tab}
                aria-pressed={activeView === 'models'}
                onClick={() => selectView('models')}
            >
                <span>02</span> All model visualizations · {modelProfiles.length}
            </button>
        </nav>
        {activeView === 'gpt' ? <LayerView /> : <ModelCatalog />}
        <div id="portal-container" />
    </div>;
}
