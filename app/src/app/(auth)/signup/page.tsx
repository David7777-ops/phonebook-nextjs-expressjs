"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorParagraph } from "@/components/error-paragraph";
import { SignUp, signUpSchema } from "@/lib/data/schemas/auth";
import { signUp } from "@/lib/data/controllers/auth.controller";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [credentialsError, setCredentialsError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<SignUp> = async (_data) => {
    setLoading(true);
    const response = await signUp(_data);
    setCredentialsError(response);
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex flex-col justify-center items-center bg-white px-16 w-[1095px]">
        <h1 className="font-semibold text-[40px] mt-10 mb-28">
          Create My Account
        </h1>
        <form
          id="signup"
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex gap-10 w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name:</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                {...register("name")}
              />
              <ErrorParagraph>{errors.name?.message}</ErrorParagraph>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                placeholder="example@email.com"
                type="email"
                {...register("email")}
              />
              <ErrorParagraph>{errors.email?.message}</ErrorParagraph>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Number:</Label>
              <Input
                id="phone"
                placeholder="+1(123)456-789"
                {...register("phoneNumber")}
              />
              <ErrorParagraph>{errors.phoneNumber?.message}</ErrorParagraph>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" type="password" {...register("password")} />
              <ErrorParagraph>{errors.password?.message}</ErrorParagraph>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              <ErrorParagraph>{errors.confirmPassword?.message}</ErrorParagraph>
            </div>
          </div>
        </form>
        <Button
          className="mt-[40px]"
          form="signup"
          type="submit"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Me Up
        </Button>
        <ErrorParagraph>{credentialsError}</ErrorParagraph>
        <p className="mt-5 text-sm text-black/50">
          By contiuing you accept our{" "}
          <span className="underline">terms and conditions</span> and our
          privacy policy.
        </p>
        <div className="flex gap-1.5 mt-5 mb-4">
          <p className="text-[16px] text-black/70">Already have an account?</p>
          <a className="underline font-medium" href="/login">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
