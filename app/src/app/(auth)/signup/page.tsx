import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Label from "@/components/label";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-background">
      <div className="flex flex-col justify-center items-center bg-white px-16 w-[1095px]">
        <h1 className="font-semibold text-[40px] mt-10 mb-28">
          Create My Account
        </h1>
        <div className="flex gap-10 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name:</Label>
              <Input id="name" placeholder="John Doe" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" placeholder="example@email.com" type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Number:</Label>
              <Input id="phone" placeholder="+1(123)456-789" />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="repassword">Confirm Password:</Label>
              <Input id="repassword" type="password" />
            </div>
          </div>
        </div>
        <Button className="mt-[40px]">Sign Me Up</Button>
        <p className="mt-5 text-sm text-black/50">
          By contiuing you accept our{" "}
          <span className="underline">terms and conditions</span> and our
          privacy policy.
        </p>
        <div className="flex gap-1.5 mt-5 mb-4">
          <p className="text-[16px]">Already have an account?</p>
          <a className="underline font-medium" href="/login">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
