import { useId, useState, type ReactNode } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Table =
  | "volunteer_applications"
  | "interest_list"
  | "partner_inquiries"
  | "contact_messages"
  | "donation_notify_list";

type Values = Record<string, string | boolean | string[]>;

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-gold";

export const req = (label: string) => z.string().trim().min(1, `${label} is required.`).max(1000);
export const email = z.string().trim().email("Enter a valid email address.").max(255);
export const optional = z.string().trim().max(1000).optional().or(z.literal(""));
export const zip = z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code.");
export const phoneReq = z.string().trim().regex(/^[\d\s()+.-]{7,20}$/, "Enter a valid phone number.");

export function useForm<S extends z.ZodTypeAny>(schema: S, initial: Values) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: string, v: Values[string]) => setValues((s) => ({ ...s, [k]: v }));
  const validate = () => {
    const r = schema.safeParse(values);
    if (r.success) {
      setErrors({});
      return r.data as z.infer<S>;
    }
    const e: Record<string, string> = {};
    for (const i of r.error.issues) e[String(i.path[0])] ??= i.message;
    setErrors(e);
    return null;
  };
  return { values, errors, set, validate };
}

export function FormShell({
  table,
  title,
  onValid,
  children,
  submitLabel,
  success,
  extraAboveSubmit,
}: {
  table: Table;
  title?: string;
  onValid: () => Record<string, unknown> | null;
  children: ReactNode;
  submitLabel: string;
  success: string;
  extraAboveSubmit?: ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [hp, setHp] = useState("");
  const hpId = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const row = onValid();
    if (!row) {
      (e.currentTarget as HTMLFormElement).querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    if (hp) {
      setStatus("done"); // silently drop bots
      return;
    }
    setStatus("sending");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from(table).insert(row as any);
    setStatus(error ? "error" : "done");
  }

  if (status === "done")
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl border-2 border-gold bg-paper p-6">
        <CheckCircle2 className="mt-1 shrink-0 text-gold-deep" aria-hidden />
        <p className="font-medium">{success}</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-label={title}>
      {title && <h3 className="text-xl text-gold-deep">{title}</h3>}
      <p className="text-sm text-muted-foreground">Fields marked * are required.</p>
      {children}
      <div aria-hidden className="absolute -left-[9999px]" >
        <label htmlFor={hpId}>Leave this field empty</label>
        <input id={hpId} tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      {extraAboveSubmit}
      {status === "error" && (
        <p role="alert" className="text-destructive">Something went wrong. Please try again in a moment.</p>
      )}
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

function Wrap({ id, label, required, error, children, hint }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label}
        {required && <span className="text-destructive" aria-hidden> *</span>}
      </label>
      {hint && <p className="mb-1 text-sm text-muted-foreground">{hint}</p>}
      {children}
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  form: ReturnType<typeof useForm>;
  type?: string;
  autoComplete?: string;
};

export function Field({ name, label, required, form, type = "text", autoComplete }: FieldProps) {
  const id = useId();
  const err = form.errors[name];
  return (
    <Wrap id={id} label={label} required={required} error={err}>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-err` : undefined}
        className={inputCls}
        value={String(form.values[name] ?? "")}
        onChange={(e) => form.set(name, e.target.value)}
      />
    </Wrap>
  );
}

export function Area({ name, label, required, form }: FieldProps) {
  const id = useId();
  const err = form.errors[name];
  return (
    <Wrap id={id} label={label} required={required} error={err}>
      <textarea
        id={id}
        rows={5}
        required={required}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-err` : undefined}
        className={inputCls}
        value={String(form.values[name] ?? "")}
        onChange={(e) => form.set(name, e.target.value)}
      />
    </Wrap>
  );
}

export function SelectField({ name, label, required, form, options }: FieldProps & { options: string[] }) {
  const id = useId();
  const err = form.errors[name];
  return (
    <Wrap id={id} label={label} required={required} error={err}>
      <select
        id={id}
        required={required}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-err` : undefined}
        className={inputCls}
        value={String(form.values[name] ?? "")}
        onChange={(e) => form.set(name, e.target.value)}
      >
        <option value="">Choose one…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </Wrap>
  );
}

export function CheckField({ name, label, form, required }: Omit<FieldProps, "type">) {
  const id = useId();
  const err = form.errors[name];
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-1.5 h-5 w-5 shrink-0 accent-gold-deep"
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-err` : undefined}
          checked={!!form.values[name]}
          onChange={(e) => form.set(name, e.target.checked)}
        />
        <label htmlFor={id}>
          {label}
          {required && <span className="text-destructive" aria-hidden> *</span>}
        </label>
      </div>
      {err && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{err}</p>}
    </div>
  );
}

export function CheckGroup({ name, legend, options, form }: { name: string; legend: string; options: string[]; form: ReturnType<typeof useForm> }) {
  const vals = (form.values[name] as string[]) ?? [];
  return (
    <fieldset>
      <legend className="mb-2 font-medium">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label key={o} className={cn("flex items-center gap-3 rounded-lg border px-3 py-2", vals.includes(o) && "border-gold")}>
            <input
              type="checkbox"
              className="h-5 w-5 accent-gold-deep"
              checked={vals.includes(o)}
              onChange={(e) => form.set(name, e.target.checked ? [...vals, o] : vals.filter((v) => v !== o))}
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
