/**
 * Email utility for sending confirmation emails via SMTP
 */
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailParams {
  to: string;
  name: string;
}

export interface EmailResult {
  ok: boolean;
  error?: string;
  messageId?: string;
  response?: string;
  accepted?: unknown[];
  rejected?: unknown[];
}

// Email wrapper/header template
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #334155;">
              <span style="font-size: 24px; font-weight: 800; color: #ffffff;">GovCon</span>
              <span style="font-size: 24px; font-weight: 800; color: #4ade80;">Giants</span>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #334155;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                GovCon Giants | Helping small businesses win federal contracts
              </p>
              <p style="color: #475569; font-size: 11px; margin: 10px 0 0;">
                <a href="https://govcongiants.com" style="color: #4ade80; text-decoration: none;">govcongiants.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Pro CTA block
function proCta(): string {
  return `
<div style="background: linear-gradient(135deg, #4c1d95 0%, #1e293b 100%); border-radius: 8px; padding: 24px; text-align: center; margin-top: 30px;">
  <p style="color: #c4b5fd; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
    Ready for More?
  </p>
  <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 12px;">
    Join Pro for Full Access
  </h3>
  <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px;">
    Monthly bootcamps, premium tools, and live Q&A calls
  </p>
  <a href="https://federalhelpcenter.com/pro" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
    Join Pro - $99/mo
  </a>
</div>`;
}

// Helper to send email
async function sendEmail(to: string, subject: string, html: string, cc?: string[]): Promise<EmailResult> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('[EMAIL] SMTP credentials not configured');
    return { ok: false, error: 'SMTP not configured' };
  }

  try {
    console.log(`[EMAIL] Sending to: ${to}${cc?.length ? ` | cc: ${cc.join(', ')}` : ''} | Subject: ${subject}`);
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER}>`,
      to,
      ...(cc && cc.length ? { cc } : {}),
      subject,
      html,
    });

    console.log(`[EMAIL] Sent! ID: ${info.messageId}`);
    return {
      ok: true,
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[EMAIL] Failed:', message);
    return { ok: false, error: message };
  }
}

/**
 * Send confirmation email based on funnel source
 */
export async function sendConfirmationEmail(params: EmailParams & { source: string }): Promise<EmailResult> {
  const { to, name, source } = params;
  const firstName = name.split(' ')[0] || 'there';

  switch (source) {
    case 'free-handouts':
      return sendFreeHandoutsEmail({ to, name });
    case 'contract-vehicles-bootcamp':
      return sendContractVehiclesBootcampEmail({ to, name });
    case 'proposal-bootcamp':
      return sendProposalResourcesEmail({ to, name });
    case 'opp':
      return sendOpportunityHunterEmail({ to, name });
    case 'surge':
      return sendSurgeEmail({ to, name });
    case 'free-course':
      return sendFreeCourseEmail({ to, name });
    case 'bootcamp':
    case 'feb28-bootcamp':
      return sendBootcampEmail({ to, name });
    case 'encore':
      return sendEncoreBookletEmail({ to, name });
    case 'hubzone-webinar':
    case 'hubzone-webinar-bottom':
      return sendHubzoneWebinarEmail({ to, name });
    default:
      // Generic welcome email for unknown sources
      return sendGenericWelcomeEmail({ to, name, source });
  }
}

/**
 * Mindy confirmation email
 */
export async function sendMarketIntelligenceEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const toolUrl = 'https://getmindy.ai';
  const logoUrl = 'https://govcongiants.com/images/mi-logo.png';

  const content = `
<div style="text-align: center; margin-bottom: 24px;">
  <img src="${logoUrl}" alt="Mindy" width="180" style="max-width: 180px; height: auto;" />
</div>

