import { BASE_URL } from '@/constants/baseURL';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

type CreateAccountInput = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export function useCreateAccount() {
  return useMutation({
    mutationFn: async (data: CreateAccountInput) => {
      const response = await axios.post(`${BASE_URL}/register`, data);
      return response.data;
    },
    onError: (error: any) => {
      toast.error('Registration failed please try again!');
    },
  });
}
