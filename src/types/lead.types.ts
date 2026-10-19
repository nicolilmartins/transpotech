export type { LeadRequest } from "@/lib/contact-request.schema";
export type { LeadFormId } from "@/lib/lead-forms";

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
