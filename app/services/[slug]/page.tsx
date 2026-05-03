import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import ServiceDetail from "@/components/service-detail"
import { getServices } from "@/actions/service-actions"
import connectDB from "@/lib/db"

export async function generateStaticParams() {
  await connectDB()
  const services = await getServices()
  return services.map((service: any) => ({
    slug: service.href.replace('/services/', ''),
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const services = await getServices()
  const service = services.find((s: any) => s.href === `/services/${params.slug}`)

  if (!service) {
    return {
      title: "الخدمة غير موجودة",
    }
  }

  return {
    title: `${service.title} - DGR Diamond Growth`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  await connectDB()
  const services = await getServices()
  const dbService = services.find((s: any) => s.href === `/services/${params.slug}`)

  if (!dbService) {
    notFound()
  }

  const plainService = JSON.parse(JSON.stringify(dbService))
  // Map details to content for backward compatibility with ServiceDetail UI
  if (plainService.details && !plainService.content) {
      plainService.content = plainService.details
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ServiceDetail service={plainService} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
