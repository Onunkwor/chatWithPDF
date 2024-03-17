import FileUpload from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  const isAuthenticated = !!userId;
  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2 ">
            {isAuthenticated && <Button>Go to Chats</Button>}
          </div>
          <p className="max-w-xl text-center text-lg mt-2 text-slate-600">
            Join millions of students, researches and professionals to instantly
            answer questions and understand research with AI
          </p>
          <div className="w-full mt-4">
            {isAuthenticated ? (
              <div>
                <FileUpload />
              </div>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Log in to get started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
