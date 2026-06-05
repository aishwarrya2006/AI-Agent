import React, { useState } from 'react';
import { ArrowUpRight, Compass, LocateFixed } from 'lucide-react';

export default function SearchConsole({ onSubmit, isPlotting = false, phaseLabel = "" }) {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const launch = (value = inputValue) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        setIsFocused(false);
        document.activeElement?.blur?.();
        onSubmit(trimmed);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            launch(inputValue);
        }
    };

    return (
        <div className={`console-container ${isPlotting ? 'is-plotting' : ''}`}>
            <div className="console-panel glassmorphic">
                <div className="console-icon" aria-hidden="true">
                    {isPlotting ? <LocateFixed size={20} /> : <Compass size={20} />}
                </div>
                <div className="console-input-wrapper">
                    <input
                        type="text"
                        className="console-input"
                        placeholder={isPlotting ? phaseLabel : "Where are we going today?"}
                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
                        disabled={isPlotting}
                        autoComplete="off"
                        aria-label="Destination search"
                    />
                    {isPlotting && <span className="journey-progress">{phaseLabel}</span>}
                </div>
                <button
                    className="console-submit-btn"
                    onClick={() => launch()}
                    disabled={isPlotting}
                    title="Launch voyage"
                    aria-label="Launch voyage"
                >
                    <ArrowUpRight size={18} />
                </button>
            </div>
        </div>
    );
}
