import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4 ">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full bg-green-200">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 text-slate-600">
          <h1 className="text-lg font-extrabold">Master German</h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/learn">
              <Button size={"lg"} variant={"secondary"}>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
