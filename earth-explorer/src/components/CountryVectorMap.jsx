import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Coordinates are mapped as:
// X = lon + 180 (0 to 360)
// Y = 90 - lat (0 to 180)

const countryVectors = {
    india: {
        boundary: "M 248 68 L 252 64 L 258 55 L 262 55 L 264 58 L 261 61 L 265 62 L 271 63 L 277 62 L 274 65 L 269 66 L 268 70 L 264 73 L 260 77 L 259 81 L 256 80 L 253 74 L 252 69 Z",
        rivers: [
            "M 258 55 Q 262 60 269 66", // Ganges
            "M 257 56 Q 260 62 268 70", // Yamuna
        ],
        states: [
            "M 252 64 L 261 61", // Northern boundary division
            "M 253 74 L 264 73", // Deccan division
            "M 259 81 L 259 75", // Southern tip division
        ],
        labels: [
            { text: "Rajasthan", x: 251, y: 65 },
            { text: "Uttar Pradesh", x: 259, y: 64 },
            { text: "Maharashtra", x: 255, y: 72 },
            { text: "Karnataka", x: 256, y: 77 },
        ]
    },
    france: {
        boundary: "M 177 41 L 183 40 L 187 42 L 188 46 L 185 48 L 180 48 L 176 45 Z",
        rivers: [
            "M 183 40 Q 181 43 180 45", // Seine
            "M 187 42 Q 183 45 180 48", // Loire
        ],
        states: [
            "M 180 45 L 185 45", // Center division
            "M 183 40 L 183 48", // North-South division
        ],
        labels: [
            { text: "Normandy", x: 178, y: 42 },
            { text: "Île-de-France", x: 182, y: 43 },
            { text: "Provence", x: 184, y: 47 },
        ]
    },
    egypt: {
        boundary: "M 205 59 L 215 59 L 215 68 L 205 68 Z",
        rivers: [
            "M 211 68 Q 211 62 211 59", // Nile
        ],
        states: [
            "M 205 63 L 215 63", // Sinai / North-South split
        ],
        labels: [
            { text: "Lower Egypt", x: 209, y: 60 },
            { text: "Upper Egypt", x: 209, y: 66 },
            { text: "Sinai", x: 213, y: 61 },
        ]
    },
    japan: {
        boundary: "M 309 58 L 312 56 L 317 53 L 322 49 L 325 45 L 326 45 L 324 49 L 320 52 L 316 56 L 312 59 Z",
        rivers: [
            "M 319 51 Q 318 53 317 54", // Shinano
        ],
        states: [
            "M 312 56 L 315 57", // Kansai/Kanto division
            "M 320 52 L 322 53", // Tohoku division
        ],
        labels: [
            { text: "Kanto", x: 319, y: 52 },
            { text: "Kansai", x: 314, y: 55 },
            { text: "Hokkaido", x: 324, y: 47 },
        ]
    },
    italy: {
        boundary: "M 186 43 L 189 43 L 192 45 L 194 48 L 198 52 L 199 53 L 198 54 L 195 52 L 191 50 L 189 48 L 187 46 Z",
        rivers: [
            "M 191 48 Q 192 49 193 50", // Tiber
        ],
        states: [
            "M 189 45 L 193 47", // North/Central split
            "M 192 50 L 196 52", // South split
        ],
        labels: [
            { text: "Tuscany", x: 189, y: 46 },
            { text: "Lazio", x: 191, y: 49 },
            { text: "Veneto", x: 190, y: 44 },
        ]
    }
};

export default function CountryVectorMap({ countryName, activeMonumentIndex = 0, isVisible = false }) {
    const svgRef = useRef(null);
    const vector = countryVectors[countryName?.toLowerCase()];

    useEffect(() => {
        if (!svgRef.current || !vector || !isVisible) return;

        // Reset stroke dashes for path animation
        const paths = svgRef.current.querySelectorAll('.draw-path');
        paths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });

        const labels = svgRef.current.querySelectorAll('.map-label');
        const pins = svgRef.current.querySelectorAll('.map-pin');

        const tl = gsap.timeline();

        // Animate country outline drawing
        tl.to(paths, {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power2.inOut",
            stagger: 0.1,
        });

        // Fade in labels
        tl.to(labels, {
            opacity: 0.75,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.15,
        }, "-=1.2");

        // Scale in pins
        tl.to(pins, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
        }, "-=0.8");

        return () => {
            tl.kill();
        };
    }, [countryName, isVisible]);

    if (!vector) return null;

    return (
        <svg
            ref={svgRef}
            className={`country-vector-svg ${isVisible ? 'visible' : ''}`}
            viewBox="0 0 360 180"
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5,
            }}
        >
            {/* Country boundary */}
            <path
                className="draw-path boundary-line"
                d={vector.boundary}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.28"
                strokeOpacity="0.8"
                strokeDasharray="1, 0.5"
                style={{ filter: 'drop-shadow(0 0 1.5px var(--accent))' }}
            />

            {/* State borders */}
            {vector.states.map((d, i) => (
                <path
                    key={`state-${i}`}
                    className="draw-path state-line"
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="0.12"
                    strokeDasharray="0.3, 0.3"
                />
            ))}

            {/* Rivers */}
            {vector.rivers.map((d, i) => (
                <path
                    key={`river-${i}`}
                    className="draw-path river-line"
                    d={d}
                    fill="none"
                    stroke="#4fa3ff"
                    strokeWidth="0.18"
                    strokeOpacity="0.65"
                />
            ))}

            {/* Region Text Labels */}
            {vector.labels.map((label, i) => (
                <g key={`label-${i}`}>
                    <text
                        className="map-label"
                        x={label.x}
                        y={label.y}
                        fill="rgba(255,255,255,0.8)"
                        fontSize="1.1"
                        fontFamily="var(--font-mono)"
                        letterSpacing="0.08em"
                        textAnchor="middle"
                        style={{
                            opacity: 0,
                            transform: 'translateY(1px)',
                            transition: 'opacity 0.5s ease',
                        }}
                    >
                        {label.text.toUpperCase()}
                    </text>
                </g>
            ))}
        </svg>
    );
}
