/**
 * Discovery Survey Email Sender
 *
 * Sends the discovery survey email to all registered users using Resend API.
 * Fetches user emails from Supabase and personalizes the greeting.
 *
 * Usage:
 *   npx tsx scripts/send-discovery-email.ts --dry-run        # Preview only
 *   npx tsx scripts/send-discovery-email.ts --limit 5        # Send to first 5 users
 *   npx tsx scripts/send-discovery-email.ts                  # Send to all users
 *
 * Environment variables required:
 *   RESEND_API_KEY           - Resend API key (re_xxxxx)
 *   SUPABASE_URL             - Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (NOT anon key)
 */

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserRecord {
  email: string;
  name: string | null;
}

interface SendResult {
  email: string;
  status: "sent" | "failed" | "skipped";
  error?: string;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const FROM_ADDRESS = "Arturo from CodeAgentSwarm <hello@codeagentswarm.com>";
const SUBJECT = "Quick question about your experience";
const RATE_LIMIT_MS = 500; // 500ms between emails (2/sec max)

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(): { dryRun: boolean; limit: number | null } {
  const args = process.argv.slice(2);
  let dryRun = false;
  let limit: number | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") {
      dryRun = true;
    } else if (args[i] === "--limit" && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      if (isNaN(limit) || limit <= 0) {
        console.error("Error: --limit must be a positive integer");
        process.exit(1);
      }
      i++; // skip next arg (the number)
    }
  }

  return { dryRun, limit };
}

// ---------------------------------------------------------------------------
// Environment validation
// ---------------------------------------------------------------------------

function validateEnv(): {
  resendApiKey: string;
  supabaseUrl: string;
  supabaseServiceKey: string;
} {
  const resendApiKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const missing: string[] = [];
  if (!resendApiKey) missing.push("RESEND_API_KEY");
  if (!supabaseUrl) missing.push("SUPABASE_URL");
  if (!supabaseServiceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) {
    console.error(
      `Error: Missing required environment variables: ${missing.join(", ")}`
    );
    console.error("");
    console.error("Set them in your .env file or export them:");
    missing.forEach((v) => console.error(`  export ${v}=your_value_here`));
    process.exit(1);
  }

  return {
    resendApiKey: resendApiKey!,
    supabaseUrl: supabaseUrl!,
    supabaseServiceKey: supabaseServiceKey!,
  };
}

// ---------------------------------------------------------------------------
// Template loading
// ---------------------------------------------------------------------------

function loadTemplate(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = resolve(__dirname, "../emails/discovery-survey.html");

  try {
    return readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.error(`Error: Could not read email template at ${templatePath}`);
    console.error(
      "Make sure emails/discovery-survey.html exists relative to the scripts/ directory."
    );
    process.exit(1);
  }
}

function personalizeTemplate(template: string, name: string | null): string {
  const greeting = name ? `Hi ${name},` : "Hi there,";
  return template.replace("{{name}}", greeting.replace("Hi ", "").replace(",", ""));
}

// ---------------------------------------------------------------------------
// Supabase: fetch users
// ---------------------------------------------------------------------------

async function fetchUsers(
  supabaseUrl: string,
  supabaseServiceKey: string,
  limit: number | null
): Promise<UserRecord[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let query = supabase
    .from("users")
    .select("email, name")
    .not("email", "is", null);

  if (limit !== null) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching users from Supabase:", error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log("No users found with email addresses.");
    process.exit(0);
  }

  return data as UserRecord[];
}

// ---------------------------------------------------------------------------
// Email sending
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendEmail(
  resend: Resend,
  to: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      subject: SUBJECT,
      html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { dryRun, limit } = parseArgs();
  const env = validateEnv();
  const template = loadTemplate();

  console.log("=".repeat(60));
  console.log("  CodeAgentSwarm Discovery Survey Email Sender");
  console.log("=".repeat(60));
  console.log("");

  if (dryRun) {
    console.log("  MODE: DRY RUN (no emails will be sent)");
  } else {
    console.log("  MODE: LIVE SEND");
  }

  if (limit !== null) {
    console.log(`  LIMIT: First ${limit} users`);
  }

  console.log(`  FROM: ${FROM_ADDRESS}`);
  console.log(`  SUBJECT: ${SUBJECT}`);
  console.log(`  RATE LIMIT: ${RATE_LIMIT_MS}ms between emails`);
  console.log("");

  // Fetch users
  console.log("Fetching users from Supabase...");
  const users = await fetchUsers(env.supabaseUrl, env.supabaseServiceKey, limit);
  console.log(`Found ${users.length} user(s) with email addresses.`);
  console.log("");

  if (dryRun) {
    console.log("DRY RUN - Would send to:");
    console.log("-".repeat(40));
    users.forEach((user, i) => {
      const greeting = user.name ? `Hi ${user.name},` : "Hi there,";
      console.log(`  ${i + 1}. ${user.email} (${greeting})`);
    });
    console.log("-".repeat(40));
    console.log("");
    console.log(`Total: ${users.length} email(s) would be sent.`);
    console.log("Run without --dry-run to actually send.");
    return;
  }

  // Initialize Resend
  const resend = new Resend(env.resendApiKey);

  // Send emails
  const results: SendResult[] = [];
  console.log("Sending emails...");
  console.log("-".repeat(40));

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Validate email format (basic check)
    if (!user.email || !user.email.includes("@")) {
      console.log(`  [${i + 1}/${users.length}] SKIP ${user.email} (invalid email)`);
      results.push({ email: user.email, status: "skipped", error: "Invalid email format" });
      continue;
    }

    // Personalize the template
    const personalizedHtml = personalizeTemplate(template, user.name);
    const greeting = user.name ? `Hi ${user.name},` : "Hi there,";

    // Send
    const result = await sendEmail(resend, user.email, personalizedHtml);

    if (result.success) {
      console.log(`  [${i + 1}/${users.length}] SENT ${user.email} (${greeting})`);
      results.push({ email: user.email, status: "sent" });
    } else {
      console.log(
        `  [${i + 1}/${users.length}] FAIL ${user.email} - ${result.error}`
      );
      results.push({ email: user.email, status: "failed", error: result.error });
    }

    // Rate limiting: wait between emails (skip after last one)
    if (i < users.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  // Summary
  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "failed").length;
  const skipped = results.filter((r) => r.status === "skipped").length;

  console.log("");
  console.log("=".repeat(60));
  console.log("  SUMMARY");
  console.log("=".repeat(60));
  console.log(`  Sent:    ${sent}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total:   ${results.length}`);
  console.log("=".repeat(60));

  if (failed > 0) {
    console.log("");
    console.log("Failed emails:");
    results
      .filter((r) => r.status === "failed")
      .forEach((r) => console.log(`  - ${r.email}: ${r.error}`));
  }

  // Exit with error code if any failures
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
