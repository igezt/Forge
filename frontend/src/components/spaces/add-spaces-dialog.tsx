"use client";
import { Plus } from "lucide-react";
import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "../combobox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const addSpaceFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Space name must be at least 1 characters.",
    })
    .max(50, { message: "Space name must not be longer than 50 characters." }),
  description: z.string().max(250, {
    message: "Space name must not be longer than 250 characters.",
  }),
  privacy: z.enum(["public", "private", "team"], {
    message: "Select a privacy",
  }),
});

export function AddSpacesDialog() {
  const form = useForm<z.infer<typeof addSpaceFormSchema>>({
    resolver: zodResolver(addSpaceFormSchema),
    defaultValues: {
      name: faker.company.name(),
      description: `${faker.animal
        .type()
        .replace(/^./, (char) => char.toUpperCase())}s`,
    },
  });

  function onSubmit(values: z.infer<typeof addSpaceFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new space</DialogTitle>
            </DialogHeader>
            <div className="flex space-x-2 flex-col py-3">
              <div className="flex-1 flex-row gap-2 pt-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your space name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 flex-row gap-2 py-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Default description" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your space description.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="privacy">Privacy</FormLabel>
                      <FormControl>
                        <Combobox
                          data={[
                            {
                              value: "private",
                              label: "Private",
                            },
                            {
                              value: "public",
                              label: "Public",
                            },
                            {
                              value: "team",
                              label: "Team",
                            },
                          ]}
                          emptyText={""}
                          withSearch={false}
                          placeholderText={"Select a privacy level"}
                          onSelect={(currentValue: string) => {
                            let spacePrivacy = currentValue as
                              | "public"
                              | "private"
                              | "team";
                            form.setValue("privacy", spacePrivacy);
                          }}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        This is your space privacy level.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start py-3 ml-auto">
              <DialogClose asChild>
                <Button type="button" variant="link">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                Create Space
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
