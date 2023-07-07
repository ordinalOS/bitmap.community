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
import { MetaData } from "@/types";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  blocknumber: z
    .string()
    .min(1, {
      message: "Please enter a valid block number",
    })
    .regex(/^[0-9]\d*$/, {
      message: "Please enter a valid block number",
    }),
});

export function AddressForm({
  setMetaData,
}: {
  setMetaData: Dispatch<SetStateAction<MetaData | null>>;
}) {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blocknumber: "",
    },
  });

  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      form.setValue("blocknumber", address);
      form.handleSubmit(onSubmit)();
    }
  }, [searchParams]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        `http://api.bitmap.community/api/v1/rarity/${values.blocknumber}`
      );
      const data = await res.json();
      setMetaData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="blocknumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                &gt;_ Paste the block number below
              </FormLabel>
              <FormControl>
                <div className="flex w-full">
                  <Input placeholder="Example 796983" {...field} />
                  <Button type="submit" className="min-w-fit">
                    Check metadata
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
