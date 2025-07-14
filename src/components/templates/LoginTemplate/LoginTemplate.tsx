import React from 'react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, signInWithFacebook } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

export function LoginTemplate() {
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    const user = await signInWithGoogle();
    if (user) {
      navigate('/');
    }
  }

  async function handleFacebookSignIn() {
    const user = await signInWithFacebook();
    if (user) {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Sign in to MusicStore</h1>

        <Button
          variant="ghost"
          className="w-full mb-4 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
          onClick={handleGoogleSignIn}
          aria-label="Sign in with Google"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
            <path
              fill="#fbc02d"
              d="M43.611 20.083h-19.67v7.835h11.287c-0.5 3.178-3.232 9.318-11.287 9.318-6.825 0-12.39-5.619-12.39-12.534 0-6.915 5.565-12.534 12.39-12.534 3.863 0 6.449 1.645 7.94 3.063l5.405-5.241c-3.436-3.198-7.84-5.166-13.345-5.166-11.204 0-20.318 9.015-20.318 20.122 0 11.104 9.114 20.122 20.318 20.122 11.865 0 19.728-8.304 19.728-20.012 0-1.346-0.154-2.384-0.341-3.416z"
            />
            <path
              fill="#e53935"
              d="M6.306 14.691l6.545 4.791c1.841-3.515 5.315-6.031 9.346-6.031 3.863 0 6.449 1.645 7.94 3.063l5.405-5.241c-3.436-3.198-7.84-5.166-13.345-5.166-7.883 0-14.597 5.071-16.334 11.584z"
            />
            <path
              fill="#4caf50"
              d="M43.611 20.083h-19.67v7.835h11.287c-0.5 3.178-3.232 9.318-11.287 9.318-6.825 0-12.39-5.619-12.39-12.534 0-6.915 5.565-12.534 12.39-12.534 3.863 0 6.449 1.645 7.94 3.063l5.405-5.241c-3.436-3.198-7.84-5.166-13.345-5.166v7.301h19.67z"
            />
            <path
              fill="#1565c0"
              d="M6.306 14.691l6.545 4.791c1.1-2.099 3.739-3.588 7.094-3.588 3.863 0 6.449 1.645 7.94 3.063l5.405-5.241c-3.436-3.198-7.84-5.166-13.345-5.166-7.883 0-14.597 5.071-16.334 11.584z"
            />
          </svg>
          Sign in with Google
        </Button>

        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
          onClick={handleFacebookSignIn}
          aria-label="Sign in with Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current text-blue-600"
          >
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
          </svg>
          Sign in with Facebook
        </Button>
      </div>
    </div>
  );
}

export default LoginTemplate;