<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Mindy Access is Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Great news! You now have access to Mindy - our AI-powered platform that matches your business with federal agencies that buy what you sell.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${toolUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Access Mindy
      </a>
    </td>
  </tr>
</table>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">How to Use It:</h3>
  <ol style="color: #94a3b8; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
    <li>Enter your NAICS code and certifications</li>
    <li>Our AI analyzes $700B+ in federal spending data</li>
    <li>Get your ranked list of target agencies</li>
    <li>See pain points and spending trends for each agency</li>
  </ol>
</div>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Your Mindy Access is Ready!`, emailWrapper(content));
}

// Keep old function name as alias for backward compatibility
export const sendOpportunityHunterEmail = sendMarketIntelligenceEmail;

/**
 * Surge resources confirmation email
 */
export async function sendSurgeEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const resourcesUrl = 'https://govcongiants.com/surge/thank-you';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Free Resources Are Unlocked!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  You now have access to 10 free resources to jumpstart your government contracting journey!
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${resourcesUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Access Your Resources
      </a>
    </td>
  </tr>
</table>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">What's Included:</h3>
  <ul style="color: #94a3b8; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
    <li>12-Month GovCon Action Plan</li>
    <li>AI Prompts Library for GovCon</li>
    <li>SBLO Contact Directory</li>
    <li>Prime Contractor Database</li>
    <li>Capability Statement Template</li>
    <li>Email Outreach Scripts</li>
    <li>And 4 more resources...</li>
  </ul>
</div>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Your 10 Free Resources Are Ready!`, emailWrapper(content));
}

/**
 * Free Course confirmation email
 */
export async function sendFreeCourseEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const courseUrl = 'https://govcongiants.com/free-course/course';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Free Course is Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Welcome to the 12-Day Government Contracting Course! You're about to learn everything you need to get started winning federal contracts.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${courseUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Start Your Free Course
      </a>
    </td>
  </tr>
</table>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">What You'll Learn:</h3>
  <ul style="color: #94a3b8; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
    <li>Day 1-3: Government Contracting Basics</li>
    <li>Day 4-6: Registration & Certifications</li>
    <li>Day 7-9: Finding Opportunities</li>
    <li>Day 10-12: Winning Your First Contract</li>
  </ul>
</div>

<p style="color: #94a3b8; font-size: 14px; text-align: center;">
  <strong style="color: #ffffff;">Pro Tip:</strong> Complete one lesson per day for the best results!
</p>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Your Free 12-Day Course is Ready!`, emailWrapper(content));
}

/**
 * Bootcamp confirmation email
 */
export async function sendBootcampEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const bootcampUrl = 'https://govcongiants.com/bootcamp/thank-you';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  You're Registered for the Bootcamp!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  You're all set for the GovCon Giants Bootcamp! We'll send you reminders and materials as we get closer to the event.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${bootcampUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        View Bootcamp Details
      </a>
    </td>
  </tr>
</table>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">What to Expect:</h3>
  <ul style="color: #94a3b8; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
    <li>Live training sessions with Eric Coffie</li>
    <li>Actionable templates and worksheets</li>
    <li>Q&A sessions to get your questions answered</li>
    <li>Recording access if you can't attend live</li>
  </ul>
</div>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, You're Registered for the Bootcamp!`, emailWrapper(content));
}

/**
 * Contract vehicles bootcamp confirmation email
 */
export async function sendContractVehiclesBootcampEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const bootcampUrl = 'https://govcongiants.com/contract-vehicles-bootcamp/thank-you';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Contract Vehicles Bootcamp Access Is Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  You're in. This bootcamp will help you understand IDIQs, BPAs, Sources Sought, set-asides, and contract types so you can target the right opportunities faster.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${bootcampUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Access Bootcamp Details
      </a>
    </td>
  </tr>
</table>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">What You'll Cover:</h3>
  <ul style="color: #94a3b8; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
    <li>How to evaluate major contract vehicles and pick your best fit</li>
    <li>When to respond to Sources Sought and RFIs</li>
    <li>How to align your offer with agency buying patterns</li>
    <li>How to avoid common mistakes by contract type</li>
  </ul>
</div>

