"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  text: z.string().min(2, {
    message: "Text must have at least 2 characters",
  }),
  cipher: z.enum(["Caesar", "Vigenere", "Playfair"]),
  action: z.enum(["encrypt", "decrypt"]),
});
import { ciphers } from "@/constants";
import { useState } from "react";
import getOutput from "@/constants/mainFunction";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    input: "",
    output: "",
    cipher: "",
    action: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let result = getOutput(data.cipher, data.action, data.text);

    setModalData({
      input: data.text,
      output: result as string,
      cipher: data.cipher,
      action: data.action,
    });
    setOpen(true);
  }

  return (
    <main className="">
      <h1 className="text-9xl font-black mt-14">CIPHERS</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-100 space-y-6 mt-14"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter text to Encrypt/Decrypt"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cipher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cipher</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a cipher" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciphers.map((cipher) => (
                        <SelectItem key={cipher.name} value={cipher.name}>
                          {cipher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select an action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encrypt">Encrypt</SelectItem>
                      <SelectItem value="decrypt">Decrypt</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalData.cipher} {modalData.action}
            </DialogTitle>
            <DialogDescription>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Input
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {modalData.input}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                    Output
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {modalData.output}
                    </dd>
                  </div>
                </dl>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
