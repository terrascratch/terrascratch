"use client";
import { CreateElementModal } from "@/components/create-element-modal";
import { RenderTerraform } from "@/components/render-terraform";
import { RenderTreeNode } from "@/components/render-tree-node";
import { useHierarchy } from "@/contexts/hierarchy";
import NextImage from "next/image";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const hierarchy = useHierarchy();

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-center p-24">
      <header className="flex flex-col items-center justify-center">
        <NextImage
          src="/logo.png"
          alt="Infra for babies"
          width={100}
          height={100}
          priority
        />

        <h1 className="text-2xl mt-3">Infra for Babies</h1>
      </header>

      <p>Select your infraestructure elements and configure the hierarchy.</p>
      <div className="mt-5 flex-1 w-full flex items-center justify-center">
        <section className="flex flex-1 flex-col items-center justify-center mr-5">
          <RenderTreeNode isRoot node={hierarchy.root} />
        </section>

        <section className="flex flex-1 flex-col items-center justify-center">
          <RenderTerraform />
        </section>
      </div>

      <footer className="text-slate-500 text-sm">
        <a href="https://br.freepik.com/vetores-gratis/logotipo-detalhado-do-bebe_10806892.htm#query=baby%20logo&position=1&from_view=search&track=ais">
          pikisuperstar&apos;s logo
        </a>{" "}
        from Freepik
      </footer>

      <CreateElementModal />
      <ToastContainer />
    </main>
  );
}
