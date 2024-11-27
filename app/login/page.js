import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-[#F2F2F2] h-[100vh]">
      <h2 className="text-3xl font-semibold">
        Your Event Awaits! Sign in to access tickets and more.
      </h2>

      <SignInButton />
    </div>
  );
}
