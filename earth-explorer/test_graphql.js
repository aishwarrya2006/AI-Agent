

(async () => {
  const query = {
    query: `{
      info {
        agents {
          name
          description
          type
        }
      }
    }`
  };

  try {
    const res = await fetch('http://127.0.0.1:8000/copilotkit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });
    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Response JSON:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
})();
