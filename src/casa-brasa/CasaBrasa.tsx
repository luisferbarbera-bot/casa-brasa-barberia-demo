"use client";
import * as React from "react";
import { LangProvider, useCopy } from "./lang";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Gallery, Marquee, Ritual, Services, Team } from "./Sections";
import { Booking, Club, Footer, Reviews, Visit } from "./Sections2";

function DemoBar() {
  const { t } = useCopy();
  return (
    <p className="gutter relative z-[51] bg-laton py-2 text-center text-xs font-semibold text-carbon">{t.demoBar}</p>
  );
}

function Page() {
  const [barber, setBarber] = React.useState(-1);
  return (
    <>
      <DemoBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Ritual />
        <Gallery />
        <Team onPick={setBarber} />
        <Club />
        <Reviews />
        <Booking barber={barber} setBarber={setBarber} />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

export default function CasaBrasa() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
