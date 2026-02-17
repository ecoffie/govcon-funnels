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
                <a href="https://govcongiants.org" style="color: #4ade80; text-decoration: none;">govcongiants.org</a>
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
async function sendEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('[EMAIL] SMTP credentials not configured');
    return { ok: false, error: 'SMTP not configured' };
  }

  try {
    console.log(`[EMAIL] Sending to: ${to} | Subject: ${subject}`);
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER}>`,
      to,
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
    default:
      // Generic welcome email for unknown sources
      return sendGenericWelcomeEmail({ to, name, source });
  }
}

/**
 * Opportunity Hunter confirmation email
 */
export async function sendOpportunityHunterEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const toolUrl = 'https://funnels.govcongiants.org/opp/thank-you';
  const logoUrl = 'https://funnels.govcongiants.org/images/opportunity-hunter-logo.png';

  const content = `
<div style="text-align: center; margin-bottom: 24px;">
  <img src="${logoUrl}" alt="Opportunity Hunter" width="180" style="max-width: 180px; height: auto;" />
</div>

<h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px; text-align: center;">
  Your Opportunity Hunter Access is Ready!
</h1>

<p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
  Hey ${firstName},<br><br>
  Great news! You now have access to the GovCon Opportunity Hunter - our AI-powered tool that matches your business with federal agencies that buy what you sell.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <a href="${toolUrl}" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Access Opportunity Hunter
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

  return sendEmail(params.to, `${firstName}, Your Opportunity Hunter Access is Ready!`, emailWrapper(content));
}

/**
 * Surge resources confirmation email
 */
export async function sendSurgeEmail(params: EmailParams): Promise<EmailResult> {
  const firstName = params.name.split(' ')[0] || 'there';
  const resourcesUrl = 'https://funnels.govcongiants.org/surge/thank-you';

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
  const courseUrl = 'https://funnels.govcongiants.org/free-course/course';

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
  const bootcampUrl = 'https://funnels.govcongiants.org/bootcamp/thank-you';

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
      <a href="https://govcongiants.org" style="display: inline-block; background-color: #4ade80; color: #0f172a; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
        Explore GovCon Giants
      </a>
    </td>
  </tr>
</table>

${proCta()}`;

  return sendEmail(params.to, `${firstName}, Welcome to GovCon Giants!`, emailWrapper(content));
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

  const baseUrl = 'https://funnels.govcongiants.org/proposal-bootcamp';

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
                <a href="https://govcongiants.org" style="color: #4ade80; text-decoration: none;">govcongiants.org</a>
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
