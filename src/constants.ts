
export interface Medicine {
  id: string;
  name: string;
  generic: string;
  dosage: string;
  price: number;
  available: boolean;
}

export interface Store {
  id: string;
  name: string;
  owner: string;
  location: string;
  distance: string;
  hours: string;
  rating: number;
  stock: Record<string, boolean>;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  specialty: string;
  emergency: string;
  rating: number;
  mapsUrl: string;
}

export const SYMPTOM_MAPPINGS: Record<string, Medicine[]> = {
  "headache": [
    { id: 'm1', name: "Paracetamol 500mg", generic: "Paracetamol", dosage: "1 tablet as needed", price: 12, available: true },
    { id: 'm2', name: "Dolo 650", generic: "Paracetamol", dosage: "1 tablet twice daily", price: 30, available: true },
    { id: 'm3', name: "Disprin", generic: "Aspirin", dosage: "1 tablet dissolved in water", price: 18, available: true },
    { id: 'm4', name: "Saridon", generic: "Propyphenazone/Paracetamol/Caffeine", dosage: "1 tablet", price: 25, available: true }
  ],
  "fever": [
    { id: 'm5', name: "Crocin", generic: "Paracetamol", dosage: "1 tablet every 6 hours", price: 22, available: true },
    { id: 'm1', name: "Paracetamol 500mg", generic: "Paracetamol", dosage: "1 tablet as needed", price: 12, available: true },
    { id: 'm6', name: "Meftal", generic: "Mefenamic Acid", dosage: "1 tablet thrice daily", price: 45, available: true }
  ],
  "cold": [
    { id: 'm7', name: "Cetirizine", generic: "Cetirizine Hydrochloride", dosage: "1 tablet at night", price: 8, available: true },
    { id: 'm8', name: "Sinarest", generic: "Paracetamol/Phenylephrine/Chlorpheniramine", dosage: "1 tablet twice daily", price: 35, available: true },
    { id: 'm9', name: "Allegra", generic: "Fexofenadine", dosage: "1 tablet once daily", price: 55, available: true }
  ],
  "cough": [
    { id: 'm10', name: "Benadryl", generic: "Diphenhydramine", dosage: "10ml thrice daily", price: 65, available: true },
    { id: 'm11', name: "Honitus", generic: "Ayurvedic Herbal", dosage: "2 tsp thrice daily", price: 80, available: true },
    { id: 'm12', name: "Alex", generic: "Dextromethorphan", dosage: "5ml twice daily", price: 58, available: true }
  ],
  "stomach": [
    { id: 'm13', name: "Digene", generic: "Antacid", dosage: "2 tablets chewed after meals", price: 90, available: true },
    { id: 'm14', name: "Eno", generic: "Svarjiksara/Nimbukamlam", dosage: "1 sachet in water", price: 30, available: true },
    { id: 'm15', name: "Pan-D", generic: "Pantoprazole/Domperidone", dosage: "1 capsule before breakfast", price: 55, available: true }
  ]
};

export const STORES: Store[] = [
  {
    id: 's1',
    name: "Sharma Medical & General Store",
    owner: "Ramesh Sharma",
    location: "Patia, Bhubaneswar",
    distance: "0.3 km",
    hours: "8 AM – 10 PM",
    rating: 4.5,
    stock: { "Paracetamol 500mg": true, "Dolo 650": true, "Disprin": false }
  },
  {
    id: 's2',
    name: "Kalinga Pharmacy",
    owner: "Bibhuti Das",
    location: "IRC Village, Bhubaneswar",
    distance: "0.7 km",
    hours: "24 Hours",
    rating: 4.2,
    stock: { "Paracetamol 500mg": true, "Dolo 650": true, "Disprin": true }
  },
  {
    id: 's3',
    name: "MedPlus — KIIT Square",
    owner: "Chain Store",
    location: "KIIT Road, Bhubaneswar",
    distance: "1.2 km",
    hours: "7 AM – 11 PM",
    rating: 3.9,
    stock: { "Paracetamol 500mg": true, "Dolo 650": false, "Disprin": true }
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: "AIIMS Bhubaneswar",
    type: "Government / Multi-specialty",
    location: "Sijua, Bhubaneswar",
    distance: "4.5 km",
    specialty: "All Major Specialties",
    emergency: "24/7 Trauma Care",
    rating: 4.8,
    mapsUrl: "https://www.google.com/maps/search/AIIMS+Bhubaneswar"
  },
  {
    id: 'h2',
    name: "KIMS Hospital",
    type: "Private / Multi-specialty",
    location: "KIIT Campus, Bhubaneswar",
    distance: "1.5 km",
    specialty: "Cardiology, Neurology",
    emergency: "24/7 Emergency",
    rating: 4.6,
    mapsUrl: "https://www.google.com/maps/search/KIMS+Hospital+Bhubaneswar"
  },
  {
    id: 'h3',
    name: "SUM Ultimate Medicare",
    type: "Private / Tertiary Care",
    location: "Ghatikia, Bhubaneswar",
    distance: "3.2 km",
    specialty: "Critical Care, Oncology",
    emergency: "Advanced Life Support",
    rating: 4.7,
    mapsUrl: "https://www.google.com/maps/search/SUM+Ultimate+Medicare+Bhubaneswar"
  }
];