${proCta()}`;

  return sendEmail(
    params.to,
    `${firstName}, Your Contract Vehicles Bootcamp Access Is Ready!`,
    emailWrapper(content)
  );
}

/**
 * Generic welcome email for unknown sources
 */
export async function sendGenericWelcomeEmail(params: EmailParams & { source: string }): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Welcome to GovCon Giants!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Thanks for signing up! We're excited to help you win federal contracts.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="https://govcongiants.com" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Explore GovCon Giants
      </a>
    </td>
  </tr>
</table>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Welcome to GovCon Giants!`, emailWrapper(content));
}

/**
 * Encore Funding TempNet book confirmation email
 */
export async function sendEncoreBookletEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const thankYouUrl = 'https://govcongiants.com/encore/thank-you';

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your TempNet Book is Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Thanks for signing up! Click below to download your free TempNet book.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${thankYouUrl}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Download Your Book
      </a>
    </td>
  </tr>
</table>

<p style="color: #94a3b8; font-size: 14px; text-align: center;">
  <a href="https://gov.encore-funding.com" style="color: #fb923c; text-decoration: none;">Encore Funding</a> — Government Contractor Financing
</p>`;

  return sendEmail(params.to, `${firstName}, Your TempNet Book is Ready!`, emailWrapper(content));
}

/**
 * Send proposal resources confirmation email with download links
 */
export async function sendProposalResourcesEmail(params: EmailParams): Promise<EmailResult> {
  const { to, name } = params;
  const firstName = name.split(' ')[0] || 'there';

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('SMTP credentials not configured');
    return { ok: false, error: 'SMTP not configured' };
  }

  const baseUrl = 'https://govcongiants.com/proposal-bootcamp';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #334155;">
              <span style="font-size: 24px; font-weight: 800; color: #ffffff;">GovCon</span>
              <span style="font-size: 24px; font-weight: 800; color: #4ade80;">Giants</span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
                Your Proposal Resources Are Ready!
              </h1>

              <p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Hey ${firstName},<br><br>
                Thanks for downloading the free proposal resources! Here are your 5 templates and guides for winning federal task orders and IDIQ contracts.
              </p>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${baseUrl}/4-thank-you.html" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
                      Access Your Downloads
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Resource List with Download Links -->
              <div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
                <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 20px;">Your Free Downloads:</h3>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #334155;">
                      <a href="${baseUrl}/downloads/IDIQ_Task_Order_Response_Template.docx" style="color: #4ade80; text-decoration: none; font-weight: 600;">IDIQ Task Order Response Template</a>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Fill-in-the-blank proposal framework (.docx)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #334155;">
                      <a href="${baseUrl}/downloads/Sources_Sought_Response_Template.docx" style="color: #4ade80; text-decoration: none; font-weight: 600;">Sources Sought Response Template</a>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Get in the top 5% of responders (.docx)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #334155;">
                      <a href="${baseUrl}/downloads/Task_Order_Proposal_Checklist.docx" style="color: #4ade80; text-decoration: none; font-weight: 600;">Task Order Proposal Checklist</a>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Pre-submit compliance checklist (.docx)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #334155;">
                      <a href="${baseUrl}/downloads/10_IDIQ_Vehicles_Guide.docx" style="color: #4ade80; text-decoration: none; font-weight: 600;">10 IDIQ Vehicles Guide</a>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">GSA MAS, OASIS+, CIO-SP4, Alliant 3 & more (.docx)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <a href="${baseUrl}/downloads/Active_IDIQ_Vehicles_List.xlsx" style="color: #4ade80; text-decoration: none; font-weight: 600;">50 Active IDIQ Vehicles List</a>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Vehicle name, agency, NAICS, ceiling values (.xlsx)</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Pro CTA -->
              <div style="background: linear-gradient(135deg, #4c1d95 0%, #1e293b 100%); border-radius: 8px; padding: 24px; text-align: center; margin-top: 30px;">
                <p style="color: #c4b5fd; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
                  Want Live Training?
                </p>
                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 12px;">
                  February Proposal Writing Surge
                </h3>
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 16px;">
                  8 hours of live proposal training on February 28, 2026
                </p>
                <a href="https://federalhelpcenter.com/pro" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Join Pro - $99/mo
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #334155;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                GovCon Giants | Helping small businesses win federal contracts
              </p>
              <p style="color: #475569; font-size: 11px; margin: 10px 0 0;">
                <a href="https://govcongiants.com" style="color: #4ade80; text-decoration: none;">govcongiants.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    // Verify SMTP connection first
    console.log(`[EMAIL] Attempting to send to: ${to}`);
    console.log(`[EMAIL] SMTP_USER configured: ${process.env.SMTP_USER ? 'yes' : 'no'}`);
    console.log(`[EMAIL] SMTP_PASSWORD configured: ${process.env.SMTP_PASSWORD ? 'yes (length: ' + process.env.SMTP_PASSWORD.length + ')' : 'no'}`);

    // Verify connection
    await transporter.verify();
    console.log('[EMAIL] SMTP connection verified');

    // Send email
    const info = await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER}>`,
      to,
      subject: `${firstName}, Your Proposal Resources Are Ready!`,
      html,
    });

    console.log(`[EMAIL] Message sent successfully!`);
    console.log(`[EMAIL] Message ID: ${info.messageId}`);
    console.log(`[EMAIL] Response: ${info.response}`);
    console.log(`[EMAIL] Accepted: ${JSON.stringify(info.accepted)}`);
    console.log(`[EMAIL] Rejected: ${JSON.stringify(info.rejected)}`);

    return {
      ok: true,
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('[EMAIL] Send failed:', message);
    console.error('[EMAIL] Stack:', stack);
    return { ok: false, error: message };
  }
}

