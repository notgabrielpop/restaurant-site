import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Date invalide", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await sendEmail({
      subject: "Mesaj nou din formularul de contact Zaitoone",
      text: `Nume: ${data.name}\nEmail: ${data.email}\nMesaj:\n${data.message}`,
      html: `<p><strong>Nume:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Mesaj:</strong><br/>${data.message}</p>`,
    });
  } catch (error) {
    console.error("Contact email error", error);
  }

  return NextResponse.json({ success: true });
}

