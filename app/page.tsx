import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import AchievementsCounter from "@/components/achievements-counter"
import MapSection from "@/components/map-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import SuccessPartners from "@/components/success-partners"
import { getProjects } from "@/actions/project-actions"
import { getServices } from "@/actions/service-actions"
import SiteContent from "@/models/SiteContent"

export default async function HomePage() {
  await connectDB()
  const dbServices = await getServices()
  
  const heroSlides = [
    {
      id: "slide1",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070",
      title: "نحو مستقبل أفضل مع DGR Diamond Growth",
      subtitle: "نحن نقدم أفضل حلول البناء والاتصالات بخبرة عالمية.",
    },
    {
      id: "slide2",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071",
      title: "أحدث التقنيات وأفضل الكفاءات",
      subtitle: "نضمن لك الجودة والابتكار في كل مشروع نقوم بتنفيذه.",
    }
  ]
  const plainProjects = []
  const plainServices = JSON.parse(JSON.stringify(dbServices))

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider slides={heroSlides} />
      <AboutSection />
      <ServicesSection services={plainServices} />
      <ProjectsSection projects={plainProjects} />
      <SuccessPartners />
      <MapSection />
      <AchievementsCounter />
      <Footer />
      <FloatingContact />
    </main>
  )
}
