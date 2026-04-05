import Image from "next/image";

export function PalcoControleUrbano() {
  return (
    <section className="relative hidden min-h-[760px] overflow-hidden bg-[linear-gradient(180deg,var(--smartgreen-dark)_0%,var(--smartgreen-dark-soft)_100%)] lg:block">
      <div className="absolute left-24 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[rgba(47,107,47,0.18)] blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(75,138,75,0.2)] blur-3xl" />
      <div className="absolute right-24 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[rgba(47,107,47,0.16)] blur-3xl" />

      <div className="relative z-10 flex h-full items-center justify-center px-10 py-12">
        <div className="rounded-[28px] bg-[rgba(255,255,255,0.09)] px-10 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <Image
            src="/logo-smartgreen.png"
            alt="Logo SmartGreen"
            width={360}
            height={150}
            priority
            className="h-auto w-[280px] xl:w-[360px]"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-20 px-10 text-center">
        <p className="text-xs font-medium tracking-[0.04em] text-white">
          © 2026 SmartGreen AI. Todos os direitos reservados.
        </p>
      </div>
    </section>
  );
}
