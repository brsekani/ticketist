import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center sm:gap-10 gap-3 bg-[#F2F2F2] h-[100vh] px-6">
      <h2 className="text-2xl font-semibold text-center sm:text-3xl">
        Your Event Awaits! Sign in to access tickets and more.
      </h2>

      <SignInButton />
    </div>
  );
}
