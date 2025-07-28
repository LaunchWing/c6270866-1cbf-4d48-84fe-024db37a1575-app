document.getElementById('resume-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const jobRole = document.getElementById('job-role').value;
    const industry = document.getElementById('industry').value;

    try {
        const response = await fetch('/functions/api/handler.ts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, jobRole, industry })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('resume-output').innerHTML = `<pre>${data.resume}</pre>`;
            document.getElementById('result').classList.remove('hidden');
        } else {
            console.error('Failed to generate resume');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});