'use client';

import React, { PointerEvent, useEffect, useRef, useState } from 'react';
import { ModelProfile } from './models';
import s from './ModelCatalog.module.scss';

type SceneNode = {
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    title: string;
    detail: string;
    tone: 'input' | 'core' | 'published' | 'output';
};

export type WalkthroughProfile = {
    example: string;
    hints: [string, string, string];
};

export const learningSteps: Record<ModelProfile['visualization'], [string, string, string, string]> = {
    language: ['TOKENIZE', 'READ CONTEXT', 'FORM RESPONSE', 'TEXT'],
    reasoning: ['FRAME TASK', 'EXPLORE OPTIONS', 'CHECK RESULT', 'ANSWER'],
    image: ['READ PROMPT', 'BUILD SCENE', 'REFINE DETAIL', 'IMAGE'],
    video: ['READ PROMPT', 'PLAN FRAMES', 'ADD MOTION', 'VIDEO'],
    audio: ['READ SIGNAL', 'PROCESS AUDIO', 'SELECT TASK', 'AUDIO / TEXT'],
    speech: ['CAPTURE AUDIO', 'RECOGNIZE SPEECH', 'ALIGN WORDS', 'TEXT / AUDIO'],
    music: ['READ PROMPT', 'SHAPE RHYTHM', 'ARRANGE SOUND', 'MUSIC'],
    'three-d': ['READ PROMPT', 'PLAN SHAPE', 'BUILD GEOMETRY', '3D ASSET'],
    code: ['READ REQUEST', 'TRACE CONTEXT', 'FORM CODE', 'CODE'],
    embedding: ['READ TEXT', 'MAP FEATURES', 'FORM VECTOR', 'EMBEDDING'],
    document: ['READ PAGE', 'LOCATE FIELDS', 'EXTRACT CONTENT', 'STRUCTURE'],
    'time-series': ['READ HISTORY', 'FIND PATTERNS', 'PROJECT TREND', 'FORECAST'],
    vision: ['READ IMAGE', 'MAP FEATURES', 'IDENTIFY TASK', 'RESULT'],
    science: ['READ INPUT', 'FORM REPRESENTATION', 'ESTIMATE RESULT', 'PREDICTION'],
    robotics: ['SENSE SCENE', 'UNDERSTAND STATE', 'PLAN RESPONSE', 'ACTION'],
    tabular: ['READ FEATURES', 'COMBINE SIGNALS', 'SCORE OPTIONS', 'PREDICTION'],
    recommendation: ['READ CONTEXT', 'RETRIEVE ITEMS', 'RANK OPTIONS', 'RESULTS'],
};

