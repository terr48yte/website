"use client";

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
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { FormPendaftaranSchema, formPendaftaranSchema } from "@/lib/types";
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

const inputList = [
  {
    title: "Nama Lengkap",
    name: "nama",
    placeholder: "bjorka",
  },
  {
    title: "Kelas",
    name: "kelas",
    placeholder: "",
  },
  {
    title: "Nomor Whatsapp",
    name: "whatsapp",
    placeholder: "08XXXX",
  },
  {
    title: "Apa alasan kamu ingin masuk IT CLUB",
    name: "alasan",
    placeholder: "ingin jadi heker",
  },
];

export const FormPendaftaran = () => {
  const form = useForm<FormPendaftaranSchema>({
    resolver: zodResolver(formPendaftaranSchema),
  });

  const { toast } = useToast();

  const [submit, setSubmit] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: FormPendaftaranSchema) => {
    startTransition(async () => {
      const { error } = await supabase.from("pendaftaran").insert(data);
      if (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
        return;
      }
      setSubmit(true);
    });
  };

  return !submit ? (
    <Card>
      <CardHeader>
        <CardTitle>FORM PENDAFTARAN</CardTitle>
        <CardDescription>LETS GROW TOGETHER AS A TEAM</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {inputList.map((item, i) => (
              <FormField
                key={i}
                control={form.control}
                name={item.name as "nama" | "kelas" | "whatsapp" | "alasan"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.title}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {!isLoading ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button type="submit" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tunggu Bjir
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>BERHASIL DIKIRIM</CardTitle>
        <CardDescription>
          Formulir pendaftaran kamu berhasil dikirim, harap ditunggu :3
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={
              "https://i.pinimg.com/originals/d9/e6/e0/d9e6e0126e9cf8ca543a1ca26c9b176c.gif"
            }
            alt="kosong cik"
            fill
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">
          <Link href={"https://dsc.gg/terr48yte"}>Discord</Link>
        </Button>
        <Button>
          <Link href={"/"}>Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
