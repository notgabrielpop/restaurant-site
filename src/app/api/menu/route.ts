import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { menuCategories, menuItems } from "@/lib/sample-data";

export async function GET() {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: { order: "asc" },
      include: { items: true },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    console.warn("Falling back to sample menu data", error);
    const categories = menuCategories.map((cat) => ({
      ...cat,
      items: menuItems.filter((item) => item.categorySlug === cat.slug),
    }));
    return NextResponse.json({ categories });
  }
}

