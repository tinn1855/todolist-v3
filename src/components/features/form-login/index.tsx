import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLogin } from '@/hooks/use-login';

interface LoginForm {
  username: string;
  password: string;
}

export function FormLogin() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
      navigate('/');
    } catch {
      // error state đã được set trong hook
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col space-y-5 max-w-sm mx-auto mt-10"
    >
      <div>
        <Label>Username</Label>
        <Input
          placeholder="Your username"
          {...register('username', { required: true })}
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Your password"
          {...register('password', { required: true })}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
