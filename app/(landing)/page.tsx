import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function landingPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center text-slate-600">
        <h1 className="capitalize">start your own journy to german family</h1>
      </div>
      <div>
        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <SignInButton>
              <Button asChild>
                <Link href={"/learn"}> continue learning</Link>
              </Button>
            </SignInButton>
          </SignedIn>
          <SignedOut>
            <SignUpButton>
              <Button variant={"secondary"} className="w-full">
                start your account
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button className="w-full mt-2" variant={"default"}>
                you already have an account
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}
