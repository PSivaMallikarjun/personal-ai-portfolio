'use client';

import React, { KeyboardEvent, useMemo, useState } from 'react';
import { ModelProfile, modelProfiles, modelProviders } from './models';
import { learningSteps, ModelScene, walkthroughProfiles } from './ModelScene';
import s from './ModelCatalog.module.scss';

function normalizeSearch(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getStepDescription(model: ModelProfile, step: number) {
    if (step === 0) return `Start with this example request. This is a readable learning prompt, not a token-ID transcript.`;
    if (step === 4) return `The output is represented here as ${model.outputs.join(', ')}. Actual results vary by model version and prompt.`;
    return walkthroughProfiles[model.visualization].hints[step - 1];
}

export function ModelCatalog() {
    const [provider, setProvider] = useState<(typeof modelProviders)[number]>('All');
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(modelProfiles[0].id);
    const [activeStep, setActiveStep] = useState(0);

    const visibleModels = useMemo(() => {
        const normalizedQuery = normalizeSearch(query);
        return modelProfiles.filter((model) => {
            const matchesProvider = provider === 'All' || model.provider === provider;
            const matchesQuery = !normalizedQuery || [
                model.name,
                model.provider,
                model.family,
                model.summary,
                model.category,
                model.visualization,
                ...model.inputs,
                ...model.outputs,
            ].some((value) => value && normalizeSearch(value).includes(normalizedQuery));
            return matchesProvider && matchesQuery;
        });
    }, [provider, query]);

    const selectedModel = visibleModels.find((model) => model.id === selectedId) ?? visibleModels[0];
    const selectedIndex = selectedModel ? visibleModels.findIndex((model) => model.id === selectedModel.id) : -1;
    const suggestions = query.trim() ? visibleModels.slice(0, 8) : [];
    const steps = selectedModel ? learningSteps[selectedModel.visualization] : null;
    const walkthrough = selectedModel ? walkthroughProfiles[selectedModel.visualization] : null;

    function selectModel(model: ModelProfile) {
        setSelectedId(model.id);
        setQuery('');
        setActiveStep(0);
    }

    function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && suggestions[0]) {
            event.preventDefault();
            selectModel(suggestions[0]);
        }
        if (event.key === 'Escape') setQuery('');
    }

    function changeProvider(nextProvider: (typeof modelProviders)[number]) {
        setProvider(nextProvider);
        const firstModel = modelProfiles.find((model) => nextProvider === 'All' || model.provider === nextProvider);
        if (firstModel) setSelectedId(firstModel.id);
        setActiveStep(0);
        setQuery('');
    }

    function changeModelByOffset(offset: number) {
        if (selectedIndex < 0 || !visibleModels.length) return;
        const nextIndex = (selectedIndex + offset + visibleModels.length) % visibleModels.length;
        selectModel(visibleModels[nextIndex]);
    }

    return <main className={s.page}>
        <header className={s.atlasBar}>
            <div className={s.atlasIdentity}>
                <p className={s.eyebrow}>INTERACTIVE MODEL WALKTHROUGH</p>
                <h1>AI Model Atlas <span>{modelProfiles.length}</span></h1>
            </div>
            <div className={s.modelNavigator}>
                <div className={s.searchWrap}>
                    <label className={s.visuallyHidden} htmlFor="model-search">Search all models</label>
                    <input
                        id="model-search"
                        className={s.search}
                        type="search"
                        placeholder={selectedModel ? `Find a model · current: ${selectedModel.name}` : 'Search all models'}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        autoComplete="off"
                        aria-controls="model-suggestions"
                    />
                    {suggestions.length > 0 && <div className={s.suggestions} id="model-suggestions" role="listbox" aria-label="Model search results">
                        <p>{visibleModels.length} matches · select a model to open its walkthrough</p>
                        {suggestions.map((model) => <button
                            type="button"
                            key={model.id}
                            role="option"
                            aria-selected={model.id === selectedModel?.id}
                            onClick={() => selectModel(model)}
                        >
                            <strong>{model.name}</strong>
                            <span>{model.provider} · {model.category}</span>
                        </button>)}
                    </div>}
                </div>
                <label className={s.visuallyHidden} htmlFor="provider-filter">Filter models by provider</label>
                <select
                    id="provider-filter"
                    className={s.providerSelect}
                    value={provider}
                    onChange={(event) => changeProvider(event.target.value as (typeof modelProviders)[number])}
                >
                    {modelProviders.map((item) => <option key={item} value={item}>
                        {item} · {item === 'All' ? modelProfiles.length : modelProfiles.filter((model) => model.provider === item).length}
                    </option>)}
                </select>
                <div className={s.modelPager} aria-label="Browse models">
                    <button type="button" aria-label="Previous model" disabled={visibleModels.length < 2} onClick={() => changeModelByOffset(-1)}>‹</button>
                    <span>{selectedIndex + 1} / {visibleModels.length}</span>
                    <button type="button" aria-label="Next model" disabled={visibleModels.length < 2} onClick={() => changeModelByOffset(1)}>›</button>
                </div>
            </div>
        </header>

        {selectedModel && steps && walkthrough ? <div className={s.immersiveWorkspace}>
            <aside className={s.storyPanel} aria-label={`${selectedModel.name} guided walkthrough`}>
                <div className={s.storyHeader}>
                    <p className={s.cardProvider}>{selectedModel.provider} · {selectedModel.category}</p>
                    <h2>{selectedModel.name}</h2>
                    <p>{selectedModel.summary}</p>
                </div>

                <div className={s.storyBody}>
                    <section className={s.exampleCard} aria-label="Example input">
                        <span>EXAMPLE INPUT</span>
                        <p>{walkthrough.example}</p>
                    </section>

                    <div className={s.storyDetails}>
                        <div>
                            <span>INPUT</span>
                            <strong>{selectedModel.inputs.join(' · ')}</strong>
                        </div>
                        <div>
                            <span>OUTPUT</span>
                            <strong>{selectedModel.outputs.join(' · ')}</strong>
                        </div>
                    </div>

                    <section className={s.chapters}>
                        <div className={s.chapterHeading}>
                            <h3>Walkthrough</h3>
                            <span>STEP {activeStep + 1} / 5</span>
                        </div>
                        <ol>
                            {['INPUT', ...steps.slice(0, 3), 'OUTPUT'].map((title, index) => <li key={`${selectedModel.id}-chapter-${index}`}>
                                <button
                                    type="button"
                                    className={activeStep === index ? s.activeChapter : s.chapter}
                                    aria-current={activeStep === index ? 'step' : undefined}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <span>{title}</span>
                                    <span aria-hidden="true">{activeStep > index ? '✓' : '›'}</span>
                                </button>
                            </li>)}
                        </ol>
                    </section>

                    <section className={s.chapterExplanation} aria-live="polite">
                        <span>CHAPTER {String(activeStep + 1).padStart(2, '0')}</span>
                        <h3>{['INPUT', ...steps.slice(0, 3), 'OUTPUT'][activeStep]}</h3>
                        <p>{getStepDescription(selectedModel, activeStep)}</p>
                    </section>

                    <section className={s.modelReference}>
                        <span>MODEL REFERENCE</span>
                        <p><strong>Family</strong> {selectedModel.family}</p>
                        <p><strong>Learning field</strong> {selectedModel.visualization.replace('-', ' ')}</p>
                        {selectedModel.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title} <span aria-hidden="true">↗</span>
                        </a>)}
                    </section>
                </div>

                <footer className={s.storyFooter}>
                    <button type="button" onClick={() => setActiveStep((step) => Math.max(0, step - 1))} disabled={activeStep === 0}>
                        Previous
                    </button>
                    <div className={s.stepButtons} role="group" aria-label={`${selectedModel.name} walkthrough chapters`}>
                        {[0, 1, 2, 3, 4].map((index) => <button
                            key={`${selectedModel.id}-step-${index}`}
                            type="button"
                            aria-label={`Go to chapter ${index + 1}`}
                            aria-pressed={activeStep === index}
                            className={activeStep === index ? s.activeStepButton : s.stepButton}
                            onClick={() => setActiveStep(index)}
                        />)}
                    </div>
                    <button type="button" onClick={() => setActiveStep((step) => Math.min(4, step + 1))} disabled={activeStep === 4}>
                        Next
                    </button>
                </footer>
            </aside>

            <section className={s.visualPanel} aria-label={`${selectedModel.name} interactive visualization`}>
                <div className={s.visualHeading}>
                    <div>
                        <span>INTERACTIVE LEARNING ILLUSTRATION</span>
                        <h2>{selectedModel.name}</h2>
                    </div>
                    <span className={s.learningBadge}>CONCEPTUAL VIEW</span>
                </div>
                <ModelScene key={selectedModel.id} model={selectedModel} activeStep={activeStep} />
            </section>
        </div> : <div className={s.emptyState}>No models match this search. Try another name or provider.</div>}
    </main>;
}
