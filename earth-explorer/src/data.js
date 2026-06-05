// Terra Explorer - curated destination registry and local AI fallback data.

export const environmentPresets = {
    warm_golden: {
        label: "Warm Golden",
        color: "#ffb347",
        accentColor: "#f15a24",
        atmosphere: "Dusty ochre haze, late-afternoon marble glow",
        particleLabel: "golden motes",
    },
    european_soft: {
        label: "European Soft",
        color: "#fff4e8",
        accentColor: "#4f9cff",
        atmosphere: "Pale blue clarity with creamy highlights",
        particleLabel: "fine city dust",
    },
    desert_ancient: {
        label: "Desert Ancient",
        color: "#fff0c0",
        accentColor: "#ffc300",
        atmosphere: "Sand haze, high sun, bleached stone",
        particleLabel: "sand drift",
    },
    sakura_mist: {
        label: "Sakura Mist",
        color: "#f0f4ff",
        accentColor: "#ff9fcb",
        atmosphere: "Lavender-white mist and soft overcast light",
        particleLabel: "petal drift",
    },
    alpine_serene: {
        label: "Alpine Serene",
        color: "#d7ecff",
        accentColor: "#72c8ff",
        atmosphere: "Cold blue ambient light over high snow",
        particleLabel: "fine snow",
    },
    tropical_lush: {
        label: "Tropical Lush",
        color: "#b7f7a1",
        accentColor: "#39d98a",
        atmosphere: "Blue-green humidity rising from canopy",
        particleLabel: "humid mist",
    },
    mediterranean_sunset: {
        label: "Mediterranean Sunset",
        color: "#ffd2a0",
        accentColor: "#e0533c",
        atmosphere: "Ochre shadows, warm terracotta roofs and lavender dusk sky",
        particleLabel: "sunlight dust",
    },
};

