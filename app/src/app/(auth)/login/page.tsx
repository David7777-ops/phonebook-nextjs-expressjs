"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorParagraph } from "@/components/error-paragraph";
import { Login, loginSchema } from "@/lib/data/schemas/auth";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<Login> = async (_data) => {
    console.log(_data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex flex-col justify-center items-center bg-white px-8 w-[533px]">
        <h1 className="font-semibold text-[40px] mt-[105px]">Welcome Back!</h1>
        <p className="text-[16px] text-accent mt-5">
          Enter your email and password to access your account
        </p>
        <form
          id="login"
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col justify-center items-center gap-4 w-full mt-14"
        >
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              placeholder="example@email.com"
              type="email"
              {...register("email")}
            />
            <ErrorParagraph>{errors.email?.message}</ErrorParagraph>
          </div>
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" type="password" {...register("password")} />
              <ErrorParagraph>{errors.password?.message}</ErrorParagraph>
            </div>
          </div>
        </form>
        <Button className="mt-[50px] w-[307px]" form="login" type="submit">
          Sign In
        </Button>
        <div className="flex gap-1.5 mt-[90px] mb-4">
          <p className="text-[16px] text-black/70">Don’t have an account?</p>
          <a className="underline font-medium" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