/**
 * HUBZone webinar confirmation email — matches /hubzone landing page
 * (white + orange). Sends to leads from source: hubzone-webinar.
 */
export async function sendHubzoneWebinarEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const webinarUrl = 'https://govcongiants.com/hubzone';
  // Google Calendar add-event link (June 17, 2026, 6:00–8:00 PM EDT = 22:00–00:00 UTC)
  const calendarUrl =
    'https://www.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('From Interested To Procurement Ready — HUBZone Webinar') +
    '&dates=20260617T220000Z/20260618T000000Z' +
    '&details=' + encodeURIComponent('Live webinar for small businesses entering the federal market. Hosted by Eric Coffie with Tim Hagerty (TeamingPro), Chad Eberly (Encore Funding), and Todd Rogers (industry technical expert, IDVs & buyer side). Includes ½-hour Q&A.\n\nWebinar link will be sent before the event.\n\nDetails: https://govcongiants.com/hubzone') +
    '&location=' + encodeURIComponent('Online — link sent before event');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Registered — HUBZone Webinar</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">

          <!-- Orange Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); padding: 40px 32px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 999px; margin-bottom: 16px;">
                You&rsquo;re Registered
              </div>
              <h1 style="color: #ffffff; font-size: 30px; line-height: 1.2; font-weight: 800; margin: 0 0 12px;">
                See You June 17, ${firstName}!
              </h1>
              <p style="color: #ffedd5; font-size: 16px; margin: 0;">
                From Interested To <strong style="color: #ffffff;">Procurement Ready</strong>
              </p>
            </td>
          </tr>

          <!-- Date/Time Block -->
          <tr>
            <td style="padding: 32px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border: 2px solid #fed7aa; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="color: #9a3412; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px;">
                      Save the Date
                    </p>
                    <p style="color: #1e293b; font-size: 22px; font-weight: 800; margin: 0 0 4px;">
                      Wednesday, June 17, 2026
                    </p>
                    <p style="color: #475569; font-size: 16px; margin: 0 0 16px;">
                      6:00 PM &ndash; 8:00 PM EST <span style="color: #94a3b8; font-size: 14px;">(incl. ½-hour Q&amp;A)</span>
                    </p>
                    <a href="${calendarUrl}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
                      + Add to Google Calendar
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Body -->
          <tr>
            <td style="padding: 32px 32px 0;">
              <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin: 0 0 12px;">
                Welcome, ${firstName}.
              </h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.65; margin: 0 0 16px;">
                Your seat is reserved for the live webinar. We&rsquo;ll send your join link
                <strong style="color: #0f172a;">24 hours before</strong> the event, plus a
                final reminder <strong style="color: #0f172a;">1 hour before</strong> we go live.
              </p>
              <p style="color: #475569; font-size: 16px; line-height: 1.65; margin: 0 0 8px;">
                This is a working session. Spend the day with four people who&rsquo;ve actually
                built this and walk away with a clear plan.
              </p>
            </td>
          </tr>

          <!-- What You'll Get -->
          <tr>
            <td style="padding: 32px 32px 0;">
              <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0 0 16px;">
                What to expect on June 17
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td valign="top" style="width: 36px;">
                        <div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">1</div>
                      </td>
                      <td valign="top">
                        <p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Agency Pillar &mdash; Todd Rogers</p>
                        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Industry technical expert on IDVs and the government buyer side &mdash; how agencies evaluate and buy.</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td valign="top" style="width: 36px;">
                        <div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">2</div>
                      </td>
                      <td valign="top">
                        <p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Funding Pillar &mdash; Chad Eberly (Encore Funding)</p>
                        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Specialized capital built for federal contractors &mdash; manage financial demands without traditional bank restrictions.</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td valign="top" style="width: 36px;">
                        <div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">3</div>
                      </td>
                      <td valign="top">
                        <p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Teaming Pillar &mdash; Tim Hagerty (TeamingPro)</p>
                        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">How to find and secure teaming partners through automation &mdash; skip the 12&ndash;18 month getting-to-know-you phase.</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td valign="top" style="width: 36px;">
                        <div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">Q</div>
                      </td>
                      <td valign="top">
                        <p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">Live ½-hour Q&amp;A</p>
                        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Bring your questions. Eric Coffie moderates and the panel answers live.</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- How to Prepare -->
          <tr>
            <td style="padding: 32px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 12px;">
                      How to prepare
                    </h3>
                    <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li>Know your NAICS codes and small business certifications (HUBZone, 8(a), WOSB, etc.).</li>
                      <li>Write down the 1&ndash;3 contracts or agencies you most want to pursue.</li>
                      <li>Bring the one funding or teaming question that&rsquo;s blocking you right now.</li>
                      <li>Block 6&ndash;8 PM EST &mdash; this is hands-on, not a passive watch.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${webinarUrl}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 16px;">
                      View Webinar Details
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="color: #9a3412; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">
                      Questions?
                    </p>
                    <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.6;">
                      Shelly Sweedler &middot; <a href="tel:2169989021" style="color: #ea580c; text-decoration: none; font-weight: 600;">(216) 998-9021</a><br>
                      Robinn Mikalic &middot; <a href="tel:2169989206" style="color: #ea580c; text-decoration: none; font-weight: 600;">(216) 998-9206</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 6px;">
                Hosted by <strong style="color: #1e293b;">GovCon Giants</strong> in partnership with
                Encore Funding, TeamingPro, and Logical Technology and Research.
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                <a href="https://govcongiants.com/hubzone" style="color: #ea580c; text-decoration: none;">govcongiants.com/hubzone</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return sendEmail(
    params.to,
    `${firstName}, you're in for June 17 — From Interested To Procurement Ready`,
    html
  );
}