export const destinationsData = {
    india: {
        name: "India",
        fullName: "Republic of India",
        type: "Country",
        lat: 20.5937,
        lon: 78.9629,
        landmarkName: "Taj Mahal",
        landmarkLat: 27.1751,
        landmarkLon: 78.0421,
        environment: "warm_golden",
        color: "#ffb347",
        accentColor: "#f15a24",
        mediaUrl: "/images/taj_mahal_cyber.png",
        aliases: ["taj mahal", "agra", "bharat"],
        journey: ["Orbital lock", "Subcontinent alignment", "Monsoon cloud descent", "Agra arrival"],
        monuments: [
            { id: "taj-mahal", name: "Taj Mahal", city: "Agra", coordinates: [27.1751, 78.0421], altitude: 171, approachAltitude: 120, bearing: 92, tags: ["UNESCO", "Mughal"], description: "The Taj Mahal was commissioned in 1631 by Shah Jahan for Mumtaz Mahal, and its white Makrana marble changes character with the sun. Standing before it, its absolute symmetry feels less like geometry and more like stillness made visible." },
            { id: "red-fort", name: "Red Fort", city: "Delhi", coordinates: [28.6562, 77.2410], altitude: 220, approachAltitude: 160, bearing: 128, tags: ["UNESCO", "Fortress"], description: "The Red Fort stands as a massive fortress of red sandstone. Built in 1648 by Emperor Shah Jahan when he shifted the Mughal capital from Agra to Delhi, its soaring battlements and grand halls represent the peak of Mughal architecture." },
            { id: "qutub-minar", name: "Qutub Minar", city: "Delhi", coordinates: [28.5245, 77.1855], altitude: 230, approachAltitude: 90, bearing: 40, tags: ["UNESCO", "Minaret"], description: "Qutub Minar is a towering 73-meter minaret of red sandstone and marble. Commenced in 1192 by Qutb-ud-din Aibak, its five distinct tapering stories are carved with intricate geometric patterns and sacred inscriptions." },
            { id: "hawa-mahal", name: "Hawa Mahal", city: "Jaipur", coordinates: [26.9239, 75.8267], altitude: 431, approachAltitude: 100, bearing: 270, tags: ["Rajput", "Palace"], description: "Hawa Mahal, the Palace of Winds, features a spectacular pink sandstone facade with 953 small windows. Built in 1799, it allowed royal women to observe city life unseen." },
            { id: "hampi", name: "Hampi Ruins", city: "Karnataka", coordinates: [15.3350, 76.4600], altitude: 467, approachAltitude: 180, bearing: 110, tags: ["UNESCO", "Temple City"], description: "Hampi Ruins represent the magnificent capital of the medieval Vijayanagara Empire. Carved stone chariots and massive granite temples lie scattered across a dramatic boulder-strewn landscape." },
        ],
        narratives: [
            {
                title: "India",
                body: "The descent opens over a subcontinent of mountain shadow, river light, and cities packed with more than a billion human stories. The camera settles toward Agra, where white marble catches the warm dust of the Yamuna plain.",
                fact: { title: "Scale", text: "India stretches from the Himalayas to the Indian Ocean across roughly 3.29 million square kilometers." },
            },
        ],
    },
    france: {
        name: "France",
        fullName: "French Republic",
        type: "Country",
        lat: 46.2276,
        lon: 2.2137,
        landmarkName: "Eiffel Tower",
        landmarkLat: 48.8584,
        landmarkLon: 2.2945,
        environment: "european_soft",
        color: "#fff4e8",
        accentColor: "#4f9cff",
        mediaUrl: "/images/eiffel_tower_cyber.png",
        aliases: ["paris", "eiffel tower", "louvre", "versailles"],
        journey: ["Orbital lock", "Western Europe alignment", "Seine descent", "Paris arrival"],
        monuments: [
            { id: "eiffel-tower", name: "Eiffel Tower", city: "Paris", coordinates: [48.8584, 2.2945], altitude: 35, approachAltitude: 180, bearing: 135, tags: ["Landmark", "Ironwork"], description: "The Eiffel Tower rises from iron latticework with a delicacy that contradicts its mass. Built for the 1889 World's Fair, it turned industrial engineering into a defining skyline." },
            { id: "louvre", name: "Louvre Museum", city: "Paris", coordinates: [48.8606, 2.3376], altitude: 35, approachAltitude: 120, bearing: 70, tags: ["Museum", "Palace"], description: "The Louvre is the world's largest art museum, housed in a former royal palace. Its glass pyramid contrasts with the historic limestone wings." },
            { id: "arc-triomphe", name: "Arc de Triomphe", city: "Paris", coordinates: [48.8738, 2.2950], altitude: 48, approachAltitude: 90, bearing: 250, tags: ["Monument"], description: "The Arc de Triomphe stands at the center of the Place Charles de Gaulle, honoring those who fought and died for France in the Napoleonic Wars." },
            { id: "mont-saint-michel", name: "Mont-Saint-Michel", city: "Normandy", coordinates: [48.6361, -1.5115], altitude: 80, approachAltitude: 220, bearing: 118, tags: ["UNESCO", "Abbey"], description: "Mont-Saint-Michel is a tidal island and abbey in Normandy, hovering between water and sky." },
        ],
        narratives: [
            {
                title: "France",
                body: "France resolves beneath the clouds as fields, river bends, and old stone towns begin to show their pattern. The journey narrows toward Paris, where the Seine cuts a bright line through the city.",
                fact: { title: "Capital", text: "Paris grew from a settlement on the Ile de la Cite into one of Europe's defining capitals." },
            },
        ],
    },
    egypt: {
        name: "Egypt",
        fullName: "Arab Republic of Egypt",
        type: "Country",
        lat: 26.8206,
        lon: 30.8025,
        landmarkName: "Great Pyramid of Giza",
        landmarkLat: 29.9792,
        landmarkLon: 31.1342,
        environment: "desert_ancient",
        color: "#fff0c0",
        accentColor: "#ffc300",
        mediaUrl: "/images/pyramids_cyber.png",
        aliases: ["giza", "pyramids", "great pyramid", "sphinx", "cairo"],
        journey: ["Orbital lock", "Nile alignment", "Desert haze descent", "Giza arrival"],
        monuments: [
            { id: "great-pyramid", name: "Great Pyramid of Giza", city: "Giza", coordinates: [29.9792, 31.1342], altitude: 60, approachAltitude: 180, bearing: 225, tags: ["Ancient Wonder", "Pyramid"], description: "The Great Pyramid of Giza was built for Khufu in 2560 BCE, standing as the only surviving wonder of the ancient world." },
            { id: "sphinx", name: "Great Sphinx", city: "Giza", coordinates: [29.9753, 31.1376], altitude: 58, approachAltitude: 90, bearing: 270, tags: ["Limestone", "Monument"], description: "The Great Sphinx is a limestone statue of a reclining sphinx, a mythical creature with the body of a lion and the head of a human." },
            { id: "luxor-temple", name: "Luxor Temple", city: "Luxor", coordinates: [25.6995, 32.6391], altitude: 76, approachAltitude: 130, bearing: 160, tags: ["Temple"], description: "Luxor Temple is a large Ancient Egyptian temple complex located on the east bank of the Nile River." },
            { id: "abu-simbel", name: "Abu Simbel", city: "Aswan", coordinates: [22.3372, 31.6258], altitude: 188, approachAltitude: 150, bearing: 98, tags: ["Temple", "UNESCO"], description: "Abu Simbel consists of two massive rock-cut temples carved out of the mountain side under Ramesses II." },
        ],
        narratives: [
            {
                title: "Egypt",
                body: "Egypt appears as a ribbon of green held inside a continent of sand. The Nile points the way north until the Giza Plateau rises from the desert edge.",
                fact: { title: "Nile", text: "The Nile's annual floods shaped ancient Egyptian agriculture, transport, and settlement." },
            },
        ],
    },
    japan: {
        name: "Japan",
        fullName: "Japan",
        type: "Country",
        lat: 36.2048,
        lon: 138.2529,
        landmarkName: "Mount Fuji",
        landmarkLat: 35.3606,
        landmarkLon: 138.7274,
        environment: "sakura_mist",
        color: "#f0f4ff",
        accentColor: "#ff9fcb",
        mediaUrl: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1200&q=80",
        aliases: ["tokyo", "kyoto", "mount fuji", "fuji", "senso ji", "fushimi inari"],
        journey: ["Orbital lock", "Pacific arc alignment", "Cloud veil descent", "Fuji arrival"],
        monuments: [
            { id: "mount-fuji", name: "Mount Fuji", city: "Yamanashi/Shizuoka", coordinates: [35.3606, 138.7274], altitude: 3776, approachAltitude: 900, bearing: 140, tags: ["Natural Wonder", "UNESCO"], description: "Mount Fuji's volcanic cone has anchored Japanese painting, poetry, and pilgrimage for centuries." },
            { id: "fushimi-inari", name: "Fushimi Inari Shrine", city: "Kyoto", coordinates: [34.9671, 135.7727], altitude: 233, approachAltitude: 100, bearing: 30, tags: ["Shrine"], description: "Fushimi Inari is famous for its path of thousands of vibrant orange torii gates winding up the sacred mountain." },
            { id: "himeji-castle", name: "Himeji Castle", city: "Himeji", coordinates: [34.8394, 134.6939], altitude: 45, approachAltitude: 130, bearing: 210, tags: ["UNESCO", "Castle"], description: "Himeji Castle, the White Heron Castle, is a spectacular hilltop castle representing the pinnacle of Japanese castle architecture." },
        ],
        narratives: [
            {
                title: "Japan",
                body: "Japan comes into view as a chain of volcanic islands, bright cities, and forested mountains set against the Pacific. The approach softens into mist as Mount Fuji rises with weathering clarity.",
                fact: { title: "Geography", text: "Japan sits along the Pacific Ring of Fire and contains more than 100 active volcanoes." },
            },
        ],
    },
    italy: {
        name: "Italy",
        fullName: "Italian Republic",
        type: "Country",
        lat: 41.8719,
        lon: 12.5674,
        landmarkName: "Colosseum",
        landmarkLat: 41.8902,
        landmarkLon: 12.4922,
        environment: "mediterranean_sunset",
        color: "#ffd2a0",
        accentColor: "#e0533c",
        mediaUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
        aliases: ["rome", "colosseum", "venice", "italy", "pisa", "florence"],
        journey: ["Orbital lock", "Apennine alignment", "Tiber valley descent", "Rome arrival"],
        monuments: [
            { id: "colosseum", name: "Colosseum", city: "Rome", coordinates: [41.8902, 12.4922], altitude: 22, approachAltitude: 80, bearing: 45, tags: ["UNESCO", "Roman Empire", "Amphitheater"], description: "The Colosseum rises as a travertine ring of arches. Built in the first century CE under the Flavian emperors, it hosted gladiator matches and imperial spectacles." },
            { id: "leaning-tower", name: "Leaning Tower of Pisa", city: "Pisa", coordinates: [43.7230, 10.3966], altitude: 6, approachAltitude: 70, bearing: 180, tags: ["UNESCO", "Campanile"], description: "The Leaning Tower of Pisa is the freestanding bell tower of Pisa Cathedral, world-famous for its unintended tilt." },
            { id: "venice-canals", name: "Venice Canals", city: "Venice", coordinates: [45.4371, 12.3326], altitude: 1, approachAltitude: 60, bearing: 270, tags: ["UNESCO", "Historic Canals"], description: "Venice's canals form a water network through the historic archipelago, with gondolas gliding past Gothic palaces." },
            { id: "florence-cathedral", name: "Florence Cathedral", city: "Florence", coordinates: [43.7732, 11.2560], altitude: 50, approachAltitude: 100, bearing: 90, tags: ["UNESCO", "Renaissance"], description: "Florence Cathedral, the Duomo, features Brunelleschi's magnificent red-tiled brick dome, a masterpiece of Renaissance engineering." },
        ],
        narratives: [
            {
                title: "Italy",
                body: "The descent approaches the Italian peninsula, a land where limestone hills slope into Mediterranean waters. The camera aligns to Rome, where millennia of stone and sunshine form the city's golden fabric.",
                fact: { title: "Heritage", text: "Italy holds the highest number of UNESCO World Heritage Sites globally." },
            },
        ],
    },
};

