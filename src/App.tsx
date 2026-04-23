/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Pill, 
  Store as StoreIcon, 
  FileText,
  Heart, 
  Search, 
  Phone, 
  Navigation, 
  ShoppingBag, 
  CheckCircle2, 
  Plus, 
  Droplets, 
  Flame, 
  ChevronRight,
  Info,
  Loader2,
  X
} from 'lucide-react';
import { SYMPTOM_MAPPINGS, STORES, HOSPITALS, type Medicine, type Store, type Hospital } from './constants';

type Screen = 'intro' | 'onboarding' | 'home' | 'triage' | 'medicines' | 'hospitals' | 'stores' | 'tracker' | 'pharmacy';
type Language = 'en' | 'or' | 'hi';

interface UserData {
  name: string;
  age: string;
  height: string;
  weight: string;
  bloodGroup: string;
  gender: string;
}

interface TriageData {
  name: string;
  age: string;
  gender: string;
  symptom: string;
  duration: string;
  severity: number;
  allergies: string;
  medications: string;
}

const TRANSLATIONS = {
  en: {
    howFeeling: "What issues are you having?",
    placeholder: "Type your symptoms...",
    analyze: "Analyze & Find Medicine",
    commonSymptoms: "Common Symptoms",
    bhubaneswarEdition: "Bhubaneswar Edition",
    hyperlocalIntelligence: "Hyperlocal Intelligence",
    storesOpen: "Stores Open",
    openInPatia: "Open in Patia Area",
    toAiims: "To AIIMS",
    safetyProtocol: "Safety Protocol",
    safetyNote: "MediSetu uses AI for OTC suggestions. For emergencies, please visit the Hospital Recommendations section immediately.",
    hospitalRecommendations: "Hospital Recommendations",
    patientInfo: "Patient Info",
    symptomDetails: "Symptom Details",
    medicalHistory: "Medical History",
    step: "Step",
    nextStep: "Next Step",
    generateAssessment: "Generate Assessment",
    analyzing: "Analyzing...",
    patientName: "Patient Name",
    age: "Age",
    gender: "Gender",
    symptomSeverity: "Symptom Severity",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    duration: "Duration",
    knownAllergies: "Known Allergies",
    currentMedications: "Current Medications",
    criticalAlert: "Critical Alert",
    seriousCondition: "Serious Condition",
    seriousNote: "Based on your severity score and symptoms, you should visit a hospital immediately.",
    immediateAttention: "Immediate attention required",
    callEmergency: "Call Emergency (108)",
    recommendedHospitals: "Recommended Hospitals",
    getDirectionsNow: "Get Directions Now",
    backToDashboard: "Back to Dashboard",
    assessmentComplete: "Assessment Complete",
    minorCondition: "Minor Condition Detected",
    minorNote: "Your symptoms appear to be manageable with over-the-counter medication. Please consult a pharmacist before use.",
    suggestedMedicines: "Suggested Medicines",
    otcOnly: "OTC ONLY",
    inStock: "IN STOCK",
    availableAt: "Nearby Stores Carrying These",
    nearbySupport: "Nearby Support",
    pharmacies: "Pharmacies",
    storesOpenCount: "STORES OPEN",
    call: "Call",
    map: "Map",
    order: "Order",
    manager: "Manager",
    headache: "Headache",
    fever: "Fever",
    cold: "Cold",
    stomachPain: "Stomach Pain",
    cough: "Cough",
    track: "Track",
    home: "Home",
    meds: "Meds",
    stores: "Stores",
    dailyProgress: "Daily Progress",
    healthTracker: "Health Tracker",
    days: "DAYS",
    currentTreatment: "Current Treatment",
    antibioticCourse: "Antibiotic Course",
    started: "Started",
    finishingIn: "Finishing in",
    nextDose: "Next Dose",
    tonight: "Tonight",
    taken: "Taken",
    markTaken: "Mark Taken",
    waterIntake: "Water Intake",
    recoveryStreak: "Recovery Streak",
    dailyReminders: "Daily Reminders",
    editAll: "Edit All",
    dosage: "Dosage",
    price: "Price",
    pharmacistNote: "Pharmacist's Note",
    usageInstructions: "Usage Instructions",
    findInNearbyStores: "Find in Nearby Stores",
    distance: "Distance",
    emergency: "Emergency",
    availableSpecialties: "Available Specialties",
    emergencyContact: "Emergency Contact",
    getDirections: "Get Directions",
    calling: "Calling...",
    day: "Day",
    of: "of",
    complete: "Complete",
    listView: "List View",
    mapView: "Map View",
    introTitle: "Welcome to MediSetu",
    introSubtitle: "Your Hyperlocal Health Companion",
    whatIsMedis: "What is MediSetu?",
    medisDescription: "MediSetu is an AI-powered health assistant designed specifically for the residents of Bhubaneswar. It helps you navigate minor health issues with ease.",
    whatItDoes: "What it does",
    whatItDoesList: [
      "Suggests OTC medicines for minor symptoms",
      "Locates nearby open pharmacies in Patia/Bhubaneswar",
      "Provides directions to major hospitals like AIIMS/KIMS",
      "Tracks your daily health progress and medication"
    ],
    whatItDoesNotDo: "What it does NOT do",
    whatItDoesNotDoList: [
      "Replace a professional medical diagnosis",
      "Prescribe controlled or restricted medications",
      "Handle life-threatening emergencies directly"
    ],
    whatItUsuallyDoes: "What it usually does",
    whatItUsuallyDoesList: [
      "Analyzes symptoms like fever, cold, or headache",
      "Shows real-time distance to healthcare facilities",
      "Reminds you to take your medicines on time"
    ],
    getStarted: "Get Started",
    onboardingTitle: "Tell us about yourself",
    onboardingSubtitle: "This helps us customize your health tracker",
    height: "Height (cm)",
    weight: "Weight (kg)",
    bloodGroup: "Blood Group",
    saveAndContinue: "Save & Continue",
    skip: "Skip",
    instructionsTitle: "How to use MediSetu",
    instructionsList: [
      "Enter your symptoms in the search bar",
      "Follow the triage steps for a quick assessment",
      "Check suggested OTC medicines for minor issues",
      "Find the nearest open pharmacy to get your meds",
      "Use the Tracker to stay on top of your recovery"
    ],
    gotIt: "Got it!",
    searchSymptoms: "Search symptoms...",
    analyzingSymptoms: "Analyzing your symptoms...",
    noResults: "No results found for your symptoms.",
    tryCommon: "Try selecting a common symptom below."
  },
  or: {
    howFeeling: "ଆପଣଙ୍କର କଣ ସମସ୍ୟା ଅଛି?",
    placeholder: "ଆପଣଙ୍କର ଲକ୍ଷଣ ଟାଇପ୍ କରନ୍ତୁ...",
    analyze: "ବିଶ୍ଳେଷଣ କରନ୍ତୁ ଏବଂ ଔଷଧ ଖୋଜନ୍ତୁ",
    commonSymptoms: "ସାଧାରଣ ଲକ୍ଷଣ",
    bhubaneswarEdition: "ଭୁବନେଶ୍ୱର ସଂସ୍କରଣ",
    hyperlocalIntelligence: "ହାଇପରଲୋକାଲ୍ ଇଣ୍ଟେଲିଜେନ୍ସ",
    storesOpen: "ଷ୍ଟୋର୍ ଖୋଲା ଅଛି",
    openInPatia: "ପଟିଆ ଅଞ୍ଚଳରେ ଖୋଲା ଅଛି",
    toAiims: "AIIMS କୁ",
    safetyProtocol: "ସୁରକ୍ଷା ପ୍ରୋଟୋକଲ୍",
    safetyNote: "MediSetu OTC ପରାମର୍ଶ ପାଇଁ AI ବ୍ୟବହାର କରେ | ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ପାଇଁ, ଦୟାକରି ତୁରନ୍ତ ହସ୍ପିଟାଲ୍ ସୁପାରିଶ ବିଭାଗକୁ ଯାଆନ୍ତୁ |",
    hospitalRecommendations: "ହସ୍ପିଟାଲ୍ ସୁପାରିଶ",
    patientInfo: "ରୋଗୀ ସୂଚନା",
    symptomDetails: "ଲକ୍ଷଣ ବିବରଣୀ",
    medicalHistory: "ଡାକ୍ତରୀ ଇତିହାସ",
    step: "ପଦକ୍ଷେପ",
    nextStep: "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    generateAssessment: "ଆକଳନ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
    analyzing: "ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
    patientName: "ରୋଗୀର ନାମ",
    age: "ବୟସ",
    gender: "ଲିଙ୍ଗ",
    symptomSeverity: "ଲକ୍ଷଣର ଗମ୍ଭୀରତା",
    mild: "ସାମାନ୍ୟ",
    moderate: "ମଧ୍ୟମ",
    severe: "ଗମ୍ଭୀର",
    duration: "ଅବଧି",
    knownAllergies: "ଜଣାଶୁଣା ଆଲର୍ଜି",
    currentMedications: "ବର୍ତ୍ତମାନର ଔଷଧ",
    criticalAlert: "ଜରୁରୀକାଳୀନ ସତର୍କତା",
    seriousCondition: "ଗମ୍ଭୀର ଅବସ୍ଥା",
    seriousNote: "ଆପଣଙ୍କର ଗମ୍ଭୀରତା ସ୍କୋର ଏବଂ ଲକ୍ଷଣ ଉପରେ ଆଧାର କରି, ଆପଣ ତୁରନ୍ତ ଏକ ଡାକ୍ତରଖାନା ପରିଦର୍ଶନ କରିବା ଉଚିତ |",
    immediateAttention: "ତୁରନ୍ତ ଧ୍ୟାନ ଆବଶ୍ୟକ",
    callEmergency: "ଜରୁରୀକାଳୀନ କଲ୍ (108)",
    recommendedHospitals: "ସୁପାରିଶ କରାଯାଇଥିବା ହସ୍ପିଟାଲ୍",
    getDirectionsNow: "ବର୍ତ୍ତମାନ ଦିଗ ପାଆନ୍ତୁ",
    backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    assessmentComplete: "ଆକଳନ ସମାପ୍ତ",
    minorCondition: "ସାମାନ୍ୟ ଅବସ୍ଥା ଚିହ୍ନଟ ହୋଇଛି",
    minorNote: "ଆପଣଙ୍କର ଲକ୍ଷଣଗୁଡିକ ଓଭର-ଦି-କାଉଣ୍ଟର ଔଷଧ ସହିତ ପରିଚାଳନାଯୋଗ୍ୟ ମନେହୁଏ | ବ୍ୟବହାର କରିବା ପୂର୍ବରୁ ଦୟାକରି ଜଣେ ଫାର୍ମାସିଷ୍ଟଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ |",
    suggestedMedicines: "ପରାମର୍ଶିତ ଔଷଧ",
    otcOnly: "କେବଳ OTC",
    inStock: "ଷ୍ଟକରେ ଅଛି",
    availableAt: "ଏହା ମିଳୁଥିବା ନିକଟସ୍ଥ ଷ୍ଟୋରଗୁଡିକ",
    nearbySupport: "ନିକଟସ୍ଥ ସହାୟତା",
    pharmacies: "ଫାର୍ମାସି",
    storesOpenCount: "ଷ୍ଟୋର୍ ଖୋଲା ଅଛି",
    call: "କଲ୍",
    map: "ମାନଚିତ୍ର",
    order: "ଅର୍ଡର",
    manager: "ମ୍ୟାନେଜର",
    headache: "ମୁଣ୍ଡ ବ୍ୟଥା",
    fever: "ଜ୍ୱର",
    cold: "ଥଣ୍ଡା",
    stomachPain: "ପେଟ ବ୍ୟଥା",
    cough: "କାଶ",
    track: "ଟ୍ରାକ୍",
    home: "ହୋମ୍",
    meds: "ଔଷଧ",
    stores: "ଷ୍ଟୋର୍",
    dailyProgress: "ଦୈନିକ ପ୍ରଗତି",
    healthTracker: "ସ୍ୱାସ୍ଥ୍ୟ ଟ୍ରାକର୍",
    days: "ଦିନ",
    currentTreatment: "ବର୍ତ୍ତମାନର ଚିକିତ୍ସା",
    antibioticCourse: "ଆଣ୍ଟିବାୟୋଟିକ୍ କୋର୍ସ",
    started: "ଆରମ୍ଭ ହୋଇଛି",
    finishingIn: "ଶେଷ ହେବାକୁ",
    nextDose: "ପରବର୍ତ୍ତୀ ମାତ୍ରା",
    tonight: "ଆଜି ରାତିରେ",
    taken: "ନିଆଯାଇଛି",
    markTaken: "ନିଆଯାଇଛି ବୋଲି ଚିହ୍ନତ କରନ୍ତୁ",
    waterIntake: "ଜଳ ଗ୍ରହଣ",
    recoveryStreak: "ସୁସ୍ଥତା ଧାରା",
    dailyReminders: "ଦୈନିକ ସ୍ମାରକପତ୍ର",
    editAll: "ସବୁ ସଂପାଦନ କରନ୍ତୁ",
    dosage: "ମାତ୍ରା",
    price: "ମୂଲ୍ୟ",
    pharmacistNote: "ଫାର୍ମାସିଷ୍ଟଙ୍କ ଟିପ୍ପଣୀ",
    usageInstructions: "ବ୍ୟବହାର ନିର୍ଦ୍ଦେଶାବଳୀ",
    findInNearbyStores: "ନିକଟସ୍ଥ ଷ୍ଟୋରରେ ଖୋଜନ୍ତୁ",
    distance: "ଦୂରତା",
    emergency: "ଜରୁରୀକାଳୀନ",
    availableSpecialties: "ଉପଲବ୍ଧ ବିଶେଷତା",
    emergencyContact: "ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ",
    getDirections: "ଦିଗ ପାଆନ୍ତୁ",
    calling: "କଲ୍ କରାଯାଉଛି...",
    day: "ଦିନ",
    of: "ର",
    complete: "ସମ୍ପୂର୍ଣ୍ଣ",
    listView: "ତାଲିକା ଦୃଶ୍ୟ",
    mapView: "ମାନଚିତ୍ର ଦୃଶ୍ୟ",
    introTitle: "MediSetu କୁ ସ୍ୱାଗତ",
    introSubtitle: "ଆପଣଙ୍କର ହାଇପରଲୋକାଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ",
    whatIsMedis: "MediSetu କଣ?",
    medisDescription: "MediSetu ହେଉଛି ଏକ AI- ଚାଳିତ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ଯାହାକି ଭୁବନେଶ୍ୱର ବାସିନ୍ଦାଙ୍କ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ଭାବରେ ପରିକଳ୍ପନା କରାଯାଇଛି | ଏହା ଆପଣଙ୍କୁ ସାମାନ୍ୟ ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା ସହଜରେ ସମାଧାନ କରିବାରେ ସାହାଯ୍ୟ କରେ |",
    whatItDoes: "ଏହା କଣ କରେ",
    whatItDoesList: [
      "ସାମାନ୍ୟ ଲକ୍ଷଣ ପାଇଁ OTC ଔଷଧ ପରାମର୍ଶ ଦିଏ",
      "ପଟିଆ/ଭୁବନେଶ୍ୱରରେ ନିକଟସ୍ଥ ଖୋଲା ଫାର୍ମାସି ଖୋଜେ",
      "AIIMS/KIMS ପରି ପ୍ରମୁଖ ଡାକ୍ତରଖାନାକୁ ଦିଗ ପ୍ରଦର୍ଶନ କରେ",
      "ଆପଣଙ୍କର ଦୈନିକ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଗତି ଏବଂ ଔଷଧ ଟ୍ରାକ୍ କରେ"
    ],
    whatItDoesNotDo: "ଏହା କଣ କରେ ନାହିଁ",
    whatItDoesNotDoList: [
      "ଜଣେ ବୃତ୍ତିଗତ ଡାକ୍ତରୀ ନିଦାନକୁ ବଦଳାଏ ନାହିଁ",
      "ନିୟନ୍ତ୍ରିତ କିମ୍ବା ନିଷିଦ୍ଧ ଔଷଧ ପ୍ରେସକ୍ରାଇବ୍ କରେ ନାହିଁ",
      "ଜୀବନ ପ୍ରତି ବିପଦ ଥିବା ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତିକୁ ସିଧାସଳଖ ପରିଚାଳନା କରେ ନାହିଁ"
    ],
    whatItUsuallyDoes: "ଏହା ସାଧାରଣତଃ କଣ କରେ",
    whatItUsuallyDoesList: [
      "ଜ୍ୱର, ଥଣ୍ଡା କିମ୍ବା ମୁଣ୍ଡବିନ୍ଧା ପରି ଲକ୍ଷଣଗୁଡିକ ବିଶ୍ଳେଷଣ କରେ",
      "ସ୍ୱାସ୍ଥ୍ୟସେବା କେନ୍ଦ୍ରଗୁଡିକର ପ୍ରକୃତ ଦୂରତା ଦେଖାଏ",
      "ଆପଣଙ୍କୁ ସମୟ ଅନୁସାରେ ଔଷଧ ଖାଇବାକୁ ମନେ ପକାଇଦିଏ"
    ],
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    onboardingTitle: "ଆପଣଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ",
    onboardingSubtitle: "ଏହା ଆମକୁ ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ଟ୍ରାକର୍ କଷ୍ଟମାଇଜ୍ କରିବାରେ ସାହାଯ୍ୟ କରେ",
    height: "ଉଚ୍ଚତା (cm)",
    weight: "ଓଜନ (kg)",
    bloodGroup: "ରକ୍ତ ଗୋଷ୍ଠୀ",
    saveAndContinue: "ସଂରକ୍ଷଣ କରନ୍ତୁ ଏବଂ ଜାରି ରଖନ୍ତୁ",
    skip: "ବାଦ୍ ଦିଅନ୍ତୁ",
    instructionsTitle: "MediSetu କିପରି ବ୍ୟବହାର କରିବେ",
    instructionsList: [
      "ସର୍ଚ୍ଚ ବାରରେ ଆପଣଙ୍କର ଲକ୍ଷଣଗୁଡିକ ପ୍ରବେଶ କରନ୍ତୁ",
      "ଶୀଘ୍ର ଆକଳନ ପାଇଁ ଟ୍ରାଇଜ୍ ପଦକ୍ଷେପଗୁଡିକ ଅନୁସରଣ କରନ୍ତୁ",
      "ସାମାନ୍ୟ ସମସ୍ୟା ପାଇଁ ପରାମର୍ଶିତ OTC ଔଷଧ ଯାଞ୍ଚ କରନ୍ତୁ",
      "ଔଷଧ ପାଇଁ ନିକଟସ୍ଥ ଖୋଲା ଫାର୍ମାସି ଖୋଜନ୍ତୁ",
      "ଆପଣଙ୍କର ସୁସ୍ଥତା ଉପରେ ନଜର ରଖିବା ପାଇଁ ଟ୍ରାକର୍ ବ୍ୟବହାର କରନ୍ତୁ"
    ],
    gotIt: "ବୁଝିଗଲି!",
    searchSymptoms: "ଲକ୍ଷଣ ଖୋଜନ୍ତୁ...",
    analyzingSymptoms: "ଆପଣଙ୍କର ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
    noResults: "ଆପଣଙ୍କର ଲକ୍ଷଣ ପାଇଁ କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ |",
    tryCommon: "ନିମ୍ନରେ ଏକ ସାଧାରଣ ଲକ୍ଷଣ ଚୟନ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ |"
  },
  hi: {
    howFeeling: "आपको क्या समस्या हो रही है?",
    placeholder: "अपने लक्षण लिखें...",
    analyze: "विश्लेषण करें और दवा खोजें",
    commonSymptoms: "सामान्य लक्षण",
    bhubaneswarEdition: "भुवनेश्वर संस्करण",
    hyperlocalIntelligence: "हाइपरलोकल इंटेलिजेंस",
    storesOpen: "स्टोर खुले हैं",
    openInPatia: "पटिया क्षेत्र में खुला",
    toAiims: "AIIMS के लिए",
    safetyProtocol: "सुरक्षा प्रोटोकॉल",
    safetyNote: "MediSetu OTC सुझावों के लिए AI का उपयोग करता है। आपात स्थिति के लिए, कृपया तुरंत अस्पताल अनुशंसा अनुभाग पर जाएँ।",
    hospitalRecommendations: "अस्पताल की सिफारिशें",
    patientInfo: "रोगी की जानकारी",
    symptomDetails: "लक्षण विवरण",
    medicalHistory: "चिकित्सा इतिहास",
    step: "चरण",
    nextStep: "अगला चरण",
    generateAssessment: "आकलन उत्पन्न करें",
    analyzing: "विश्लेषण हो रहा है...",
    patientName: "रोगी का नाम",
    age: "आयु",
    gender: "लिंग",
    symptomSeverity: "लक्षण की गंभीरता",
    mild: "हल्का",
    moderate: "मध्यम",
    severe: "गंभीर",
    duration: "अवधि",
    knownAllergies: "ज्ञात एलर्जी",
    currentMedications: "वर्तमान दवाएं",
    criticalAlert: "महत्वपूर्ण चेतावनी",
    seriousCondition: "गंभीर स्थिति",
    seriousNote: "आपके गंभीरता स्कोर और लक्षणों के आधार पर, आपको तुरंत अस्पताल जाना चाहिए।",
    immediateAttention: "तत्काल ध्यान देने की आवश्यकता है",
    callEmergency: "आपातकालीन कॉल (108)",
    recommendedHospitals: "अनुशंसित अस्पताल",
    getDirectionsNow: "अभी दिशा-निर्देश प्राप्त करें",
    backToDashboard: "डैशबोर्ड पर वापस",
    assessmentComplete: "आकलन पूर्ण",
    minorCondition: "मामूली स्थिति का पता चला",
    minorNote: "आपके लक्षण ओवर-द-काउंटर दवा के साथ प्रबंधनीय लगते हैं। उपयोग करने से पहले कृपया फार्मासिस्ट से परामर्श लें।",
    suggestedMedicines: "सुझाई गई दवाएं",
    otcOnly: "केवल OTC",
    inStock: "स्टॉक में",
    availableAt: "आपके पास 3 स्टोर में उपलब्ध",
    nearbySupport: "नजदीकी सहायता",
    pharmacies: "फार्मेसी",
    storesOpenCount: "स्टोर खुले हैं",
    call: "कॉल",
    map: "मानचित्र",
    order: "ऑर्डर",
    manager: "प्रबंधक",
    headache: "सिरदर्द",
    fever: "बुखार",
    cold: "जुकाम",
    stomachPain: "पेट दर्द",
    cough: "खांसी",
    track: "ट्रैक",
    home: "होम",
    meds: "दवाएं",
    stores: "स्टोर",
    dailyProgress: "दैनिक प्रगति",
    healthTracker: "स्वास्थ्य ट्रैकर",
    days: "दिन",
    currentTreatment: "वर्तमान उपचार",
    antibioticCourse: "एंटीबायोटिक कोर्स",
    started: "शुरू हुआ",
    finishingIn: "समाप्त होने में",
    nextDose: "अगली खुराक",
    tonight: "आज रात",
    taken: "लिया गया",
    markTaken: "लिया गया चिह्नित करें",
    waterIntake: "पानी का सेवन",
    recoveryStreak: "रिकवरी स्ट्रीक",
    dailyReminders: "दैनिक अनुस्मारक",
    editAll: "सभी संपादित करें",
    dosage: "खुराक",
    price: "कीमत",
    pharmacistNote: "फार्मासिस्ट की टिप्पणी",
    usageInstructions: "उपयोग निर्देश",
    findInNearbyStores: "नजदीकी स्टोर में खोजें",
    distance: "दूरी",
    emergency: "आपातकालीन",
    availableSpecialties: "उपलब्ध विशेषताएं",
    emergencyContact: "आपातकालीन संपर्क",
    getDirections: "दिशा-निर्देश",
    calling: "कॉल हो रहा है...",
    day: "दिन",
    of: "का",
    complete: "पूर्ण",
    listView: "सूची दृश्य",
    mapView: "मानचित्र दृश्य",
    introTitle: "MediSetu में आपका स्वागत है",
    introSubtitle: "आपका हाइपरलोकल स्वास्थ्य साथी",
    whatIsMedis: "MediSetu क्या है?",
    medisDescription: "MediSetu एक AI-संचालित स्वास्थ्य सहायक है जिसे विशेष रूप से भुवनेश्वर के निवासियों के लिए डिज़ाइन किया गया है। यह आपको मामूली स्वास्थ्य समस्याओं को आसानी से हल करने में मदद करता है।",
    whatItDoes: "यह क्या करता है",
    whatItDoesList: [
      "मामूली लक्षणों के लिए OTC दवाओं का सुझाव देता है",
      "पटिया/भुवनेश्वर में नजदीकी खुली फार्मेसी का पता लगाता है",
      "AIIMS/KIMS जैसे प्रमुख अस्पतालों के लिए दिशा-निर्देश प्रदान करता",
      "आपकी दैनिक स्वास्थ्य प्रगति और दवाओं को ट्रैक करता है"
    ],
    whatItDoesNotDo: "यह क्या नहीं करता है",
    whatItDoesNotDoList: [
      "पेशेवर चिकित्सा निदान की जगह नहीं लेता",
      "नियंत्रित या प्रतिबंधित दवाएं नहीं लिखता",
      "जीवन के लिए खतरनाक आपात स्थितियों को सीधे नहीं संभालता"
    ],
    whatItUsuallyDoes: "यह आमतौर पर क्या करता है",
    whatItUsuallyDoesList: [
      "बुखार, जुकाम या सिरदर्द जैसे लक्षणों का विश्लेषण करता है",
      "स्वास्थ्य सुविधाओं की वास्तविक दूरी दिखाता है",
      "आपको समय पर दवाएं लेने की याद दिलाता है"
    ],
    getStarted: "शुरू करें",
    onboardingTitle: "अपने बारे में बताएं",
    onboardingSubtitle: "यह हमें आपके स्वास्थ्य ट्रैकर को अनुकूलित करने में मदद करता है",
    height: "ऊंचाई (cm)",
    weight: "वजन (kg)",
    bloodGroup: "रक्त समूह",
    saveAndContinue: "सहेजें और जारी रखें",
    skip: "छोड़ें",
    instructionsTitle: "MediSetu का उपयोग कैसे करें",
    instructionsList: [
      "सर्च बार में अपने लक्षण दर्ज करें",
      "त्वरित मूल्यांकन के लिए ट्राइएज चरणों का पालन करें",
      "मामूली समस्याओं के लिए सुझाई गई OTC दवाओं की जांच करें",
      "दवाएं लेने के लिए नजदीकी खुली फार्मेसी खोजें",
      "अपनी रिकवरी पर नज़र रखने के लिए ट्रैकर का उपयोग करें"
    ],
    gotIt: "समझ गया!",
    searchSymptoms: "लक्षण खोजें...",
    analyzingSymptoms: "आपके लक्षणों का विश्लेषण हो रहा है...",
    noResults: "आपके लक्षणों के लिए कोई परिणाम नहीं मिला।",
    tryCommon: "नीचे दिए गए सामान्य लक्षणों में से किसी एक को चुनने का प्रयास करें।"
  }
};