export const walkthroughProfiles: Record<ModelProfile['visualization'], WalkthroughProfile> = {
    language: {
        example: 'How do language models predict the next word?',
        hints: ['Break the prompt into tokens the model can process.', 'Use the preceding context to estimate likely next tokens.', 'Select and decode tokens to build a readable response.'],
    },
    reasoning: {
        example: 'Compare these options and explain the best answer.',
        hints: ['Identify the question, constraints, and requested outcome.', 'Work through candidate approaches against the available context.', 'Check the result and shape a clear final answer.'],
    },
    image: {
        example: 'Create an illustration of a greenhouse at sunrise.',
        hints: ['Interpret the subject, style, and visual details in the prompt.', 'Arrange visual elements into a coherent scene.', 'Refine the composition and produce an image.'],
    },
    video: {
        example: 'Create a short clip of a paper boat on a stream.',
        hints: ['Interpret the scene, style, and requested duration.', 'Plan a sequence of visual moments across frames.', 'Coordinate motion and render a video sequence.'],
    },
    audio: {
        example: 'Identify the sounds and meaning in this audio clip.',
        hints: ['Take in an audio signal together with the requested task.', 'Analyze sound patterns and relevant features.', 'Return audio, text, or another task-specific result.'],
    },
    speech: {
        example: 'Transcribe this spoken sentence.',
        hints: ['Capture the spoken audio and its timing.', 'Recognize speech sounds and map them to words.', 'Align the result and return text or synthesized speech.'],
    },
    music: {
        example: 'Compose a calm, short piano melody.',
        hints: ['Interpret the requested style, mood, and instruments.', 'Shape rhythm and musical phrases.', 'Arrange sounds into a musical result.'],
    },
    'three-d': {
        example: 'Create a low-poly chair with a curved back.',
        hints: ['Interpret the requested object and its visual constraints.', 'Plan the form and relationships between parts.', 'Build a 3D asset from the planned geometry.'],
    },
    code: {
        example: 'Write a function that sorts a list of numbers.',
        hints: ['Understand the coding request and any surrounding context.', 'Trace relevant constraints, examples, and existing code.', 'Compose code that addresses the requested behavior.'],
    },
    embedding: {
        example: 'Find passages similar to: renewable energy storage.',
        hints: ['Take in text or other content to compare.', 'Map the content into a numerical representation.', 'Use vector similarity to support search or retrieval.'],
    },
    document: {
        example: 'Extract the invoice date and total from this page.',
        hints: ['Read the document page, including its visible structure.', 'Locate the requested fields and their relationships.', 'Return the extracted content in a structured form.'],
    },
    'time-series': {
        example: 'Forecast next month’s demand from this history.',
        hints: ['Take in ordered observations and their time context.', 'Find trends, repeating patterns, and relevant changes.', 'Estimate future values from the observed history.'],
    },
    vision: {
        example: 'Describe the main objects and activity in this image.',
        hints: ['Take in an image together with the requested task.', 'Identify visual features and relationships in the scene.', 'Return a task-specific label, description, or result.'],
    },
    science: {
        example: 'Estimate a molecule’s properties from its structure.',
        hints: ['Take in a scientific representation and target question.', 'Map the input into a representation useful for the task.', 'Estimate a scientific property or other requested result.'],
    },
    robotics: {
        example: 'Move the robot arm to the marked object.',
        hints: ['Sense the scene and the requested goal.', 'Estimate the current state and relevant constraints.', 'Plan an action that moves toward the goal.'],
    },
    tabular: {
        example: 'Predict whether this customer will renew.',
        hints: ['Read the structured features for the current case.', 'Combine relevant signals from the available fields.', 'Return a score, class, or other prediction.'],
    },
    recommendation: {
        example: 'Recommend an article based on this reading history.',
        hints: ['Use context such as preferences or recent activity.', 'Retrieve items that may be relevant to the user.', 'Rank candidates and return useful recommendations.'],
    },
};

function IsoNode({ node, active }: { node: SceneNode; active: boolean }) {
    const { x, y, width, height, depth, title, detail, tone } = node;
    const top = `${x},${y} ${x + depth},${y - depth} ${x + width + depth},${y - depth} ${x + width},${y}`;
    const side = `${x + width},${y} ${x + width + depth},${y - depth} ${x + width + depth},${y + height - depth} ${x + width},${y + height}`;

    return <g className={`${s.isoNode} ${s[tone]} ${active ? s.activeNode : ''}`}>
        <polygon className={s.isoTop} points={top} />
        <polygon className={s.isoSide} points={side} />
        <rect className={s.isoFront} x={x} y={y} width={width} height={height} rx="4" />
        <text className={s.isoTitle} x={x + width / 2} y={y + 39} textAnchor="middle">{title}</text>
        <text
            className={s.isoDetail}
            x={x + width / 2}
            y={y + 62}
            textAnchor="middle"
            textLength={detail.length > 18 ? width - 12 : undefined}
            lengthAdjust="spacingAndGlyphs"
        >{detail}</text>
    </g>;
}

function buildNodes(model: ModelProfile, compact: boolean): SceneNode[] {
    const [stageOne, stageTwo, stageThree, result] = learningSteps[model.visualization];
    const [firstHint, secondHint, thirdHint] = walkthroughProfiles[model.visualization].hints;
    const labels = [
        { title: 'INPUT', detail: model.inputs.slice(0, 2).join(' · '), tone: 'input' as const },
        { title: stageOne, detail: firstHint.split(' ').slice(0, 4).join(' '), tone: 'core' as const },
        { title: stageTwo, detail: secondHint.split(' ').slice(0, 4).join(' '), tone: 'published' as const },
        { title: stageThree, detail: thirdHint.split(' ').slice(0, 4).join(' '), tone: 'core' as const },
        { title: 'OUTPUT', detail: result, tone: 'output' as const },
    ];

    return labels.map((label, index) => {
        const compactPositions = [
            { x: 35, y: 170 },
            { x: 345, y: 170 },
            { x: 345, y: 365 },
            { x: 35, y: 365 },
            { x: 190, y: 555 },
        ];
        return {
            ...label,
            x: compact ? compactPositions[index].x : 20 + index * 180,
            y: compact ? compactPositions[index].y : index % 2 === 0 ? 205 : 184,
            width: 140,
            height: 94,
            depth: 22,
        };
    });
}

