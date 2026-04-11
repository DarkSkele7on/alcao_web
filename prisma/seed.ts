import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create parent categories
  const chocolate = await prisma.category.create({
    data: { name: "Chocolate", slug: "chocolate", description: "Premium chocolate products for professionals and home bakers", sortOrder: 1 },
  });
  const cocoa = await prisma.category.create({
    data: { name: "Cocoa", slug: "cocoa", description: "High-quality cocoa products from selected beans", sortOrder: 2 },
  });
  const confectionery = await prisma.category.create({
    data: { name: "Confectionery", slug: "confectionery", description: "Professional confectionery ingredients and toppings", sortOrder: 3 },
  });
  const vegan = await prisma.category.create({
    data: { name: "Vegan", slug: "vegan", description: "Plant-based chocolate alternatives", sortOrder: 4 },
  });
  const cacaonly = await prisma.category.create({
    data: { name: "Cacaonly", slug: "cacaonly", description: "100% cocoa-based products with no added sugar", sortOrder: 5 },
  });

  // Create subcategories
  const couverture = await prisma.category.create({
    data: { name: "Couverture Chocolate", slug: "couverture-chocolate", parentId: chocolate.id, sortOrder: 1 },
  });
  const drops = await prisma.category.create({
    data: { name: "Chocolate Drops", slug: "chocolate-drops", parentId: chocolate.id, sortOrder: 2 },
  });
  const coins = await prisma.category.create({
    data: { name: "Chocolate Coins", slug: "chocolate-coins", parentId: chocolate.id, sortOrder: 3 },
  });
  const chunks = await prisma.category.create({
    data: { name: "Chocolate Chunks", slug: "chocolate-chunks", parentId: chocolate.id, sortOrder: 4 },
  });
  const compound = await prisma.category.create({
    data: { name: "Compound Chocolate", slug: "compound-chocolate", parentId: chocolate.id, sortOrder: 5 },
  });
  const origin = await prisma.category.create({
    data: { name: "Origin Series", slug: "origin-series", parentId: chocolate.id, sortOrder: 6 },
  });

  const cocoaPowder = await prisma.category.create({
    data: { name: "Cocoa Powder", slug: "cocoa-powder", parentId: cocoa.id, sortOrder: 1 },
  });
  const cocoaButter = await prisma.category.create({
    data: { name: "Cocoa Butter", slug: "cocoa-butter", parentId: cocoa.id, sortOrder: 2 },
  });
  const cocoaNibs = await prisma.category.create({
    data: { name: "Cocoa Nibs", slug: "cocoa-nibs", parentId: cocoa.id, sortOrder: 3 },
  });
  const cocoaMass = await prisma.category.create({
    data: { name: "Cocoa Mass", slug: "cocoa-mass", parentId: cocoa.id, sortOrder: 4 },
  });

  const creams = await prisma.category.create({
    data: { name: "Creams & Pralines", slug: "creams-pralines", parentId: confectionery.id, sortOrder: 1 },
  });
  const krispi = await prisma.category.create({
    data: { name: "Krispi Family", slug: "krispi-family", parentId: confectionery.id, sortOrder: 2 },
  });

  // === PRODUCTS ===

  const products = [
    // --- CACAONLY ---
    { sku: "0100-PD0K-00", name: "ALT100 Cacaonly 500gr Coin Chocolate", slug: "cacaonly-500gr-coin", price: 20.67, categoryId: cacaonly.id, images: JSON.stringify(["/images/products/Cacaonly 500gr.avif"]), weight: "500g", description: "Ingredients: Cocoa liquor, cocoa butter, cocoa fruit extract (20%), cocoa powder.\n\nStorage Conditions: Store at 15-20°C, max. 70% relative humidity, in a cool and dry place, away from odor and direct light.\n\nShelf Life: Under appropriate storage conditions, the shelf life is 12 months.\n\nAllergen Information: May contain trace amounts of dairy products, soy products, hazelnuts, pistachios and almonds.", featured: true, minCocoa: "100%" },
    { name: "Cacaonly Tablet Chocolate 145gr", slug: "cacaonly-tablet-145gr", price: 10.24, categoryId: cacaonly.id, images: JSON.stringify(["/images/products/cacaonlytablet145.avif"]), weight: "145g", description: "Ingredients: Dark chocolate (cocoa liquor, cocoa butter, cocoa fruit extract, cocoa powder), cocoa fruit extract particles (5%)\n\nStorage: 15-20°C, max 70% humidity. Shelf life: 12 months.", minCocoa: "100%" },
    { name: "Cacaonly 2.5kg Chocolate Coins", slug: "cacaonly-2-5kg-coins", price: 78.70, categoryId: cacaonly.id, images: JSON.stringify(["/images/products/cacaonly2.5.avif"]), weight: "2.5kg", description: "Bulk format coin chocolate made with 100% cocoa ingredients. No added sugar. Perfect for professional confectioners.", minCocoa: "100%" },
    { name: "Cacaonly 90gr Madeleine", slug: "cacaonly-90gr-madeleine", price: 9.10, categoryId: cacaonly.id, images: JSON.stringify(["/images/products/cacaonly90madeleine.avif"]), weight: "90g", description: "Delicate madeleine made with 100% cocoa-based chocolate. A refined treat for chocolate connoisseurs.", minCocoa: "100%" },
    { name: "Cacaonly Drink Powder 400gr", slug: "cacaonly-drink-powder-400gr", price: 8.74, categoryId: cacaonly.id, images: JSON.stringify(["/images/products/cacaonlydrinkpowder.avif"]), weight: "400g", description: "Premium hot chocolate drink powder made from 100% cocoa ingredients. Rich, intense flavor.", minCocoa: "100%" },

    // --- CHOCOLATE DROPS ---
    { name: "ALT150 Dark Chocolate Drops 1Kg", slug: "alt150-dark-drops-1kg", price: 21.45, categoryId: drops.id, images: JSON.stringify(["/images/products/alt150drops.avif", "/images/products/alt150dropsfrond.avif"]), weight: "1kg", description: "Premium dark chocolate drops ideal for baking, decorating, and professional confectionery use.", featured: true, minCocoa: "50%", fatPercent: "32%" },
    { name: "ALT211 Milk Chocolate Drops 1Kg", slug: "alt211-milk-drops-1kg", price: 21.45, categoryId: drops.id, images: JSON.stringify(["/images/products/alt211milkdrops.avif"]), weight: "1kg", description: "Smooth milk chocolate drops with balanced cocoa and milk flavor. Perfect for baking.", minCocoa: "30%", fatPercent: "30%" },
    { name: "ALT182 White Chocolate Drops 1Kg", slug: "alt182-white-drops-1kg", price: 21.45, categoryId: drops.id, images: JSON.stringify(["/images/products/alt182whitedrops.avif", "/images/products/alt182whitedropsfrond.avif"]), weight: "1kg", description: "Creamy white chocolate drops made with cocoa butter and milk. Great for ganache and decorations.", fatPercent: "28%" },
    { name: "ALT131 White Chocolate Drops 250gr", slug: "alt131-white-drops-250gr", price: 6.06, categoryId: drops.id, images: JSON.stringify(["/images/products/alt131whitedrop250.avif"]), weight: "250g", description: "Convenient 250g pack of premium white chocolate drops for home baking.", fatPercent: "28%" },
    { name: "ALT161 Milk Chocolate Drops 250gr", slug: "alt161-milk-drops-250gr", price: 5.85, categoryId: drops.id, images: JSON.stringify(["/images/products/alt161milkdrop250.avif"]), weight: "250g", description: "Milk chocolate drops in a convenient home-size pack. Perfect for cookies and muffins.", minCocoa: "30%" },
    { name: "ALT317 Dark Chocolate Drops 250gr", slug: "alt317-dark-drops-250gr", price: 6.71, categoryId: drops.id, images: JSON.stringify(["/images/products/alt317darkdrops250.avif"]), weight: "250g", description: "Intense dark chocolate drops in a 250g pack. Rich flavor for premium baking.", minCocoa: "50%" },
    { name: "ALT308 Heat-Resistant Dark Chocolate Chips 1Kg", slug: "alt308-heat-resistant-chips-1kg", price: 21.45, categoryId: drops.id, images: JSON.stringify(["/images/products/alt308chips.avif", "/images/products/alt308250.avif"]), weight: "1kg", description: "Heat-resistant chocolate chips that maintain their shape during baking. Ideal for cookies and bread.", minCocoa: "45%" },
    { name: "ALT135 Double Color Chocolate Drops 250gr", slug: "alt135-double-color-drops-250gr", price: 6.50, categoryId: drops.id, images: JSON.stringify(["/images/products/alt135doubledrop250.avif"]), weight: "250g", description: "Unique dual-colored chocolate drops combining dark and white chocolate in one drop.", featured: true },

    // --- COUVERTURE CHOCOLATE ---
    { name: "ALT131 White Couverture Chocolate 200gr", slug: "alt131-white-couverture-200gr", price: 6.06, categoryId: couverture.id, images: JSON.stringify(["/images/products/alt131white250.avif"]), weight: "200g", description: "Premium white couverture chocolate for tempering, coating, and professional confectionery.", fatPercent: "28%", featured: true },
    { name: "ALT45 Dark Couverture Chocolate 200gr", slug: "alt45-dark-couverture-200gr", price: 6.06, categoryId: couverture.id, images: JSON.stringify(["/images/products/alt45darkcouverture200.avif"]), weight: "200g", description: "Rich dark couverture chocolate with deep cocoa flavor. Perfect for truffles and ganache.", minCocoa: "55%", fatPercent: "36%" },
    { name: "ALT247 Milk Couverture Chocolate 200gr", slug: "alt247-milk-couverture-200gr", price: 6.40, categoryId: couverture.id, images: JSON.stringify(["/images/products/alt247milkcouverture200.avif"]), weight: "200g", description: "Smooth milk couverture chocolate with balanced sweetness. Ideal for molding and enrobing.", minCocoa: "30%", fatPercent: "30%" },

    // --- COMPOUND CHOCOLATE ---
    { name: "ALT450 White Confectionery Couverture 2.5Kg", slug: "alt450-white-compound-2-5kg", price: 19.50, categoryId: compound.id, images: JSON.stringify(["/images/products/alt450.avif"]), weight: "2.5kg", description: "White compound chocolate coating. Easy to work with, no tempering required. Professional bulk format." },
    { name: "ALT449 Bitter Compound Couverture 2.5Kg", slug: "alt449-bitter-compound-2-5kg", price: 22.10, categoryId: compound.id, images: JSON.stringify(["/images/products/alt449.avif"]), weight: "2.5kg", description: "Dark compound chocolate for coating and dipping. Consistent results without tempering." },
    { name: "ALT448 Milk Compound Couverture 2.5Kg", slug: "alt448-milk-compound-2-5kg", price: 19.50, categoryId: compound.id, images: JSON.stringify(["/images/products/alt448.avif"]), weight: "2.5kg", description: "Milk compound chocolate coating. Smooth, easy-to-use formula for professional confectioners." },
    { name: "ALT187 Bitter Drop Compound 1Kg", slug: "alt187-bitter-compound-1kg", price: 9.54, categoryId: compound.id, images: JSON.stringify(["/images/products/alt187drop1.avif"]), weight: "1kg", description: "Dark compound chocolate in drop form for easy melting and portioning." },
    { name: "ALT188 Milky Drop Compound Chocolate 1Kg", slug: "alt188-milky-compound-1kg", price: 9.54, categoryId: compound.id, images: JSON.stringify(["/images/products/alt188drop.avif"]), weight: "1kg", description: "Milk compound chocolate drops. Convenient format for dipping and coating." },
    { name: "ALT189 White Drop Cocolin 1Kg", slug: "alt189-white-cocolin-1kg", price: 9.10, categoryId: compound.id, images: JSON.stringify(["/images/products/alt189.avif"]), weight: "1kg", description: "White compound chocolate drops for decorating and coating applications." },

    // --- VEGAN / SPECIAL SERIES ---
    { name: "ALT219 Dark Couverture Vegan Chocolate 200gr", slug: "alt219-vegan-dark-200gr", price: 7.33, categoryId: vegan.id, images: JSON.stringify(["/images/products/alt219vegan.avif"]), weight: "200g", description: "100% vegan dark couverture chocolate. No animal-derived ingredients. Rich cocoa flavor.", featured: true, minCocoa: "55%" },
    { name: "ALT533 Vegan Couverture Chocolate with Coconut Milk 200gr", slug: "alt533-vegan-coconut-200gr", price: 7.33, categoryId: vegan.id, images: JSON.stringify(["/images/products/alt533vegan.avif"]), weight: "200g", description: "Vegan couverture chocolate made with coconut milk. Creamy texture without dairy." },

    // --- KRISPI FAMILY ---
    { name: "Milk Chocolate Covered Caramel Pieces 750g", slug: "caramel-pieces-750g", price: 40.56, categoryId: krispi.id, images: JSON.stringify(["/images/products/caramelpieces.avif"]), weight: "750g", description: "Crunchy caramel pieces coated in smooth milk chocolate. Perfect for decorating desserts and pastries." },
    { name: "Milk Chocolate Covered Raspberry Pieces 750g", slug: "raspberry-pieces-750g", price: 40.56, categoryId: krispi.id, images: JSON.stringify(["/images/products/raspberry750.avif"]), weight: "750g", description: "Freeze-dried raspberry pieces coated in milk chocolate. Adds color and fruity crunch to desserts." },
    { name: "Dark Chocolate Covered Broken Espresso Beans 750gr", slug: "espresso-beans-750gr", price: 40.56, categoryId: krispi.id, images: JSON.stringify(["/images/products/espresso750.avif"]), weight: "750g", description: "Real espresso bean pieces covered in dark chocolate. Intense coffee-chocolate flavor combination.", featured: true },
    { name: "Raspberry Coated Malt Krispies 750g", slug: "raspberry-malt-krispies-750g", price: 40.56, categoryId: krispi.id, images: JSON.stringify(["/images/products/raspberymaltkrispies.avif"]), weight: "750g", description: "Crispy malt pieces with a raspberry coating. Fun texture and fruity flavor for creative confections." },
    { name: "Sugar-Free Dark Chocolate Covered Cocoa Nibs 750g", slug: "sugar-free-cocoa-nibs-750g", price: 40.56, categoryId: krispi.id, images: JSON.stringify(["/images/products/nib750.avif"]), weight: "750g", description: "Crunchy cocoa nibs coated in sugar-free dark chocolate. A healthier indulgence for conscious consumers." },
    { name: "ALT255 White Waffle Sauce Bucket 10Kg", slug: "alt255-white-waffle-sauce-10kg", price: 79.07, categoryId: krispi.id, images: JSON.stringify(["/images/products/alt25510kg.avif"]), weight: "10kg", description: "Premium white chocolate waffle sauce in a professional 10kg bucket. Ready to use." },

    // --- ORIGIN SERIES ---
    { name: "Madagascar Dark Origin Couverture Chocolate 200gr", slug: "madagascar-dark-origin-200gr", price: 8.66, categoryId: origin.id, images: JSON.stringify(["/images/products/madagascar dark origin.avif"]), weight: "200g", description: "Single-origin dark couverture from Madagascar. Fruity and citrus notes with a smooth finish.", minCocoa: "70%", featured: true },
    { name: "Ghana + Ivory White Origin Couverture Chocolate 200gr", slug: "ghana-ivory-white-origin-200gr", price: 6.58, categoryId: origin.id, images: JSON.stringify(["/images/products/ghanaivory white.avif"]), weight: "200g", description: "White couverture chocolate made with cocoa butter from Ghana and Ivory Coast origins." },
    { name: "Ecuador Dark Origin Couverture Chocolate 200gr", slug: "ecuador-dark-origin-200gr", price: 8.66, categoryId: origin.id, images: JSON.stringify(["/images/products/ecuadordarkorigin.avif"]), weight: "200g", description: "Single-origin Ecuador dark couverture with floral and earthy notes. Premium Arriba cocoa beans.", minCocoa: "70%" },
    { name: "Ghana + Ivory Dark Origin Couverture Chocolate 200gr", slug: "ghana-ivory-dark-origin-200gr", price: 6.58, categoryId: origin.id, images: JSON.stringify(["/images/products/ghanaivory dark.avif"]), weight: "200g", description: "Dark couverture chocolate from Ghana and Ivory Coast. Classic West African cocoa flavor profile.", minCocoa: "55%" },
    { name: "Ghana + Ivory Milk Origin Couverture Chocolate 200g", slug: "ghana-ivory-milk-origin-200g", price: 6.58, categoryId: origin.id, images: JSON.stringify(["/images/products/ghanaivory milk.avif"]), weight: "200g", description: "Milk couverture made with single-origin cocoa from Ghana and Ivory Coast. Creamy with cocoa depth.", minCocoa: "35%" },
    { name: "Colombian Dark Origin Couverture Chocolate 200g", slug: "colombian-dark-origin-200g", price: 8.66, categoryId: origin.id, images: JSON.stringify(["/images/products/colombiandark.avif"]), weight: "200g", description: "Premium Colombian origin dark couverture. Complex flavor with nutty and caramel undertones.", minCocoa: "65%" },
    { name: "Tanzania Dark Origin Couverture Chocolate 200gr", slug: "tanzania-dark-origin-200gr", price: 8.66, categoryId: origin.id, images: JSON.stringify(["/images/products/tanzaniadarkorigin.avif"]), weight: "200g", description: "Tanzanian origin dark couverture with distinctive fruity acidity and spicy notes.", minCocoa: "70%" },
    { name: "Venezuelan Dark Origin Couverture Chocolate 200gr", slug: "venezuelan-dark-origin-200gr", price: 8.66, categoryId: origin.id, images: JSON.stringify(["/images/products/Venezuelandark origin.avif"]), weight: "200g", description: "Venezuelan Criollo-blend dark couverture. One of the world's finest cocoa origins with complex, deep flavor.", minCocoa: "72%" },

    // --- CHOCOLATE COINS ---
    { name: "ALT16 White Coin Chocolate 500gr", slug: "alt16-white-coin-500gr", price: 21.71, categoryId: coins.id, images: JSON.stringify(["/images/products/alt16coin.avif"]), weight: "500g", description: "White chocolate coins for easy melting and portioning. Professional format." },
    { name: "ALT70 Milk Coin Chocolate 500gr", slug: "alt70-milk-coin-500gr", price: 21.71, categoryId: coins.id, images: JSON.stringify(["/images/products/alt70 coin.avif", "/images/products/alt70500.avif"]), weight: "500g", description: "Milk chocolate coins with smooth, consistent quality for professional use." },
    { name: "ALT150 Bitter Mini Coin Chocolate 2.5kg", slug: "alt150-bitter-mini-coin-2-5kg", price: 51.41, categoryId: coins.id, images: JSON.stringify(["/images/products/alt150 mini coin 2.5.avif", "/images/products/alt150 coin 2.5.avif"]), weight: "2.5kg", description: "Mini-sized dark chocolate coins in bulk format. Quick to melt and easy to portion." },
    { name: "ALT247 Milk Mini Coin Chocolate 2.5kg", slug: "alt247-milk-mini-coin-2-5kg", price: 51.41, categoryId: coins.id, images: JSON.stringify(["/images/products/alt247 milkminicoin.avif"]), weight: "2.5kg", description: "Mini milk chocolate coins in professional 2.5kg pack." },
    { name: "ALT16 White Mini Coin Chocolate 2.5kg", slug: "alt16-white-mini-coin-2-5kg", price: 51.41, categoryId: coins.id, images: JSON.stringify(["/images/products/alt16mini para.avif"]), weight: "2.5kg", description: "Mini white chocolate coins in bulk professional format." },
    { name: "ALT45 Dark Chocolate Coins 500gr", slug: "alt45-dark-coins-500gr", price: 21.71, categoryId: coins.id, images: JSON.stringify(["/images/products/alt45 500.avif"]), weight: "500g", description: "Dark chocolate coins with rich cocoa flavor. Perfect for melting and tempering.", minCocoa: "55%", featured: true },
    { name: "ALT150 Bitter Chocolate Coins 5kg", slug: "alt150-bitter-coins-5kg", price: 105.12, categoryId: coins.id, images: JSON.stringify(["/images/products/ALT150 5.avif"]), weight: "5kg", description: "Professional bulk dark chocolate coins. 5kg format for high-volume production.", minCocoa: "50%" },
    { name: "ALT247 Milk Coin Chocolate 25Kg", slug: "alt247-milk-coin-25kg", price: 495.90, categoryId: coins.id, images: JSON.stringify(["/images/products/alt247 coin 25.avif"]), weight: "25kg", description: "Industrial-size milk chocolate coins. 25kg bulk for manufacturing and large-scale production." },
    { name: "ALT131 White Coin Chocolate 25Kg", slug: "alt131-white-coin-25kg", price: 466.41, categoryId: coins.id, images: JSON.stringify(["/images/products/alt131 coin 25.avif"]), weight: "25kg", description: "Industrial-size white chocolate coins. Bulk format for production facilities." },
    { name: "ALT45 Dark Coin Chocolate 25Kg", slug: "alt45-dark-coin-25kg", price: 495.90, categoryId: coins.id, images: JSON.stringify(["/images/products/alt45 25.avif"]), weight: "25kg", description: "Industrial dark chocolate coins. 25kg bulk for large-scale manufacturing.", minCocoa: "55%" },
    { name: "ALT150 Dark Chocolate Coins 25Kg", slug: "alt150-dark-coins-25kg", price: 495.90, categoryId: coins.id, images: JSON.stringify(["/images/products/alt150 coins 25.avif"]), weight: "25kg", description: "Bulk dark chocolate coins for industrial production. Consistent quality at scale.", minCocoa: "50%" },

    // --- CREAMS AND PRALINES ---
    { name: "ALT222 Hazelnut Flavored Praline 10Kg", slug: "alt222-hazelnut-praline-10kg", price: 93.91, categoryId: creams.id, images: JSON.stringify(["/images/products/alt222.avif"]), weight: "10kg", description: "Rich hazelnut praline paste for filling chocolates, cakes and pastries. Professional 10kg bucket.", featured: true },
    { name: "Hazelnut Cream Bucket 10Kg", slug: "hazelnut-cream-bucket-10kg", price: 93.91, categoryId: creams.id, images: JSON.stringify(["/images/products/hazelnut cream bucket2.avif"]), weight: "10kg", description: "Smooth hazelnut cream spread. Perfect for pastry filling, crepes, and dessert preparation." },
    { name: "ALT379 Raspberry Waffle Cream 10Kg", slug: "alt379-raspberry-waffle-cream-10kg", price: 80.05, categoryId: creams.id, images: JSON.stringify(["/images/products/alt379.avif"]), weight: "10kg", description: "Fruity raspberry-flavored waffle cream sauce. Adds vibrant color and berry flavor." },
    { name: "ALT390 Pistachio Waffle Cream 10Kg", slug: "alt390-pistachio-waffle-cream-10kg", price: 85.31, categoryId: creams.id, images: JSON.stringify(["/images/products/alt390.avif"]), weight: "10kg", description: "Premium pistachio-flavored waffle cream sauce. Rich nutty flavor and distinctive green color." },
    { name: "ALT359 Caramel Waffle Cream 10Kg", slug: "alt359-caramel-waffle-cream-10kg", price: 82.89, categoryId: creams.id, images: JSON.stringify(["/images/products/alt359.avif"]), weight: "10kg", description: "Buttery caramel waffle cream sauce. Versatile topping for waffles, pancakes, and ice cream." },

    // --- CHOCOLATE CHUNKS ---
    { name: "ALT131 White Chocolate Chunks 4-7mm", slug: "alt131-white-chunks-4-7mm", price: 21.45, categoryId: chunks.id, images: JSON.stringify(["/images/products/alt131white250.avif"]), weight: "1kg", description: "Small white chocolate chunks (4-7mm) for mixing into doughs, ice cream, and baked goods." },
    { name: "ALT211 Milk Chocolate Chunks Glazed 4-7mm", slug: "alt211-milk-chunks-4-7mm", price: 21.45, categoryId: chunks.id, images: JSON.stringify(["/images/products/alt211 chunk4-7mm.avif"]), weight: "1kg", description: "Glazed milk chocolate chunks that resist melting. Keep their shape in baked products." },
    { name: "ALT308 Heat Stable Dark Chocolate Chunks Glazed 4-7mm", slug: "alt308-dark-chunks-4-7mm", price: 21.45, categoryId: chunks.id, images: JSON.stringify(["/images/products/alt308 4-7mm.avif"]), weight: "1kg", description: "Heat-stable dark chocolate chunks with glaze coating. Maintain structure through baking.", minCocoa: "45%" },
    { name: "ALT161 Milk Chocolate Chunks Glazed 4-7mm", slug: "alt161-milk-chunks-4-7mm", price: 21.45, categoryId: chunks.id, images: JSON.stringify(["/images/products/alt161glazedchunk.avif"]), weight: "1kg", description: "Glazed milk chocolate chunks for professional baking. Consistent size and quality." },

    // --- COCOA PRODUCTS ---
    { name: "Alkalized Cocoa Powder S9 10-12% Fat 25Kg", slug: "alkalized-cocoa-powder-s9-25kg", price: 145.00, categoryId: cocoaPowder.id, images: JSON.stringify(["/images/products/S910-12 25.avif"]), weight: "25kg", description: "Premium alkalized (Dutch-process) cocoa powder with 10-12% fat content. Deep brown color, mild flavor. Professional bulk format.", fatPercent: "10-12%" },
    { name: "Alkalized Cocoa Powder S8 10-12% Fat 25Kg", slug: "alkalized-cocoa-powder-s8-25kg", price: 145.00, categoryId: cocoaPowder.id, images: JSON.stringify(["/images/products/S8 10-12 25.avif"]), weight: "25kg", description: "Alkalized cocoa powder S8 grade with 10-12% fat. Rich color and smooth taste for industrial applications.", fatPercent: "10-12%" },
    { name: "Alkalized Cocoa Powder S2 10-12% Fat 25Kg", slug: "alkalized-cocoa-powder-s2-25kg", price: 145.00, categoryId: cocoaPowder.id, images: JSON.stringify(["/images/products/S210-12 25.avif"]), weight: "25kg", description: "Alkalized cocoa powder S2 grade with red-brown tones. 10-12% fat content for bakery and confectionery.", fatPercent: "10-12%" },
    { name: "Natural Cocoa Powder N 10-12% Fat 25Kg", slug: "natural-cocoa-powder-n-25kg", price: 130.00, categoryId: cocoaPowder.id, images: JSON.stringify(["/images/products/N10-12 25.avif"]), weight: "25kg", description: "Natural (non-alkalized) cocoa powder with light brown color and intense, authentic cocoa flavor. 10-12% fat.", fatPercent: "10-12%" },
    { name: "Cocoa Butter Natural 25Kg", slug: "cocoa-butter-natural-25kg", price: 220.00, categoryId: cocoaButter.id, images: JSON.stringify(["/images/products/nat25.avif"]), weight: "25kg", description: "Pure natural cocoa butter in bulk. Essential ingredient for chocolate production, cosmetics, and pharmaceuticals.", featured: true },
    { name: "Cocoa Butter Natural 1Kg", slug: "cocoa-butter-natural-1kg", price: 12.00, categoryId: cocoaButter.id, images: JSON.stringify(["/images/products/nat1.jpeg"]), weight: "1kg", description: "Natural cocoa butter in convenient 1kg blocks. For tempering, coating, and body care products." },
    { name: "Deodorized Cocoa Butter 25Kg", slug: "deodorized-cocoa-butter-25kg", price: 220.00, categoryId: cocoaButter.id, images: JSON.stringify(["/images/products/deo25.avif"]), weight: "25kg", description: "Deodorized cocoa butter with neutral flavor and aroma. Ideal for white chocolate and cosmetic applications." },
    { name: "Cocoa Nibs 1Kg", slug: "cocoa-nibs-1kg", price: 15.00, categoryId: cocoaNibs.id, images: JSON.stringify(["/images/products/nib1.avif"]), weight: "1kg", description: "Roasted cocoa nibs with intense chocolate flavor and satisfying crunch. Rich in antioxidants." },
    { name: "Cocoa Nibs 200g", slug: "cocoa-nibs-200g", price: 4.50, categoryId: cocoaNibs.id, images: JSON.stringify(["/images/products/nib200.avif"]), weight: "200g", description: "Roasted cocoa nibs in a home-size pack. Add crunch and chocolate flavor to smoothies, yogurt, and baking." },
    { name: "Cocoa Mass 25Kg", slug: "cocoa-mass-25kg", price: 200.00, categoryId: cocoaMass.id, images: JSON.stringify(["/images/products/natmass.avif"]), weight: "25kg", description: "Pure cocoa mass (cocoa liquor) from premium beans. The base ingredient for all chocolate production. 100% cocoa.", minCocoa: "100%" },
    { name: "Cocoa Cake/Press Cake 25Kg", slug: "cocoa-press-cake-25kg", price: 120.00, categoryId: cocoaPowder.id, images: JSON.stringify(["/images/products/ccpalk 1.avif"]), weight: "25kg", description: "Cocoa press cake - the solid material remaining after cocoa butter extraction. Used for producing cocoa powder." },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        sku: product.sku || null,
        name: product.name,
        slug: product.slug,
        price: product.price,
        categoryId: product.categoryId,
        images: product.images,
        weight: product.weight || null,
        description: product.description || null,
        featured: product.featured || false,
        minCocoa: product.minCocoa || null,
        fatPercent: product.fatPercent || null,
        inStock: true,
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
  const catCount = await prisma.category.count();
  console.log(`Seeded ${catCount} categories`);

  // === RECIPES ===
  await prisma.recipe.deleteMany();

  const recipes = [
    {
      title: "Classic Chocolate Brownie",
      slug: "classic-chocolate-brownie",
      description: "Rich, fudgy brownies made with premium dark couverture chocolate. Dense, moist, and deeply chocolatey with a crackly top and gooey center.",
      image: "/images/products/Brownie.avif",
      time: "45 min",
      difficulty: "Easy",
      ingredients: JSON.stringify([
        "200g ALT45 Dark Couverture Chocolate",
        "150g unsalted butter",
        "200g sugar",
        "3 large eggs",
        "1 tsp vanilla extract",
        "100g all-purpose flour",
        "30g ALCAO Cocoa Powder",
        "1/4 tsp salt",
        "100g ALT308 Dark Chocolate Chips (optional)"
      ]),
      steps: JSON.stringify([
        "Preheat oven to 180°C (350°F). Line a 20x20cm baking pan with parchment paper.",
        "Melt the dark couverture chocolate and butter together in a heatproof bowl over simmering water. Stir until smooth and let cool slightly.",
        "In a separate bowl, whisk together the sugar, eggs, and vanilla extract until well combined and slightly thickened.",
        "Pour the melted chocolate mixture into the egg mixture and stir until combined.",
        "Sift in the flour, cocoa powder, and salt. Fold gently until just combined — do not overmix.",
        "If using chocolate chips, fold them in now.",
        "Pour batter into the prepared pan and spread evenly.",
        "Bake for 25-30 minutes until the top is set but a toothpick inserted in the center comes out with moist crumbs.",
        "Let cool completely in the pan before cutting into squares."
      ]),
      products: JSON.stringify(["ALT45 Dark Couverture Chocolate", "Cocoa Powder", "ALT308 Dark Chocolate Chips"]),
    },
    {
      title: "Chocolate Souffle",
      slug: "chocolate-souffle",
      description: "Light and airy chocolate souffle with a molten center. An elegant dessert that rises dramatically and delivers intense chocolate flavor in every bite.",
      image: "/images/products/cikolatalisufle.avif",
      time: "30 min",
      difficulty: "Medium",
      ingredients: JSON.stringify([
        "150g ALT150 Dark Chocolate Drops",
        "50g unsalted butter",
        "3 egg yolks",
        "5 egg whites",
        "50g sugar",
        "20g ALCAO Cocoa Powder (for dusting)",
        "Butter and sugar for ramekins",
        "Pinch of salt",
        "Powdered sugar for serving"
      ]),
      steps: JSON.stringify([
        "Preheat oven to 200°C (400°F). Butter 4 ramekins generously and dust with cocoa powder, tapping out excess.",
        "Melt the dark chocolate drops and butter together in a heatproof bowl over simmering water. Stir until smooth.",
        "Remove from heat and whisk in the egg yolks one at a time until fully incorporated.",
        "In a clean bowl, whisk the egg whites with a pinch of salt until soft peaks form. Gradually add sugar while whisking until stiff, glossy peaks form.",
        "Fold one-third of the egg whites into the chocolate mixture to lighten it. Then gently fold in the remaining whites in two additions, being careful not to deflate.",
        "Divide the mixture evenly among the prepared ramekins, filling to the top. Run your thumb around the inside edge to create a small groove.",
        "Bake for 12-14 minutes until the souffles have risen well above the ramekin edges and are set on the outside but still jiggly in the center.",
        "Dust with powdered sugar and serve immediately — souffles wait for no one!"
      ]),
      products: JSON.stringify(["ALT150 Dark Chocolate Drops", "Cocoa Powder"]),
    },
    {
      title: "Protein Chocolate Milkshake",
      slug: "protein-chocolate-milkshake",
      description: "A healthy and delicious chocolate milkshake packed with protein and real cocoa flavor. Perfect as a post-workout recovery drink or a guilt-free indulgence.",
      image: "/images/products/fit milkshake.avif",
      time: "5 min",
      difficulty: "Easy",
      ingredients: JSON.stringify([
        "2 tbsp Cacaonly Drink Powder",
        "250ml cold milk (or plant-based alternative)",
        "1 frozen banana",
        "1 scoop protein powder (vanilla or chocolate)",
        "1 tbsp peanut butter or almond butter",
        "4-5 ice cubes",
        "ALCAO Cocoa Nibs for topping"
      ]),
      steps: JSON.stringify([
        "Add the cold milk, frozen banana, Cacaonly drink powder, protein powder, and nut butter to a blender.",
        "Add the ice cubes.",
        "Blend on high for 60-90 seconds until smooth and creamy.",
        "Pour into a tall glass.",
        "Top with a sprinkle of cocoa nibs for extra crunch and chocolate flavor.",
        "Serve immediately while cold and frothy."
      ]),
      products: JSON.stringify(["Cacaonly Drink Powder", "Cocoa Nibs"]),
    },
    {
      title: "Dark Chocolate Truffles",
      slug: "dark-chocolate-truffles",
      description: "Luxurious handmade chocolate truffles with a silky ganache center. Coated in cocoa powder for an elegant finish. Perfect for gifts or special occasions.",
      image: "/images/products/alt45darkcouverture200.avif",
      time: "40 min + 2hr chill",
      difficulty: "Medium",
      ingredients: JSON.stringify([
        "200g ALT45 Dark Couverture Chocolate",
        "150ml heavy cream",
        "20g unsalted butter (room temperature)",
        "1 tbsp vanilla extract",
        "ALCAO Cocoa Powder for rolling",
        "Optional: 1 tbsp espresso, rum, or orange liqueur"
      ]),
      steps: JSON.stringify([
        "Finely chop the dark couverture chocolate and place in a heatproof bowl.",
        "Heat the cream in a saucepan until it just begins to simmer (do not boil).",
        "Pour the hot cream over the chocolate. Let sit for 2 minutes, then stir gently from the center outward until smooth.",
        "Add the butter, vanilla, and any optional flavoring. Stir until fully incorporated.",
        "Cover with plastic wrap directly on the surface and refrigerate for at least 2 hours until firm.",
        "Using a melon baller or teaspoon, scoop small portions and roll quickly between your palms to form balls.",
        "Roll each truffle in cocoa powder until evenly coated.",
        "Place on a parchment-lined tray and refrigerate until ready to serve. Best enjoyed at room temperature."
      ]),
      products: JSON.stringify(["ALT45 Dark Couverture Chocolate", "Cocoa Powder"]),
    },
    {
      title: "Chocolate Lava Cake",
      slug: "chocolate-lava-cake",
      description: "Individual chocolate cakes with a warm, molten center that flows like lava when you break through the exterior. A restaurant-quality dessert made simple.",
      image: "/images/products/alt150drops.avif",
      time: "25 min",
      difficulty: "Medium",
      ingredients: JSON.stringify([
        "120g ALT150 Dark Chocolate Drops",
        "100g unsalted butter",
        "2 whole eggs",
        "2 egg yolks",
        "60g sugar",
        "30g all-purpose flour",
        "Pinch of salt",
        "Butter and cocoa powder for ramekins"
      ]),
      steps: JSON.stringify([
        "Preheat oven to 220°C (425°F). Butter 4 ramekins and dust with cocoa powder.",
        "Melt the dark chocolate drops and butter together, stirring until smooth. Let cool slightly.",
        "In a bowl, whisk whole eggs, egg yolks, and sugar until pale and thick (about 3 minutes).",
        "Fold the chocolate mixture into the egg mixture.",
        "Sift in the flour and salt, fold gently until just combined.",
        "Divide batter among ramekins (they should be about 3/4 full).",
        "Bake for exactly 12-13 minutes. The edges should be firm but the center should jiggle slightly.",
        "Let rest for 1 minute, then run a knife around the edge and invert onto plates. Serve immediately."
      ]),
      products: JSON.stringify(["ALT150 Dark Chocolate Drops"]),
    },
    {
      title: "White Chocolate Raspberry Mousse",
      slug: "white-chocolate-raspberry-mousse",
      description: "A cloud-like white chocolate mousse layered with fresh raspberries. Elegant, refreshing, and perfectly balanced between sweet and tart.",
      image: "/images/products/raspberry750.avif",
      time: "20 min + 4hr chill",
      difficulty: "Easy",
      ingredients: JSON.stringify([
        "200g ALT131 White Couverture Chocolate",
        "300ml heavy cream (cold)",
        "100g fresh raspberries",
        "2 tbsp sugar",
        "1 tsp vanilla extract",
        "Milk Chocolate Covered Raspberry Pieces for garnish"
      ]),
      steps: JSON.stringify([
        "Melt the white couverture chocolate in a heatproof bowl over simmering water. Let cool to room temperature.",
        "Whip the cold heavy cream with sugar and vanilla until soft peaks form.",
        "Gently fold one-third of the whipped cream into the melted white chocolate to temper it.",
        "Fold in the remaining whipped cream in two additions until smooth and uniform.",
        "Divide half the mousse among 4 serving glasses. Add a layer of fresh raspberries.",
        "Top with the remaining mousse and smooth the surface.",
        "Refrigerate for at least 4 hours or overnight.",
        "Before serving, garnish with chocolate-covered raspberry pieces and a few fresh raspberries."
      ]),
      products: JSON.stringify(["ALT131 White Couverture Chocolate", "Raspberry Pieces"]),
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }
  console.log(`Seeded ${recipes.length} recipes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
