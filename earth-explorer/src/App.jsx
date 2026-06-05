import { useEffect, useMemo, useRef, useState } from 'react';
import { Earth, Sliders, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { environmentPresets, resolveDestination } from './data.js';
import GlobeView from './components/GlobeView';
import LandmarkView from './components/LandmarkView';
import SearchConsole from './components/SearchConsole';
import CoPilotAgentPanel from './components/CoPilotAgentPanel';

const journeyTimers = [0, 900, 1900, 3200];

export default function App() {
    const [transitionState, setTransitionState] = useState('SPACE');
    const [activeDestination, setActiveDestination] = useState(null);
    const [activeStage, setActiveStage] = useState(0);
    const [activeMonumentIndex, setActiveMonumentIndex] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem('terra-audio') === 'true');
    const stageTimerRef = useRef([]);
    const lenisRef = useRef(null);

    const activeEnvironment = useMemo(() => (
        activeDestination ? environmentPresets[activeDestination.environment] : null
    ), [activeDestination]);

    const phaseLabel = activeDestination?.journey?.[activeStage] || "Plotting course";
    const activeMonument = activeDestination?.monuments?.[activeMonumentIndex] || null;

    useEffect(() => {
        return () => stageTimerRef.current.forEach(window.clearTimeout);
    }, []);

    // Lenis Smooth Scroll setup
    useEffect(() => {
        if (transitionState !== 'LANDSCAPE') {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            return;
        }

        const lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: true
        });

        lenisRef.current = lenis;

        lenis.on('scroll', (e) => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return;
            
            const progress = e.scroll / scrollHeight;
            const count = activeDestination?.monuments?.length || 1;
            const nextIndex = Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));
            
            if (nextIndex !== activeMonumentIndex) {
                setActiveMonumentIndex(nextIndex);
                setActiveStage(nextIndex);
            }
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, [transitionState, activeDestination, activeMonumentIndex]);

    const showToast = (message) => {
        setToastMessage(message);
        window.setTimeout(() => setToastMessage(null), 3800);
    };

    const handleLaunchVoyage = (destinationName) => {
        const destination = resolveDestination(destinationName);
        if (!destination) {
            showToast(`Course not resolved. Try India, France, Egypt, Japan, or Italy.`);
            return;
        }

        stageTimerRef.current.forEach(window.clearTimeout);
        stageTimerRef.current = [];

        setActiveDestination(destination);
        setTransitionState('TRANSITION');
        setActiveStage(0);
        setActiveMonumentIndex(0);

        journeyTimers.forEach((delay, index) => {
            stageTimerRef.current.push(window.setTimeout(() => setActiveStage(index), delay));
        });

        const flashOverlay = document.getElementById('flash-overlay');
        gsap.fromTo(
            flashOverlay,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.42,
                delay: 3.2,
                ease: "power2.in",
                onComplete: () => {
                    setTransitionState('LANDSCAPE');
                    setActiveStage(0);
                    gsap.to(flashOverlay, { opacity: 0, duration: 0.9, ease: "power2.out" });
                },
            },
        );
    };

    const handleAscend = () => {
        stageTimerRef.current.forEach(window.clearTimeout);
        setTransitionState('TRANSITION');
        window.speechSynthesis?.cancel();

        const flashOverlay = document.getElementById('flash-overlay');
        gsap.fromTo(
            flashOverlay,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.32,
                ease: "power2.in",
                onComplete: () => {
                    setActiveDestination(null);
                    setActiveStage(0);
                    setActiveMonumentIndex(0);
                    setTransitionState('SPACE');
                    gsap.to(flashOverlay, { opacity: 0, duration: 0.8, ease: "power2.out" });
                },
            },
        );
    };

    const handleSelectMonument = (index) => {
        setActiveMonumentIndex(index);
        setActiveStage(index);
        
        if (lenisRef.current && activeDestination?.monuments) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const count = activeDestination.monuments.length;
            const targetScroll = (index / (count - 1)) * scrollHeight;
            lenisRef.current.scrollTo(targetScroll, { duration: 1.5 });
        }
    };

    return (
        <div className={`app-container ${transitionState === 'LANDSCAPE' ? 'exploration-active' : ''}`} style={{ '--accent': activeDestination?.accentColor || '#72c8ff' }}>
            <div id="flash-overlay" />

            <GlobeView
                isVisible={transitionState === 'SPACE' || transitionState === 'TRANSITION' || transitionState === 'LANDSCAPE'}
                activeDestination={activeDestination}
                transitionState={transitionState}
                activeMonumentIndex={activeMonumentIndex}
            />

            {activeDestination && (
                <LandmarkView
                    isVisible={transitionState === 'LANDSCAPE'}
                    activeDestination={activeDestination}
                    activeStage={activeStage}
                    activeMonumentIndex={activeMonumentIndex}
                />
            )}

            <div className="ui-overlay">
                <header className="universal-header">
                    <button 
                        className="logo" 
                        onClick={transitionState === 'LANDSCAPE' ? handleAscend : undefined} 
                        style={{ 
                            cursor: transitionState === 'LANDSCAPE' ? 'pointer' : 'default',
                            pointerEvents: transitionState === 'LANDSCAPE' ? 'auto' : 'none'
                        }}
                    >
                        <span className="logo-icon"><Earth size={18} /></span>
                        <span className="logo-text">TERRA<span>EXPLORER</span></span>
                        {transitionState === 'LANDSCAPE' && (
                            <span style={{ fontSize: '9px', color: 'var(--accent)', marginLeft: '12px', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', border: '1px solid var(--accent)', padding: '2px 6px', borderRadius: '4px' }}>RETURN</span>
                        )}
                    </button>

                    <div className="header-right" style={{ display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
                        <button 
                            className="icon-btn rounded-btn" 
                            onClick={() => setSoundEnabled((value) => {
                                localStorage.setItem('terra-audio', String(!value));
                                return !value;
                            })} 
                            aria-label="Toggle narration"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'grid',
                                placeItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </button>
                        <button 
                            className="icon-btn rounded-btn" 
                            onClick={() => setShowSettings(true)} 
                            aria-label="Open settings"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'grid',
                                placeItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Sliders size={16} />
                        </button>
                    </div>
                </header>

                {transitionState !== 'LANDSCAPE' && (
                    <SearchConsole
                        onSubmit={handleLaunchVoyage}
                        isPlotting={transitionState === 'TRANSITION'}
                        phaseLabel={phaseLabel}
                    />
                )}

                {transitionState === 'LANDSCAPE' && activeDestination && (
                    <div className="left-landmark-nav" style={{
                        position: 'fixed',
                        left: '40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        pointerEvents: 'auto'
                    }}>
                        {activeDestination.monuments?.map((monument, index) => (
                            <button
                                key={monument.id}
                                className={`landmark-nav-dot-wrapper ${index === activeMonumentIndex ? 'active' : ''}`}
                                onClick={() => handleSelectMonument(index)}
                                style={{
                                    background: 'transparent',
                                    border: 0,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '28px',
                                    height: '28px',
                                }}
                            >
                                <div 
                                    className="landmark-nav-dot"
                                    style={{
                                        width: index === activeMonumentIndex ? '10px' : '6px',
                                        height: index === activeMonumentIndex ? '10px' : '6px',
                                        borderRadius: '50%',
                                        backgroundColor: index === activeMonumentIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.35)',
                                        boxShadow: index === activeMonumentIndex ? '0 0 10px var(--accent)' : 'none',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                />
                                <span 
                                    className="landmark-tooltip"
                                    style={{
                                        position: 'absolute',
                                        left: '36px',
                                        whiteSpace: 'nowrap',
                                        background: 'rgba(3, 7, 18, 0.85)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '11px',
                                        fontFamily: 'var(--font-mono)',
                                        letterSpacing: '0.04em',
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        transform: 'translateX(-5px)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {String(index + 1).padStart(2, '0')}. {monument.name.toUpperCase()}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                <CoPilotAgentPanel
                    activeDestination={activeDestination}
                    activeStage={activeStage}
                    activeMonumentIndex={activeMonumentIndex}
                    onSelectMonument={handleSelectMonument}
                    isVisible={transitionState === 'LANDSCAPE'}
                />

                <div className="status-overlay glassmorphic">
                    <span className="status-label">POSITION VECTOR</span>
                    <strong>
                        {activeDestination && activeMonument
                            ? `${activeMonument.coordinates[0].toFixed(4)} N, ${activeMonument.coordinates[1].toFixed(4)} E`
                            : "00.0000 N, 00.0000 E"}
                    </strong>
                    <span className="status-label">EXPLORATION METRIC</span>
                    <strong>{transitionState === 'SPACE' ? 'Orbital Flight' : transitionState === 'TRANSITION' ? phaseLabel : `Monuments 0${activeMonumentIndex + 1} / 0${activeDestination?.monuments?.length || 4}`}</strong>
                </div>
            </div>

            <div className={`modal-backdrop ${showSettings ? '' : 'hidden'}`} onClick={() => setShowSettings(false)}>
                <div className="modal glassmorphic" onClick={(event) => event.stopPropagation()}>
                    <div className="modal-header">
                        <h2>System Parameters</h2>
                        <button className="close-modal-btn" onClick={() => setShowSettings(false)} aria-label="Close settings">&times;</button>
                    </div>
                    <div className="settings-group">
                        <label>Voice Synthesizer Narration</label>
                        <input
                            type="checkbox"
                            className="switch-input"
                            checked={soundEnabled}
                            onChange={(event) => {
                                localStorage.setItem('terra-audio', String(event.target.checked));
                                setSoundEnabled(event.target.checked);
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        System uses 2D NASA satellite vector overlays and AI backend endpoints.
                    </div>
                </div>
            </div>

            <div className={`toast glassmorphic ${toastMessage ? '' : 'hidden'}`}>
                {toastMessage}
            </div>
        </div>
    );
}
