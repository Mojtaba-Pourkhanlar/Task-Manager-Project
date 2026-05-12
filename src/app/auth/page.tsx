import AuthForm from "@/components/app/auth/AuthForm";
import { createSeo } from "@/lib/seo";

export function generateMetadata() {
  return createSeo("auth");
}

export default function AuthPage() {
  return <AuthForm />;
}