const CHIPS = [
  { id: 'headache', en: 'Headache', or: 'ମୁଣ୍ଡ ବ୍ୟଥା', hi: 'सिरदर्द', icon: '🧠' },
  { id: 'fever', en: 'Fever', or: 'ଜ୍ୱର', hi: 'बुखार', icon: '🌡️' },
  { id: 'cold', en: 'Cold', or: 'ଥଣ୍ଡା', hi: 'सर्दी', icon: '🤧' },
  { id: 'stomach', en: 'Stomach Pain', or: 'ପେଟ ବ୍ୟଥା', hi: 'पेट दर्द', icon: '🤢' },
  { id: 'cough', en: 'Cough', or: 'କାଶ', hi: 'खांसी', icon: '😷' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// ---- Airtable Integration ----
async function logToAirtable(data: any) {
  try {
    const res = await fetch('https://api.airtable.com/v0/appJnU6QKo8GstVpM/Triage_Logs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typecast: true,
        records: [
          {
            fields: {
              "Patient_ID": "P" + Math.floor(1000 + Math.random() * 9000),
              "Patient_Name": data.name || "Anonymous Patient",
              "Status": data.aiStatus || (data.severity >= 7 ? "CRITICAL" : "ROUTINE"),
              "Symptoms_Summary": data.symptom || "Symptoms reported",
              "AI_Analysis": data.aiAnalysis || `Age: ${data.age || "N/A"}\nGender: ${data.gender || "Unknown"}\nSeverity: ${data.severity}/10\nDuration: ${data.duration}\nAllergies: ${data.allergies || "None"}\nMedications: ${data.medications || "None"}`,
              "is_rpa_processed": false,
              "AI_Status_Suggestion": data.aiStatus || "ROUTINE",
              "AI_Symptoms_Category": "Other",
              "AI_Priority_Score": Number(data.severity),
              "Notes": data.isSerious ? "🚨 CONCERN RAISED: This case was flagged as SERIOUS by AI Triage Engine." : "Auto-submitted triage log."
            }
          }
        ]
      })
    });
    const result = await res.json();
    if (result.error) {
      console.error("Airtable insertion error:", result.error);
      alert("❌ Airtable Log Failed:\n" + (result.error.message || JSON.stringify(result.error)));
    } else {
      alert("✅ Perfect! Emergency Triage was securely logged across all specific columns in your Triage_Logs table!");
    }
  } catch (err: any) {
    alert("❌ Network Error connecting to Airtable:\n" + err.message);
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('intro');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [language, setLanguage] = useState<Language>('en');
  const [symptomInput, setSymptomInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedMedicines, setMatchedMedicines] = useState<Medicine[]>([]);
  const [callingStore, setCallingStore] = useState<string | null>(null);
  const [triageStep, setTriageStep] = useState(1);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    gender: 'Male'
  });
  const [showInstructions, setShowInstructions] = useState(false);
  
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key];
  };
  
  const addToCart = (med: any) => {
    setCart(prev => [...prev, { ...med, cartId: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const submitOrder = async () => {
    if (cart.length === 0) return;
    setIsAnalyzing(true);
    try {
      await fetch('https://api.airtable.com/v0/appJnU6QKo8GstVpM/Triage_Logs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          typecast: true,
          records: [{
            fields: {
              "Patient_Name": userData.name || "Anonymous",
              "Status": "URGENT",
              "Symptoms_Summary": "PHARMACY ORDER SUBMITTED",
              "Notes": `Order Items: ${cart.map(i => i.name + ' (' + i.dosage + ')').join(', ')}. Total: ₹${cart.reduce((s, i) => s + i.estPrice, 0)}`,
              "AI_Analysis": "User placed a direct order for medicines listed in their prescription analysis."
            }
          }]
        })
      });
      alert("✅ Order Placed! Our local pharmacy will contact you for delivery.");
      setCart([]);
      setShowCart(false);
    } catch (err) {
      alert("❌ Order failed. Please check your connection.");
    }
    setIsAnalyzing(false);
  };

  // Initial Loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasSeenIntro) {
        setActiveScreen('intro');
      } else if (!hasOnboarded) {
        setActiveScreen('onboarding');
      } else {
        setActiveScreen('home');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [hasSeenIntro, hasOnboarded]);
  
  const [isMedicineSearch, setIsMedicineSearch] = useState(false);

  // Triage State
  const [triageData, setTriageData] = useState<TriageData>({
    name: '',
    age: '',
    gender: 'Male',
    symptom: '',
    duration: 'Less than 1 day',
    severity: 5,
    allergies: '',
    medications: ''
  });

  // Tracker State
  const [waterIntake, setWaterIntake] = useState(1200);
  const [streak, setStreak] = useState(3);
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Morning BP medicine', time: '8:00 AM', taken: true },
    { id: 2, text: 'Afternoon antibiotic', time: '2:00 PM', taken: false },
    { id: 3, text: 'Evening vitamin', time: '6:00 PM', taken: false },
  ]);
  const [courseProgress, setCourseProgress] = useState(60);
  const [courseTaken, setCourseTaken] = useState(false);

  const getMedicinesForSymptom = (symptom: string): Medicine[] => {
    const input = symptom.toLowerCase();
    if (input.includes('headache') || input.includes('matha') || input.includes('sar dard')) {
      return SYMPTOM_MAPPINGS.headache;
    } else if (input.includes('fever') || input.includes('jwara') || input.includes('bukhar')) {
      return SYMPTOM_MAPPINGS.fever;
    } else if (input.includes('cold') || input.includes('thanda') || input.includes('sardi')) {
      return SYMPTOM_MAPPINGS.cold;
    } else if (input.includes('cough') || input.includes('kashi') || input.includes('khansi')) {
      return SYMPTOM_MAPPINGS.cough;
    } else if (input.includes('stomach') || input.includes('peta') || input.includes('pet dard')) {
      return SYMPTOM_MAPPINGS.stomach;
    }
    return SYMPTOM_MAPPINGS.headache; // Default
  };

  const handleMedicineOnlySearch = (overrideSymptom?: string) => {
    const symptom = overrideSymptom || symptomInput;
    if (!symptom.trim()) return;
    setIsAnalyzing(true);

    const performAISearch = async () => {
      try {
        // Step 1: Local Quick Search (Fastest)
        const localQuery = symptom.toLowerCase();
        const allLocalMeds = Object.values(SYMPTOM_MAPPINGS).flat();
        const localResults = allLocalMeds.filter(med => 
          med.name.toLowerCase().includes(localQuery) || 
          med.generic.toLowerCase().includes(localQuery)
        );

        if (isMedicineSearch && localResults.length > 0) {
          const uniqueMeds = Array.from(new Map(localResults.map(item => [item.id, item])).values()).map((m: any) => ({ ...m, id: Number(m.id) }));
          setMatchedMedicines(uniqueMeds);
          setIsAnalyzing(false);
          return;
        }

        // Step 2: AI Enhanced Search (Smartest - Universal Prompt)
        const systemPrompt = 'You are a Smart Medical Search Engine. The user will provide a medicine name OR a health symptom. Your job is to analyze the input and return a JSON object with a "meds" array. If it is a symptom, suggest 3-4 common Indian OTC medicines. If it is a medicine name, provide its details and similar alternatives. Each med object must have: "id"(num), "name", "generic", "dosage", and "price"(est in INR). ONLY return JSON.';

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{
              role: 'system',
              content: systemPrompt
            }, {
              role: 'user',
              content: symptom
            }],
            response_format: { type: "json_object" },
            temperature: 0.1
          })
        });
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error.message || "AI Error");
        }

        const parsed = JSON.parse(data.choices[0].message.content);
        
        setIsAnalyzing(false);
        setMatchedMedicines(parsed.meds || []);
        if (!parsed.meds || parsed.meds.length === 0) {
           alert("No matching medicines found. Please check the spelling or try searching by symptoms.");
        }
      } catch (err: any) {
        console.error("Medicine search failed:", err);
        setIsAnalyzing(false);
        // Fallback to static if symptom search
        if (!isMedicineSearch) {
          setMatchedMedicines(getMedicinesForSymptom(symptom));
        } else {
          alert(`Search failed: ${err.message}. Please try again.`);
        }
      }
    };

    performAISearch();
  };

  const handleStartTriage = (overrideSymptom?: string) => {
    const symptom = overrideSymptom || symptomInput;
    if (!symptom.trim()) return;
    setTriageData(prev => ({ ...prev, symptom: symptom, name: userData.name || prev.name, age: userData.age || prev.age }));
    setTriageStep(1);
    setActiveScreen('triage');
  };

  const handleSearch = () => {
    if (symptomInput.trim()) {
      handleStartTriage();
    }
  };

  const handleTriageSubmit = () => {
    setIsAnalyzing(true);
    
    const checkSeverityWithAI = async () => {
      const inputMatch = triageData.symptom.toLowerCase();
      const redFlags = ['heart attack', 'chest pain', 'breathing', 'breath', 'unconscious', 'bleeding', 'stroke', 'paralysis', 'seizure'];
      const hasRedFlags = redFlags.some(flag => inputMatch.includes(flag));

      if (hasRedFlags || triageData.severity >= 9) {
        setIsAnalyzing(false);
        const redFlagData = {
          ...triageData,
          isSerious: true,
          aiAnalysis: "SYSTEM ALERT: Life-threatening emergency detected via Red-Flag keyword/severity check.",
          aiStatus: "CRITICAL"
        };
        logToAirtable(redFlagData);
        setActiveScreen('hospitals');
        return;
      }

      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{
              role: 'system',
              content: 'You are an Emergency Triage Specialist. SAFETY FIRST. If there is ANY chance of a life-threatening condition (chest pain, stroke symptoms, respiratory distress, severe injury), you MUST mark "isSerious": true and "suggestion": "CRITICAL". Do not underestimate symptoms. Reply with a JSON object containing "isSerious" (boolean), "aiAnalysis" (string - brief clinical summary), and "suggestion" (string - CRITICAL, URGENT, or ROUTINE). Only return JSON.'
            }, {
              role: 'user',
              content: `Symptom: ${triageData.symptom}, User-Rated Severity: ${triageData.severity}/10, Duration: ${triageData.duration}, History: ${triageData.allergies}`
            }],
            response_format: { type: "json_object" },
            temperature: 0.1
          })
        });
        const result = await res.json();
        const aiResponse = JSON.parse(result.choices[0].message.content);
        
        setIsAnalyzing(false);
        
        const enhancedData = {
          ...triageData,
          isSerious: aiResponse.isSerious,
          aiAnalysis: aiResponse.aiAnalysis,
          aiStatus: aiResponse.suggestion
        };

        if (aiResponse.isSerious) {
          logToAirtable(enhancedData);
          setActiveScreen('hospitals');
        } else {
          setMatchedMedicines(getMedicinesForSymptom(triageData.symptom));
          setActiveScreen('medicines');
        }
      } catch (err) {
        console.error("AI Triage Failed:", err);
        setIsAnalyzing(false);
        // Fallback to basic logic
        const isSeriousFallback = triageData.severity >= 7;
        if (isSeriousFallback) {
          logToAirtable(triageData);
          setActiveScreen('hospitals');
        } else {
          setMatchedMedicines(getMedicinesForSymptom(triageData.symptom));
          setActiveScreen('medicines');
        }
      }
    };

    checkSeverityWithAI();
  };

  const handleChipClick = (chip: typeof CHIPS[0]) => {
    setSymptomInput(chip.en);
    handleStartTriage(chip.en);
  };

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
  };

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 250, 2000));
  };

  const markCourseTaken = () => {
    if (!courseTaken) {
      setCourseTaken(true);
      setCourseProgress(prev => Math.min(prev + 20, 100));
      setStreak(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden bg-warm-white shadow-2xl">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100/50">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20"
          >
            <Heart size={28} fill="currentColor" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-display font-black text-primary tracking-tighter leading-none italic">MediSetu</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                      <p className="text-[8px] text-gray-400 font-mono font-black uppercase tracking-[0.3em]">Hyperlocal Intelligence</p>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-200/50 backdrop-blur-sm relative">
          {['en', 'or', 'hi'].map((lang) => (
            <button 
              key={lang}
              onClick={() => setLanguage(lang as Language)}
              className={`relative px-3 py-1.5 text-[10px] rounded-lg font-black transition-all duration-300 z-10 ${language === lang ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {language === lang && (
                <motion.div 
                  layoutId="lang-bg"
                  className="absolute inset-0 bg-white rounded-lg shadow-md shadow-gray-200/50 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {lang === 'en' ? 'EN' : lang === 'or' ? 'ଓଡ଼ି' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        <AnimatePresence mode="wait">
          {activeScreen === 'intro' && (
            <IntroScreen 
              t={t} 
              onComplete={() => {
                setHasSeenIntro(true);
                setActiveScreen('onboarding');
              }} 
            />
          )}

          {activeScreen === 'onboarding' && (
            <OnboardingScreen 
              t={t} 
              userData={userData}
              onUpdate={(data) => setUserData(prev => ({ ...prev, ...data }))}
              onComplete={() => {
                setHasOnboarded(true);
                setActiveScreen('home');
                setShowInstructions(true);
              }} 
            />
          )}

          {activeScreen === 'home' && (
            <motion.div 
              key="home"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-6 space-y-10"
            >
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 32 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-[1px] bg-primary/30" 
                    />
                    <p className="text-primary font-mono font-black text-[10px] uppercase tracking-[0.2em]">{t('bhubaneswarEdition')}</p>
                  </div>
                  <h2 className="text-4xl font-display font-black text-gray-900 leading-[1] tracking-tight">
                    {t('howFeeling')}
                  </h2>
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <motion.div 
                    animate={{ 
                      opacity: [0.1, 0.2, 0.1],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-[60px] blur-3xl -z-10" 
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[40px] blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
                  <textarea
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    placeholder={t('placeholder')}
                    className="relative w-full h-52 p-8 rounded-[36px] bg-white border border-gray-100 focus:border-primary/20 transition-all text-xl font-medium resize-none shadow-2xl shadow-gray-200/40 placeholder:text-gray-300 leading-relaxed focus:ring-4 focus:ring-primary/5 outline-none"
                  />
                  <div className="absolute bottom-8 right-8 flex gap-4 items-center">
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 10, backgroundColor: "rgba(var(--color-primary-rgb), 0.1)", color: "var(--color-primary)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSymptomInput('')}
                      className="p-4 bg-gray-50 text-gray-400 rounded-2xl transition-all border border-gray-100"
                    >
                      <X size={24} />
                    </motion.button>
                    <motion.button 
                      onClick={handleSearch}
                      animate={{ 
                        scale: symptomInput.length > 0 ? 1.1 : 1,
                        backgroundColor: symptomInput.length > 0 ? "var(--color-primary)" : "rgba(var(--color-primary-rgb), 0.05)",
                        color: symptomInput.length > 0 ? "#ffffff" : "rgba(var(--color-primary-rgb), 0.2)"
                      }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/10 transition-colors shadow-lg shadow-primary/10"
                    >
                      <Search size={28} />
                    </motion.button>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <motion.div variants={itemVariants} className="flex justify-between items-center px-2">
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">{t('commonSymptoms')}</p>
                    <div className="h-[1px] flex-1 mx-4 bg-gray-100" />
                  </motion.div>
                  <motion.div 
                    variants={containerVariants}
                    className="flex flex-wrap gap-3"
                  >
                    {CHIPS.map(chip => (
                      <motion.button
                        key={chip.id}
                        variants={itemVariants}
                        whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(11, 110, 110, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChipClick(chip)}
                        className="px-6 py-3.5 rounded-[20px] bg-white border border-gray-100 text-sm font-black text-gray-700 hover:border-primary/30 hover:text-primary hover:bg-primary/[0.02] transition-all shadow-sm flex items-center gap-3 active:scale-95 group"
                      >
                        <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">{chip.icon}</span>
                        {language === 'or' ? chip.or : language === 'hi' ? chip.hi : chip.en}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </div>

                {/* Removed 3 Stores and 2km cards as requested */}

              <div className="space-y-6">
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(11, 110, 110, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartTriage}
                  disabled={!symptomInput.trim()}
                  className="w-full py-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 active:scale-[0.97] transition-all disabled:opacity-30 disabled:grayscale relative overflow-hidden group"
                >
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" 
                  />
                  <span className="relative z-10">Analyze & Find Medicine</span>
                  <ChevronRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="p-6 rounded-[32px] bg-gray-900 text-white flex gap-5 items-start shadow-2xl shadow-gray-900/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                    <Info className="text-accent" size={24} />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Safety Protocol</p>
                    <p className="text-[12px] text-gray-400 leading-relaxed font-medium">
                      MediSetu uses AI for OTC suggestions. For emergencies, please visit the <span className="text-white font-black underline decoration-accent decoration-2 underline-offset-8">Hospital Recommendations</span> section immediately.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === 'triage' && (
            <motion.div 
              key="triage"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-6 space-y-10"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <motion.p 
                      key={`step-label-${triageStep}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">{t('step')} 0{triageStep}/03</motion.p>
                    <motion.h2 
                      key={`step-title-${triageStep}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-black text-gray-900 tracking-tighter italic">
                      {triageStep === 1 ? t('patientInfo') : triageStep === 2 ? t('symptomDetails') : t('medicalHistory')}
                    </motion.h2>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i} 
                        initial={false}
                        animate={{ 
                          width: i === triageStep ? 48 : 12,
                          backgroundColor: i <= triageStep ? "var(--color-primary)" : "var(--color-gray-100)"
                        }}
                        className="h-1.5 rounded-full transition-all duration-500" 
                      />
                    ))}
                  </div>
                </div>
                <motion.p 
                  key={`step-desc-${triageStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-400 font-medium leading-relaxed max-w-[80%]">
                  {triageStep === 1 ? 'Basic information to identify the patient.' : triageStep === 2 ? 'Tell us more about how you feel.' : 'Any background that might affect treatment.'}
                </motion.p>
              </motion.div>

              <AnimatePresence mode="wait">
                {triageStep === 1 && (
                  <motion.div 
                    key="step1"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 space-y-3">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <motion.div 
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2 h-2 bg-primary/20 rounded-full" 
                          /> {t('patientName')}
                        </label>
                        <input 
                          type="text" 
                          placeholder="Full name"
                          className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm placeholder:text-gray-300 focus:ring-4 focus:ring-primary/5 outline-none"
                          value={triageData.name}
                          onChange={e => setTriageData({...triageData, name: e.target.value})}
                        />
                      </div>
                      <div className="col-span-1 space-y-3">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary/20 rounded-full" /> {t('age')}
                        </label>
                        <input 
                          type="number" 
                          placeholder="Years"
                          className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm placeholder:text-gray-300 focus:ring-4 focus:ring-primary/5 outline-none"
                          value={triageData.age}
                          onChange={e => setTriageData({...triageData, age: e.target.value})}
                        />
                      </div>
                      <div className="col-span-1 space-y-3">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary/20 rounded-full" /> {t('gender')}
                        </label>
                        <div className="relative">
                          <select 
                            className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm appearance-none pr-10 focus:ring-4 focus:ring-primary/5 outline-none"
                            value={triageData.gender}
                            onChange={e => setTriageData({...triageData, gender: e.target.value})}
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                          <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {triageStep === 2 && (
                  <motion.div 
                    key="step2"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6 p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-orange-500 to-red-500 opacity-20" />
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">{t('symptomSeverity')}</label>
                        <motion.span 
                          key={triageData.severity}
                          initial={{ scale: 1.5, color: "#ff0000" }}
                          animate={{ scale: 1, color: "var(--color-primary)" }}
                          className="font-mono text-2xl font-black text-primary tracking-tighter">{triageData.severity.toString().padStart(2, '0')}</motion.span>
                      </div>
                      <div className="relative py-4">
                        <input 
                          type="range" 
                          min="1" max="10" 
                          className="w-full accent-primary h-2 bg-gray-100 rounded-full appearance-none cursor-pointer"
                          value={triageData.severity}
                          onChange={e => setTriageData({...triageData, severity: parseInt(e.target.value)})}
                        />
                        <div className="absolute -bottom-2 left-0 w-full flex justify-between px-1">
                          {[...Array(10)].map((_, i) => (
                            <motion.div 
                              key={i} 
                              animate={{ 
                                scale: i + 1 <= triageData.severity ? 1.2 : 1,
                                opacity: i + 1 <= triageData.severity ? 1 : 0.3
                              }}
                              className={`w-1 h-1 rounded-full ${i + 1 <= triageData.severity ? 'bg-primary' : 'bg-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-black uppercase tracking-widest">
                        <span className={triageData.severity <= 3 ? 'text-green-500' : 'text-gray-300'}>{t('mild')}</span>
                        <span className={triageData.severity > 3 && triageData.severity <= 7 ? 'text-orange-500' : 'text-gray-300'}>{t('moderate')}</span>
                        <span className={triageData.severity > 7 ? 'text-red-500' : 'text-gray-300'}>{t('severe')}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">{t('duration')}</label>
                      <div className="relative">
                        <select 
                          className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm appearance-none pr-10 focus:ring-4 focus:ring-primary/5 outline-none"
                          value={triageData.duration}
                          onChange={e => setTriageData({...triageData, duration: e.target.value})}
                        >
                          <option>Less than 1 day</option>
                          <option>1-3 days</option>
                          <option>More than 3 days</option>
                          <option>Chronic (Weeks/Months)</option>
                        </select>
                        <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {triageStep === 3 && (
                  <motion.div 
                    key="step3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">{t('knownAllergies')}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Penicillin, Dust"
                          className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm placeholder:text-gray-300 focus:ring-4 focus:ring-primary/5 outline-none"
                          value={triageData.allergies}
                          onChange={e => setTriageData({...triageData, allergies: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">{t('currentMedications')}</label>
                        <input 
                          type="text" 
                          placeholder="List any ongoing medicines"
                          className="w-full p-5 rounded-2xl bg-white border border-gray-100 text-base font-bold focus:border-primary/20 transition-all shadow-sm placeholder:text-gray-300 focus:ring-4 focus:ring-primary/5 outline-none"
                          value={triageData.medications}
                          onChange={e => setTriageData({...triageData, medications: e.target.value})}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants} className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "var(--color-gray-200)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (triageStep > 1) setTriageStep(triageStep - 1);
                    else setActiveScreen('home');
                  }}
                  className="p-6 bg-gray-100 text-gray-400 rounded-[24px] transition-all"
                >
                  <ChevronRight size={24} className="rotate-180" />
                </motion.button>
                {triageStep < 3 ? (
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(var(--color-primary-rgb), 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTriageStep(triageStep + 1)}
                    className="flex-1 py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 transition-all"
                  >
                    {t('nextStep')}
                    <ChevronRight size={24} />
                  </motion.button>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(var(--color-primary-rgb), 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTriageSubmit}
                    disabled={isAnalyzing}
                    className="flex-1 py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        {t('analyzing')}
                      </>
                    ) : (
                      <>
                        {t('generateAssessment')}
                        <CheckCircle2 size={24} />
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeScreen === 'hospitals' && (
            <motion.div 
              key="hospitals"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-6 space-y-10 pb-32"
            >
              <ViewToggle mode={viewMode} onChange={setViewMode} t={t} />

              <AnimatePresence mode="wait">
                {viewMode === 'map' ? (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <MapPlaceholder items={HOSPITALS} type="hospitals" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div className="p-8 rounded-[40px] bg-gray-900 text-white shadow-2xl shadow-gray-900/40 space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse" />
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center shadow-xl shadow-red-600/20 animate-bounce">
                          <Info size={32} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-black text-red-500 uppercase tracking-[0.3em]">{t('criticalAlert')}</p>
                          <h2 className="text-2xl font-display font-black tracking-tighter italic">{t('seriousCondition')}</h2>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-400 font-medium">
                        {t('seriousNote')}
                      </p>
                      <div className="h-[1px] w-full bg-white/10" />
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        {t('immediateAttention')}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-red-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-4 shadow-xl shadow-red-600/30"
                      >
                        <Phone size={24} /> {t('callEmergency')}
                      </motion.button>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center px-2">
                        <h3 className="font-display font-black text-xl text-gray-900 tracking-tighter italic">{t('recommendedHospitals')}</h3>
                        <div className="h-[1px] flex-1 mx-6 bg-gray-100" />
                      </div>
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                      >
                        {HOSPITALS.map((hosp, idx) => (
                          <motion.div 
                            key={hosp.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            onClick={() => setSelectedHospital(hosp)}
                            className="p-6 rounded-[36px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 space-y-5 group hover:border-primary/20 transition-all cursor-pointer active:scale-95"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="font-display font-black text-xl text-primary tracking-tighter leading-none group-hover:text-red-600 transition-colors">{hosp.name}</h4>
                                <p className="text-[10px] text-gray-400 font-mono font-black uppercase tracking-widest">{hosp.type}</p>
                              </div>
                              <span className="text-[10px] font-mono font-black text-red-600 bg-red-50 px-4 py-2 rounded-2xl border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                {hosp.distance}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-white transition-colors">
                                <Navigation size={16} className="text-primary" />
                                <span className="text-[11px] font-bold text-gray-600">{hosp.location}</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 border border-green-100 group-hover:bg-white transition-colors">
                                <CheckCircle2 size={16} className="text-green-600" />
                                <span className="text-[11px] font-bold text-green-600">{hosp.emergency}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {['Cardiology', 'Emergency', 'ICU'].map(tag => (
                                <span key={tag} className="text-[8px] font-black px-2 py-1 bg-gray-100 text-gray-400 rounded-lg uppercase tracking-widest group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(hosp.mapsUrl, '_blank');
                              }}
                              className="w-full py-4 bg-primary text-white rounded-[20px] font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all"
                            >
                              <Navigation size={18} /> {t('getDirections')}
                            </motion.button>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => setActiveScreen('home')}
                className="w-full py-6 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-primary transition-colors"
              >
                {t('backToDashboard')}
              </button>
            </motion.div>
          )}

          {activeScreen === 'medicines' && (
            <motion.div 
              key="medicines"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-6 space-y-10 pb-32"
            >
              {/* Medicine Search Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex bg-gray-100 p-1 rounded-2xl w-full shadow-inner">
                    <button 
                      onClick={() => { setIsMedicineSearch(false); setMatchedMedicines([]); }}
                      className={`flex-1 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${!isMedicineSearch ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                    >
                      Search by Symptom
                    </button>
                    <button 
                      onClick={() => { setIsMedicineSearch(true); setMatchedMedicines([]); }}
                      className={`flex-1 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${isMedicineSearch ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                    >
                      Search by Medicine Name
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary font-mono font-black text-[10px] uppercase tracking-[0.2em]">{t('meds')}</p>
                    <h2 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">
                      {isMedicineSearch ? 'Which medicine are you looking for?' : t('howFeeling')}
                    </h2>
                  </div>
                </div>
                
                <div className="relative group">
                  <motion.div 
                    animate={{ 
                      opacity: [0.05, 0.1, 0.05],
                      scale: [1, 1.01, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-2 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-[32px] blur-xl -z-10" 
                  />
                  <textarea
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    placeholder={isMedicineSearch ? "e.g. Crocin, Dolo, Cetirizine..." : t('placeholder')}
                    className="w-full p-6 rounded-[28px] bg-white border border-gray-100 focus:border-primary/20 transition-all text-lg font-medium resize-none shadow-xl shadow-gray-200/20 placeholder:text-gray-300 outline-none leading-relaxed"
                    rows={isMedicineSearch ? 1 : 3}
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {symptomInput && (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSymptomInput('');
                          setMatchedMedicines([]);
                        }}
                        className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center border border-gray-100"
                      >
                        <X size={18} />
                      </motion.button>
                    )}
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleMedicineOnlySearch}
                      disabled={isAnalyzing}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${symptomInput ? 'bg-primary text-white shadow-primary/20' : 'bg-gray-100 text-gray-300'}`}
                    >
                      {isAnalyzing ? <Loader2 className="animate-spin" size={22} /> : <Search size={22} />}
                    </motion.button>
                  </div>
                </div>

                {matchedMedicines.length === 0 && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] px-2">{t('commonSymptoms')}</p>
                    <div className="flex flex-wrap gap-2">
                      {CHIPS.map(chip => (
                        <motion.button
                          key={chip.id}
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSymptomInput(chip.en);
                            handleMedicineOnlySearch(chip.en);
                          }}
                          className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-xs font-bold text-gray-600 hover:border-primary/30 hover:text-primary transition-all shadow-sm flex items-center gap-2"
                        >
                          <span>{chip.icon}</span>
                          {language === 'or' ? chip.or : language === 'hi' ? chip.hi : chip.en}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {matchedMedicines.length > 0 && (
                <>
                  <motion.div 
                    variants={itemVariants}
                    className="p-8 rounded-[40px] bg-green-50 border border-green-100 shadow-xl shadow-green-100/20 space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-600/20"
                      >
                        <CheckCircle2 size={24} />
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-mono font-black text-green-600 uppercase tracking-[0.2em]">{t('assessmentComplete')}</p>
                        <h3 className="text-xl font-display font-black text-green-900 tracking-tighter italic">{t('minorCondition')}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 leading-relaxed font-medium relative z-10">
                      {t('minorNote')}
                    </p>
                  </motion.div>

                  <div className="space-y-6">
                    <motion.div variants={itemVariants} className="flex justify-between items-center px-2">
                      <h2 className="text-2xl font-display font-black text-gray-900 tracking-tighter italic">{t('suggestedMedicines')}</h2>
                      <div className="h-[1px] flex-1 mx-6 bg-gray-100" />
                      <span className="text-[10px] font-mono font-black px-3 py-1.5 bg-green-100 text-green-700 rounded-xl border border-green-200 shadow-sm">{t('otcOnly')}</span>
                    </motion.div>

                    <div className="space-y-6">
                      {matchedMedicines.map((med, idx) => (
                        <motion.div 
                          key={med.id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, y: -4, boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.1)" }}
                          onClick={() => setSelectedMedicine(med)}
                          className="p-6 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 flex justify-between items-center group hover:border-primary/20 transition-all relative overflow-hidden cursor-pointer active:scale-95"
                        >
                          <motion.div 
                            animate={{ 
                              opacity: [0.05, 0.1, 0.05],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-[60px] blur-3xl -z-10" 
                          />
                          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                          
                          <div className="space-y-2 relative z-10">
                            <div className="space-y-0.5">
                              <h3 className="font-display font-black text-2xl text-gray-900 tracking-tighter leading-none group-hover:text-primary transition-colors">{med.name}</h3>
                              <p className="text-[10px] text-gray-400 font-mono font-black uppercase tracking-widest">{med.generic}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-[10px] font-mono font-black text-primary bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">{med.dosage}</span>
                              <span className="text-xl font-mono font-black text-accent tracking-tighter italic">₹{med.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-4 relative z-10">
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2 text-[9px] font-mono font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100"
                            >
                              <motion.div 
                                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-1.5 h-1.5 bg-green-500 rounded-full" 
                              />
                              {t('inStock')}
                            </motion.span>
                            <motion.button 
                              whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "var(--color-primary)" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart({ name: med.name, dosage: med.dosage, estPrice: med.price });
                                alert(`Added ${med.name} to your cart!`);
                              }}
                              className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-gray-900/20 transition-colors"
                            >
                              <ShoppingBag size={24} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-2">
                        <h3 className="font-display font-black text-xl text-gray-900 tracking-tighter italic">{t('availableAt')}</h3>
                        <div className="h-[1px] flex-1 mx-6 bg-gray-100" />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {STORES.slice(0, 3).map((store) => (
                          <motion.div 
                            key={store.id}
                            whileHover={{ scale: 1.01 }}
                            className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex justify-between items-center group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                <StoreIcon size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-gray-900">{store.name}</h4>
                                <p className="text-[10px] text-gray-400 font-mono">{store.location} • {store.distance}</p>
                              </div>
                            </div>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.location)}`, '_blank')}
                              className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center"
                            >
                              <Navigation size={18} />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveScreen('stores')}
                      className="w-full py-6 bg-white border-2 border-primary/20 text-primary rounded-[28px] font-black text-lg flex items-center justify-center gap-4 hover:bg-primary/5 transition-all shadow-xl shadow-primary/5 group"
                    >
                      <span className="group-hover:translate-x-[-4px] transition-transform">{t('meds')} {t('stores')}</span>
                      <ChevronRight size={24} className="group-hover:translate-x-[4px] transition-transform" />
                    </motion.button>
                  </motion.div>
                </>
              )}

              <button 
                onClick={() => setActiveScreen('home')}
                className="w-full py-6 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-primary transition-colors"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}

          {activeScreen === 'stores' && (
            <motion.div 
              key="stores"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8 pb-32"
            >
              <div className="px-6 pt-8">
                <ViewToggle mode={viewMode} onChange={setViewMode} t={t} />
              </div>

              <AnimatePresence mode="wait">
                {viewMode === 'map' ? (
                  <div className="px-6" key="map">
                    <MapPlaceholder items={STORES} type="stores" />
                  </div>
                ) : (
                  <div className="space-y-8" key="list">
                    {/* Modern Map Placeholder (Small) */}
                    <motion.div 
                      variants={itemVariants}
                      className="h-48 bg-gray-100 relative overflow-hidden rounded-b-[48px] shadow-2xl shadow-primary/10"
                    >
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0B6E6E_2px,transparent_2px)] [background-size:32px_32px]"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center space-y-2">
                          <Navigation className="text-primary/40 mx-auto" size={24} />
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em]">
                            Map View Available
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="px-6 space-y-6">
                      <motion.div variants={itemVariants} className="flex justify-between items-end px-2">
                        <div>
                          <p className="text-[10px] font-mono font-black text-primary uppercase tracking-widest mb-1">{t('nearbySupport')}</p>
                          <h2 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">{t('pharmacies')}</h2>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono font-black text-gray-400">
                          <motion.div 
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2 h-2 bg-green-500 rounded-full" 
                          />
                          {STORES.length} {t('storesOpenCount')}
                        </div>
                      </motion.div>
                      
                      <div className="space-y-6">
                        {STORES.map((store, idx) => (
                          <motion.div 
                            key={store.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, y: -4, boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.1)" }}
                            className="p-6 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 space-y-6 group hover:border-primary/20 transition-all relative overflow-hidden active:scale-95"
                          >
                            <motion.div 
                              animate={{ 
                                opacity: [0.05, 0.1, 0.05],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-[60px] blur-3xl -z-10" 
                            />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            
                            <div className="flex justify-between items-start relative z-10">
                              <div className="space-y-1">
                                <h3 className="font-display font-black text-xl text-gray-900 tracking-tighter leading-tight group-hover:text-primary transition-colors">{store.name}</h3>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono font-black uppercase tracking-wider">
                                  <Navigation size={10} className="group-hover:text-primary transition-colors" />
                                  {store.location} • {store.distance}
                                </div>
                                <p className="text-[9px] text-primary font-mono font-black mt-2 bg-primary/5 px-2 py-0.5 rounded-full inline-block uppercase tracking-widest">
                                  {t('manager')}: {store.owner}
                                </p>
                              </div>
                              <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="flex items-center gap-1.5 bg-accent text-white px-3 py-1.5 rounded-2xl font-mono font-black text-xs shadow-lg shadow-accent/20 cursor-default"
                              >
                                <span>{store.rating}</span>
                                <Heart size={12} fill="currentColor" />
                              </motion.div>
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-10">
                              {Object.entries(store.stock).map(([item, available]) => (
                                <motion.span 
                                  key={item}
                                  whileHover={{ scale: 1.05 }}
                                  className={`text-[9px] font-mono font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest transition-colors ${available ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100' : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'}`}
                                >
                                  {item} {available ? '✓' : '✗'}
                                </motion.span>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-3 relative z-10">
                              <motion.button 
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: "var(--color-primary)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCallingStore(store.name)}
                                className="py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 transition-all"
                              >
                                <Phone size={14} /> {t('call')}
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: "#000000" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.location)}`, '_blank')}
                                className="py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 transition-all"
                              >
                                <Navigation size={14} /> {t('map')}
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: "var(--color-accent)" }}
                                whileTap={{ scale: 0.95 }}
                                className="py-4 bg-accent text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-all"
                              >
                                <ShoppingBag size={14} /> {t('order')}
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              {/* RPA Footer */}
              <motion.footer 
                variants={itemVariants}
                className="px-6 py-12 bg-gray-50/50 border-t border-gray-100 space-y-8"
              >
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/10 space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">System Status</p>
                      <h4 className="text-lg font-display font-black text-gray-900 tracking-tighter italic">RPA Inventory Bot</h4>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                      <motion.div 
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span className="text-[9px] font-mono font-black text-green-600 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <p className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Last Sync</p>
                      <p className="text-sm font-mono font-black text-primary tracking-tighter">2 mins ago</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                      <p className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Alerts Sent</p>
                      <p className="text-sm font-mono font-black text-accent tracking-tighter">2 Stores</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic relative z-10">
                    "Weekly Insight: Paracetamol demand in Bhubaneswar has increased by 40% compared to last week."
                  </p>
                </motion.div>
                <div className="flex flex-col items-center justify-center gap-3 opacity-30">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Infrastructure Powered By</p>
                  <div className="flex items-center gap-4 grayscale">
                    <div className="h-6 w-24 bg-gray-400 rounded-lg"></div>
                    <div className="h-6 w-24 bg-gray-400 rounded-lg"></div>
                  </div>
                </div>
              </motion.footer>
            </motion.div>
          )}

          {activeScreen === 'tracker' && (
            <motion.div 
              key="tracker"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="p-6 space-y-10 pb-32"
            >
              <motion.div 
                variants={itemVariants}
                className="flex justify-between items-end px-2"
              >
                <div>
                  <p className="text-[10px] font-mono font-black text-primary uppercase tracking-widest mb-1">Daily Progress</p>
                  <h2 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">Health Tracker</h2>
                  {userData.name && (
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">For {userData.name}</p>
                  )}
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl font-mono font-black text-sm border border-orange-100 shadow-lg shadow-orange-100/50 cursor-default"
                >
                  <Flame size={18} fill="currentColor" className="animate-pulse" />
                  {streak} DAYS
                </motion.div>
              </motion.div>

              {/* User Health Profile Summary */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-3"
              >
                <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/10 flex flex-col items-center justify-center space-y-1">
                  <p className="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Age</p>
                  <p className="text-sm font-mono font-black text-primary">{userData.age || '--'}y</p>
                </div>
                <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/10 flex flex-col items-center justify-center space-y-1">
                  <p className="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Weight</p>
                  <p className="text-sm font-mono font-black text-accent">{userData.weight || '--'}kg</p>
                </div>
                <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/10 flex flex-col items-center justify-center space-y-1">
                  <p className="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Blood</p>
                  <p className="text-sm font-mono font-black text-red-500">{userData.bloodGroup || '--'}</p>
                </div>
              </motion.div>

              {/* Premium Medicine Course Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-8 rounded-[48px] bg-primary text-white shadow-2xl shadow-primary/30 space-y-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full -ml-16 -mb-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-black text-white/60 uppercase tracking-[0.3em]">Current Treatment</p>
                    <h3 className="text-2xl font-display font-black tracking-tighter italic">Antibiotic Course</h3>
                    <p className="text-xs font-mono font-medium text-white/80">Day 3 of 5 • {courseProgress}% Complete</p>
                  </div>
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20"
                  >
                    <Pill size={28} className="text-white" />
                  </motion.div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${courseProgress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono font-black uppercase tracking-widest text-white/40">
                    <span>Started</span>
                    <span>Finishing in 2 days</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 relative z-10 border-t border-white/10">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest">Next Dose</p>
                    <p className="text-lg font-display font-black tracking-tighter italic">8:00 PM Tonight</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markCourseTaken}
                    disabled={courseTaken}
                    className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${courseTaken ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-primary shadow-white/20 hover:bg-accent hover:text-white hover:shadow-accent/20'}`}
                  >
                    {courseTaken ? '✓ Taken' : 'Mark Taken'}
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 gap-6"
              >
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.1)" }}
                  className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 flex flex-col items-center justify-center space-y-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="#f8fafc" strokeWidth="10" />
                      <motion.circle 
                        cx="56" cy="56" r="48" fill="transparent" stroke="#0ea5e9" strokeWidth="10" 
                        strokeDasharray="301.6"
                        initial={{ strokeDashoffset: 301.6 }}
                        animate={{ strokeDashoffset: 301.6 - (301.6 * waterIntake) / 2000 }}
                        strokeLinecap="round"
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-1"
                      >
                        <Droplets className="text-blue-500" size={20} />
                      </motion.div>
                      <span className="text-xl font-mono font-black text-gray-900 tracking-tighter">{(waterIntake / 1000).toFixed(1)}L</span>
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative z-10">
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Water Intake</p>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={addWater}
                      className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"
                    >
                      <Plus size={24} />
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.1)" }}
                  className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 flex flex-col items-center justify-center space-y-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" fill="transparent" stroke="#f8fafc" strokeWidth="10" />
                      <motion.circle 
                        cx="56" cy="56" r="48" fill="transparent" stroke="#f97316" strokeWidth="10" 
                        strokeDasharray="301.6"
                        initial={{ strokeDashoffset: 301.6 }}
                        animate={{ strokeDashoffset: 301.6 - (301.6 * streak) / 30 }}
                        strokeLinecap="round"
                        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-1"
                      >
                        <Flame className="text-orange-500" size={20} fill="currentColor" />
                      </motion.div>
                      <span className="text-xl font-mono font-black text-gray-900 tracking-tighter">{streak}d</span>
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative z-10">
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Recovery Streak</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          className={`w-1.5 h-1.5 rounded-full ${i <= streak ? 'bg-orange-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Reminders Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xl font-black text-gray-900 tracking-tighter italic">Daily Reminders</h3>
                  <div className="h-[1px] flex-1 mx-6 bg-gray-100" />
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest">Edit All</button>
                </div>
                <div className="space-y-4">
                  {reminders.map((reminder, idx) => (
                    <motion.div 
                      key={reminder.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => toggleReminder(reminder.id)}
                      className={`p-6 rounded-[32px] border transition-all flex items-center justify-between cursor-pointer group relative overflow-hidden ${reminder.taken ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/10 hover:border-primary/20'}`}
                    >
                      <div className="flex items-center gap-5 relative z-10">
                        <motion.div 
                          animate={reminder.taken ? { scale: [1, 1.2, 1] } : {}}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${reminder.taken ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20' : 'border-gray-200 bg-gray-50'}`}
                        >
                          {reminder.taken ? <CheckCircle2 size={20} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                        </motion.div>
                        <div>
                          <p className={`text-lg font-black tracking-tighter leading-tight transition-all ${reminder.taken ? 'text-green-700/50 line-through' : 'text-gray-900'}`}>{reminder.text}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{reminder.time}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className={`transition-all ${reminder.taken ? 'text-green-300' : 'text-gray-300 group-hover:translate-x-1'}`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === 'pharmacy' && <PharmacyScreen t={t} addToCart={addToCart} />}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 left-0 right-0 z-40 px-6 max-w-md mx-auto pointer-events-none"
      >
        <nav className="bg-gray-900/90 backdrop-blur-2xl border border-white/10 px-6 py-3 flex justify-between items-center rounded-[32px] shadow-2xl shadow-black/40 pointer-events-auto relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
          <NavButton 
            active={activeScreen === 'home' || activeScreen === 'triage' || activeScreen === 'hospitals'} 
            onClick={() => setActiveScreen('home')} 
            icon={<Home size={22} />} 
            label="Home" 
          />
          <NavButton 
            active={activeScreen === 'medicines'} 
            onClick={() => setActiveScreen('medicines')} 
            icon={<Pill size={22} />} 
            label="Meds" 
          />
          <NavButton 
            active={activeScreen === 'stores'} 
            onClick={() => setActiveScreen('stores')} 
            icon={<StoreIcon size={22} />} 
            label="Stores" 
          />
          <NavButton 
            active={activeScreen === 'pharmacy'} 
            onClick={() => setActiveScreen('pharmacy')} 
            icon={<FileText size={22} />} 
            label="Rx" 
          />
          <NavButton 
            active={activeScreen === 'tracker'} 
            onClick={() => setActiveScreen('tracker')} 
            icon={
              <div className="relative">
                <Heart size={22} />
                {!reminders.every(r => r.taken) && (
                  <motion.span 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-2 border-gray-900 rounded-full"
                  ></motion.span>
                )}
              </div>
            } 
            label="Track" 
          />
        </nav>
      </motion.div>

      {/* Medicine Detail Modal */}
      <AnimatePresence>
        {selectedMedicine && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-6"
            onClick={() => setSelectedMedicine(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md bg-white rounded-[48px] p-10 space-y-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
              
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-4xl font-display font-black text-gray-900 tracking-tighter italic">{selectedMedicine.name}</h3>
                    <p className="text-xs font-mono font-black text-primary uppercase tracking-widest">{selectedMedicine.generic}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedMedicine(null)}
                    className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 space-y-2">
                  <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Dosage</p>
                  <p className="text-xl font-mono font-black text-primary tracking-tighter">{selectedMedicine.dosage}</p>
                </div>
                <div className="p-6 rounded-[32px] bg-accent/10 border border-accent/20 space-y-2">
                  <p className="text-[10px] font-mono font-black text-accent uppercase tracking-widest">Price</p>
                  <p className="text-xl font-mono font-black text-accent tracking-tighter">₹{selectedMedicine.price}</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pharmacist's Note</h4>
                <div className="p-6 rounded-[32px] bg-gray-900 text-white space-y-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
                      <Info size={16} className="text-white" />
                    </div>
                    <p className="text-sm font-black italic">Usage Instructions</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Take one tablet after meals. Do not exceed 3 doses in 24 hours. If symptoms persist for more than 3 days, consult a doctor immediately.
                  </p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedMedicine(null);
                  setActiveScreen('stores');
                }}
                className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
              >
                Find in Nearby Stores
                <ChevronRight size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hospital Detail Modal */}
      <AnimatePresence>
        {selectedHospital && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-6"
            onClick={() => setSelectedHospital(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md bg-white rounded-[48px] p-10 space-y-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -mr-32 -mt-32" />
              
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">{selectedHospital.name}</h3>
                    <p className="text-xs font-mono font-black text-red-600 uppercase tracking-widest">{selectedHospital.type}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedHospital(null)}
                    className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 space-y-2">
                    <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Distance</p>
                    <p className="text-xl font-mono font-black text-primary tracking-tighter">{selectedHospital.distance}</p>
                  </div>
                  <div className="p-6 rounded-[32px] bg-green-50 border border-green-100 space-y-2">
                    <p className="text-[10px] font-mono font-black text-green-600 uppercase tracking-widest">Emergency</p>
                    <p className="text-xl font-mono font-black text-green-600 tracking-tighter">{selectedHospital.emergency}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Available Specialties</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'ENT', 'General Surgery'].map(spec => (
                      <span key={spec} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCallingStore(selectedHospital.name)}
                  className="p-6 rounded-[32px] bg-gray-900 text-white space-y-3 border border-white/10 w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                      <Phone size={16} className="text-white" />
                    </div>
                    <p className="text-sm font-mono font-black italic">Emergency Contact</p>
                  </div>
                  <p className="text-xl font-mono font-black tracking-tighter">+91 674 230 1234</p>
                </motion.button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(selectedHospital.mapsUrl, '_blank');
                }}
                className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
              >
                Get Directions
                <Navigation size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calling Overlay */}
      <AnimatePresence>
        {callingStore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 flex flex-col items-center justify-center p-12 text-white"
          >
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center animate-pulse mb-8">
              <Phone size={48} className="animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Calling...</h2>
            <p className="text-xl font-medium text-center opacity-80">{callingStore}</p>
            
            <button 
              onClick={() => setCallingStore(null)}
              className="mt-16 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 active:scale-90 transition-transform"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-12 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0B6E6E_2px,transparent_2px)] [background-size:40px_40px]"></div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-40 h-40 bg-primary/5 rounded-[48px] flex items-center justify-center relative z-10"
              >
                <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center shadow-2xl shadow-primary/40">
                  <Heart size={48} className="text-white fill-white/20" />
                </div>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20 rotate-12 z-20">
                <Plus size={24} className="text-white" />
              </div>
            </motion.div>

              <div className="mt-12 text-center space-y-4 relative z-10">
                <div className="space-y-1">
                  <h1 className="text-5xl font-display font-black text-gray-900 tracking-tighter italic leading-none">MediSetu</h1>
                  <p className="text-primary font-mono font-black tracking-[0.4em] uppercase text-[10px]">Odisha Health Network</p>
                </div>
              <p className="text-gray-400 font-medium text-xs max-w-[200px] mx-auto leading-relaxed">
                Connecting you to hyperlocal medical intelligence.
              </p>
            </div>
            
            <div className="mt-20 w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>

            <div className="absolute bottom-12 text-[9px] font-mono font-black text-gray-300 uppercase tracking-[0.5em]">
              Initializing Systems
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Loading Screen */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-white"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-white/20 border-t-white rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Search size={40} className="animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-center mb-4">Analyzing Symptoms...</h2>
            <div className="space-y-2 text-center opacity-80">
              <p className="text-sm">Checking medical database</p>
              <p className="text-sm">Assessing severity levels</p>
              <p className="text-sm">Finding best recommendations</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)} 
        t={t} 
      />

      {/* Floating Cart Badge */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button 
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-24 right-6 z-50 w-16 h-16 bg-accent rounded-full shadow-2xl shadow-accent/40 flex items-center justify-center text-gray-900"
          >
            <ShoppingBag size={24} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
              {cart.length}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart/Checkout Overlay */}
      <AnimatePresence>
        {showCart && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end justify-center"
            onClick={() => setShowCart(false)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="w-full max-w-md bg-white rounded-t-[48px] p-8 space-y-6 max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-display font-black text-gray-900 tracking-tighter italic">Your Pharmacy Cart</h3>
                <button onClick={() => setShowCart(false)} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <p className="font-bold text-lg">{item.name}</p>
                      <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">{item.dosage}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono font-black text-primary">₹{item.estPrice}</p>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 p-2"><X size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-6">
                <div className="flex justify-between items-center p-6 bg-primary/5 rounded-[32px] border border-primary/10 transition-all">
                  <p className="text-sm font-black text-gray-500 uppercase tracking-widest">Total Amount</p>
                  <p className="text-3xl font-mono font-black text-primary tracking-tighter italic">₹{cart.reduce((sum, item) => sum + item.estPrice, 0)}</p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={submitOrder}
                  className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
                >
                  Confirm & Order Now <CheckCircle2 size={24} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewToggle({ mode, onChange, t }: { mode: 'list' | 'map', onChange: (mode: 'list' | 'map') => void, t: any }) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-2xl w-fit mx-auto shadow-inner">
      <button
        onClick={() => onChange('list')}
        className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${mode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
      >
        {t('listView')}
      </button>
      <button
        onClick={() => onChange('map')}
        className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${mode === 'map' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
      >
        {t('mapView')}
      </button>
    </div>
  );
}

function MapPlaceholder({ items, type }: { items: any[], type: 'stores' | 'hospitals' }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="h-[500px] bg-gray-100 relative overflow-hidden rounded-[48px] shadow-2xl shadow-primary/10 border-4 border-white"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0B6E6E_2px,transparent_2px)] [background-size:32px_32px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
      
      {/* Animated Map Pins */}
      {items.map((item, idx) => (
        <motion.div 
          key={item.id}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.1 * idx, type: "spring", stiffness: 200 }}
          className="absolute group cursor-pointer"
          style={{ 
            top: `${20 + (idx * 15)}%`, 
            left: `${20 + (idx * 25) % 60}%` 
          }}
        >
          <div className={`w-6 h-6 ${type === 'stores' ? 'bg-primary' : 'bg-red-600'} rounded-full border-4 border-white shadow-xl animate-pulse`} />
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-4 py-2 rounded-2xl shadow-2xl text-[10px] font-black whitespace-nowrap border border-gray-100 z-50"
          >
            {item.name}
            <div className="text-[8px] text-gray-400 mt-0.5">{item.distance} away</div>
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-3">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-primary/20 mx-auto"
          >
            <Navigation className="text-primary" size={40} />
          </motion.div>
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]"
          >
            Hyperlocal Map: Bhubaneswar
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all relative z-10 py-2 px-4 rounded-2xl ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <motion.div
        animate={active ? { 
          scale: 1.2, 
          y: -4,
          filter: "drop-shadow(0 0 12px rgba(var(--color-primary-rgb), 0.6))"
        } : { 
          scale: 1, 
          y: 0,
          filter: "drop-shadow(0 0 0px rgba(0,0,0,0))"
        }}
        whileHover={!active ? { scale: 1.1, y: -2 } : {}}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative"
      >
        {icon}
        {active && (
          <motion.div 
            layoutId="nav-glow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"
          />
        )}
      </motion.div>
      <motion.span 
        animate={{ 
          opacity: active ? 1 : 0.4,
          scale: active ? 1.1 : 1,
          y: active ? -2 : 0
        }}
        className={`text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all`}>
        {label}
      </motion.span>
      {active && (
        <motion.div 
          layoutId="nav-dot"
          className="absolute -bottom-1 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.8)]"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

function IntroScreen({ t, onComplete }: { t: any, onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 space-y-10 flex flex-col items-center justify-center min-h-[80vh] text-center"
    >
      <div className="space-y-4">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mx-auto"
        >
          <Heart size={48} className="text-primary" fill="currentColor" />
        </motion.div>
        <h2 className="text-4xl font-display font-black text-gray-900 tracking-tighter italic">{t('introTitle')}</h2>
        <p className="text-gray-500 font-medium">{t('introSubtitle')}</p>
      </div>

      <div className="space-y-6 w-full">
        <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/10 space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          <h3 className="text-xl font-display font-black text-gray-900 tracking-tighter italic relative z-10">{t('whatIsMedis')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed relative z-10">{t('medisDescription')}</p>
          
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <p className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">{t('whatItDoes')}</p>
              <ul className="space-y-2">
                {t('whatItDoesList').map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-mono font-black text-red-500 uppercase tracking-widest">{t('whatItDoesNotDo')}</p>
              <ul className="space-y-2">
                {t('whatItDoesNotDoList').map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
        >
          {t('getStarted')}
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function OnboardingScreen({ t, userData, onUpdate, onComplete }: { t: any, userData: UserData, onUpdate: (data: Partial<UserData>) => void, onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 space-y-10"
    >
      <div className="space-y-2">
        <h2 className="text-4xl font-display font-black text-gray-900 tracking-tighter italic">{t('onboardingTitle')}</h2>
        <p className="text-gray-500 font-medium">{t('onboardingSubtitle')}</p>
      </div>

      <div className="space-y-6">
        <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/10 space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('patientName')}</label>
              <input 
                type="text" 
                value={userData.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Enter your name"
                className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('age')}</label>
                <input 
                  type="number" 
                  value={userData.age}
                  onChange={(e) => onUpdate({ age: e.target.value })}
                  placeholder="Age"
                  className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('gender')}</label>
                <select 
                  value={userData.gender}
                  onChange={(e) => onUpdate({ gender: e.target.value })}
                  className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('height')} (cm)</label>
                <input 
                  type="number" 
                  value={userData.height}
                  onChange={(e) => onUpdate({ height: e.target.value })}
                  placeholder="Height"
                  className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('weight')} (kg)</label>
                <input 
                  type="number" 
                  value={userData.weight}
                  onChange={(e) => onUpdate({ weight: e.target.value })}
                  placeholder="Weight"
                  className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest px-2">{t('bloodGroup')}</label>
              <select 
                value={userData.bloodGroup}
                onChange={(e) => onUpdate({ bloodGroup: e.target.value })}
                className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] font-black text-lg focus:border-primary/20 focus:bg-white transition-all outline-none appearance-none"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
          >
            {t('saveAndContinue')}
            <ChevronRight size={24} />
          </motion.button>
          <button 
            onClick={onComplete}
            className="w-full py-4 text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-primary transition-colors"
          >
            {t('skip')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function InstructionsModal({ isOpen, onClose, t }: { isOpen: boolean, onClose: () => void, t: any }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-white rounded-[48px] p-10 space-y-8 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Info size={32} className="text-primary" />
              </div>
              <h3 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">{t('instructionsTitle')}</h3>
              
              <div className="space-y-4">
                {t('instructionsList').map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-400 shrink-0 mt-0.5">
                      0{i + 1}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30"
            >
              {t('gotIt')}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PharmacyScreen({ t, addToCart }: { t: any, addToCart: (med: any) => void }) {
  const [view, setView] = React.useState<'prescription' | 'verify'>('prescription');
  const [query, setQuery] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [medicines, setMedicines] = React.useState<any[]>([]); 
  const [loading, setLoading] = React.useState(false);

  const handlePrescriptionAnalysis = async () => {
    if (!query) return;
    setLoading(true);
    setMedicines([]);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{
            role: 'system',
            content: 'Analyze the text as a medical prescription. Return a JSON object with a "summary" string and a "meds" array. Each med object should have "name", "dosage", and "estPrice" (number in INR). Only return JSON.'
          }, {
            role: 'user',
            content: query
          }],
          response_format: { type: "json_object" },
          temperature: 0.1
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      setResponse(parsed.summary);
      setMedicines(parsed.meds || []);
    } catch (err) {
      setResponse('Failed to analyze. Please try typing the medicine names clearly.');
    }
    setLoading(false);
  };

  const handleVerifyMedicine = async () => {
    if (!query) return;
    setLoading(true);
    setMedicines([]);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{
            role: 'system',
            content: 'You are a Medicine Verification Specialist. The user will provide a medicine name or description. Use your medical knowledge to verify its typical purpose, authenticity indicators (e.g. foil type, holographic marks for top brands), and common side effects. Be precise and professional.'
          }, {
            role: 'user',
            content: query
          }],
          temperature: 0.1
        })
      });
      const data = await res.json();
      if (data.error) {
        setResponse(`❌ Verification Failed: ${data.error.message || JSON.stringify(data.error)}`);
        return;
      }
      setResponse(data.choices[0].message.content);
    } catch (err: any) {
      console.error("Verification Error:", err);
      setResponse(`Verification failed. Network or API error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-6 pb-32"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <FileText size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black text-gray-900 tracking-tighter italic">
              {view === 'prescription' ? 'Medicine Ordering' : 'AI Medicine Verifier'}
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-1">
              {view === 'prescription' 
                ? 'Upload prescription text to order instantly' 
                : 'Identify medicines and verify authenticity'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1.5 rounded-[24px] w-full shadow-inner">
        <button 
          onClick={() => { setView('prescription'); setResponse(''); setMedicines([]); }}
          className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${view === 'prescription' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
        >
          Prescription Order
        </button>
        <button 
          onClick={() => { setView('verify'); setResponse(''); setMedicines([]); }}
          className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${view === 'verify' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
        >
          Verify Medicine
        </button>
      </div>

      <div className="p-6 rounded-[32px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={view === 'prescription' ? "Paste prescription text here..." : "Enter medicine name to verify details..."}
          className="w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-primary/50 resize-none font-medium"
        />
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={view === 'prescription' ? handlePrescriptionAnalysis : handleVerifyMedicine}
          disabled={loading || !query}
          className="w-full py-4 bg-primary text-white rounded-[24px] font-black text-lg shadow-xl shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : view === 'prescription' ? 'Analyze & Create Order' : 'Verify Authenticity'}
        </motion.button>
      </div>

      {response && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-[32px] bg-gray-900 text-white border border-white/10 space-y-4 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <p className="text-[10px] font-mono font-black text-accent uppercase tracking-[0.2em]">Pharmacist Report</p>
          </div>
          <div className="text-sm text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
            {response}
          </div>

          {medicines.length > 0 ? (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Available Items</p>
              {medicines.map((med, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-accent transition-all">
                  <div>
                    <p className="font-bold text-base">{med.name}</p>
                    <p className="text-[10px] font-mono text-gray-400">{med.dosage}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-mono font-bold text-accent">₹{med.estPrice}</p>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        addToCart(med);
                        alert(`Added ${med.name} to your cart!`);
                      }}
                      className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-gray-900 shadow-lg shadow-accent/20"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          ) : view === 'prescription' && !loading && (
            <div className="pt-4 border-t border-white/10 text-center space-y-4">
               <p className="text-[10px] font-mono font-black text-gray-400 uppercase">Couldn't extract separate items?</p>
               <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addToCart({ name: "Custom Prescription Order", dosage: query.substring(0, 20) + "...", estPrice: 500 });
                  alert("Generic order added to cart!");
                }}
                className="w-full py-4 bg-white/10 rounded-2xl border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
               >
                 Order Entire Prescription (₹500 Deposit)
               </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
