export type VehicleType = "Bike" | "Hatchback" | "Sedan" | "SUV" | "Luxury";

export const VEHICLES: { type: VehicleType; multiplier: number; note: string }[] = [
  { type: "Bike", multiplier: 0.5, note: "2-wheeler" },
  { type: "Hatchback", multiplier: 1, note: "Swift, i20, Altroz" },
  { type: "Sedan", multiplier: 1.2, note: "City, Verna, Ciaz" },
  { type: "SUV", multiplier: 1.45, note: "Creta, XUV, Fortuner" },
  { type: "Luxury", multiplier: 2, note: "BMW, Audi, Mercedes" },
];

export const CITIES = ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Jaipur"];

export type Badge = "Verified" | "Top Rated" | "Fast Arrival" | "Eco Wash";

export type Provider = {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviews: number;
  years: number;
  distanceKm: number;
  startingPrice: number;
  jobs: number;
  responseMins: number;
  repeatPct: number;
  badges: Badge[];
  services: string[];
  about: string;
  cover: string;
  gallery: string[];
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const COVERS = [
  "photo-1552519507-da3b142c6e3d",
  "photo-1503376780353-7e6692767b70",
  "photo-1511919884226-fd3cad34687c",
  "photo-1541899481282-d53bffe3c35d",
  "photo-1493238792000-8113da705763",
  "photo-1520340356584-f9917d1eea6f",
  "photo-1549317661-bd32c8ce0db2",
  "photo-1567818735868-e71b99932e29",
  "photo-1580273916550-e323be2ae537",
  "photo-1607860108855-64acf2078ed9",
  "photo-1614200187524-dc4b892acf16",
  "photo-1594502184342-2e12f877aa73",
];

const NAMES: [string, string, string][] = [
  ["Lustre Auto Spa", "Delhi NCR", "Golf Course Road, Gurugram"],
  ["Chrome & Co. Detailing", "Delhi NCR", "Saket, South Delhi"],
  ["AquaValet Doorstep", "Mumbai", "Bandra West"],
  ["Marine Drive Shine", "Mumbai", "Lower Parel"],
  ["Gloss Garage", "Bengaluru", "Indiranagar"],
  ["EcoWash Bengaluru", "Bengaluru", "Koramangala"],
  ["Silverline Car Care", "Bengaluru", "Whitefield"],
  ["Pune Detail Studio", "Pune", "Baner"],
  ["Kothrud Shine Squad", "Pune", "Kothrud"],
  ["Royal Rajwada Wash", "Jaipur", "C-Scheme"],
  ["Pink City Auto Spa", "Jaipur", "Malviya Nagar"],
  ["Nitro Foam Experts", "Delhi NCR", "Noida Sector 62"],
];

const SERVICE_POOL = [
  "Express Wash",
  "Premium Foam",
  "Interior Vacuum",
  "Ceramic Coating",
  "Deep Interior Detail",
  "Headlight Restore",
  "Engine Bay Clean",
  "Pet Hair Removal",
];

export const PROVIDERS: Provider[] = NAMES.map(([name, city, area], i) => {
  const rating = +(4.1 + ((i * 7) % 9) / 10).toFixed(1);
  const badges: Badge[] = [
    "Verified",
    ...(rating >= 4.7 ? (["Top Rated"] as Badge[]) : []),
    ...(i % 3 === 0 ? (["Fast Arrival"] as Badge[]) : []),
    ...(i % 4 === 0 ? (["Eco Wash"] as Badge[]) : []),
  ];
  return {
    id: `p${i + 1}`,
    name,
    city,
    area,
    rating: Math.min(rating, 4.9),
    reviews: 120 + i * 47,
    years: 1 + ((i * 5) % 12),
    distanceKm: +(0.8 + i * 0.72).toFixed(1),
    startingPrice: 249 + i * 60,
    jobs: 1400 + i * 830,
    responseMins: 18 + (i % 5) * 7,
    repeatPct: 52 + ((i * 3) % 40),
    badges,
    services: SERVICE_POOL.slice(i % 3, (i % 3) + 4),
    about:
      "Trained, background-verified washers using waterless and low-water techniques, pH-neutral foam and microfibre-only contact. We arrive with our own water, power and equipment.",
    cover: img(COVERS[i % COVERS.length]),
    gallery: [0, 1, 2, 3].map((k) => img(COVERS[(i + k + 1) % COVERS.length], 800)),
  };
});

export type Pkg = {
  id: string;
  name: string;
  price: number;
  duration: string;
  blurb: string;
  includes: string[];
  popular?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    id: "express",
    name: "Express Wash",
    price: 349,
    duration: "30 min",
    blurb: "Quick exterior refresh at your doorstep.",
    includes: ["Waterless exterior wash", "Tyre & rim clean", "Glass polish", "Dashboard wipe"],
  },
  {
    id: "foam",
    name: "Premium Foam",
    price: 699,
    duration: "60 min",
    blurb: "pH-neutral snow foam with gloss finish.",
    includes: [
      "Snow foam pre-soak",
      "Two-bucket microfibre wash",
      "Tyre dressing",
      "Interior vacuum",
      "Gloss spray sealant",
    ],
    popular: true,
  },
  {
    id: "interior",
    name: "Deep Interior Detail",
    price: 1499,
    duration: "120 min",
    blurb: "Cabin restored to showroom condition.",
    includes: [
      "Steam seat shampoo",
      "Roof lining clean",
      "AC vent sanitisation",
      "Leather conditioning",
      "Odour treatment",
    ],
  },
  {
    id: "ceramic",
    name: "Ceramic Gloss",
    price: 2499,
    duration: "180 min",
    blurb: "6-month hydrophobic protection layer.",
    includes: [
      "Clay bar decontamination",
      "Machine gloss enhance",
      "Ceramic sealant",
      "Glass hydrophobic coat",
    ],
  },
];

