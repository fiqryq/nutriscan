"use client";
import { Main } from "@/components/ui/page-wrapper";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SendHorizonalIcon } from "lucide-react";

import React from "react";
import { assistantPropmtAnalyzeFood, ChatPrompt } from "@/propmt";
import Groq from "groq-sdk";
import { ChatMessage, IResponse } from "@/interface/response";
import { SugarGrade, SugarGradeHeaderBadge } from "@/components/ui/sugar-grade";
import {
  HeaderSkeleton,
  NutritionSkeleton,
  NutritionTitleSkeleton,
  Skeleton,
} from "@/components/ui/skeleton";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { GROQENV } from "@/lib/env";

const formSchema = z.object({
  messages: z.string().min(2, {
    message: "Input your messages..",
  }),
});

import { responseAPI } from "@/constant/food";

export default function Detail() {
  const groq = new Groq({
    apiKey: GROQENV,
    dangerouslyAllowBrowser: true,
  });

  const [content, setContent] = useState<Partial<IResponse>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messages: "",
    },
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch("/api/oauth", {
          method: "POST",
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    getToken();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      form.setValue("messages", "");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: data.messages },
      ]);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: ChatPrompt(),
          },
          {
            role: "user",
            content: data.messages,
          },
        ],
        model: "llama3-70b-8192",
        max_tokens: 1000,
        temperature: 1,
        top_p: 1,
        stream: true,
        stop: null,
      });

      let fullMessage = "";

      for await (const chunk of chatCompletion) {
        const content = chunk?.choices?.[0]?.delta?.content;
        if (content) {
          fullMessage += content;
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullMessage },
      ]);
    } catch (error) {
      console.error(
        "Error fetching chat completion or parsing content:",
        error
      );
    }
  };

  const askOllama = async (): Promise<any> => {
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: assistantPropmtAnalyzeFood(),
          },
          {
            role: "user",
            content: JSON.stringify(responseAPI),
          },
        ],
        model: "llama3-70b-8192",
        max_tokens: 4000,
        temperature: 1,
        top_p: 1,
        stream: false,
        stop: null,
      });

      // Check if choices array and message content exist
      const content = chatCompletion?.choices?.[0]?.message?.content || "";

      // Attempt to parse content
      let parsedContent;
      try {
        parsedContent = JSON.parse(content);
      } catch (parseError) {
        console.warn("Failed to parse JSON content:", parseError);
        parsedContent = null;
      }

      // Update content if parsed successfully
      if (parsedContent) {
        setContent(parsedContent);
      } else {
        console.warn("No valid content to display.");
      }
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    askOllama();
  }, []);

  return (
    <Main>
      {loading ? (
        <HeaderSkeleton />
      ) : (
        <div className="w-full relative mb-6">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={content?.image ?? ""}
              alt="Image"
              width={480}
              height={200}
              className="object-cover"
            />
            <div className="flex flex-col items-center justify-center absolute right-5 bottom-0">
              {/* <div className="font-bold text-3xl">{content.sugar?.grade}</div> */}
              {SugarGradeHeaderBadge(content.sugar?.grade ?? "A")}
            </div>
          </AspectRatio>
        </div>
      )}
      {loading ? (
        <div className="p-3">
          <Skeleton className="w-1/2 h-5 mt-3 px-3" />
          <Skeleton className="w-full h-10 mt-3 px-3" />
        </div>
      ) : (
        <section className="p-3">
          <h1 className="font-bold text-2xl mb-1 uppercase">{content.title}</h1>
          <p className="text-balance text-muted-foreground">
            {" "}
            {content.description}
          </p>
        </section>
      )}
      <hr />
      <section className="p-3">
        {/* <h1 className="font-bold text-2xl mb-1">Nutrition Value</h1> */}
        {loading ? (
          <NutritionTitleSkeleton />
        ) : (
          <p className="text-muted-foreground">
            Here s a detailed look at the nutrients in {content.title} :
          </p>
        )}
        {loading ? (
          <NutritionSkeleton />
        ) : (
          <div className="inline-flex justify-between w-full mt-5">
            <div>
              <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                <div className="bg-[#8DAE4A] h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl" />
                <div className="text-lg">{content.nutrition?.carbo}</div>
              </div>
              <div className="text-center mt-2">Carbo</div>
            </div>
            <div>
              <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                <div className="bg-[#F4C61D] h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl" />
                <div className="text-lg">{content.nutrition?.protein}</div>
              </div>
              <div className="text-center mt-2">Protein</div>
            </div>
            <div>
              <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                <div className="bg-[#E8505B] h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl" />
                <div className="text-lg">{content.nutrition?.sugar}</div>
              </div>
              <div className="text-center mt-2">Sugar</div>
            </div>
            <div>
              <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                <div className="bg-[#F2F2F2] h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl" />
                <div className="text-lg">{content.nutrition?.fat}</div>
              </div>
              <div className="text-center mt-2">Fat</div>
            </div>
            <div>
              <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                <div className="bg-[#FB8827] h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl" />
                <div className="text-lg">{content.nutrition?.salt}</div>
              </div>
              <div className="text-center mt-2">Salt</div>
            </div>
          </div>
        )}
      </section>
      <hr />
      <section className="p-3 pb-20">
        {loading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <p className="text-muted-foreground">
            The sweetness of {content.title}, certified with a food grade of{" "}
            <span className="font-bold">{content.sugar?.grade}</span> . This
            product contains {content.nutrition?.sugar} grams of sugar per
            serving.
          </p>
        )}
        <div className="grid grid-cols-5 mt-2">
          {SugarGrade(content.sugar?.grade ?? "A", loading)}
        </div>
        <ul className="list-disc list-inside mt-2 text-muted-foreground">
          {loading ? (
            <div className="space-y-2 mt-4">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
            </div>
          ) : (
            <>
              <li>A: Less than 1g of sugar per serving.</li>
              <li>B: 1-2.4g of sugar per serving.</li>
              <li>C: 2.5-4g of sugar per serving.</li>
              <li>D: 4.1-6g of sugar per serving.</li>
              <li>E: More than 6g of sugar per serving.</li>
            </>
          )}
        </ul>
      </section>
      <div className="bottom-0 p-5 w-full fixed left-0 max-w-[480px] mx-auto inset-x-0 bg-white">
        <Sheet>
          <SheetTrigger className="w-full bg-black p-2 rounded-lg text-white">
            Open
          </SheetTrigger>
          <SheetContent
            className="w-[480px] mx-auto h-full rounded-t-lg"
            side="bottom"
          >
            <div className="flex flex-col space-y-4 mt-5 overflow-auto max-h-svh pb-36 no-scrollbar">
              {messages.map((chat, index) => {
                if (chat.role === "user") {
                  return (
                    <div
                      className="flex items-start justify-end gap-2.5"
                      key={index}
                    >
                      {/* Insert dot here */}
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {/* 11:46 */}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            You
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {chat.content}
                          </p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {/* Delivered */}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    </div>
                  );
                }
                return (
                  <div key={index} className="flex items-start gap-2.5">
                    <img
                      className="w-8 h-8 rounded-full bg-black"
                      src="https://logowik.com/content/uploads/images/ollama-language-model9633.logowik.com.webp"
                    />
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Ollama (your nutritionis)
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {/* 11:46 */}
                        </span>
                      </div>
                      <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                          {chat.content}
                        </p>
                      </div>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {/* Delivered */}
                      </span>
                    </div>
                    {/* Insert dot here */}
                  </div>
                );
              })}
            </div>
            <div className="bg-white bottom-0 absolute w-full inset-x-0 mx-auto p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <FormField
                    control={form.control}
                    name="messages"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="input your message here."
                              className="p-2 px-4"
                              {...field}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  form.handleSubmit(onSubmit)();
                                }
                              }}
                            />
                            <SendHorizonalIcon className="right-2 absolute top-0 h-full" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Main>
  );
}
