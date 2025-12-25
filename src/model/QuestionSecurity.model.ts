export interface QuestionSecurity {
  data?: {
    arrQuestion1?: ArrQuestionSecurity[];
    arrQuestion2?: ArrQuestionSecurity[];
    arrQuestion3?: ArrQuestionSecurity[];
    raw?: ArrQuestionSecurity[];
  };
}

export type ArrQuestionSecurity = {
  id?: string;
  content?: string;
  description?: string | null;
};
