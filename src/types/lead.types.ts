export type LeadSource =
  | "contact-form"
  | "budget-request"
  | "hero-cta"
  | "locacao"
  | "assistencia-tecnica";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source?: LeadSource;
};

export type BudgetRequestData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  segment: string;
  equipmentType: string;
  quantity: number;
  message?: string;
};
