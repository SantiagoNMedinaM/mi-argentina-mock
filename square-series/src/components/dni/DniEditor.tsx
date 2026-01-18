import React, { useMemo, useState } from "react";
import type { DniData } from "./DniViewer";
import { DniViewer } from "./DniViewer";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = () => rej(new Error("No se pudo leer la imagen"));
    r.readAsDataURL(file);
  });
}

export default function DniEditor() {
  const defaultData: DniData = useMemo(() => {
    const saved = localStorage.getItem("dni_mock");
    if (saved) return JSON.parse(saved);
    return { nombre: "NOMBRE APELLIDO (MUESTRA)", nacimiento: "2000-01-01" };
  }, []);

  const [data, setData] = useState<DniData>(defaultData);
  const [open, setOpen] = useState(false);

  function persist(next: DniData) {
    setData(next);
    localStorage.setItem("dni_mock", JSON.stringify(next));
  }

  async function onPickFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await readFileAsDataUrl(f);
    persist({ ...data, fotoDataUrl: url });
  }

  return (
    <div className="space-y-4">
      <DniViewer data={data} />

      <button
        className="w-full rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-900"
        onClick={() => setOpen(true)}
      >
        Editar (mock)
      </button>

      {open && (
        <div className="fixed inset-0 z-20 mx-auto max-w-[430px] bg-slate-950/80 backdrop-blur">
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-slate-800 bg-slate-950 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold">Editar DNI (MUESTRA)</div>
              <button className="rounded-xl px-3 py-2 hover:bg-slate-900" onClick={() => setOpen(false)}>
                Cerrar
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <div className="mb-1 text-sm text-slate-300">Nombre</div>
                <input
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2"
                  value={data.nombre}
                  onChange={(e) => persist({ ...data, nombre: e.target.value })}
                />
              </label>

              <label className="block">
                <div className="mb-1 text-sm text-slate-300">Nacimiento</div>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2"
                  value={data.nacimiento}
                  onChange={(e) => persist({ ...data, nacimiento: e.target.value })}
                />
              </label>

              <label className="block">
                <div className="mb-1 text-sm text-slate-300">Foto</div>
                <input type="file" accept="image/*" onChange={onPickFoto} />
              </label>

              <div className="pt-2">
                <div className="text-xs text-slate-400">
                  Esto es una maqueta. No es un documento real.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
