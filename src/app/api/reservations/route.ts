import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(20),
  occasion: z.string().optional(),
  areaPreference: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Date invalide", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const data = parsed.data;
    const reservation = await prisma.reservation.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: new Date(data.date),
        time: data.time,
        guests: data.guests,
        occasion: data.occasion,
        areaPreference: data.areaPreference,
        message: data.message,
        status: "pending",
      },
    });

    console.info("Reservation received", reservation);

    try {
      await sendEmail({
        subject: "Rezervare nouă Zaitoone",
        text: [
          `Nume: ${data.name}`,
          `Email: ${data.email}`,
          `Telefon: ${data.phone}`,
          `Data: ${data.date}`,
          `Ora: ${data.time}`,
          `Persoane: ${data.guests}`,
          data.occasion ? `Ocazie: ${data.occasion}` : "",
          data.areaPreference ? `Zonă: ${data.areaPreference}` : "",
          data.message ? `Mesaj: ${data.message}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        html: `
          <p><strong>Nume:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>Data:</strong> ${data.date}</p>
          <p><strong>Ora:</strong> ${data.time}</p>
          <p><strong>Persoane:</strong> ${data.guests}</p>
          ${data.occasion ? `<p><strong>Ocazie:</strong> ${data.occasion}</p>` : ""}
          ${data.areaPreference ? `<p><strong>Zonă:</strong> ${data.areaPreference}</p>` : ""}
          ${data.message ? `<p><strong>Mesaj:</strong><br/>${data.message}</p>` : ""}
        `,
      });
    } catch (error) {
      console.error("Reservation email error", error);
    }

    return NextResponse.json({ success: true, reservationId: reservation.id });
  } catch (error) {
    console.error("Reservation error", error);
    return NextResponse.json(
      { error: "Nu am putut salva rezervarea." },
      { status: 500 }
    );
  }
}