/**
 * Free handouts email with download links for all 8 resources
 */
const HANDOUT_DOWNLOADS = [
  { name: '75 GovCon AI Prompts', file: 'ai-prompts.pdf' },
  { name: '2026 GovCon Action Plan', file: '2026-action-plan.pdf' },
  { name: 'SBLO Contact Directory', file: 'prime-contractor-directory.pdf' },
  { name: 'Tier-2 Supplier List', file: 'subcontractor-directory.pdf' },
  { name: 'Expiring Contracts', file: 'expiring-contracts-2025.xlsx' },
  { name: 'Low-Competition Contracts', file: 'low-competition-contracts.pdf' },
  { name: 'Spend Forecast', file: 'december-spend-forecast.pdf' },
  { name: 'Tribal Directory', file: 'tribal-list.csv' },
];

export async function sendFreeHandoutsEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const baseUrl = 'https://govcongiants.com';

  const downloadRows = HANDOUT_DOWNLOADS.map(
    (d) =>
      `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #334155;">
          <a href="${baseUrl}/handouts/${d.file}" style="color: #4ade80; text-decoration: none; font-weight: 600;">${d.name}</a>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #334155; text-align: right;">
          <a href="${baseUrl}/handouts/${d.file}" style="display: inline-block; padding: 6px 16px; background-color: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">Download</a>
        </td>
      </tr>`
  ).join('\n');

  const content = `
<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Free Resources Are Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Thanks for signing up! Here are your free GovCon resources. Click any button below to download.
</p>

<div style="background-color: #0f172a; border-radius: 8px; padding: 24px; margin: 30px 0;">
  <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">Your Downloads:</h3>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${downloadRows}
  </table>
</div>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${baseUrl}/resources" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Browse Full Resource Library
      </a>
    </td>
  </tr>
</table>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Your Free GovCon Resources Are Ready!`, emailWrapper(content));
}

