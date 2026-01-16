"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { menuCategories, menuItems, type MenuItem } from "@/lib/sample-data";
import { useLanguage } from "@/lib/language-context";

const itemImages: Record<string, string> = {
  // Images from Framer (correct mappings from CSV)
  "green-salad": "https://framerusercontent.com/images/JkOECGWfiVc4WcAsro3LvKpTaU.png",
  "coconut-sorbet": "https://framerusercontent.com/images/K013Yv8f7HPTLvbz7GlKXV9oP4.png",
  "assorted-ice-cream": "https://framerusercontent.com/images/aTE9I86Sl0MAJzLwWD9FEB7NiPw.png",
  "baklava-with-ice-cream": "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png",
  "zaitoone-cake": "https://framerusercontent.com/images/kBIoKATSZsq4w0spSvYB9dZkM.png",
  "dubai-chocolate": "https://framerusercontent.com/images/uIWASkZmxFz0neAh3YMwHA5DXw.png",
  "chocolate-souffle-with-ice-cream": "https://framerusercontent.com/images/vsGXDmP4OmQQsuXa65B5tvCOT2Y.png",
  "desertul-casei": "https://framerusercontent.com/images/iPyo7UzN80hXyq2K93IKi4GjNXQ.png",
  "osmalie": "https://framerusercontent.com/images/gxFKASu6mJXvSNBVBXjFm3tP18.png",
  "kunefe-la-shish": "https://framerusercontent.com/images/QYJ0UQkrKsXWblBBY8VuJpEk.png",
  "kunefe": "https://framerusercontent.com/images/v4076ctNFNDfDFhCugSCiVopVng.png",
  "katayef-with-nuts": "https://framerusercontent.com/images/APkKL6itkCxpAcp9pOFYTiRSAcs.png",
  "katayef-with-cheese": "https://framerusercontent.com/images/rYeP9PuFvZlYovWxXAl9EyC8qPA.png",
  "kilimanjaro": "https://framerusercontent.com/images/ZNZGMii3WCHvZdZ0e3WKFnNPNZM.png",
  "fruits-salad": "https://framerusercontent.com/images/ZXVPI7yK269NjgtkmbAqYh3Y7vQ.png",
  "ashta": "https://framerusercontent.com/images/eelvySqrnoaY9g5sEJjmOKyNYI.png",
  "rice-with-chicken-almonds-and-pine-buds": "https://framerusercontent.com/images/kzqOMinsx05T6ZnVWnam4nSZA.png",
  "rice-with-meat-almonds-and-raisins": "https://framerusercontent.com/images/rdD68ZGH3ZVkkdH8RuHLpwhP6Q.png",
  "basmati-rice-with-vegetables": "https://framerusercontent.com/images/XcdfNmFQrIbaFei98vDBLZyRew.png",
  "basmati-rice-with-noodles": "https://framerusercontent.com/images/zzDwwvrvqDlRdriSlO6XDJ0Ckg.png",
  "plain-boiled-basmati-rice": "https://framerusercontent.com/images/ALBs3zQ81TIIncyFLcGkNOrGejw.png",
  "mashed-potatoes-with-truffles": "https://framerusercontent.com/images/jrkiO8mZE26LnqG2pJiHn7wWSFc.png",
  "mashed-potatoes": "https://framerusercontent.com/images/EUpizplH9rUpSrDwG5gqNCSYmMs.png",
  "fries-with-mint-and-garlic": "https://framerusercontent.com/images/LaCzpFIljOWqH5Ohq7oOi0VtE90.png",
  "french-fries": "https://framerusercontent.com/images/kDdghZ9mQN1ADT2nRMNl6tgrkzY.png",
  "thin-potato-chips": "https://framerusercontent.com/images/JnIGoeVdwK4rJKgEcBucNWVAPr8.png",
  "octopus-skewers": "https://framerusercontent.com/images/QoblSxxb6PXNS6vYIBbCrCCM.png",
  "octopus-with-curry-sauce-and-rice": "https://framerusercontent.com/images/RF1gl9DMy1YGA1NS4k6ZyGxs.png",
  "marinated-octopus": "https://framerusercontent.com/images/nTF7ynUrvwcyFpApI23u7Nb0d80.png",
  "breaded-squid-with-french-fries": "https://framerusercontent.com/images/8ySs9fxXUWYcyOniLOGofWpHtg.png",
  "grilled-baby-calamari-with-feta": "https://framerusercontent.com/images/TBi2Yn4gy4Gh0rFbcYrm1tRV13U.png",
  "squid-with-lemon-sauce": "https://framerusercontent.com/images/kQk1qsfWfnm2nCLVcyrYceQqdN8.png",
  "shawarma-with-fish": "https://framerusercontent.com/images/90rbym5BVyhsKBIKIYUyKC0gpM.png",
  "grilled-seafood-mix-with-roca-salad": "https://framerusercontent.com/images/vxgB7cavTeZis49hU9Ji4SgWw.png",
  "zaitoone-shrimp-with-pomegranate-sauce": "https://framerusercontent.com/images/Bd1gJ5mfPkI8xvGcg87VfxbL0M.png",
  "breaded-shrimp-and-fries": "https://framerusercontent.com/images/g1DjGcXJiX9w7Wr7th9O9ctygY.png",
  "shrimp-with-hot-white-sauce": "https://framerusercontent.com/images/tW8Fr5wIM0dwSRJ2XX3YHagE3pA.png",
  "sea-wolf": "https://framerusercontent.com/images/bj2LxPPIWifMkV60n7yS4GICbY.png",
  "wagyu-beef-entrecote": "https://framerusercontent.com/images/1pRUsbEFBydUZrCmQk1tJUGgBw.png",
  "assorted-grilled-vegetables": "https://framerusercontent.com/images/fAzARGsgQlhnc5lTdkizPiiOuo.png",
  "arayes-halloumi": "https://framerusercontent.com/images/DTkgSlG4gMJgN7TgPq3iMpyYDI.png",
  "arayes-chicken-and-cheese": "https://framerusercontent.com/images/16fOFeXus3VWCiuLbB6XD8a6h9o.png",
  "arayes-kafta-special": "https://framerusercontent.com/images/w7MuQQG6UL4B4CKwU3Pbbq3lUs.png",
  "arayes-kafta": "https://framerusercontent.com/images/dGF3cGMC5MJAxFn2ML9AAAznlb0.png",
  "arayes-cheese": "https://framerusercontent.com/images/YPZwJOHGSsTAXGKxmgoYaGeuvc.png",
  "mixed-grill": "https://framerusercontent.com/images/upkDONhpHXbWaIu7d75TDsqWXE.png",
  "grilled-lamb-pastrami": "https://framerusercontent.com/images/z5vP715UOyuhUX634C9X6nhiB4.png",
  "lamb-chop": "https://framerusercontent.com/images/ZdYTc75hF6hvN3RNih2V6FRXpSk.png",
  "ram-skewers": "https://framerusercontent.com/images/dsAbwdz4G8mUZsg8u1HyDmsx2M.png",
  "beef-skewers": "https://framerusercontent.com/images/0j35xVxAB9QAJnFHG5ZG6ZPAaUY.png",
  "chicken-cutlets": "https://framerusercontent.com/images/U759j5nIoKnr0npuQBTXUVaUjeM.png",
  "chicken-skewers": "https://framerusercontent.com/images/tXkZb8FG9ARzmxsXWPebANX641s.png",
  "chicken-breast": "https://framerusercontent.com/images/Fyh24ueEqB1ZIr7tstnjkPZ0fc.png",
  "chicken-wings": "https://framerusercontent.com/images/3u2oyqgmW7S2nQ3dGsTHbuDrgbc.png",
  "kebab-orfali": "https://framerusercontent.com/images/cp1QwgSRIqirXQhOlDDenJoF44.png",
  "olive-kebab": "https://framerusercontent.com/images/uNzhQN4etiPhsbvgB9QrbiXVRO0.png",
  "kebab-with-lard": "https://framerusercontent.com/images/tE3pGdva5zH7pmZgepobf7TIa8.png",
  "kebab": "https://framerusercontent.com/images/wQ1G4Jusk1bVIbR3LfZA9W7O2E.png",
  "adana-kebab": "https://framerusercontent.com/images/QvomUuXnc85lVwjkHPvYSmwn0.png",
  "basturma": "https://framerusercontent.com/images/nCNDbH2ytrb9uLe4ynwrQmPSOI.png",
  "frake": "https://framerusercontent.com/images/Yq9AELIXq2eeAkbNSPbkWMj6iY.png",
  "lipie-zaitoone": "https://framerusercontent.com/images/HozzGgsqQ0fzsWDV3cvwibReAmI.png",
  "sfiha-(6-pieces)": "https://framerusercontent.com/images/4o84DIFGjyy1o4ASNI2I98SkvXo.png",
  "lahm-be-ajiin": "https://framerusercontent.com/images/yKicL2kikusRM1V8kog0jMiM4.png",
  "manakish-jibneh": "https://framerusercontent.com/images/YbOXn0UUEE5BwOF8EBrNhvrs.png",
  "manakish-zaatar": "https://framerusercontent.com/images/SxLJHXrc9wI9DcOhg3ggAz75gM.png",
  "fatteh-with-spicy-potatoes": "https://framerusercontent.com/images/mdUxcVsVZ84fadBPCcs1yVg4.png",
  "eggplant-fatteh": "https://framerusercontent.com/images/y7jz9eHrXtYnFzXR5B5ZuqE2sY.png",
  "shrimp-fatteh": "https://framerusercontent.com/images/s96oANTllBrItDW3Eh5tvJQTTw.png",
  "fatteh-with-chicken-and-rice": "https://framerusercontent.com/images/wl8DAqFCWpbDAgTgcIuuKpSrA.png",
  "fatteh-with-spinach-rice-and-beef": "https://framerusercontent.com/images/dnOltoinTHH7UR22CpXYQ5pF44s.png",
  "fatteh-humous-with-meat-and-pine-buds": "https://framerusercontent.com/images/UjSgEJKQRKFye8Ne5Vba4JJ4Eg.png",
  "simple-fatteh": "https://framerusercontent.com/images/jPIP3N7bFNurTszgKhExArSp89Y.png",
  "crispy-olive-chicken": "https://framerusercontent.com/images/T62H7EipkotWLkePFfdGntrzL0.png",
  "chicken-ras-asfour": "https://framerusercontent.com/images/2snvTdlSfsIkSmJZdTzxWehGGQ.png",
  "ras-asfour-vita-zaitoone": "https://framerusercontent.com/images/eLiFZLp0RLhDh3NiqBbcxPZi0U4.png",
  "beef-ras-asfour": "https://framerusercontent.com/images/lwIyPOD04tAZcVEqbqSC8v9EyRU.png",
  "aries-ras-asfour-(hot)": "https://framerusercontent.com/images/myd6WLspFjssEJPsB4Hm6WFkvFk.png",
  "beef-sharhat-by-zaitoone": "https://framerusercontent.com/images/DhPQk80W2jgFA8xlFRmy3lsRco.png",
  "sharhat-de-vita": "https://framerusercontent.com/images/Pe2FQcAl7PuqvJ8I4GtWGf7qw.png",
  "zaitoone-chicken-sharhat": "https://framerusercontent.com/images/hNisHnENiry8TGkcMO2x4FEA3vw.png",
  "chicken-sharhat": "https://framerusercontent.com/images/1FUc6gym5UreyXt1DzrJ0Kp0LU.png",
  "beef-shawarma": "https://framerusercontent.com/images/9wHbKYDkXhVshqL638OVzkGL5i4.png",
  "chicken-shawarma": "https://framerusercontent.com/images/6yEF8AgARNK3TNiow6nXFTpzO5c.png",
  "chicken-liver": "https://framerusercontent.com/images/uyYtPs5PJij7EAPGGuNBBCzK8nc.png",
  "sujuk": "https://framerusercontent.com/images/9wKp5jilWNnU7VuPAnfhYXzS5B4.png",
  "makanek": "https://framerusercontent.com/images/bUGAal1BFiMQLQT8IwMWdwM0.png",
  "falafel": "https://framerusercontent.com/images/um8WPEW3IJgQ6weNmAI8LkTJTTU.png",
  "tongue": "https://framerusercontent.com/images/j6rxaYxWG7XEHAUUsAs5CTQaw0.png",
  "aries-brain-(wedge)": "https://framerusercontent.com/images/buf7RoVVDXRz5Ys0hdXBgXysRZM.png",
  "aries-brain": "https://framerusercontent.com/images/fUKnTmtF35YR9hUaW6SVgk8QSMI.png",
  "batata-harra-sweet-potato-hot-potatoes": "https://framerusercontent.com/images/cBujuzrfRcHgGOQVA3EJFkFjF2g.png",
  "halloumi-with-almonds": "https://framerusercontent.com/images/jYYZy1jVbKDxehmVQlvfKrl8.png",
  "halloumi-cheese": "https://framerusercontent.com/images/wnTCmN3I9RFWh7KoQicsXWKuw.png",
  "fried-kebbe-(5-pcs)": "https://framerusercontent.com/images/PLNr9NstCeFPq4zPMCfeYnu4Q.png",
  "spicy-chicken-rolls-(3-pcs)": "https://framerusercontent.com/images/qDkPnNWLtozWB8I5LMTH7ODYXo.png",
  "shrimp-rolls-(3-pcs)": "https://framerusercontent.com/images/ZbtthhHjLFIJR6LkUK9QOsNiL8.png",
  "cheese-rolls-(4-pcs)": "https://framerusercontent.com/images/avSHJG3vsJAr23yCocIsGezOM8w.png",
  "sambusek-with-sujuk-(5-pcs)": "https://framerusercontent.com/images/sm9LLI15E4sXomh0kCUjwyClE.png",
  "assorted-pickles": "https://framerusercontent.com/images/IDlutDuzzwOhakovvYMtuT4odH8.png",
  "telemea": "https://framerusercontent.com/images/bQyLEvZ3nFbvmKYgzLjFDSDNU.png",
  "makdous": "https://framerusercontent.com/images/J8dzTdmmwFlYDQBmluGHicbOtVg.png",
  "muhammara": "https://framerusercontent.com/images/dWpOwWy71pc7sIVjImEt6lqjAZ0.png",
  "okra": "https://framerusercontent.com/images/PbIvOPYAbDxy3L9pZkA4EKlhC7o.png",
  "moussaka": "https://framerusercontent.com/images/YMEQsQIgactbUu8wo1yACboFfWA.png",
  "green-beans": "https://framerusercontent.com/images/R9EZ7YgJguyFbPzkUfQxGkQOCXo.png",
  "lenten-sarmale": "https://framerusercontent.com/images/vRde9uCTHwYUeu5XoqW3oIcgxNs.png",
  "shanklish": "https://framerusercontent.com/images/ro5jB64L2GmoC9nPT7l9KXKLQU.png",
  "labneh-zaitoone": "https://framerusercontent.com/images/VY4W3PR0o78GTQk6YMeuJwRtl1Y.png",
  "labneh-with-garlic-and-mint": "https://framerusercontent.com/images/RVlbDXsn7OOVQ2FUYZKh6cM0IA.png",
  "labneh": "https://framerusercontent.com/images/qwYbp7MXbf2h4pXHoQuyCvte66U.png",
  "baba-ganoush": "https://framerusercontent.com/images/tvGaal8qmReWLV8sr7X7RbGP9G0.png",
  "foul-mudamas": "https://framerusercontent.com/images/F2t5sdNwdyE8t5HLpV8h7cDI.png",
  "balilla": "https://framerusercontent.com/images/ffRFzDNQ6mb9NXDFxRMkmrQmc.png",
  "mudardara": "https://framerusercontent.com/images/ICxdUIVs7BYCflVU3x2fJuDpMs.png",
  "moutabal-with-truffles": "https://framerusercontent.com/images/pNTJFhvGNDH0boLC5kTIp4Vcg4.png",
  "moutabal": "https://framerusercontent.com/images/Kper7WuTS0yahKhtTekJJLIujo.png",
  "hummus-with-shawarma": "https://framerusercontent.com/images/7XrlZ5sKMf0PaJla12PaIhyVI.png",
  "hummus-with-extra-truffles": "https://framerusercontent.com/images/HVmjGvwmIwQ79kijTbYDXlmOVE.png",
  "hummus-with-truffles": "https://framerusercontent.com/images/4QDJNTsHu6J18fmmrcY9XJLEmk.png",
  "pesto-hummus": "https://framerusercontent.com/images/vpwmbeu6BXxdqTf1lLYAgCvmKDI.png",
  "special-salad-(spicy)": "https://framerusercontent.com/images/apDS5sg6cLg4JIR0bnjRjMSEY.png",
  "coleslaw-salad": "https://framerusercontent.com/images/SwkBJmgjltF1WsWmS9fSdrp6N0.png",
  "panache-salad-with-sauce": "https://framerusercontent.com/images/ovvO9WK8OoRmbbRrOp03M5fx7No.png",
  "fresh-vegetable-platter": "https://framerusercontent.com/images/AjZzJOvqezYLG4bN5ETsvTbMRGM.png",
  "olive-salad-2": "https://framerusercontent.com/images/GyPAKq6IqJQ0bZNGGST4BrlBpk.png",
  "olive-salad": "https://framerusercontent.com/images/X2HteAWoo7CgPgUH4G3PVsg0GM.png",
  "grand-cru-elegance": "https://framerusercontent.com/images/2EYBtQQ2Ain3xf1NKdL1izWe8.png",
  "citrus-burst-refresher": "https://framerusercontent.com/images/OULXyvtXjebvk2vj9Ry4LgbsSX8.png",
  "midnight-velvet-martini": "https://framerusercontent.com/images/mCzfE9Nry8XAhCgngTNW1hOpvE.png",
  "sparkling-elixir-royale": "https://framerusercontent.com/images/IMPSeW7zIvoP2sF3vW7FTNeRuE.png",
  "passion-soufflé-étoile": "https://framerusercontent.com/images/6qEIe3NTdK96va3qYM7Izckol6s.png",
  "lemon-tart-lumière": "https://framerusercontent.com/images/3CBZbRuQR478j9IB04Hzf7TJilc.png",
  "pistachio-bliss-parfait": "https://framerusercontent.com/images/6l9oIhlBP20uF8Dsv2l0BlfzKgA.png",
  "chocolate-decadence-noir": "https://framerusercontent.com/images/WMnzJ2xAQSHtACtSd0WlzpbkqM.png",
  "osso-buco-ambrosia": "https://framerusercontent.com/images/GotJDkCrzFitNkNQbTYHJ1tM.png",
  "lobster-ravioli-divine": "https://framerusercontent.com/images/AlNaMC7ICFluEBHHjoo7OBsOEIw.png",
  "burrata-cloud-caprese": "https://framerusercontent.com/images/h5AeYNW0YQJekwqbc8f14KUIU.png",
  "truffle-tagliatelle-dream": "https://framerusercontent.com/images/DCPw40dBcimvWIQT5eSX9UHbHKc.png",
  "wagyu-tataki-umami": "https://framerusercontent.com/images/8L6a21E4ZiTknM4moxKMb2ovrA.png",
  "truffle-edamame-silk": "https://framerusercontent.com/images/JkGbEhkwXQhwZcIndXTasAufw0.png",
  "king-crab-delight": "https://framerusercontent.com/images/g6AnhScxNrRnGcK2tfLrtkTsDI.png",
  "toro-sashimi-azure": "https://framerusercontent.com/images/zUa5czPnfuuRk2nEQMc98cE79Y.png",
  "saffron-biryani-royale": "https://framerusercontent.com/images/k1PhSfxjj0LNZOAJyRr7QxPhtQM.png",
  "tandoori-prawn-éclat": "https://framerusercontent.com/images/rmXYiSBHvNQatDBs86X6ZJA2ho.png",
  "black-truffle-dal": "https://framerusercontent.com/images/pO6TLi4F9PVHMToGv18t9V4GFlo.png",
  "malai-kofta-velvet": "https://framerusercontent.com/images/1alI4QOIvjToe1259tXSqoPE10.png",
  "foie-gras-kiss": "https://framerusercontent.com/images/3jM8mZgRlIMrAt55dsKqjyqXw.png",
  "caviar-pearls": "https://framerusercontent.com/images/jMcNkH6Q52OxC0j6nf4e6Ovuzwc.png",
  "lobster-whisper": "https://framerusercontent.com/images/bHeryJnDuLQMzlNKlClRNywCOwU.png",
  "scallop-jewel": "https://framerusercontent.com/images/FRvC5K47GtFAcejQ3kvwF3YltE.png",
  "wild-sea-wolf": "https://framerusercontent.com/images/bj2LxPPIWifMkV60n7yS4GICbY.png",
  "baclava": "https://framerusercontent.com/images/o4E3exu1tDK3IzcTqZ8dvdXBhb4.png",
};

const defaultImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

function getImageUrl(itemId: string): string {
  return itemImages[itemId] || defaultImage;
}


// Smooth scroll to element
function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function MenuCard({ item, onClick, language }: { item: MenuItem; onClick: () => void; language: "ro" | "en" }) {
  const itemName = typeof item.name === 'object' ? item.name[language] : item.name;
  const itemDescription = typeof item.description === 'object' ? item.description[language] : item.description;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        }
      }}
      viewport={{ once: true, margin: "-30px" }}
      onClick={onClick}
      className="relative overflow-hidden rounded-sm cursor-pointer group luxury-card"
      whileHover={{ 
        y: -6, 
        scale: 1.01,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Corner accents on hover */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-accent-gold/0 
                    group-hover:border-accent-gold/40 transition-all duration-500 z-10 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-accent-gold/0 
                    group-hover:border-accent-gold/40 transition-all duration-500 z-10 pointer-events-none" />
      
      <div className="flex flex-row" style={{ height: '200px' }}>
        {/* Image Container - Left Side */}
        <div 
          className="relative overflow-hidden"
          style={{ 
            width: '40%',
            borderRadius: '2px 0 0 2px',
          }}
        >
          <img
            src={getImageUrl(item.id)}
            alt={itemName}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImage;
            }}
          />
          
          {/* Gold overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 to-accent-gold/10 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Gradient overlay transitioning from image to dark background */}
          <div 
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: '120px',
              background: 'linear-gradient(to right, transparent 0%, rgba(26, 26, 26, 0.8) 60%, #1a1a1a 100%)',
            }}
          />
          
          {/* Badge overlay */}
          {(item.isSignature || item.isPopular) && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1.5 text-[10px] font-forum uppercase tracking-[0.15em] 
                             bg-black/70 backdrop-blur-sm border border-accent-gold/40 text-accent-gold rounded-sm">
                {item.isSignature ? (language === "ro" ? "Semnătură" : "Signature") : "Popular"}
              </span>
            </div>
          )}
        </div>
        
        {/* Content - Right Side */}
        <div 
          className="flex-1 flex flex-col justify-between"
          style={{ 
            padding: '20px 24px',
            backgroundColor: 'transparent',
          }}
        >
          {/* Top: Title and Price */}
          <div>
            {/* Dish Name */}
            <h3 className="font-forum text-xl md:text-[22px] text-white group-hover:text-accent-gold 
                         transition-colors duration-300 mb-2 leading-tight">
              {itemName}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-white/50 font-forum leading-relaxed line-clamp-2">
              {itemDescription}
            </p>
          </div>
          
          {/* Bottom: Price with elegant styling */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="w-8 h-px bg-gradient-to-r from-accent-gold/40 to-transparent" />
            <span className="px-4 py-1.5 text-base font-forum text-accent-gold bg-accent-gold/5 
                           border border-accent-gold/20 rounded-sm group-hover:bg-accent-gold/10 
                           group-hover:border-accent-gold/40 transition-all duration-300">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const { language } = useLanguage();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  
  // Wait for client-side mount for portal and calculate header height
  useEffect(() => {
    setMounted(true);
    
    // Calculate actual header height with a small delay to ensure DOM is ready
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setHeaderHeight(height);
        console.log('Header height:', height); // Debug log
      } else {
        // Fallback: try again after a short delay
        setTimeout(() => {
          const headerRetry = document.querySelector('header');
          if (headerRetry) {
            const height = headerRetry.offsetHeight;
            setHeaderHeight(height);
            console.log('Header height (retry):', height); // Debug log
          }
        }, 100);
      }
    };
    
    // Try immediately and also after a short delay
    calculateHeaderHeight();
    setTimeout(calculateHeaderHeight, 50);
    
    // Also recalculate on window resize
    window.addEventListener('resize', calculateHeaderHeight);
    return () => window.removeEventListener('resize', calculateHeaderHeight);
  }, []);
  
  // Filter categories that have items and sort by order
  const categories = [...menuCategories]
    .sort((a, b) => a.order - b.order)
    .filter(cat => menuItems.some(item => item.categorySlug === cat.slug));

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Elegant Header */}
      <div className="relative px-6 py-16 md:py-20 lg:px-10 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-gold/5 blur-[120px] pointer-events-none" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold/60" />
              <span className="text-xs font-forum uppercase tracking-[0.35em] text-accent-gold">
                {language === "ro" ? "Descoperă gusturile Libanului" : "Discover the tastes of Lebanon"}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-gold/60" />
            </div>
            
            {/* Title */}
            <h1 className="font-forum text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-center text-shadow-elegant">
              {language === "ro" ? "MENIU ZAITOONE" : "ZAITOONE MENU"}
            </h1>
            
            {/* Decorative ornament */}
            <div className="flex items-center gap-4 mt-2">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-accent-gold/50"
                fill="currentColor"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-accent-gold/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      

      {/* Menu Sections - Add padding top to account for fixed navigation */}
      <div 
        className="mx-auto max-w-7xl px-6 py-12 lg:px-10" 
        style={{ paddingTop: '120px' }}
      >
        {categories.map((category) => {
          const items = menuItems.filter(
            (item) => item.categorySlug === category.slug
          );

          if (items.length === 0) return null;

          const categoryName = typeof category.name === 'object' ? category.name[language] : category.name;
          const categoryDescription = category.description ? (typeof category.description === 'object' ? category.description[language] : category.description) : undefined;
          
          return (
            <section
              key={category.slug}
              id={category.slug}
              className="mb-20 scroll-mt-32 relative"
            >
              {/* Section Header - Elegant styling */}
              <motion.div 
                className="mb-10 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-accent-gold/20 pointer-events-none" />
                
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pb-6 
                              border-b border-gradient-to-r from-accent-gold/30 via-white/10 to-transparent">
                  <div className="space-y-3">
                    {/* Decorative line */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-accent-gold/60" />
                      <span className="text-[10px] font-forum uppercase tracking-[0.3em] text-accent-gold/60">
                        {items.length} {language === "ro" ? "preparate" : "dishes"}
                      </span>
                    </div>
                    
                    <h2 className="font-forum text-3xl md:text-4xl text-white text-shadow-elegant">
                      {categoryName}
                    </h2>
                    
                    {categoryDescription && (
                      <p className="font-forum text-white/50 max-w-xl">{categoryDescription}</p>
                    )}
                  </div>
                  
                  {/* Decorative ornament */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold/30" />
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-4 h-4 text-accent-gold/30"
                      fill="currentColor"
                    >
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent-gold/30 via-white/10 to-transparent" />
              </motion.div>

              {/* Cards Grid - Each card animates individually on scroll */}
              <div className="grid gap-5 md:grid-cols-2">
                {items.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    language={language}
                    onClick={() => setSelectedDish(item)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky Category Navigation - Rendered via Portal with elegant styling */}
      {mounted && createPortal(
        <div 
          className="fixed left-0 right-0 z-[35] backdrop-blur-xl"
          style={{
            top: '64px',
            background: 'linear-gradient(to bottom, rgba(17, 17, 17, 0.95), rgba(17, 17, 17, 0.9))',
            borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((cat) => {
                const catName = typeof cat.name === 'object' ? cat.name[language] : cat.name;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => smoothScrollTo(cat.slug)}
                    className="group relative font-forum whitespace-nowrap rounded-sm px-5 py-2.5 text-sm 
                             text-white/70 transition-all duration-300
                             border border-white/10 hover:border-accent-gold/40 
                             hover:text-accent-gold hover:bg-accent-gold/5
                             hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                  >
                    {catName}
                    {/* Decorative underline on hover */}
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px 
                                   bg-accent-gold/50 group-hover:w-[60%] transition-all duration-300" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal - Optimized for performance */}
      {mounted && createPortal(
        <AnimatePresence mode="wait">
          {selectedDish && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center p-4 bg-black/95"
              style={{ zIndex: 999999 }}
              onClick={() => setSelectedDish(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-sm bg-[#1a1a1a] border border-accent-gold/20"
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent-gold/30 pointer-events-none z-20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent-gold/30 pointer-events-none z-20" />
                
                {/* Close button - simplified */}
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-sm 
                           bg-black/80 text-white border border-white/20
                           hover:bg-accent-gold/20 hover:border-accent-gold/50 hover:text-accent-gold 
                           transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image - optimized */}
                <div className="relative h-[350px] md:h-[400px]">
                  <img
                    src={getImageUrl(selectedDish.id)}
                    alt={typeof selectedDish.name === 'object' ? selectedDish.name[language] : selectedDish.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                  
                  {/* Simple gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                  
                  {/* Badges */}
                  {(selectedDish.isSignature || selectedDish.isPopular) && (
                    <div className="absolute top-16 left-4 flex flex-col gap-2">
                      {selectedDish.isSignature && (
                        <span className="px-3 py-1.5 text-xs font-forum uppercase tracking-[0.15em] 
                                       bg-black/80 border border-accent-gold/50 text-accent-gold rounded-sm">
                          {language === "ro" ? "Semnătură" : "Signature"}
                        </span>
                      )}
                      {selectedDish.isPopular && (
                        <span className="px-3 py-1.5 text-xs font-forum uppercase tracking-[0.15em] 
                                       bg-black/80 border border-accent-gold/50 text-accent-gold rounded-sm">
                          Popular
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Decorative line */}
                  <div className="w-10 h-px bg-accent-gold/50 mb-4" />
                  
                  {/* Title and Price */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="font-forum text-2xl md:text-3xl text-white leading-tight flex-1">
                      {typeof selectedDish.name === 'object' ? selectedDish.name[language] : selectedDish.name}
                    </h2>
                    <span className="px-4 py-2 text-lg font-forum text-accent-gold 
                                   bg-accent-gold/10 border border-accent-gold/30 rounded-sm whitespace-nowrap">
                      {formatPrice(selectedDish.price)}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="font-forum text-white/60 text-base leading-relaxed mb-6">
                    {typeof selectedDish.description === 'object' ? selectedDish.description[language] : selectedDish.description}
                  </p>
                  
                  {/* Bottom ornament */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-gold/20 to-transparent" />
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-gold/30" fill="currentColor">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <div className="h-px flex-1 bg-gradient-to-l from-accent-gold/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