export const destinationSuggestions = Object.values(destinationsData).map((destination) => ({
    name: destination.name,
    type: destination.type,
    accentColor: destination.accentColor,
}));

export function resolveDestination(input) {
    const normalized = input.toLowerCase().trim();
    if (!normalized) return null;

    const exact = destinationsData[normalized];
    if (exact) return exact;

    return Object.values(destinationsData).find((destination) => {
        const inName = destination.name.toLowerCase().includes(normalized);
        const inFullName = destination.fullName.toLowerCase().includes(normalized);
        const inAliases = destination.aliases.some((alias) => alias.includes(normalized) || normalized.includes(alias));
        const inMonuments = destination.monuments.some((monument) => monument.name.toLowerCase().includes(normalized));
        return inName || inFullName || inAliases || inMonuments;
    }) || null;
}

export function getExpeditionAnswer(destination, prompt) {
    if (!destination) {
        return "Choose a destination first and the expedition guide will resolve coordinates, environment, and local history around it.";
    }

    const lower = prompt.toLowerCase();
    const monument = destination.monuments[0];

    if (lower.includes("white") && destination.name === "India") {
        return "The Taj Mahal appears white because it is faced with Makrana marble, a dense Rajasthani stone that scatters light softly across its surface. Morning, noon, and moonlight each pull a different tone from the marble, which is why the building seems to change color without changing material.";
    }

    if (lower.includes("colosseum") || lower.includes("gladiator") || (lower.includes("rome") && destination.name === "Italy")) {
        return "The Colosseum is an iconic amphitheater situated in the heart of Rome, Italy. Commissioned around 70-72 CE under Emperor Vespasian, it was constructed from travertine stone, tuff, and tile-faced concrete. It hosted gladiator matches, dramas, and mock sea battles, serving as a political monument to imperial authority and civic architectural control.";
    }

    if (lower.includes("height") || lower.includes("tall")) {
        return `${destination.landmarkName} is best understood through scale: ${monument.name} is approached here from about ${monument.approachAltitude} meters so the camera can read both silhouette and ground context. The exact physical dimensions vary by landmark, but the route is tuned to make the structure feel spatially truthful rather than decorative.`;
    }

    if (lower.includes("history") || lower.includes("built") || lower.includes("when")) {
        return destination.monuments[0].description;
    }

    if (lower.includes("visit") || lower.includes("travel") || lower.includes("best time")) {
        return `For ${destination.name}, the most generous experience usually comes when the light is low and the crowds have not yet hardened the pace of the day. The platform favors dawn and late afternoon lighting because stone, water, haze, and shadow become legible together.`;
    }

    return `${destination.landmarkName} is the current anchor point. Notice how the route frames it through geography first, then architecture: the destination is not isolated from its rivers, cities, weather, or the older landscape underneath it.`;
}
