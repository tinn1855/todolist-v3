import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useUsers } from '@/hooks/use-users';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface LoginForm {
  username: string;
  password: string;
}

export function FormLogin() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { users } = useUsers();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  });

  const onSubmit = (data: LoginForm) => {
    const foundUser = users.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!foundUser) {
      setError('Invalid username or password. Please try again!');
      return;
    }

    localStorage.setItem('user', JSON.stringify(foundUser));
    navigate('/');
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
