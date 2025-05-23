import { BASE_URL } from '@/constants/baseURL';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

type CreateAccountInput = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};
export function useCreateAccount() {
  return useMutation({
    mutationFn: async (data: CreateAccountInput) => {
      const response = await axios.post(`${BASE_URL}/users`, data);
      return response.data;
    },
    onError: (error: any) => {
      toast.error('Registration failed please try again!');
    },
  });
}
