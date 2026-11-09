'use client';

import { useEffect, useRef } from 'react';

type Particle = {
    angle: number;
    radius: number;
    size: number;
    phase: number;
    warmth: number;
    brightness: number;
};

type ParticleSpiralProps = {
    className: string;
};

function randomGenerator(seed: number) {
    let value = seed;
    return () => {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

export function ParticleSpiral({ className }: ParticleSpiralProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const random = randomGenerator(214748);
        const particles: Particle[] = [];

        const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
        const spiralParticleCount = isSmallScreen ? 460 : 1180;
        const backgroundParticleCount = isSmallScreen ? 70 : 150;

        for (let index = 0; index < spiralParticleCount; index++) {
            const arm = index % 3;
            const progress = random();
            const radius = 0.035 + progress * 0.46;
            const angle = progress * Math.PI * 4.7 + arm * (Math.PI * 2 / 3) + (random() - 0.5) * 0.19;
            particles.push({
                angle,
                radius: radius + (random() - 0.5) * 0.025,
                size: random() > 0.955 ? 1.7 + random() * 1.3 : 0.55 + random() * 0.95,
                phase: random() * Math.PI * 2,
                warmth: random(),
                brightness: 0.42 + random() * 0.58,
            });
        }

        for (let index = 0; index < backgroundParticleCount; index++) {
            particles.push({
                angle: random() * Math.PI * 2,
                radius: 0.54 + random() * 0.55,
                size: 0.3 + random() * 0.65,
                phase: random() * Math.PI * 2,
                warmth: random(),
                brightness: 0.2 + random() * 0.55,
            });
        }

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const viewportVisibility = document.visibilityState;
        let isVisible = viewportVisibility === 'visible';
        let frame = 0;
        let animationFrame = 0;
        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let reducedMotion = motionPreference.matches;

        function resize() {
            const bounds = canvas!.getBoundingClientRect();
            width = bounds.width;
            height = bounds.height;
            pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas!.width = Math.round(width * pixelRatio);
            canvas!.height = Math.round(height * pixelRatio);
            context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            draw();
        }

        function draw() {
            if (!width || !height) return;
            context!.clearRect(0, 0, width, height);

            const centerX = width * 0.56;
            const centerY = height * 0.51;
            const scale = Math.min(width, height) * 0.92;
            const time = reducedMotion ? 0 : frame * 0.012;

            const coreGlow = context!.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 0.48);
            coreGlow.addColorStop(0, 'rgba(177, 202, 220, 0.22)');
            coreGlow.addColorStop(0.3, 'rgba(113, 149, 176, 0.11)');
            coreGlow.addColorStop(1, 'rgba(8, 13, 17, 0)');
            context!.fillStyle = coreGlow;
            context!.fillRect(0, 0, width, height);
            context!.globalCompositeOperation = 'lighter';

            for (let arm = 0; arm < 3; arm++) {
                context!.beginPath();
                for (let point = 0; point <= 90; point++) {
                    const progress = point / 90;
                    const radius = (0.035 + progress * 0.49) * scale;
                    const angle = progress * Math.PI * 4.7 + arm * (Math.PI * 2 / 3) + time * 0.16 + Math.sin(time * 0.28 + arm) * 0.045;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius * 0.91;
                    if (point === 0) context!.moveTo(x, y);
                    else context!.lineTo(x, y);
                }
                const trail = context!.createLinearGradient(centerX - scale * 0.5, centerY, centerX + scale * 0.5, centerY);
                trail.addColorStop(0, 'rgba(144, 186, 218, 0)');
                trail.addColorStop(0.52, 'rgba(166, 207, 235, 0.28)');
                trail.addColorStop(0.82, 'rgba(231, 190, 155, 0.42)');
                trail.addColorStop(1, 'rgba(144, 186, 218, 0)');
                context!.strokeStyle = trail;
                context!.lineWidth = 1.45;
                context!.shadowColor = 'rgba(166, 207, 235, 0.55)';
                context!.shadowBlur = 13;
                context!.stroke();
            }
            context!.shadowBlur = 0;

            for (const particle of particles) {
                const shimmer = reducedMotion ? 1 : 0.66 + Math.sin(time + particle.phase) * 0.34;
                const angle = particle.angle + time * (0.06 + particle.radius * 0.13);
                const radius = particle.radius * scale;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius * 0.91;
                const alpha = particle.brightness * shimmer;
                const color = particle.warmth > 0.84
                    ? `rgba(255, 190, 132, ${alpha})`
                    : `rgba(190, 222, 255, ${alpha})`;

                context!.beginPath();
                context!.fillStyle = color;
                context!.shadowColor = color;
                context!.shadowBlur = particle.size > 2.25 ? 12 : particle.size > 1.5 ? 5 : 0;
                context!.arc(x, y, particle.size, 0, Math.PI * 2);
                context!.fill();

                if (particle.size > 1.9) {
                    context!.beginPath();
                    context!.fillStyle = `rgba(255, 255, 255, ${alpha * 0.72})`;
                    context!.shadowBlur = 17;
                    context!.arc(x, y, particle.size * 0.42, 0, Math.PI * 2);
                    context!.fill();
                }
            }

            context!.shadowBlur = 0;
            context!.globalCompositeOperation = 'source-over';
        }

        function animate() {
            if (!isVisible || reducedMotion) {
                animationFrame = 0;
                draw();
                return;
            }
            frame++;
            draw();
            animationFrame = window.requestAnimationFrame(animate);
        }

        function startAnimation() {
            if (!animationFrame && isVisible && !reducedMotion) {
                animationFrame = window.requestAnimationFrame(animate);
            }
        }

        function updateMotionPreference() {
            reducedMotion = motionPreference.matches;
            if (reducedMotion && animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            }
            draw();
            startAnimation();
        }

        function updateVisibility() {
            isVisible = document.visibilityState === 'visible';
            if (isVisible) startAnimation();
            else if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            }
        }

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting && document.visibilityState === 'visible';
            if (isVisible) startAnimation();
            else if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
            }
        });

        observer.observe(canvas);
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', updateVisibility);
        motionPreference.addEventListener('change', updateMotionPreference);
        resize();
        startAnimation();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', updateVisibility);
            motionPreference.removeEventListener('change', updateMotionPreference);
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
