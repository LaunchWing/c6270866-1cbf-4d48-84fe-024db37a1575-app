export function validateInput(input: any): string | null {
  if (!input || typeof input !== 'object') {
    return 'Invalid input data';
  }

  if (typeof input.jobRole !== 'string' || input.jobRole.trim() === '') {
    return 'Job role is required';
  }

  if (typeof input.industry !== 'string' || input.industry.trim() === '') {
    return 'Industry is required';
  }

  return null;
}

export async function generateResumeTemplate(input: { jobRole: string; industry: string }): Promise<string> {
  // Simulate AI processing for resume generation
  const templates = {
    'Software Engineer': {
      'Tech': 'Tech-focused Software Engineer Resume Template',
      'Finance': 'Finance-focused Software Engineer Resume Template'
    },
    'Finance': {
      'Tech': 'Tech-focused Finance Resume Template',
      'Finance': 'Finance-focused Finance Resume Template'
    }
  };

  const industryTemplates = templates[input.jobRole];
  if (!industryTemplates) {
    return 'Default Resume Template';
  }

  return industryTemplates[input.industry] || 'Default Resume Template';
}