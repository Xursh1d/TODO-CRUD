export interface FormValues {
  title: string;
  category: string;
  price: string;
  description: string;
}

export interface UpdateFormValues extends FormValues {
  id: string;
}
