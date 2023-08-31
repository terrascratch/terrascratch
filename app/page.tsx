import { RenderContainer } from "@/components/render-container";
import { initialContainer } from "@/mocks/containers";
import NextImage from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <header className="flex flex-col items-center justify-center">
        <NextImage
          src="/logo.png"
          alt="Infra for babies"
          width={100}
          height={100}
        />

        <h1 className="text-2xl mt-3">Infra for Babies</h1>
      </header>

      <p>Select your infraestructure elements and configure the hierarchy.</p>
      <section className="flex flex-1 flex-col items-center justify-center">
        <RenderContainer container={initialContainer} />
      </section>

      <footer className="text-slate-500 text-sm">
        <a href="https://br.freepik.com/vetores-gratis/logotipo-detalhado-do-bebe_10806892.htm#query=baby%20logo&position=1&from_view=search&track=ais">
          pikisuperstar&apos;s logo
        </a>{" "}
        from Freepik
      </footer>
    </main>
  );
}
