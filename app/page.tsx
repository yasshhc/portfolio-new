import ContactFooter from "@/components/ContactFooter";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ReleaseNotes from "@/components/ReleaseNotes";
import RoadmapBoard from "@/components/RoadmapBoard";
import ShippedSpecs from "@/components/ShippedSpecs";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 pb-16">
      <Nav />
      <main>
        <Hero />
        <RoadmapBoard />
        <ShippedSpecs />
        <Timeline />
        <ReleaseNotes />
      </main>
      <ContactFooter />
    </div>
  );
}