export const ADDONS = [
  { id: "a1", name: "Engine bay clean", price: 299 },
  { id: "a2", name: "Headlight restoration", price: 449 },
  { id: "a3", name: "Pet hair removal", price: 249 },
  { id: "a4", name: "Underbody wash", price: 349 },
  { id: "a5", name: "Wax hand polish", price: 599 },
  { id: "a6", name: "Sanitisation fogging", price: 199 },
];

export type Review = {
  id: string;
  providerId: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  vehicle: VehicleType;
};

const REVIEW_NAMES = [
  "Aarav Mehta","Priya Nair","Rohit Sharma","Sneha Iyer","Kabir Singh","Ananya Rao",
  "Vikram Desai","Meera Joshi","Arjun Kapoor","Divya Menon","Rahul Verma","Ishita Bose",
  "Nikhil Reddy","Tanvi Shah","Aditya Kulkarni","Neha Gupta","Siddharth Jain","Pooja Malhotra",
  "Karan Bhatt","Ritika Sen",
];

const REVIEW_TEXTS = [
  "Washer arrived 5 minutes early, brought his own water. Car looked showroom fresh.",
  "Booked at 9pm for next morning. Seamless. The foam wash is worth every rupee.",
  "Interior detailing removed stains I'd given up on. Highly recommend.",
  "Great value. Live tracking meant I didn't have to wait around.",
  "Polite, professional and quick. Before/after photos were a nice touch.",
  "Second booking with them. Consistent quality every time.",
];

export const REVIEWS: Review[] = Array.from({ length: 40 }, (_, i) => ({
  id: `r${i + 1}`,
  providerId: PROVIDERS[i % PROVIDERS.length].id,
  name: REVIEW_NAMES[i % REVIEW_NAMES.length],
  rating: [5, 5, 4, 5, 4, 3][i % 6],
  date: `${(i % 28) + 1} ${["Jan", "Feb", "Mar", "Apr"][i % 4]} 2026`,
  text: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
  vehicle: VEHICLES[i % VEHICLES.length].type,
}));

