import React from 'react';
import { Compass } from 'lucide-react';

const monumentImages = {
    "taj-mahal": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
    "red-fort": "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=1600&q=80",
    "qutub-minar": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/56/e2/7e/engineering-marvel-at.jpg?w=1600&h=1200&s=1",
    "hawa-mahal": "https://images.unsplash.com/photo-1603258591220-6d7e0813cd11?auto=format&fit=crop&w=1600&q=80",
    "hampi": "https://images.unsplash.com/photo-1600100397608-f010e425bf71?auto=format&fit=crop&w=1600&q=80",
    
    "eiffel-tower": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    "louvre": "https://images.unsplash.com/photo-1597910037318-77dfd0f32997?auto=format&fit=crop&w=1600&q=80",
    "arc-triomphe": "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1600&q=80",
    "mont-saint-michel": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    
    "great-pyramid": "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1600&q=80",
    "sphinx": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=80",
    "luxor-temple": "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=1600&q=80",
    "abu-simbel": "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=1600&q=80",
    
    "mount-fuji": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    "fushimi-inari": "https://images.unsplash.com/photo-1490761908851-4b02e547637f?auto=format&fit=crop&w=1600&q=80",
    "himeji-castle": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",

    "colosseum": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
    "leaning-tower": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80",
    "venice-canals": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=80",
    "florence-cathedral": "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&w=1600&q=80"
};

export default function LandmarkView({ isVisible, activeDestination, activeStage, activeMonumentIndex }) {
    if (!isVisible || !activeDestination) return null;

    const monuments = activeDestination.monuments || [];

    return (
        <div 
            className="story-scroll-container"
            style={{
                position: 'relative',
                width: '100%',
                zIndex: 2,
                pointerEvents: 'auto',
            }}
        >
            {/* Vertically stacked 100vh sections that scroll naturally */}
            <div 
                className="story-sections-wrapper"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                }}
            >
                {monuments.map((monument, index) => {
                    const description = monument.description || "";
                    const imageKey = monument.id;
                    const imageUrl = monumentImages[imageKey] || activeDestination.mediaUrl;

                    return (
                        <div 
                            key={monument.id}
                            className="story-scroll-section"
                            style={{
                                position: 'relative',
                                height: '100vh',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '110px 80px 140px 80px',
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Fullscreen Background Image for this specific monument */}
                            <div 
                                className="section-background"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    opacity: index === activeMonumentIndex ? 0.55 : 0, // Fade out if not active, fade in if active
                                    mixBlendMode: 'luminosity',
                                    zIndex: 1,
                                    transition: 'opacity 0.8s ease',
                                    pointerEvents: 'none',
                                    backgroundColor: '#02040b',
                                }}
                            />

                            {/* Dark Vignettes */}
                            <div 
                                className="vignette-overlay"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(90deg, rgba(2, 4, 11, 0.94) 0%, rgba(2, 4, 11, 0.6) 35%, rgba(2, 4, 11, 0) 65%, rgba(2, 4, 11, 0.8) 100%)',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                }}
                            />
                            <div 
                                className="vignette-bottom"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '35vh',
                                    background: 'linear-gradient(0deg, rgba(2, 4, 11, 1) 0%, rgba(2, 4, 11, 0) 100%)',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* Content Overlay */}
                            <div 
                                className="section-content"
                                style={{
                                    position: 'relative',
                                    zIndex: 3,
                                    pointerEvents: 'none',
                                }}
                            >
                                {/* Breadcrumb metadata */}
                                <div 
                                    className="story-metadata"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '24px',
                                        marginBottom: '32px',
                                        opacity: index === activeMonumentIndex ? 1 : 0.25,
                                        transform: index === activeMonumentIndex ? 'none' : 'translateY(10px)',
                                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                >
                                    <div className="metadata-badge">
                                        <Compass size={13} style={{ marginRight: '6px' }} />
                                        <span>{activeDestination.type.toUpperCase()} // 0{index + 1}</span>
                                    </div>
                                    <div className="location-breadcrumbs">
                                        <span className="country-link">{activeDestination.name.toUpperCase()}</span>
                                        <span className="breadcrumb-divider">&rarr;</span>
                                        <span className="monument-link">{monument.city.toUpperCase()}</span>
                                    </div>
                                </div>

                                {/* Monument Titles */}
                                <div 
                                    style={{ 
                                        maxWidth: '650px', 
                                        alignSelf: 'flex-start',
                                        opacity: index === activeMonumentIndex ? 1 : 0.15,
                                        transform: index === activeMonumentIndex ? 'none' : 'translateY(20px)',
                                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                >
                                    <h2 
                                        className="story-display-title"
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(50px, 6vw, 100px)',
                                            fontWeight: 300,
                                            lineHeight: 0.9,
                                            letterSpacing: '-0.02em',
                                            color: '#ffffff',
                                            margin: '0 0 24px 0',
                                        }}
                                    >
                                        {monument.name}
                                    </h2>
                                    <p 
                                        className="story-narrative-body"
                                        style={{
                                            fontFamily: 'var(--font-ui)',
                                            fontSize: '18px',
                                            fontWeight: 300,
                                            lineHeight: 1.7,
                                            color: 'rgba(255, 255, 255, 0.82)',
                                            margin: '0',
                                            letterSpacing: '0.015em',
                                        }}
                                    >
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
