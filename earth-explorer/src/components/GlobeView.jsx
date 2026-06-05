import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Procedural stars drawing for space background
function drawStars(canvas, ctx) {
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#02040b';
    ctx.fillRect(0, 0, w, h);

    const starCount = 300;
    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.5;
        const alpha = Math.random() * 0.8 + 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function GlobeView({ isVisible, activeDestination, transitionState, activeMonumentIndex = 0 }) {
    const mapRef = useRef(null);
    const canvasRef = useRef(null);
    const starsRef = useRef(null);
    const [zoomScale, setZoomScale] = useState(1);

    // Initial stars rendering and resizing
    useEffect(() => {
        if (!starsRef.current) return;
        const canvas = starsRef.current;
        const ctx = canvas.getContext('2d');
        
        const handleResize = () => drawStars(canvas, ctx);
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ambient floating particles canvas on top of map
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 3 + 1,
            speedY: -Math.random() * 0.4 - 0.1,
            speedX: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.6 + 0.1,
            pulseSpeed: Math.random() * 0.02 + 0.01,
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

                if (p.y < 0) p.y = canvas.height;
                if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(114, 200, 255, ${Math.max(0.05, Math.min(p.alpha, 0.75))})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = 'rgba(114, 200, 255, 0.4)';
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Zoom and Pan Transition Logic
    useEffect(() => {
        if (!mapRef.current) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const mapW = vw;
        const mapH = vw * 0.5; // Aspect ratio 2:1

        let scale = 1;
        let x = 0;
        let y = (vh - mapH) / 2; // Vertically center map

        if (activeDestination) {
            // Determine active monument coordinates
            const monuments = activeDestination.monuments || [];
            const activeMonument = monuments[activeMonumentIndex] || monuments[0];
            const lat = activeMonument ? activeMonument.coordinates[0] : activeDestination.landmarkLat;
            const lon = activeMonument ? activeMonument.coordinates[1] : activeDestination.landmarkLon;

            // Map coordinates to percentage (0 to 1)
            const u = (lon + 180) / 360;
            const v = (90 - lat) / 180;

            if (transitionState === 'TRANSITION') {
                scale = 6.5;
                x = vw / 2 - u * mapW * scale;
                y = vh / 2 - v * mapH * scale;
            } else if (transitionState === 'LANDSCAPE') {
                scale = 12.0; // Deep close-up in landscape exploration mode
                x = vw / 2 - u * mapW * scale;
                y = vh / 2 - v * mapH * scale;
            }
        } else {
            // Space Orbit view - reset and start slow idle breathing drift
            scale = 1.0;
            x = 0;
            y = (vh - mapH) / 2;
        }

        const tl = gsap.timeline();

        // Animate scale and position
        tl.to(mapRef.current, {
            scale: scale,
            x: x,
            y: y,
            duration: transitionState === 'LANDSCAPE' ? 1.8 : 2.6,
            ease: transitionState === 'LANDSCAPE' ? "power2.out" : "power3.inOut",
            onUpdate: () => {
                setZoomScale(gsap.getProperty(mapRef.current, "scale"));
            }
        });

        // Add idle drift if back in SPACE mode
        if (transitionState === 'SPACE') {
            tl.to(mapRef.current, {
                x: "+=15",
                y: "+=5",
                scale: 1.03,
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        return () => {
            tl.kill();
        };
    }, [activeDestination, transitionState, activeMonumentIndex]);

    const activeMonument = activeDestination?.monuments?.[activeMonumentIndex] || activeDestination?.monuments?.[0];

    return (
        <div 
            className="living-map-container"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 1,
                display: isVisible ? 'block' : 'none',
                background: '#02040b',
            }}
        >
            {/* Space Starfield Canvas */}
            <canvas
                ref={starsRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Living 2D Map Wrapper */}
            <div
                ref={mapRef}
                className="map-transform-wrapper"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100vw',
                    height: '50vw', // 2:1 aspect ratio
                    transformOrigin: '0 0',
                    zIndex: 2,
                }}
            >
                {/* Satellite Map Terrain Layer */}
                <div
                    className="satellite-layer"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: "url('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')",
                        backgroundSize: '100% 100%',
                        opacity: 0.88,
                        borderRadius: zoomScale > 1.2 ? '0px' : '999px', // round the map in space view
                        boxShadow: zoomScale > 1.2 ? 'none' : '0 0 100px rgba(0, 162, 255, 0.35)',
                        transition: 'border-radius 1.2s ease, box-shadow 1.2s ease',
                    }}
                />

                {/* Cloud Shadows (Subtle bottom layer of clouds) */}
                <div
                    className="cloud-shadow-layer"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: "url('https://unpkg.com/three-globe/example/img/earth-clouds.png')",
                        backgroundSize: '100% 100%',
                        opacity: 0.15,
                        mixBlendMode: 'multiply',
                        transform: 'translate(4px, 4px)',
                        animation: 'cloudDrift 160s linear infinite',
                        pointerEvents: 'none',
                    }}
                />

                {/* Animated Clouds Layer */}
                <div
                    className="clouds-layer"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: "url('https://unpkg.com/three-globe/example/img/earth-clouds.png')",
                        backgroundSize: '100% 100%',
                        opacity: 0.45,
                        mixBlendMode: 'screen',
                        animation: 'cloudDrift 140s linear infinite',
                        pointerEvents: 'none',
                    }}
                />

                {/* Landmark Pulse Beacon */}
                {activeDestination && activeMonument && zoomScale > 2.0 && (
                    <div
                        className="map-beacon-container"
                        style={{
                            position: 'absolute',
                            left: `${((activeMonument.coordinates[1] + 180) / 360) * 100}%`,
                            top: `${((90 - activeMonument.coordinates[0]) / 180) * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 6,
                        }}
                    >
                        <div className="pulse-circle" style={{ '--accent': activeDestination.accentColor }} />
                        <div className="pulse-core" style={{ '--accent': activeDestination.accentColor }} />
                    </div>
                )}
            </div>

            {/* Glowing Atmosphere vignette */}
            <div
                className="atmosphere-glow-overlay"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: zoomScale > 2.5 
                        ? `radial-gradient(circle at center, transparent 30%, rgba(2, 4, 11, 0.6) 70%, #02040b 100%)`
                        : `radial-gradient(circle at center, transparent 50%, rgba(10, 20, 40, 0.25) 75%, #02040b 98%)`,
                    pointerEvents: 'none',
                    zIndex: 3,
                    transition: 'background 1.5s ease',
                }}
            />

            {/* Subtle moving particles on top */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 4,
                }}
            />
        </div>
    );
}
