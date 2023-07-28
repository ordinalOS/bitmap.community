"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  blockHeight: z
    .string()
    .min(1, {
      message: "Please enter a valid block number",
    })
    .regex(/^[0-9]\d*$/, {
      message: "Please enter a valid block number",
    }),
});

export function AddressForm({ searchParam = "" }: { searchParam?: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockHeight: searchParam,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/analyzer/${values.blockHeight}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="blockHeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                &gt;_ Enter a block number below
              </FormLabel>
              <FormControl>
                <div className="flex w-full">
                  <Input placeholder="Example 796983" {...field} />
                  <Button type="submit" className="min-w-fit">
                    Check traits
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
