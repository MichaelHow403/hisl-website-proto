// /src/app/api/v1/site/forms/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    
    if (!idempotencyKey) {
      return NextResponse.json({ error: 'Idempotency-Key header is required' }, { status: 400 });
    }

    const body = await request.json();
    const formId = params.id;

    // Process the form submission based on formId
    let result;
    switch (formId) {
      case 'contact':
        result = await processContactForm(body, idempotencyKey);
        break;
      case 'rfp':
        result = await processRFPForm(body, idempotencyKey);
        break;
      case 'newsletter':
        result = await processNewsletterForm(body, idempotencyKey);
        break;
      default:
        return NextResponse.json({ error: 'Unknown form ID' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      idempotencyKey,
      triage: { tag: "sales", severity: "info" },
      route: { owner: "HISL", channel: "email" },
      ...result
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processContactForm(body: any, idempotencyKey: string) {
  // Validate required fields
  const { name, email, company, message } = body;
  
  if (!name || !email || !message) {
    throw new Error('Missing required fields');
  }

  // Here you would normally save to database or send email
  console.log('Contact form submission:', { name, email, company, message, idempotencyKey });
  
  return { message: 'Contact form submitted successfully' };
}

async function processRFPForm(body: any, idempotencyKey: string) {
  const { name, email, org, scope, timeline, budgetBand } = body;
  
  if (!name || !email || !org || !scope) {
    throw new Error('Missing required fields');
  }

  console.log('RFP form submission:', { name, email, org, scope, timeline, budgetBand, idempotencyKey });
  
  return { message: 'RFP submitted successfully' };
}

async function processNewsletterForm(body: any, idempotencyKey: string) {
  const { email } = body;
  
  if (!email) {
    throw new Error('Email is required');
  }

  console.log('Newsletter subscription:', { email, idempotencyKey });
  
  return { message: 'Newsletter subscription successful' };
}


