"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { khodamProps, formKhodamSchema, FormKhodamSchema } from "@/lib/types";

const hashCode = (s: string) => {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

export const FormCheckKhodam = () => {
  const form = useForm<FormKhodamSchema>({
    resolver: zodResolver(formKhodamSchema),
  });
  const { toast } = useToast();

  const [khodam, setKhodam] = useState<khodamProps | null>(null);
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (formData: FormKhodamSchema) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const { data, count, error } = await supabase
        .from("khodam")
        .select("*", { count: "exact" });
      if (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
        return;
      }

      const hash = hashCode(formData.nama);
      let index = Math.abs(hash) % count!;
      if (index < 0) index += count!;
      setKhodam({ user: formData.nama, ...data[index] });
    });
  };

  return !khodam ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Masukkan Nama</FormLabel>
              <FormControl>
                <Input placeholder="bjorka" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isLoading ? (
          <Button type="submit">Check Khodam</Button>
        ) : (
          <Button type="submit" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Tunggu Bjir
          </Button>
        )}
      </form>
    </Form>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>
          Selamat {khodam.user.toUpperCase()} Khodam Kamu Adalah{" "}
          {khodam.nama.toUpperCase()}
        </CardTitle>
        <CardDescription>{khodam.deskripsi}</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image src={khodam.image_url} alt="kosong cik" fill />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => setKhodam(null)}>Coba Nama Lain</Button>
      </CardFooter>
    </Card>
  );
};
