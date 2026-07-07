export type AudienceType =
  | "Customer"
  | "Brand"
  | "Designer"
  | "Logistics"
  | "Advertising";

export interface AudienceOption {
  value: AudienceType;
  label: string;
  /** Contextual placeholder for the optional message field. */
  prompt: string;
}

export const audienceOptions: AudienceOption[] = [
  {
    value: "Customer",
    label: "Customer",
    prompt: "Anything you'd love to see in Aurence?",
  },
  {
    value: "Brand",
    label: "Brand",
    prompt: "Tell us about your brand and collections.",
  },
  {
    value: "Designer",
    label: "Designer",
    prompt: "Tell us about your craft and specialty.",
  },
  {
    value: "Logistics",
    label: "Logistics Partner",
    prompt: "Tell us about your fleet and coverage area.",
  },
  {
    value: "Advertising",
    label: "Advertising Partner",
    prompt: "Tell us about your campaign goals.",
  },
];

export interface WaitlistFormData {
  name: string;
  email: string;
  audienceType: AudienceType;
  message: string;
}