import * as React from "react";
import { AuthModal } from "@/components/AuthModal/AuthModal";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/atoms/Button/Button";

const EcommerceContent = () => {
  const { userEmail, logout } = useUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to the E-commerce</h1>
      <p className="mb-4">Logged in as: <strong>{userEmail}</strong></p>
      <Button variant="destructive" onClick={logout}>Logout</Button>
    </div>
  );
};

const Index = () => {
  const { userEmail, login } = useUser();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!userEmail) {
      setAuthModalOpen(true);
    } else {
      setAuthModalOpen(false);
    }
  }, [userEmail]);

  return (
    <>
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onLoginSuccess={login}
      />

      {!userEmail ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="mb-4">You must be logged in to access the E-commerce.</p>
          <Button onClick={() => setAuthModalOpen(true)}>Login or Register</Button>
        </div>
      ) : (
        <EcommerceContent />
      )}
    </>
  );
};

export default Index;
