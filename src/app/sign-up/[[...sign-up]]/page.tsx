import { SignUp } from "@clerk/nextjs";
const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
};

export default page;
