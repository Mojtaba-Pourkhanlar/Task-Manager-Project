import LoginForm from "@/components/app/auth/LoginForm";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("auth");
}

export default function AuthPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
