"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

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

export function AddressForm({
  setBlockHeight,
  isLoading,
}: {
  setBlockHeight: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}) {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockHeight: "",
    },
  });

  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      form.setValue("blockHeight", address);
      form.handleSubmit(onSubmit)();
    }
  }, [searchParams]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBlockHeight(values.blockHeight);
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
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check metadata"
                    )}
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
