import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { menuCategories, menuItems } from "@/lib/sample-data";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params;
  try {
    const category = await prisma.menuCategory.findUnique({
      where: { slug },
      include: { items: true },
    });
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch (error) {
    const fallback = menuCategories.find((c) => c.slug === slug);
    if (!fallback)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      category: {
        ...fallback,
        items: menuItems.filter((item) => item.categorySlug === slug),
      },
    });
  }
}

