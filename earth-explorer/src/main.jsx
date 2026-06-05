import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Intercept fetch calls to mock the CopilotKit backend runtime if it's offline,
// preventing browser "Failed to fetch" warnings while maintaining UI guide functionality.
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const url = args[0];
    const urlString = typeof url === 'string' ? url : (url && url.url) || '';
    if (urlString.includes('/copilotkit')) {
        try {
            return await originalFetch.call(window, ...args);
        } catch (error) {
            console.warn("CopilotKit backend offline, using mock fallback:", error);
            const isInfoRequest = urlString.includes('/info') || 
                (args[1] && args[1].body && typeof args[1].body === 'string' && args[1].body.includes('"info"'));
            
            return new Response(JSON.stringify({
                status: "ok",
                agents: [
                    {
                        name: "default",
                        description: "Default Agent",
                        type: "langgraph_agui"
                    }
                ],
                actions: [],
                messages: []
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
    return originalFetch.call(window, ...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
