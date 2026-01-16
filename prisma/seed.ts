import { PrismaClient } from "@prisma/client";
import {
  menuCategories,
  menuItems,
  testimonials,
} from "../src/lib/sample-data";

const prisma = new PrismaClient();

// Helper to extract string from multilingual object
function getString(value: string | { ro: string; en: string } | undefined): string {
  if (!value) return '';
  return typeof value === 'object' ? value.ro : value;
}

async function main() {
  await prisma.menuItem.deleteMany({});
  await prisma.menuCategory.deleteMany({});
  await prisma.testimonial.deleteMany({});

  for (const category of menuCategories) {
    await prisma.menuCategory.create({
      data: {
        slug: category.slug,
        name: getString(category.name),
        description: getString(category.description),
        order: category.order,
      },
    });
  }

  for (const item of menuItems) {
    const category = await prisma.menuCategory.findUnique({
      where: { slug: item.categorySlug },
    });
    if (!category) continue;
    await prisma.menuItem.create({
      data: {
        name: getString(item.name),
        description: getString(item.description),
        price: item.price,
        isSignature: item.isSignature ?? false,
        isPopular: item.isPopular ?? false,
        categoryId: category.id,
      },
    });
  }

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: {
        name: testimonial.name,
        role: getString(testimonial.role),
        quote: getString(testimonial.quote),
        rating: testimonial.rating,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

