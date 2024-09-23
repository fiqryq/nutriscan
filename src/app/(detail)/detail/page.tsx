/* eslint-disable @next/next/no-img-element */
"use client";
import { Main } from "@/components/ui/page-wrapper";
import { useEffect, useState } from "react";
import { SendHorizonalIcon, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { ChatPrompt } from "@/propmt";
import Groq from "groq-sdk";
import { ChatMessage, I_Response } from "@/interface/response";
import ReactMarkdown from "react-markdown";

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
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  messages: z.string().min(2, {
    message: "Input your messages..",
  }),
});

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { SugarGrade } from "@/components/ui/sugar-grade";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Detail() {
  const searchParams = useSearchParams();
  const barcode = searchParams.get("barcode") as string;

  const groq = new Groq({
    apiKey: GROQENV,
    dangerouslyAllowBrowser: true,
  });

  const [content, setContent] = useState<Partial<I_Response>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<any>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messages: "",
    },
  });

  const defaultMessages = [
    "Apa alternatif camilan yang lebih sehat dari produk ini?",
    "Produk ini mengandung berapa banyak gula, dan apa pengaruhnya terhadap tubuh?",
    "Bagaimana produk ini memengaruhi kesehatan saya?",
    "Berapa banyak kalori dalam produk ini, dan apakah sesuai dengan kebutuhan saya?",
  ];

  useEffect(() => {
    const handleOnScan = async () => {
      try {
        const res = await fetch(`/api/getProduct?barcode=${barcode}`);
        const product = await res.json();
        if (res.status === 200) {
          const nutrition = Object.entries({
            ingredients_text_in: product.ingredients_text_in,
            nutriscore_data: product.nutriscore_data,
            nutriments: product.nutriments,
            product_name_in: product.product_name_in,
            product_quantity: product.product_quantity,
            quantity: product.quantity,
          });

          const content = `
          Analyze this nutritional data: ${JSON.stringify(nutrition)}.
          
          1. List all ingredients. Highlight common allergens in **bold** within the ingredient name.
          2. After the ingredients, list allergens prefixed with "Alergen:".
          3. If sugar content is high, add a warning about the risks of consuming too much sugar.
          4. End with a brief summary of the ingredients.
          5. Respond in Bahasa Indonesia and use markdown format.
          
          Avoid adding introductory phrases like "Here is the analysis" or "Ingredients:".
          Example response:
          Air, Gula, **SUSU** Protein, **GANDUM** Pati.
          **Alergen:** Susu, Gandum
          **Peringatan:** Produk ini mengandung gula dalam jumlah tinggi.
          **Ringkasan:** Produk ini mengandung kadar gula tinggi.
          `;

          const chatCompletion = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: content,
              },
            ],
            model: "llama3-70b-8192",
            max_tokens: 1000,
            temperature: 1,
            top_p: 1,
            stream: false,
            stop: null,
          });
          if (chatCompletion) {
            setSummary(chatCompletion?.choices[0]?.message?.content);
          }
          setLoading(false);
          setContent(product);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    handleOnScan();
  }, [barcode, loading, error]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      form.setValue("messages", "");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: data.messages },
      ]);

      const nutrition = Object.entries({
        ingredients_text_in: content.ingredients_text_in,
        nutriscore_data: content.nutriscore_data,
        nutriments: content.nutriments,
        product_name_in: content.product_name_in,
        product_quantity: content.product_quantity,
        quantity: content.quantity,
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
              You are a virtual nutritionist assistant. Your job is to answer user inquiries strictly based on the provided API data in Bahasa Indonesia. Do not include any introductory phrases like "Based on the API response." Respond directly to the user's question with only the relevant information or calculations derived from the API response below.
              If the user's question is not related to nutrition, food, diet, or health, politely respond with "Saya hanya dapat membantu dengan pertanyaan terkait nutrisi." Do not attempt to answer questions that are outside the scope of nutrition.
              ${JSON.stringify(nutrition)}
            `,
          },
          {
            role: "user",
            content: data.messages,
          },
        ],

        model: "llama3-70b-8192",
        max_tokens: 1000,
        temperature: 0.3,
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

  if (loading) {
    return (
      <Main>
        <Skeleton className="w-full h-[250px]" />
        <div className="p-3">
          <Skeleton className="w-1/2 h-6" />
          <div className="inline-flex gap-2 mt-2">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
          <Skeleton className="w-full h-10" />
        </div>
        <hr />
        <div className="p-3">
          <Skeleton className="w-full h-12" />
          <div className="inline-flex justify-between w-full gap-2 mt-2">
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
            <Skeleton className="w-20 h-20" />
          </div>
        </div>
        <hr />
        <div className="p-3">
          <Skeleton className="w-full h-12" />
          <div className="inline-flex justify-between w-full gap-2 mt-2">
            <Skeleton className="w-full h-32" />
          </div>
        </div>
        <Skeleton className="w-full h-24 absolute bottom-0 inset-x-0 mx-auto" />
      </Main>
    );
  }

  if (error) {
    return (
      <div className="h-svh w-full bg-white flex flex-col items-center justify-center">
        <img src="/assets/404.png" alt="404" />
        <Link href="/" className="mt-3 bg-black text-white p-3 rounded-lg">
          Scan another product
        </Link>
      </div>
    );
  }

  return (
    <Main>
      <div className="w-full h-[250px] relative">
        <img
          src={content?.selected_images?.front.display.in}
          alt="banner"
          className="object-cover w-full h-full"
        />
      </div>
      <section className="p-3">
        <h1 className="font-bold mb-2 text-2xl">
          {content.product_name_in} - {content.quantity}
        </h1>
        <div className="inline-flex flex-wrap gap-1 mb-1">
          {content?.categories?.split(",").map((value, index) => {
            return (
              <Badge key={index} variant="secondary">
                {value}
              </Badge>
            );
          })}
        </div>
        <Alert className="mt-2">
          <AlertDescription className="lowercase">
            {content.ingredients_text_in}
          </AlertDescription>
        </Alert>
      </section>
      <hr />
      <section className="p-3">
        <p className="text-sm [&_p]:leading-relaxed">
          Berikut adalah rincian nutrisi per sajian :
        </p>
        <div className="inline-flex gap-1 justify-between w-full mt-2">
          {Object.entries({
            sugars: content?.nutriscore_data?.sugars,
            proteins: content?.nutriscore_data?.proteins,
            sodium: content?.nutriscore_data?.sodium,
            energy: content?.nutriscore_data?.energy,
            fiber: content?.nutriscore_data?.fiber,
          }).map(([key, value]) => {
            const colors = [
              "#F4C61D",
              "#FF6347",
              "#4682B4",
              "#32CD32",
              "#FF69B4",
            ];

            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            return (
              <div key={key}>
                <div className="border w-18 h-18 flex flex-col items-center justify-center rounded-xl relative">
                  <div
                    className="h-5 w-5 absolute top-0 left-0 rounded-tl-xl rounded-br-xl"
                    style={{ backgroundColor: randomColor }}
                  />
                  <div className="text-lg">{value}g</div>
                </div>
                <div className="text-center mt-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
      <section className="p-3">
        <p className="text-sm [&_p]:leading-relaxed">
          Ini adalah skor untuk mengukur kadar gula pada produk{" "}
          <span className="font-bold text-md">{content.product_name_in} </span>.
          Produk ini memiliki nilai kadar gula{" "}
          <span className="font-bold text-md">
            {content.nutriscore_grade?.toUpperCase()}
          </span>
          . Setiap porsi mengandung{" "}
          <span className="font-semibold">
            {content.nutriscore_data?.sugars}
          </span>{" "}
          gram gula.
        </p>
        <div className="grid grid-cols-5 mt-2 border p-2 rounded-lg">
          <SugarGrade grade={content?.nutriscore_grade?.toUpperCase() || "A"} />
        </div>
      </section>
      <hr />
      <section className="px-3 pb-20 text-sm lowercase [&_p]:leading-relaxed">
        <Alert className="mt-2">
          <AlertTitle className="text-lg capitalize font-bold">
            Ringkasan
          </AlertTitle>
          <AlertDescription className="lowercase">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </AlertDescription>
        </Alert>
      </section>
      <div className="bottom-0 p-5 w-full fixed left-0 max-w-[480px] mx-auto inset-x-0 bg-white">
        <Sheet>
          <SheetTrigger className="w-full bg-black p-2 rounded-lg text-white">
            Tanya seputar produk {content.product_name_in}
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
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {/* Timestamp */}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            You
                          </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          {/* Use ReactMarkdown to render markdown */}
                          <ReactMarkdown className="text-sm  [&_p]:leading-relaxed font-normal text-gray-900 dark:text-white">
                            {chat.content}
                          </ReactMarkdown>
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
                      alt="Ollama avatar"
                    />
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Nutribot
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {/* Timestamp */}
                        </span>
                      </div>
                      <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        {/* Use ReactMarkdown to render markdown */}
                        <ReactMarkdown className="text-sm font-normal  [&_p]:leading-relaxed text-gray-900 dark:text-white">
                          {chat.content}
                        </ReactMarkdown>
                      </div>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {/* Delivered */}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-white bottom-0 absolute w-full inset-x-0 mx-auto p-4">
              {messages.length > 0 ? null : (
                <div className="mb-4 flex flex-col gap-2 w-full">
                  {defaultMessages.map((value, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          onSubmit({ messages: value });
                        }}
                        className="w-full p-2 hover:bg-gray-100 [&_p]:leading-relaxed text-sm rounded-lg border border-gray-500 flex flex-col justify-center items-center cursor-pointer"
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              )}
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
                              placeholder="Tanyakan apa saja seputar produk ini"
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
