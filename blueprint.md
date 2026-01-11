# Kiara-SaaS-Beta Blueprint

## 1. Overview

Kiara-SaaS-Beta is a modern, AI-powered healthcare platform designed for clinics and hospitals. It simplifies patient registration, diagnostics, and insurance claims through a clean, intuitive interface. This application is built with Next.js and Firebase, leveraging modern web technologies to provide a seamless and efficient user experience for medical professionals.

## 2. Application Blueprint

This section details the design, styling, and features implemented in the application.

### Design & Styling

*   **Framework:** Tailwind CSS for a utility-first styling approach.
*   **Layout:** A consistent two-column layout is used, with a fixed sidebar for navigation and a main content area for application views.
*   **Color Palette:**
    *   **Primary Background:** Light Gray (`bg-gray-100`)
    *   **Component Background:** White (`bg-white`), Gray (`bg-gray-800` for sidebar)
    *   **Text:** White (`text-white`), Black (`text-black`), Gray (`text-gray-600`, `text-gray-700`, `text-gray-800`)
    *   **Accent Colors:**
        *   Emerald (`bg-emerald-600`)
        *   Blue (`bg-blue-500`, `bg-blue-600`)
        *   Green (`bg-green-500`)
        *   Yellow (`bg-yellow-500`)
        *   Purple (`bg-purple-600`)
*   **Typography:**
    *   **Font:** Default sans-serif.
    *   **Sizing:** Uses a range of font sizes for clear visual hierarchy (e.g., `text-3xl`, `text-2xl`, `text-xl`, `text-lg`, `text-sm`).
    *   **Weight:** `font-bold` for headings and important elements.
*   **Component Design:**
    *   **Cards:** Interactive, rounded-lg (`rounded-lg`) cards with drop shadows (`shadow-lg`). They feature a `hover:scale-105` transition for a subtle zoom effect.
    *   **Buttons:** Solid color buttons with rounded corners (`rounded-lg`), bold text, and a `hover` effect for a slightly darker shade and `hover:scale-105` transform.
    *   **Inputs:** Clean, simple input fields with padding (`p-4`), borders (`border`), and rounded corners (`rounded-lg`).
    *   **Table:** A clean, minimalist table design with clear headings and row separation.
    *   **Icons:** Heroicons are used for a consistent and modern look.

### Features

#### Dashboard Page (`/`)

*   **File:** `src/app/page.tsx`
*   **Layout:**
    *   **Sidebar:** Contains navigation links to different sections of the application (Dashboard, Patients, Claims, etc.).
    *   **Header:** Displays the currently logged-in user ("Dr. Satyam").
    *   **Main Content:** "Mission Control" area.
*   **Interactive Cards:**
    *   **Register & Sync Patient:** Navigates to the `/register` page.
    *   **AI Diagnostics:** Navigates to the `/diagnostics` page.
    *   **AI Treatment Protocols:** (Placeholder)
    *   **PMJAY Insurance Claims:** (Placeholder)
*   **Recent Synced Patients Table:**
    *   Displays the 5 most recently registered patients.
    *   **Real-time Updates:** Uses Firebase `onSnapshot` to listen for changes in the `patients` collection and updates the table in real-time.
    *   **Data Displayed:** Name, Age, Gender, and ABHA ID.

#### Registration Page (`/register`)

*   **File:** `src/app/register/page.tsx`
*   **Functionality:** A form for registering new patients.
*   **Quick Import:**
    *   **Scan ABHA QR:** A button that simulates scanning a QR code. It populates the form with sample data after a short delay. A modal overlay is displayed during the "scanning" process.
    *   **Enter Mobile No. / Enter Aadhar:** (Placeholder buttons).
*   **Manual Entry Form:**
    *   **Fields:** Full Name, Age, Gender (Dropdown), Phone Number, ABHA ID (read-only, filled by scan).
*   **Save & Generate OPD Token Button:**
    *   **Validation:** Checks if Name, Age, and Phone are filled.
    *   **Firestore Integration:**
        *   Saves the patient data (Name, Age, Gender, Phone, ABHA ID) to a `patients` collection in Firestore.
        *   Adds a `serverTimestamp` to record the registration time.
    *   **User Feedback:**
        *   Shows an alert: "Patient Saved! Token Generated." on successful save.
        *   Redirects the user to the dashboard (`/`) after saving.

#### AI Diagnostics Page (`/diagnostics`)

*   **File:** `app/diagnostics/page.tsx`
*   **Functionality:** A clinical decision support interface for AI-assisted diagnostics.
*   **Interface:**
    *   **Header:** "AI Diagnostic Assistant" with a blue theme.
    *   **Input Section:** A large text area for entering "Patient Symptoms & Vitals."
    *   **Action Button:** A large, blue "Analyze Clinical Data" button.
    *   **Output Section:** An "Analysis Result" card that appears after analysis.
*   **Live Gemini API:**
    *   **Integration:** Uses the `@google/generative-ai` package to connect to the Gemini API.
    *   **Initialization:** The `GoogleGenerativeAI` class is initialized with a secure API key.
    *   **Analysis:** When the "Analyze" button is clicked, the `handleAnalyzeClick` function sends the patient's symptoms to the Gemini model.
    *   **Prompt:** The model is instructed to act as a senior doctor and return the analysis in three HTML sections: "Differential Diagnosis," "Recommended Tests," and "Red Flags."
    *   **Dynamic Results:** The AI-generated HTML response is then rendered directly into the "Analysis Result" card, replacing the previous simulation.

#### Firebase Integration

*   **File:** `src/app/firebase.ts` (moved to `app` directory)
*   **Setup:** Initializes the Firebase app and gets a reference to the Firestore database.
*   **Collections:**
    *   `patients`: Stores patient registration data.

## 3. Current Plan

**Task: Integrate Live Gemini API into AI Diagnostics Page**

*   **Objective:** Replace the simulated AI analysis with a live analysis from the Google Gemini API.
*   **Steps:**
    1.  **Install SDK:** Run `npm install @google/generative-ai`.
    2.  **Update Imports:** Add `import { GoogleGenerativeAI } from "@google/generative-ai";` to `app/diagnostics/page.tsx`.
    3.  **Initialize API:** Create an instance of `GoogleGenerativeAI` with the provided API key.
    4.  **Update `handleAnalyzeClick`:**
        *   Make the function `async`.
        *   Remove the `setTimeout` simulation.
        *   Construct the prompt with the patient's symptoms.
        *   Call `model.generateContent(prompt)` to get a real-time analysis.
        *   Store the HTML response in state.
    5.  **Update `AnalysisResult` Component:**
        *   Modify the component to accept an `htmlContent` prop.
        *   Use `dangerouslySetInnerHTML` to render the live HTML from the API.
    6.  **Update Blueprint:** Document the Gemini API integration in `blueprint.md`.
    7.  **Lint Code:** Run `npm run lint` to ensure code quality.
