"use client";
import { CreateElementModal } from "@/components/create-element-modal";
import { RenderTerraform } from "@/components/render-terraform";
import { RenderTreeNode } from "@/components/render-tree-node";
import { useHierarchy } from "@/contexts/hierarchy";
import NextImage from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const hierarchy = useHierarchy();

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-center p-24">
      <header className="flex flex-col items-center justify-center">
        <NextImage
          src="/logo.png"
          alt="Terrascratch"
          width={100}
          height={100}
          priority
        />

        <h1 className="text-2xl mt-3">Terrascratch</h1>
      </header>

      <p>Learn Terraform by building your infrastructure from scratch.</p>
      <div className="mt-5 flex-1 flex items-start justify-center">
        <section className="flex-1 mr-5">
          <RenderTreeNode isRoot node={hierarchy.root} />
        </section>

        <div className="mt-3">
          <RenderTerraform />
        </div>
      </div>

      <footer className="text-slate-500 text-sm flex items-center justify-center">
        <span>
          <a href="https://br.freepik.com/vetores-gratis/logotipo-detalhado-do-bebe_10806892.htm#query=baby%20logo&position=1&from_view=search&track=ais">
            pikisuperstar&apos;s logo
          </a>{" "}
          from Freepik
        </span>

        <Link
          href="https://github.com/terrascratch/terrascratch"
          target="_blank"
          className="ml-5 flex items-center justify-center bg-gray-500 rounded-lg text-white p-2"
        >
          <FaGithub />

          <p className="ml-1">Join us</p>
        </Link>
      </footer>

      <CreateElementModal />
      <ToastContainer />
    </main>
  );
}
