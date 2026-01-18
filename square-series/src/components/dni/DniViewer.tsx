import React from "react";

export type DniData = {
  nombre: string;
  nacimiento: string; // YYYY-MM-DD
  fotoDataUrl?: string; // base64
};

export function DniViewer({ data }: { data: DniData }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-10">
        <div className="rotate-[-18deg] text-4xl font-black tracking-widest">
          MUESTRA · NO VÁLIDO
        </div>
      </div>

      <div className="flex gap-4">
        <div className="h-20 w-16 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
          {data.fotoDataUrl ? (
            <img src={data.fotoDataUrl} className="h-full w-full object-cover" alt="Foto" />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-slate-300">SIN FOTO</div>
          )}
        </div>

        <div className="min-w-0">
          <div className="text-xs text-slate-300">Nombre</div>
          <div className="truncate text-base font-semibold">{data.nombre}</div>

          <div className="mt-2 text-xs text-slate-300">Nacimiento</div>
          <div className="text-sm">{data.nacimiento}</div>

          <div className="mt-2 text-xs text-slate-400">Documento ficticio para demo.</div>
        </div>
      </div>
    </div>
  );
}
