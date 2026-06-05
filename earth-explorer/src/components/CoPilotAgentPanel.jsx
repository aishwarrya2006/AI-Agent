import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Volume2, VolumeX, X } from 'lucide-react';

export default function CoPilotAgentPanel({ activeDestination, activeStage, activeMonumentIndex = 0, onSelectMonument, isVisible }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem('terra-audio') === 'true');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const currentMonument = activeDestination?.monuments?.[activeMonumentIndex] || activeDestination?.monuments?.[0];

    // Speak helper for narration
    const speakText = (text) => {
        if (!soundEnabled) return;
        window.speechSynthesis?.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.98;
        utterance.pitch = 0.95;
        window.speechSynthesis?.speak(utterance);
    };

    // Auto-scroll messages to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Initial greeting when destination changes
    useEffect(() => {
        if (activeDestination && messages.length === 0) {
            const initialGreeting = `Expedition lock established on ${currentMonument?.name || activeDestination.name}. Ask me any questions about the history or culture of this location!`;
            setMessages([
                {
                    role: 'assistant',
                    content: initialGreeting,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            speakText(initialGreeting);
        }
    }, [activeDestination]);

    // Contextual quick-prompts
    const quickPrompts = [
        `What is the history here?`,
        `Tell me about the architecture.`,
        `Give me a hidden fact.`
    ];

    const handleSend = async (textToSend) => {
        const query = textToSend.trim();
        if (!query || isLoading) return;

        setInputValue('');

        // Add user message
        const userMessage = {
            role: 'user',
            content: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Add context about current location
            const contextQuery = `I'm currently viewing ${currentMonument?.name || activeDestination?.name || 'a monument'}${currentMonument?.city ? ` in ${currentMonument.city}` : ''}. ${query}`;

            const response = await fetch('http://127.0.0.1:8000/copilotkit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: 'user', content: contextQuery }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            if (content) {
                                assistantContent += content;
                                // Update the last message with streaming content
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    const lastMsg = newMessages[newMessages.length - 1];
                                    if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isStreaming) {
                                        lastMsg.content = assistantContent;
                                    } else {
                                        newMessages.push({
                                            role: 'assistant',
                                            content: assistantContent,
                                            isStreaming: true,
                                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        });
                                    }
                                    return newMessages;
                                });
                            }
                        } catch (e) {
                            console.error('Parse error:', e);
                        }
                    }
                }
            }

            // Finalize the streaming message
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg && lastMsg.isStreaming) {
                    delete lastMsg.isStreaming;
                }
                return newMessages;
            });

            // Speak the response
            if (assistantContent) {
                speakText(assistantContent);
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `I'm having trouble connecting to the knowledge base. Error: ${error.message}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Slide-out Sidebar Panel */}
            <aside className={`copilot-sidebar ${collapsed ? 'collapsed' : ''}`} style={{ pointerEvents: 'none' }}>
                <div className="guide-shell glassmorphic" style={{ pointerEvents: 'auto' }} data-lenis-prevent>
                    {/* Header */}
                    <div className="copilot-header" style={{ position: 'relative' }}>
                        <h2 className="copilot-title" style={{ fontSize: '24px', fontWeight: 400 }}>Expedition Guide</h2>
                        <p className="copilot-subtitle" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600 }}>
                            {activeDestination?.name || 'Orbit'}
                        </p>
                        
                        {/* Clean Close X Button in Top Right */}
                        <button 
                            className="close-guide-x"
                            onClick={() => setCollapsed(true)}
                            aria-label="Close guide"
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '0px',
                                background: 'transparent',
                                border: 0,
                                cursor: 'pointer',
                                color: 'var(--text-muted)',
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#fff'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Audio Toggle in Sidebar */}
                    <div className="audio-toggle-bar" style={{ marginTop: '10px' }}>
                        <button 
                            className="audio-btn-inline"
                            onClick={() => {
                                const nextState = !soundEnabled;
                                setSoundEnabled(nextState);
                                localStorage.setItem('terra-audio', String(nextState));
                                if (!nextState) window.speechSynthesis?.cancel();
                            }}
                        >
                            {soundEnabled ? (
                                <>
                                    <Volume2 size={13} /> Narration Active
                                </>
                            ) : (
                                <>
                                    <VolumeX size={13} /> Narration Muted
                                </>
                            )}
                        </button>
                    </div>

                    {/* Chat Messages Log */}
                    <div className="copilot-messages-container" style={{ marginTop: '14px' }}>
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`msg-bubble ${message.role}`}>
                                <p>{message.content}</p>
                                <span className="msg-time">{message.timestamp}</span>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="msg-bubble assistant typing">
                                <span className="dot" />
                                <span className="dot" />
                                <span className="dot" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Prompts */}
                    <div className="quick-prompts-scroller">
                        {quickPrompts.map((promptText, idx) => (
                            <button 
                                key={`qp-${idx}`}
                                className="quick-prompt-tag"
                                onClick={() => handleSend(promptText)}
                                disabled={isLoading}
                            >
                                {promptText}
                            </button>
                        ))}
                    </div>

                    {/* Input Footer */}
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(inputValue);
                        }} 
                        className="copilot-input-form"
                    >
                        <input
                            type="text"
                            className="copilot-text-input"
                            placeholder="Inquire about history, culture..."
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="copilot-send-btn" aria-label="Send query" disabled={isLoading}>
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </aside>

            {/* Clean bottom-right floating chat trigger widget when collapsed */}
            {collapsed && (
                <button
                    className="ai-guide-trigger glassmorphic"
                    onClick={() => setCollapsed(false)}
                    aria-label="Open AI Guide"
                    style={{
                        position: 'fixed',
                        right: '40px',
                        bottom: '120px',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                        zIndex: 100,
                        pointerEvents: 'auto',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--accent)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        transition: 'transform 0.2s ease, border-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                    }}
                >
                    <MessageSquare size={20} />
                </button>
            )}
        </>
    );
}
