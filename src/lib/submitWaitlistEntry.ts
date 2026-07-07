import type { WaitlistFormData } from "@/lib/waitlist";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type WaitlistSource = "waitlist_modal" | "footer_newsletter";

export interface WaitlistSubmission extends WaitlistFormData {
  /** Where on the site this entry came from — lets you segment later. */
  source: WaitlistSource;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Every form on the site calls this one function and doesn't know or care
 * where the data actually lands. That's the point: swapping providers
 * later (Formspree, a Supabase table, a custom API route) means changing
 * only this file — no changes to WaitlistModal, Footer, or anywhere else.
 *
 * Currently wired to Web3Forms (https://web3forms.com):
 *   1. Get a free access key at https://web3forms.com — no account
 *      required, the key is emailed to you instantly.
 *   2. Copy .env.example to .env and set VITE_WEB3FORMS_ACCESS_KEY.
 *   3. Submissions arrive by email; Web3Forms also has a dashboard and
 *      Zapier/webhook integrations if you want them routed elsewhere.
 */
export async function submitWaitlistEntry(
  data: WaitlistSubmission,
): Promise<SubmitResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error(
      "Missing VITE_WEB3FORMS_ACCESS_KEY — waitlist submissions cannot be delivered. See .env.example.",
    );
    return {
      success: false,
      error: "Something went wrong on our end. Please try again shortly.",
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Aurence waitlist — ${data.audienceType} (${data.source})`,
        from_name: "Aurence Fashion Empire",
        name: data.name,
        email: data.email,
        audience_type: data.audienceType,
        message: data.message || "(no message)",
        source: data.source,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error:
          typeof result.message === "string"
            ? result.message
            : "Submission failed. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error — please check your connection and try again.",
    };
  }
}