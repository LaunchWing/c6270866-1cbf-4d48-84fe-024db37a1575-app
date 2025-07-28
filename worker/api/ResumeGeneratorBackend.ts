import { validateInput, generateResumeTemplate } from '../../functions/api/helpers';

export async function ResumeGeneratorBackendHandler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const requestBody = await req.json();
    const validationError = validateInput(requestBody);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const resumeTemplate = await generateResumeTemplate(requestBody);
    return new Response(JSON.stringify({ resumeTemplate }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}