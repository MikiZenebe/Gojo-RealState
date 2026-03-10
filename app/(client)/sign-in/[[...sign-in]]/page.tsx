import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-16">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
