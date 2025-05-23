"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextHead from "@/shared/text/TextHead";
import { ButtonPrimary } from "@/shared/ui/Button";
import Card from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import TextHref from "@/shared/text/TextHref";
import { newPassword } from "@/server/auth/newPassword";

import { PasswordSchema } from "@/schema";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { password: "" },
  });

  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = async (values) => {
    const res = await newPassword(values, token);
    setResult(res);
    reset();
  };

  const submitForm = (values) => {
    if (!token) {
      setResult({ error: "Ошибка! Отсутсвует токен" });
      return;
    }

    setResult(null);

    startTransition(() => {
      handleChange(values);
    });
  };

  return (
    <>
      <p className="font-bold text-[32px] transition text-[#00afff] duration-[250ms] leading-[38.4px] tracking-[-0.023em] select-none">
        EmailSender
      </p>

      <Card style="max-w-[400px] w-full flex flex-col gap-[20px]" padding={10}>
        <TextHead
          text="Новый пароль"
          style={"font-medium text-[18px] text-center select-none"}
        />

        <FormError message={result?.error} />
        <FormSuccess message={result?.success} />

        <form
          className="flex flex-col gap-[12px]"
          onSubmit={handleSubmit(submitForm)}
        >
          <Input
            disabled={isPending}
            type={"password"}
            label="Пароль"
            borderRadius={10}
            placeholder="••••••••••••"
            error={errors?.password}
            caption={errors?.password && errors?.password?.message}
            register={register("password")}
          />

          <ButtonPrimary
            type="submit"
            text="Применить"
            borderRadius={10}
            style="mt-[20px]"
            loader={isPending}
          />
        </form>

        <TextHref
          onClick={() => router.push("/auth/login")}
          text="К авторизации"
          style="text-[12px] leading-[14px] font-medium text-center"
        />
      </Card>
    </>
  );
};

export default NewPasswordForm;
