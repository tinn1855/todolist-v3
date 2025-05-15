import { FormLogin } from '@/components/features/form-login';
import { useUsers } from '@/hooks/use-users';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { users } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (users) {
      navigate('/', { replace: true });
    }
  }, [users, navigate]);
  return (
    <div className="container mx-auto px-5 max-w-xl justify-center h-sreen items-center">
      <div className="w-full  p-10 shadow-md">
        <h2 className="font-bold text-center text-2xl pb-10">Login</h2>
        <FormLogin />;
      </div>
    </div>
  );
}
