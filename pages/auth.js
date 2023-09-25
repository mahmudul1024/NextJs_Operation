import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";
import { getSession, session } from "next-auth/client";
import { useEffect, useState } from "react";

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