/**
 * HUBZone webinar DAY-OF reminder — carries the real Zoom join link.
 * Branded orange/white, matches sendHubzoneWebinarEmail. Sent via the
 * admin blast route on the day of the event (June 17, 2026).
 */
const HUBZONE_ZOOM_URL = 'https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1';
const HUBZONE_MEETING_ID = '871 1216 4591';
const HUBZONE_PASSCODE = '467983';

export async function sendHubzoneReminderEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = (params.name || '').split(' ')[0] || 'there';
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tonight at 6 PM ET — Your Zoom Link Is Inside</title></head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">From Interested To Procurement Ready goes live at 6 PM ET. Your Zoom join link, Meeting ID, and dial-in are inside.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
      <tr><td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); padding: 40px 32px; text-align: center;">
        <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 999px; margin-bottom: 16px;">Tonight &middot; Live at 6 PM ET</div>
        <h1 style="color: #ffffff; font-size: 30px; line-height: 1.2; font-weight: 800; margin: 0 0 12px;">We Go Live Tonight, ${firstName}!</h1>
        <p style="color: #ffedd5; font-size: 16px; margin: 0;">From Interested To <strong style="color: #ffffff;">Procurement Ready</strong></p>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border: 2px solid #fed7aa; border-radius: 12px;"><tr><td style="padding: 28px 24px; text-align: center;">
          <p style="color: #9a3412; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px;">Your Join Link</p>
          <p style="color: #1e293b; font-size: 20px; font-weight: 800; margin: 0 0 4px;">Wednesday, June 17 &middot; 6:00&ndash;8:00 PM EST</p>
          <p style="color: #475569; font-size: 14px; margin: 0 0 20px;">Includes a live &frac12;-hour Q&amp;A</p>
          <a href="${HUBZONE_ZOOM_URL}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 18px 40px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 18px;">&#128279;&nbsp; Join the Webinar</a>
          <p style="color: #64748b; font-size: 13px; margin: 18px 0 0; line-height: 1.6;">Meeting ID: <strong style="color:#0f172a;">${HUBZONE_MEETING_ID}</strong> &nbsp;&middot;&nbsp; Passcode: <strong style="color:#0f172a;">${HUBZONE_PASSCODE}</strong></p>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;">
        <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin: 0 0 12px;">Tonight&rsquo;s the night, ${firstName}.</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.65; margin: 0 0 16px;">This is a <strong style="color: #0f172a;">live working session</strong> &mdash; and the part you can&rsquo;t get from a replay is the <strong style="color: #0f172a;">Q&amp;A</strong>, where you can put your situation in front of four people who&rsquo;ve actually done this. Bring your toughest question.</p>
      </td></tr>
      <tr><td style="padding: 24px 32px 0;">
        <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0 0 16px;">Tonight&rsquo;s run of show</h3>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><table cellpadding="0" cellspacing="0"><tr><td valign="top" style="width: 36px;"><div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">1</div></td><td valign="top"><p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Teaming Pillar &mdash; Tim Hagerty (TeamingPro)</p><p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">How to find and secure teaming partners through automation &mdash; skip the 12&ndash;18 month getting-to-know-you phase.</p></td></tr></table></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><table cellpadding="0" cellspacing="0"><tr><td valign="top" style="width: 36px;"><div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">2</div></td><td valign="top"><p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Funding Pillar &mdash; Chad Eberly (Encore Funding)</p><p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Specialized capital built for federal contractors &mdash; manage financial demands without traditional bank restrictions.</p></td></tr></table></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><table cellpadding="0" cellspacing="0"><tr><td valign="top" style="width: 36px;"><div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">3</div></td><td valign="top"><p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">The Agency Pillar &mdash; Todd Rogers</p><p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Industry technical expert on IDVs and the government buyer side &mdash; how agencies evaluate and buy.</p></td></tr></table></td></tr>
          <tr><td style="padding: 12px 0;"><table cellpadding="0" cellspacing="0"><tr><td valign="top" style="width: 36px;"><div style="width: 28px; height: 28px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-weight: 800; text-align: center; line-height: 28px; font-size: 14px;">Q</div></td><td valign="top"><p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0;">Live &frac12;-hour Q&amp;A</p><p style="color: #64748b; font-size: 14px; margin: 4px 0 0; line-height: 1.5;">Bring your questions. Eric Coffie moderates and the panel answers live.</p></td></tr></table></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px;"><tr><td style="padding: 24px;">
          <h3 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 12px;">Two things before 6 PM</h3>
          <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;"><li>Update your Zoom app so you join in one click.</li><li>Bring the one funding or teaming question that&rsquo;s blocking you right now.</li><li>Can&rsquo;t make the start? Join late &mdash; we run the full two hours.</li></ul>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
          <a href="${HUBZONE_ZOOM_URL}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 16px;">Join the Webinar</a>
          <p style="color: #94a3b8; font-size: 12px; margin: 14px 0 0;">Joining by phone? Dial +1 305 224 1968, then 871 1216 4591 # and passcode 467983 #.</p>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 0 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border-radius: 12px;"><tr><td style="padding: 20px; text-align: center;">
          <p style="color: #9a3412; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Questions?</p>
          <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.6;">Shelly Sweedler &middot; <a href="tel:2169989021" style="color: #ea580c; text-decoration: none; font-weight: 600;">(216) 998-9021</a><br>Robinn Mikalic &middot; <a href="tel:2169989206" style="color: #ea580c; text-decoration: none; font-weight: 600;">(216) 998-9206</a></p>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="color: #64748b; font-size: 12px; margin: 0 0 6px;">Hosted by <strong style="color: #1e293b;">GovCon Giants</strong> in partnership with Encore Funding, TeamingPro, and Logical Technology and Research.</p>
        <p style="color: #94a3b8; font-size: 11px; margin: 0;"><a href="https://govcongiants.com/hubzone" style="color: #ea580c; text-decoration: none;">govcongiants.com/hubzone</a></p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
  return sendEmail(params.to, `Tonight at 6 PM ET — your Zoom link is inside`, html);
}

