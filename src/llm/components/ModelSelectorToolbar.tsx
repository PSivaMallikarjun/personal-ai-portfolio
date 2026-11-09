import React from 'react';
import Link from 'next/link';
import { IProgramState } from '../Program';
import { useProgramState } from '../Sidebar';
import { modelProfiles } from '@/src/model-catalog/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Vec3 } from '@/src/utils/vector';
import { Mat4f } from '@/src/utils/matrix';
import s from '../LayerView.module.scss';

function activateExample(progState: IProgramState, index: number) {
    const example = progState.examples[index] ?? progState.mainExample;
    if (!example.enabled) example.enabled = true;
    progState.currExampleId = index;
    progState.camera.desiredCamera = example.camera;
    progState.markDirty();
}

function frameExample(progState: IProgramState) {
    const example = progState.examples[progState.currExampleId] ?? progState.mainExample;
    progState.camera.desiredCamera = example.camera;
    progState.markDirty();
}

function focusExample(progState: IProgramState) {
    const example = progState.examples[progState.currExampleId] ?? progState.mainExample;
    const layout = example.layout ?? progState.layout;
    const obj = layout.residual0;
    const modelTarget = new Vec3(obj.x, obj.y, obj.z);
    const modelMtx = progState.camera.modelMtx.mul(Mat4f.fromTranslation(example.offset));
    const center = modelMtx.mulVec3Proj(modelTarget);
    const zoom = progState.currExampleId === -1 ? 0.7 : 4;
    progState.camera.desiredCamera = { center, angle: new Vec3(270, 4.5, zoom) };
    progState.markDirty();
}

export const ModelSelectorToolbar: React.FC = () => {
    const progState = useProgramState();

    function makeButton(egIndex: number) {
        const example = progState.examples[egIndex] ?? progState.mainExample;
        const isActive = progState.currExampleId === egIndex;

        function handleClick() {
            activateExample(progState, egIndex);
        }

        return <button
            type="button"
            className={isActive ? s.modelChoiceActive : s.modelChoice}
            aria-pressed={isActive}
            key={egIndex}
            onClick={handleClick}
        >
            {example.name}
        </button>;
    }

    return <div className={s.viewerToolbar} aria-label="3D model controls">
        <div className={s.modelChoices} role="group" aria-label="Select a walkthrough example">
            {makeButton(0)}
            {makeButton(-1)}
            {makeButton(1)}
            {makeButton(2)}
        </div>
        <Link className={s.allModelsLink} href="/llm/models">
            Browse all {modelProfiles.length} model visualizations <span aria-hidden="true">↗</span>
        </Link>
        <div className={s.modelTools} role="group" aria-label="View controls">
            <button type="button" className={s.modelToolButton} aria-label="Fit model" title="Fit model" onClick={() => frameExample(progState)}>
                <FontAwesomeIcon icon={faExpand} />
            </button>
            <button type="button" className={s.modelToolButton} aria-label="Focus model" title="Focus model" onClick={() => focusExample(progState)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    </div>;

};
