
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { questions } from "@/lib/questions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Logo } from "./icons";
import { useEffect, useState } from "react";

// Dynamically create the Zod schema
const questionSchema = z.object({
  D: z.coerce.number().min(1).max(4),
  I: z.coerce.number().min(1).max(4),
  S: z.coerce.number().min(1).max(4),
  C: z.coerce.number().min(1).max(4),
}).refine(data => {
  const values = Object.values(data).filter(v => v > 0);
  const uniqueValues = new Set(values);
  return values.length === uniqueValues.size;
}, {
  message: "Each rank can only be used once per question.",
}).refine(data => {
  const values = Object.values(data);
  const isComplete = values.every(v => v > 0);
  if (!isComplete) return true; // Only validate sum if all are answered
  return values.reduce((a, b) => a + b, 0) === 10;
}, {
  message: "Use each rank (4, 3, 2, 1) once.",
});

const formSchema = z.object({
  answers: z.array(questionSchema)
});

type FormValues = z.infer<typeof formSchema>;

export default function DiscAssessmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const name = searchParams.get("name") || "";
  const role = searchParams.get("role") || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: Array(24).fill({ D: 0, I: 0, S: 0, C: 0 }),
    },
  });

  const { control, watch, setValue, getValues, formState: { errors } } = form;

  const handleRadioChange = (qIndex: number, category: 'D' | 'I' | 'S' | 'C', value: string) => {
    const numericValue = Number(value);
    const currentQuestionAnswers = getValues(`answers.${qIndex}`);
    
    const otherValues = Object.entries(currentQuestionAnswers)
      .filter(([key]) => key !== category)
      .map(([, val]) => val);

    if (otherValues.includes(numericValue) && numericValue !== 0) {
      toast({
        title: "Duplicate Rank",
        description: "You have already used this rank for another statement in this question.",
        variant: "destructive",
        duration: 2000,
      });
      return; 
    }
    
    setValue(`answers.${qIndex}.${category}`, numericValue, { shouldValidate: true, shouldDirty: true });
  };


  useEffect(() => {
    const subscription = watch((value) => {
      const answeredCount = value.answers?.filter(ans => {
        const values = Object.values(ans || {});
        const uniqueValues = new Set(values.filter(v => v > 0));
        return uniqueValues.size === 4 && values.reduce((a,b) => a+b, 0) === 10;
      }).length || 0;
      setProgress((answeredCount / 24) * 100);
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  function onSubmit(data: FormValues) {
    const totals = { D: 0, I: 0, S: 0, C: 0 };
    data.answers.forEach(answer => {
      totals.D += answer.D;
      totals.I += answer.I;
      totals.S += answer.S;
      totals.C += answer.C;
    });

    toast({
      title: "Assessment Complete!",
      description: "Generating your report...",
    });

    const query = new URLSearchParams({
      name,
      role,
      d: totals.D.toString(),
      i: totals.I.toString(),
      s: totals.S.toString(),
      c: totals.C.toString(),
    }).toString();
    
    router.push(`/report?${query}`);
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto">
             <Logo />
            </div>
          <CardTitle className="text-3xl font-headline">DISC Assessment</CardTitle>
          <CardDescription>
            For each question, rank the statements from 4 (most like you) to 1 (least like you).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="sticky top-0 bg-card z-10 py-4 -mt-4">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground mt-2">{Math.round(progress)}% Complete</p>
              </div>
              {questions.map((question, qIndex) => (
                <Card key={question.id} className="p-6 bg-background/50">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Question {question.id}</CardTitle>
                     {errors.answers?.[qIndex] && (
                        <p className="text-sm font-medium text-destructive">
                          {errors.answers[qIndex]?.root?.message}
                        </p>
                      )}
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {question.statements.map((statement, sIndex) => {
                      const category = statement.category;
                      return (
                        <FormField
                          key={sIndex}
                          control={form.control}
                          name={`answers.${qIndex}.${category}`}
                          render={({ field }) => (
                            <FormItem className="space-y-3 bg-card p-4 rounded-lg border">
                              <FormLabel className="font-normal">{statement.text}</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => handleRadioChange(qIndex, category, value)}
                                  value={field.value.toString()}
                                  className="flex justify-around items-center pt-2"
                                >
                                  {[4, 3, 2, 1].map(val => (
                                    <FormItem key={val} className="flex flex-col items-center space-y-1">
                                      <FormControl>
                                        <RadioGroupItem value={val.toString()} id={`${field.name}-${val}`}/>
                                      </FormControl>
                                      <FormLabel htmlFor={`${field.name}-${val}`} className="font-normal text-xs">{val}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      );
                    })}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button type="submit" size="lg" className="w-full mt-8 font-bold text-lg">
                Submit & See My Results
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    