import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateAccount } from '@/hooks/use-create-account';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type FormData = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
};

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <p className="text-red-500 text-sm">{message}</p> : null;

export function FormCreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const { mutate, isPending } = useCreateAccount();
  const password = watch('password');
  const navigate = useNavigate();

  const fields = [
    {
      name: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: 'Fullname is required',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: 'Username is required',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email address',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: 'Password is required',
    },
    {
      name: 'password_confirmation',
      label: 'Re-enter Password',
      type: 'password',
      required: 'Please confirm your password',
      validate: (value: string) =>
        value === password || 'Passwords do not match',
    },
  ];

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      role: 'user',
    };

    console.log('Form data submitted:', payload);
    mutate(payload, {
      onSuccess: () => {
        toast.success('Account was created successfully');
        reset();
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          error.message ||
          'An error occurred please try again';
        toast.error(`${message}`);
      },
    });
  };

  return (
    <form
      className="flex-col space-y-5 max-w-sm mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <Label>
            {field.label}: <span className="text-red-500">*</span>
          </Label>
          <Input
            type={field.type}
            placeholder={`Your ${field.label.toLowerCase()}`}
            {...register(field.name as keyof FormData, {
              required: field.required,
              pattern: field.pattern,
              validate: field.validate,
            })}
          />
          <ErrorMessage
            message={errors[field.name as keyof FormData]?.message as string}
          />
        </div>
      ))}
      <div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Create Processing' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}
