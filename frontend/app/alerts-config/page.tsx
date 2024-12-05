import AlertsConfigForm from '@/components/AlertsConfigForm'
import { Separator } from "@/components/ui/separator"

export default function AlertsConfigPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Alerts Configuration</h1>
      <Separator className="my-6" />
      <AlertsConfigForm />
    </div>
  )
}

