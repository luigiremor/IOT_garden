"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const sensorSchema = z.object({
  min: z.number(),
  max: z.number(),
  enabled: z.boolean(),
});

const plantTypeSchema = z.object({
  soilMoisture: sensorSchema,
  temperature: sensorSchema,
  humidity: sensorSchema,
  lightIntensity: sensorSchema,
});

const formSchema = z.object({
  trees: plantTypeSchema,
  vegetables: plantTypeSchema,
  ornamentals: plantTypeSchema,
  generalNotifications: z.boolean(),
});

export default function AlertsConfigForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trees: {
        soilMoisture: { min: 20, max: 60, enabled: true },
        temperature: { min: 10, max: 35, enabled: true },
        humidity: { min: 30, max: 70, enabled: true },
        lightIntensity: { min: 1000, max: 50000, enabled: true },
      },
      vegetables: {
        soilMoisture: { min: 40, max: 80, enabled: true },
        temperature: { min: 15, max: 30, enabled: true },
        humidity: { min: 50, max: 80, enabled: true },
        lightIntensity: { min: 3000, max: 70000, enabled: true },
      },
      ornamentals: {
        soilMoisture: { min: 30, max: 70, enabled: true },
        temperature: { min: 18, max: 28, enabled: true },
        humidity: { min: 40, max: 60, enabled: true },
        lightIntensity: { min: 2000, max: 60000, enabled: true },
      },
      generalNotifications: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Aqui você normalmente enviaria os dados para seu backend
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Configuração de alertas atualizada", {
        description: "Suas novas configurações de alerta foram salvas.",
      });
    }, 1000);
  }

  const SensorConfig = ({
    category,
    sensorType,
  }: {
    category: "trees" | "vegetables" | "ornamentals";
    sensorType: "soilMoisture" | "temperature" | "humidity" | "lightIntensity";
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {sensorType.replace(/([A-Z])/g, " $1").trim()}
        </CardTitle>
        <CardDescription>
          Configure os limites para{" "}
          {sensorType
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={`${category}.${sensorType}.enabled`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Ativar Alertas</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${category}.${sensorType}.min`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mínimo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${category}.${sensorType}.max`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="trees" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trees">Árvores</TabsTrigger>
            <TabsTrigger value="vegetables">Leguminosas</TabsTrigger>
            <TabsTrigger value="ornamentals">Ornamentais</TabsTrigger>
          </TabsList>
          <TabsContent value="trees" className="space-y-4">
            <SensorConfig category="trees" sensorType="soilMoisture" />
            <SensorConfig category="trees" sensorType="temperature" />
            <SensorConfig category="trees" sensorType="humidity" />
            <SensorConfig category="trees" sensorType="lightIntensity" />
          </TabsContent>
          <TabsContent value="vegetables" className="space-y-4">
            <SensorConfig category="vegetables" sensorType="soilMoisture" />
            <SensorConfig category="vegetables" sensorType="temperature" />
            <SensorConfig category="vegetables" sensorType="humidity" />
            <SensorConfig category="vegetables" sensorType="lightIntensity" />
          </TabsContent>
          <TabsContent value="ornamentals" className="space-y-4">
            <SensorConfig category="ornamentals" sensorType="soilMoisture" />
            <SensorConfig category="ornamentals" sensorType="temperature" />
            <SensorConfig category="ornamentals" sensorType="humidity" />
            <SensorConfig category="ornamentals" sensorType="lightIntensity" />
          </TabsContent>
        </Tabs>

        <FormField
          control={form.control}
          name="generalNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Ativar Notificações Gerais
                </FormLabel>
                <FormDescription>
                  Receba alertas quando as medições estiverem fora dos
                  intervalos configurados.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Configuração"}
        </Button>
      </form>
    </Form>
  );
}