export type BookingStatus =
  | "Booked"
  | "Washer assigned"
  | "En route"
  | "Arrived"
  | "Washing"
  | "Completed";

export const TRACK_STEPS: BookingStatus[] = [
  "Booked",
  "Washer assigned",
  "En route",
  "Arrived",
  "Washing",
  "Completed",
];

export type Booking = {
  id: string;
  providerId: string;
  packageId: string;
  vehicle: VehicleType;
  address: string;
  city: string;
  date: string;
  slot: string;
  amount: number;
  status: BookingStatus;
  washer: { name: string; rating: number; trips: number; phone: string };
  otp: string;
};

const WASHERS = [
  { name: "Suresh Kumar", rating: 4.9, trips: 1284, phone: "+91 98•••• ••42" },
  { name: "Imran Sheikh", rating: 4.8, trips: 962, phone: "+91 99•••• ••17" },
  { name: "Deepak Yadav", rating: 4.7, trips: 741, phone: "+91 90•••• ••88" },
  { name: "Manoj Pawar", rating: 4.9, trips: 1530, phone: "+91 98•••• ••05" },
  { name: "Rakesh Bisht", rating: 4.6, trips: 402, phone: "+91 97•••• ••63" },
];

export const BOOKINGS: Booking[] = [
  {
    id: "WOC-48213",
    providerId: "p1",
    packageId: "foam",
    vehicle: "SUV",
    address: "B-42, Sushant Lok Phase 1, Gurugram",
    city: "Delhi NCR",
    date: "Today",
    slot: "4:00 PM – 5:00 PM",
    amount: 1014,
    status: "En route",
    washer: WASHERS[0],
    otp: "4821",
  },
  {
    id: "WOC-48108",
    providerId: "p5",
    packageId: "express",
    vehicle: "Hatchback",
    address: "12, 100 Feet Road, Indiranagar, Bengaluru",
    city: "Bengaluru",
    date: "Today",
    slot: "11:00 AM – 12:00 PM",
    amount: 412,
    status: "Washing",
    washer: WASHERS[1],
    otp: "1190",
  },
  {
    id: "WOC-47990",
    providerId: "p3",
    packageId: "interior",
    vehicle: "Sedan",
    address: "Palm Grove, Bandra West, Mumbai",
    city: "Mumbai",
    date: "12 Aug 2026",
    slot: "9:00 AM – 11:00 AM",
    amount: 2123,
    status: "Completed",
    washer: WASHERS[2],
    otp: "7712",
  },
  {
    id: "WOC-47845",
    providerId: "p8",
    packageId: "ceramic",
    vehicle: "Luxury",
    address: "Baner Road, Pune",
    city: "Pune",
    date: "28 Aug 2026",
    slot: "7:00 AM – 10:00 AM",
    amount: 5896,
    status: "Booked",
    washer: WASHERS[3],
    otp: "3390",
  },
  {
    id: "WOC-47702",
    providerId: "p10",
    packageId: "foam",
    vehicle: "Bike",
    address: "C-Scheme, Jaipur",
    city: "Jaipur",
    date: "2 Sep 2026",
    slot: "5:00 PM – 6:00 PM",
    amount: 413,
    status: "Arrived",
    washer: WASHERS[4],
    otp: "9014",
  },
];

export const PLATFORM_COMMISSION = 0.2;
export const GST_RATE = 0.18;

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const priceFor = (base: number, vehicle: VehicleType) =>
  Math.round(base * (VEHICLES.find((v) => v.type === vehicle)?.multiplier ?? 1));

export const getProvider = (id: string) => PROVIDERS.find((p) => p.id === id);
export const getPackage = (id: string) => PACKAGES.find((p) => p.id === id);

export const SLOTS = [
  "7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM",
];

export const BEFORE_IMG = img("photo-1615906655593-ad0386982a0f", 1400);
export const AFTER_IMG = img("photo-1552519507-da3b142c6e3d", 1400);
export const HERO_IMG = img("photo-1503376780353-7e6692767b70", 1800);