/**
 * HUBZone webinar SPEAKER email — green room + run of show + panelist link.
 */
export async function sendHubzoneSpeakerEmail(params: EmailParams & { cc?: string[] }): Promise<EmailResult> {
  const row = (time: string, title: string, sub?: string) =>
    `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" style="width: 70px;"><span style="color:#ea580c;font-weight:800;font-size:14px;">${time}</span></td><td valign="top"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">${title}</p>${sub ? `<p style="color:#64748b;font-size:13px;margin:2px 0 0;">${sub}</p>` : ''}</td></tr></table></td></tr>`;
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tonight 6 PM ET — Host Link + Run of Show</title></head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Green room 5:30 PM ET. Your panelist link and tonight's run of show are inside.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
      <tr><td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); padding: 40px 32px; text-align: center;">
        <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 999px; margin-bottom: 16px;">Speakers &middot; Tonight</div>
        <h1 style="color: #ffffff; font-size: 28px; line-height: 1.2; font-weight: 800; margin: 0 0 12px;">Green Room 5:30 &middot; Live 6:00 PM ET</h1>
        <p style="color: #ffedd5; font-size: 16px; margin: 0;">From Interested To <strong style="color: #ffffff;">Procurement Ready</strong></p>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border: 2px solid #fed7aa; border-radius: 12px;"><tr><td style="padding: 28px 24px; text-align: center;">
          <p style="color: #9a3412; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px;">Join as Panelist</p>
          <p style="color: #1e293b; font-size: 18px; font-weight: 800; margin: 0 0 16px;">Please join by <span style="color:#ea580c;">5:30 PM ET</span> for soundcheck</p>
          <a href="${HUBZONE_ZOOM_URL}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 16px 36px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 16px;">Join Zoom (Host/Panelist)</a>
          <p style="color: #64748b; font-size: 13px; margin: 18px 0 0; line-height: 1.6;">Meeting ID: <strong style="color:#0f172a;">${HUBZONE_MEETING_ID}</strong> &nbsp;&middot;&nbsp; Passcode: <strong style="color:#0f172a;">${HUBZONE_PASSCODE}</strong></p>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;"><p style="color: #475569; font-size: 16px; line-height: 1.65; margin: 0;">Team &mdash; quick logistics for tonight&rsquo;s roundtable. We go live at <strong style="color:#0f172a;">6:00 PM ET</strong>. Please hop on at <strong style="color:#0f172a;">5:30</strong> so we can test audio/video and lock the order.</p></td></tr>
      <tr><td style="padding: 28px 32px 0;">
        <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0 0 16px;">Run of show</h3>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('5:30', 'Green room &amp; soundcheck', 'Camera/mic test, confirm speaking order.')}
          ${row('6:00', 'Eric opens &amp; frames the session', '~5 min welcome + agenda.')}
          ${row('6:05', 'Agency Pillar &middot; Todd Rogers (IDVs &amp; the government buyer side)')}
          ${row('6:30', 'Funding Pillar &middot; Chad Eberly (Encore Funding)')}
          ${row('6:55', 'Teaming Pillar &middot; Tim Hagerty (TeamingPro)')}
          ${row('7:20', 'Open roundtable / cross-talk')}
          ${row('7:30', 'Live audience Q&amp;A (&frac12; hr)')}
          <tr><td style="padding: 10px 0;"><table cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" style="width: 70px;"><span style="color:#ea580c;font-weight:800;font-size:14px;">8:00</span></td><td valign="top"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">Close + next steps</p></td></tr></table></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding: 32px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px;"><tr><td style="padding: 24px;">
          <h3 style="color: #0f172a; font-size: 16px; font-weight: 800; margin: 0 0 12px;">A few notes</h3>
          <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;"><li>Camera on, clean background, good light.</li><li>Mute when you&rsquo;re not speaking.</li><li>Keep segments tight (~20&ndash;25 min) so we protect the Q&amp;A.</li><li>Bring one concrete takeaway your audience can act on this week.</li></ul>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding: 28px 32px 32px;"><p style="color: #475569; font-size: 16px; line-height: 1.65; margin: 0;">See you at 5:30.<br><strong style="color:#0f172a;">&mdash; Eric</strong></p></td></tr>
      <tr><td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="color: #64748b; font-size: 12px; margin: 0 0 6px;">Hosted by <strong style="color: #1e293b;">GovCon Giants</strong> in partnership with Encore Funding, TeamingPro, and Logical Technology and Research.</p>
        <p style="color: #94a3b8; font-size: 11px; margin: 0;"><a href="https://govcongiants.com/hubzone" style="color: #ea580c; text-decoration: none;">govcongiants.com/hubzone</a></p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
  return sendEmail(params.to, `Tonight 6 PM ET — your host link + run of show (HUBZone roundtable)`, html, params.cc);
}