export function ModelScene({ model, activeStep }: { model: ModelProfile; activeStep: number }) {
    const [rotation, setRotation] = useState({ x: -3, y: -4 });
    const [zoom, setZoom] = useState(1);
    const [compact, setCompact] = useState(false);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const dragStart = useRef<{ x: number; y: number; rotationX: number; rotationY: number } | null>(null);
    const nodes = buildNodes(model, compact);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const observer = new ResizeObserver(([entry]) => setCompact(entry.contentRect.width < 600));
        observer.observe(viewport);
        return () => observer.disconnect();
    }, []);

    function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
        dragStart.current = { x: event.clientX, y: event.clientY, rotationX: rotation.x, rotationY: rotation.y };
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
        if (!dragStart.current) return;
        const drag = dragStart.current;
        setRotation({
            x: Math.max(-14, Math.min(14, drag.rotationX + (event.clientY - drag.y) * 0.16)),
            y: Math.max(-14, Math.min(14, drag.rotationY + (event.clientX - drag.x) * 0.16)),
        });
    }

    function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
        event.preventDefault();
        setZoom((value) => Math.max(0.86, Math.min(1.12, value - Math.sign(event.deltaY) * 0.04)));
    }

    return <div className={s.scenePanel}>
        <div className={s.sceneToolbar}>
            <span>Interactive learning illustration · drag to tilt · scroll to zoom</span>
            <div>
                <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.86, value - 0.06))}>−</button>
                <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.12, value + 0.06))}>+</button>
                <button type="button" onClick={() => { setRotation({ x: -3, y: -4 }); setZoom(1); }}>Reset</button>
            </div>
        </div>
        <div
            ref={viewportRef}
            className={s.sceneViewport}
            role="img"
            aria-label={`${model.name} interactive three-dimensional learning illustration`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={() => { dragStart.current = null; }}
            onPointerCancel={() => { dragStart.current = null; }}
            onWheel={handleWheel}
        >
            <svg
                className={s.sceneSvg}
                viewBox={compact ? '0 0 580 720' : '0 0 920 470'}
                style={{ transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})` }}
                aria-hidden="true"
            >
                <defs>
                    <pattern id="learning-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" className={s.gridDot} />
                    </pattern>
                    <marker id="learning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" className={s.arrowHead} />
                    </marker>
                </defs>
                <rect width={compact ? 580 : 920} height={compact ? 720 : 470} fill="url(#learning-grid)" />
                <text x={compact ? 290 : 460} y={compact ? 55 : 71} textAnchor="middle" className={s.sceneTitle}>{model.name.toUpperCase()}</text>
                <text x={compact ? 290 : 460} y={compact ? 82 : 97} textAnchor="middle" className={s.sceneCaption}>CONCEPTUAL LEARNING FLOW</text>
                {nodes.slice(0, -1).map((node, index) => {
                    const next = nodes[index + 1];
                    let path: string;
                    if (!compact) {
                        path = `M${node.x + node.width + node.depth} ${node.y + 48} C${node.x + 168} ${node.y + 48} ${next.x - 26} ${next.y + 48} ${next.x - 10} ${next.y + 48}`;
                    } else if (index === 0) {
                        path = `M${node.x + node.width + node.depth} ${node.y + 48} H${next.x - 10}`;
                    } else if (index === 1) {
                        path = `M${node.x + node.width / 2} ${node.y + node.height} V${next.y - 12}`;
                    } else if (index === 2) {
                        path = `M${node.x - 2} ${node.y + 48} H${next.x + next.width + next.depth + 12}`;
                    } else {
                        path = `M${node.x + node.width / 2} ${node.y + node.height} C${node.x + node.width / 2} ${node.y + 150} ${next.x + next.width / 2} ${next.y - 35} ${next.x + next.width / 2} ${next.y - 12}`;
                    }
                    return <path key={`connector-${index}`} d={path} className={`${s.connector} ${index < activeStep ? s.connectorComplete : ''}`} markerEnd="url(#learning-arrow)" />;
                })}
                {nodes.map((node, index) => <IsoNode key={`${model.id}-${index}`} node={node} active={index === activeStep} />)}
                <text x={compact ? 290 : 460} y={compact ? 696 : 390} textAnchor="middle" className={s.sceneCaption}>
                    An interactive learning illustration of the model’s task flow
                </text>
            </svg>
        </div>
        <p className={s.sceneNote}>{model.illustrationNote}</p>
    </div>;
}
