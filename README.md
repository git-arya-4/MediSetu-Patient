<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🛡️ MediSetu: AI-Driven Health & Pharmacy Intelligence

**MediSetu** is a high-fidelity, end-to-end healthcare ecosystem designed for rapid emergency triage and intelligent pharmacy fulfillment. It bridges the critical gap between early symptom detection and medical intervention using sub-second AI models and cloud-synced databases.

---

## 🚀 Quick Start (Running the Project)

This project consists of two main applications that share a live database.

### 1. Patient Application (Main Dashboard)
The primary interface for patients to assess symptoms, verify medicines, and place orders.
```bash
# From the root directory (mkc)
npm install
npm run dev
```
*   **Default Port**: `3000` (http://localhost:3000)

### 2. Doctor's Command Center (Triage Dashboard)
The professional interface where doctors monitor live patient feeds and authorize treatments.
```bash
# Navigate to the doctor's folder
cd medisetu-doctor's-command-center
npm install
npm run dev -- --port 3001
```
*   **Default Port**: `3001` (http://localhost:3001)

---

## 🏗️ Architecture: How It Works

MediSetu uses a **"Cinema-Glass"** distributed architecture:

1.  **AI Orchestration (Groq Llama 3.1)**:
    *   We use the **Llama-3.1-8b-instant** model via Groq for ultra-low latency.
2.  **Live Database Sync (Airtable)**:
    *   All data is stored in an Airtable Base (`appJnU6QKo8GstVpM`).
    *   Patient triage data -> `Triage_Logs` table.
    *   Doctor dashboard polls this table every 30 seconds for live intervention.
3.  **Pharmacy Intelligence**:
    *   AI extracts structured medicine data from prescriptions.
    *   **Anti-Counterfeit Verifier** checks markers to detect fake medicines.

---

## 🧪 Detailed Features

### 📋 AI Emergency Triage
*   **Symptom Analysis**: Natural language descriptions.
*   **Severity Rating**: System status (CRITICAL, URGENT, ROUTINE).
*   **Live Doctor Alerts**: Automatic flagging of life-threatening cases.

### 💊 Pharmacy Suite (Pro Max)
*   **Prescription Analysis**: Parses text into a shopping cart.
*   **Medicine Verifier**: AI checks authenticity markers (holograms, packaging).
*   **Universal Search**: Smart medical search for both symptoms and medicine names.
*   **Fulfillment Sync**: Orders pushed directly to doctors for clinical sign-off.

### 🩺 Doctor's Command Center
*   **Live Feed**: Real-time patient categorization.
*   **AI Diagnostics**: "Consult Gemini" button for sub-second clinical second opinions.
*   **Status Management**: Remote escalation and prescription fulfillment.

---

## 💎 Design Aesthetic
*   **Midnight Glass**: High-fidelity dark mode with blurred backdrops.
*   **Micro-animations**: Smooth fluid transitions powered by `framer-motion`.
*   **Typography**: Modern medical-tech typography using Google Fonts (Outfit).

---
**MediSetu** — *Saving lives, one sub-second AI decision at a time.* 🩺✨
