# SignBridge: B2B SaaS Landing Page

## Color Palette (Deaf Flag Inspired)

### Primary Colors
- **Deaf Blue:** `#0055CC` - Trust, Stability, Community
- **Turquoise:** `#00BCD4` - Clarity, Communication, Accessibility
- **Deaf Yellow:** `#FFD700` - Light, Life, Enlightenment
- **White:** `#FFFFFF` - Purity, Clarity
- **Dark Navy:** `#001F3F` - Professional, Authority

### Neutral Colors
- **Primary Text:** `#1A1A1A`
- **Secondary Text:** `#666666`
- **Light Background:** `#F8F9FA`
- **Border:** `#E5E5E5`

### Functional Colors
- **Success:** `#22C55E`
- **Warning:** `#F59E0B`
- **Error:** `#EF4444`
- **Info:** `#3B82F6`

---

## 1. Navigation Bar

```html
<!-- Fixed sticky header with Deaf Flag colors -->
<nav class="fixed top-0 w-full z-1000 bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <svg class="w-8 h-8 text-deaf-blue" viewBox="0 0 32 32">
        <!-- SignBridge logo with Deaf Flag colors -->
      </svg>
      <span class="text-xl font-bold text-deaf-blue">SignBridge</span>
    </div>
    
    <!-- Primary Navigation (Desktop) -->
    <ul class="hidden md:flex gap-8 text-sm font-medium text-gray-700">
      <li><a href="#platform" class="hover:text-deaf-blue transition">Platform</a></li>
      <li><a href="#solutions" class="hover:text-turquoise transition">Solutions</a></li>
      <li><a href="#resources" class="hover:text-deaf-blue transition">Resources</a></li>
      <li><a href="#pricing" class="hover:text-turquoise transition">Pricing</a></li>
      <li><a href="#enterprise" class="hover:text-deaf-blue transition">Enterprise</a></li>
    </ul>
    
    <!-- Secondary Actions -->
    <div class="flex items-center gap-4">
      <a href="#signin" class="text-deaf-blue font-medium text-sm hover:underline">Sign In</a>
      <button class="bg-deaf-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-dark-navy transition">
        Request Demo
      </button>
    </div>
    
    <!-- Mobile Menu Toggle -->
    <button class="md:hidden text-deaf-blue">☰</button>
  </div>
</nav>
```

---

## 2. Hero Section

```html
<section class="pt-32 pb-20 px-6 bg-gradient-to-br from-deaf-blue/5 via-white to-turquoise/5">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    <!-- Left Column: Copy -->
    <div>
      <!-- Pre-headline Badge -->
      <div class="inline-flex items-center gap-2 bg-deaf-yellow/20 text-deaf-blue px-4 py-2 rounded-full mb-6">
        <span class="text-sm font-semibold">✓ Trusted by 200+ Healthcare Systems</span>
      </div>
      
      <!-- Headline -->
      <h1 class="text-5xl md:text-6xl font-bold text-dark-navy leading-tight mb-6">
        Eliminate the Silence. <span class="text-turquoise">Ensure Meaningful Access for All Patients.</span>
      </h1>
      
      <!-- Subheadline -->
      <p class="text-xl text-gray-700 mb-8 leading-relaxed">
        SignBridge delivers instant, HIPAA-compliant communication for Deaf/Hard-of-Hearing (D/HH) and Limited English Proficiency (LEP) patients, including Spanish speakers, in critical clinical settings. Eliminate dangerous interpreter delays, reduce malpractice risk, and achieve ADA/Title VI compliance—all in real:time.
      </p>
      
      <!-- Trust Indicators -->
      <div class="flex items-center gap-4 mb-10">
        <span class="text-sm font-medium text-gray-600">Trusted by:</span>
        <!-- Logo bar with healthcare system logos -->
        <div class="flex gap-4">
          <img src="/logos/hospital-1.svg" alt="Hospital System 1" class="h-6 grayscale hover:grayscale-0 transition">
          <img src="/logos/hospital-2.svg" alt="Hospital System 2" class="h-6 grayscale hover:grayscale-0 transition">
          <img src="/logos/hospital-3.svg" alt="Hospital System 3" class="h-6 grayscale hover:grayscale-0 transition">
        </div>
      </div>
      
      <!-- Dual CTA Strategy -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <button class="bg-deaf-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-dark-navy transition transform hover:scale-105">
          Schedule Your Demo
        </button>
        <button class="border-2 border-turquoise text-turquoise px-8 py-4 rounded-lg font-bold text-lg hover:bg-turquoise/10 transition">
          See How It Works
        </button>
      </div>
      
      <!-- Micro-copy -->
      <p class="text-sm text-gray-600">
        ✓ Free consultation • ✓ No credit card required • ✓ 30-day trial
      </p>
    </div>
    
    <!-- Right Column: Visual -->
    <div class="relative">
      <div class="bg-gradient-to-br from-deaf-blue to-turquoise rounded-2xl overflow-hidden shadow-2xl">
        <!-- Product screenshot or interactive demo -->
        <img src="/images/hero-dashboard.webp" alt="SignBridge Dashboard" class="w-full h-auto">
        
        <!-- Overlay metrics -->
        <div class="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg">
          <p class="text-sm font-semibold text-dark-navy">Real-Time Transcription</p>
          <p class="text-2xl font-bold text-turquoise">0.3s Response Time</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 3. Problem/Pain Point Section

```html
<section id="problem" class="py-24 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <!-- Section Headline -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-dark-navy mb-6">
        The Cost of Silence in Healthcare
      </h2>
      <p class="text-xl text-gray-700 max-w-3xl mx-auto">
        When communication barriers exist for D/HH and LEP patients, the consequences are severe—and measurable. Miscommunication is a top driver of malpractice risk and non-compliance.
      </p>
    </div>
    
    <!-- 3-Column Problem Grid -->
    <div class="grid md:grid-cols-3 gap-8">
      
      <!-- Problem 1: Dangerous Delays -->
      <div class="bg-gradient-to-br from-deaf-blue/10 to-turquoise/10 rounded-xl p-8 border border-deaf-blue/20">
        <div class="w-12 h-12 bg-deaf-blue rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-dark-navy mb-3">Dangerous Delays</h3>
        <p class="text-gray-700 mb-4">
          Average interpreter arrival time in emergency departments is 19 minutes. In time-critical situations, this delay can be fatal.
        </p>
        <p class="text-3xl font-bold text-deaf-blue">19+ Minutes</p>
        <p class="text-sm text-gray-600 mt-2">Average ED interpreter delay</p>
      </div>
      
      <!-- Problem 2: Malpractice Liability -->
      <div class="bg-gradient-to-br from-turquoise/10 to-deaf-yellow/10 rounded-xl p-8 border border-turquoise/20">
        <div class="w-12 h-12 bg-turquoise rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-dark-navy mb-3">Malpractice Exposure</h3>
        <p class="text-gray-700 mb-4">
          Communication failures account for a significant portion of healthcare malpractice claims and patient safety incidents.
        </p>
        <p class="text-3xl font-bold text-turquoise">$1.7B</p>
        <p class="text-sm text-gray-600 mt-2">Annual malpractice cost from communication failures</p>
      </div>
      
      <!-- Problem 3: Regulatory Violations -->
      <div class="bg-gradient-to-br from-deaf-yellow/10 to-deaf-blue/10 rounded-xl p-8 border border-deaf-yellow/30">
        <div class="w-12 h-12 bg-deaf-yellow rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-dark-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-dark-navy mb-3">Regulatory Risk (ADA & Title VI)</h3>
        <p class="text-gray-700 mb-4">
          ADA Title III and Title VI violations carry steep fines. Non-compliance with "effective communication" and "meaningful access" mandates directly impacts accreditation and reimbursement.
        </p>
        <p class="text-3xl font-bold text-deaf-blue">$75K-$150K</p>
        <p class="text-sm text-gray-600 mt-2">ADA/Title VI violation fines</p>
      </div>
    </div>
  </div>
</section>
```

---

## 4. Solution Positioning Section

```html
<section id="solution" class="py-24 px-6 bg-gradient-to-br from-deaf-blue/5 to-turquoise/5">
  <div class="max-w-5xl mx-auto">
    <!-- Headline -->
    <h2 class="text-4xl md:text-5xl font-bold text-center text-dark-navy mb-12">
      Instant, Reliable Communication That Protects Your Patients and Your Hospital
    </h2>
    
    <!-- Solution Narrative -->
    <div class="prose prose-lg max-w-none mb-12">
      <p class="text-xl text-gray-700 leading-relaxed mb-6">
        SignBridge is not another VRI/OPI service. It is an enterprise-grade, AI-powered communication platform designed specifically for the realities of modern healthcare. Built on the principle that effective communication is a non-negotiable right, SignBridge delivers instant, HIPAA-compliant communication for **all** patients requiring language assistance, including D/HH and Spanish-speaking LEP patients, in any clinical setting.
      </p>
      
      <p class="text-xl text-gray-700 leading-relaxed mb-6">
        Our platform combines real-time speech-to-text transcription, medically-specialized audio translation (for Spanish/LEP), visual communication aids, offline functionality, and AI-driven cultural competency coaching. The result is a system that works when traditional VRI/OPI fails—no frozen screens, no non-specialized interpreters, and no dangerous workarounds.
      </p>
      
      <p class="text-xl text-gray-700 leading-relaxed">
        For Chief Nursing Officers and Patient Safety Officers like Dr. Evelyn Reed, SignBridge transforms a dual compliance liability (ADA & Title VI) into a measurable patient safety win. It is the auditable certainty that your hospital is meeting the legal mandates for "effective communication" and "meaningful access" while protecting your staff and your bottom line.
      </p>
    </div>
    
    <!-- Unique Value Proposition Callout -->
    <div class="bg-gradient-to-r from-deaf-blue to-turquoise rounded-xl p-8 text-white shadow-lg">
      <h3 class="text-2xl font-bold mb-4">Why SignBridge is Different</h3>
      <ul class="space-y-3 text-lg">
        <li class="flex items-start gap-3">
          <span class="text-deaf-yellow text-2xl">✓</span>
          <span><strong>Instant Response:</strong> 0.3-second real-time transcription, no waiting for interpreters</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-deaf-yellow text-2xl">✓</span>
          <span><strong>Offline Functionality:</strong> Works even when network connectivity fails—critical in emergencies</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-deaf-yellow text-2xl">✓</span>
          <span><strong>Cultural Competency AI:</strong> Real-time coaching for staff on D/HH communication best practices</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-deaf-yellow text-2xl">✓</span>
          <span><strong>Auditable Compliance:</strong> Complete audit trail for Joint Commission, OCR, and legal defense</span>
        </li>
      </ul>
    </div>
  </div>
</section>
```

---

## 5. Features & Benefits Section

```html
<section id="features" class="py-24 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center text-dark-navy mb-20">
      Enterprise Features Built for Clinical Reality
    </h2>
    
    <!-- Feature 1: Real-Time Transcription -->
    <div class="grid md:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <h3 class="text-3xl font-bold text-dark-navy mb-4">Real-Time Speech-to-Text Transcription</h3>
        <p class="text-lg text-gray-700 mb-6">
          Our proprietary speech recognition engine delivers medical-grade accuracy in real-time, with a 0.3-second response time. Every word is transcribed in large, high-contrast text optimized for D/HH patients, ensuring no miscommunication in time-critical situations.
        </p>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>Medical terminology database with 10,000+ healthcare terms</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>Support for multiple sign languages (ASL, PRSL variations)</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>Customizable text size and contrast for accessibility</span>
          </li>
        </ul>
        <p class="text-2xl font-bold text-deaf-blue mt-8">Result: 100% Effective Communication</p>
      </div>
      <div class="bg-gradient-to-br from-deaf-blue/10 to-turquoise/10 rounded-xl overflow-hidden">
        <img src="/images/feature-transcription.webp" alt="Real-Time Transcription Interface" class="w-full h-auto">
      </div>
    </div>
    
    <!-- Feature 2: Offline Functionality -->
    <div class="grid md:grid-cols-2 gap-12 items-center mb-24">
      <div class="order-2 md:order-1 bg-gradient-to-br from-turquoise/10 to-deaf-yellow/10 rounded-xl overflow-hidden">
        <img src="/images/feature-offline.webp" alt="Offline Mode Indicator" class="w-full h-auto">
      </div>
      <div class="order-1 md:order-2">
        <h3 class="text-3xl font-bold text-dark-navy mb-4">Works Offline. Always.</h3>
        <p class="text-lg text-gray-700 mb-6">
          Network failures should never compromise patient safety. SignBridge operates fully offline, with automatic synchronization when connectivity is restored. In an emergency department, reliability is non-negotiable.
        </p>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue text-xl">●</span>
            <span>Local processing—no cloud dependency during emergencies</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue text-xl">●</span>
            <span>Automatic data sync when network is restored</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue text-xl">●</span>
            <span>Zero latency, zero downtime in critical moments</span>
          </li>
        </ul>
        <p class="text-2xl font-bold text-turquoise mt-8">Result: 99.99% Uptime Guarantee</p>
      </div>
    </div>
    
    <!-- Feature 3: AI Cultural & Linguistic Coach -->
    <div class="grid md:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <h3 class="text-3xl font-bold text-dark-navy mb-4">AI-Powered Cultural Competency Coaching</h3>
        <p class="text-lg text-gray-700 mb-6">
          Real-time, in-context guidance for healthcare staff on Deaf/Hard-of-Hearing communication best practices. The AI coach suggests plain language alternatives, reminds staff to face the patient, and flags potential communication gaps before they become patient safety issues.
        </p>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-3">
            <span class="text-deaf-yellow text-xl">●</span>
            <span>Non-intrusive, real-time coaching during patient encounters</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-yellow text-xl">●</span>
            <span>Reduces staff anxiety and improves communication confidence</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-yellow text-xl">●</span>
            <span>Measurable improvement in patient satisfaction scores</span>
          </li>
        </ul>
        <p class="text-2xl font-bold text-deaf-blue mt-8">Result: 3-Point HCAHPS Improvement</p>
      </div>
      <div class="bg-gradient-to-br from-deaf-yellow/10 to-deaf-blue/10 rounded-xl overflow-hidden">
        <img src="/images/feature-coaching.webp" alt="AI Cultural & Linguistic Coach" class="w-full h-auto">
      </div>
    </div>
    
    <!-- Feature 4: Auditable Compliance -->
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1 bg-gradient-to-br from-deaf-blue/10 to-turquoise/10 rounded-xl overflow-hidden">
        <img src="/images/feature-compliance.webp" alt="Compliance Dashboard" class="w-full h-auto">
      </div>
      <div class="order-1 md:order-2">
        <h3 class="text-3xl font-bold text-dark-navy mb-4">Complete Audit Trail for Compliance</h3>
        <p class="text-lg text-gray-700 mb-6">
          Every interaction is logged and timestamped, creating an auditable record of "effective communication" for Joint Commission reviews, OCR inquiries, and legal defense. Your hospital is protected.
        </p>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>HIPAA-compliant audit logs with encryption</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>Automated compliance reporting for Joint Commission</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-turquoise text-xl">●</span>
            <span>Legal-grade documentation for malpractice defense</span>
          </li>
        </ul>
        <p class="text-2xl font-bold text-deaf-blue mt-8">Result: Zero Compliance Risk</p>
      </div>
    </div>
  </div>
</section>
```

---

## 6. ROI Calculator Section

```html
<section id="roi" class="py-24 px-6 bg-gradient-to-br from-deaf-blue/5 to-turquoise/5">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center text-dark-navy mb-4">
      Calculate Your ROI
    </h2>
    <p class="text-center text-xl text-gray-700 mb-12">
      See exactly how much SignBridge saves your hospital by reducing malpractice risk, avoiding regulatory fines, and improving patient outcomes.
    </p>
    
    <!-- ROI Calculator Card -->
    <div class="bg-white rounded-2xl shadow-xl p-12 border-2 border-deaf-blue/20">
      
      <!-- Input Fields -->
      <div class="space-y-8 mb-12">
        
        <!-- Number of Beds -->
        <div>
          <label class="block text-lg font-semibold text-dark-navy mb-3">Hospital Bed Count</label>
          <input type="range" min="50" max="1000" value="300" class="w-full h-2 bg-turquoise/30 rounded-lg appearance-none cursor-pointer" id="bedCount">
          <p class="text-center text-2xl font-bold text-deaf-blue mt-2"><span id="bedCountValue">300</span> Beds</p>
        </div>
        
        <!-- Current Annual Interpreter Spend -->
        <div>
          <label class="block text-lg font-semibold text-dark-navy mb-3">Current Annual Interpreter Spend</label>
          <input type="number" value="75000" class="w-full px-4 py-3 border-2 border-deaf-blue/30 rounded-lg text-lg focus:border-deaf-blue focus:outline-none" id="interpreterSpend">
          <p class="text-sm text-gray-600 mt-2">Typical range: $50,000 - $150,000 for mid-size hospitals</p>
        </div>
        
        <!-- Estimated Malpractice Risk -->
        <div>
          <label class="block text-lg font-semibold text-dark-navy mb-3">Estimated Annual Malpractice Risk (D/HH Communication)</label>
          <input type="number" value="250000" class="w-full px-4 py-3 border-2 border-deaf-blue/30 rounded-lg text-lg focus:border-deaf-blue focus:outline-none" id="malpracticeRisk">
          <p class="text-sm text-gray-600 mt-2">Based on average settlement amounts and incident frequency</p>
        </div>
        
        <!-- Regulatory Fine Risk -->
        <div>
          <label class="block text-lg font-semibold text-dark-navy mb-3">Regulatory Fine Risk (ADA/OCR)</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input type="radio" name="fineRisk" value="75000" checked>
              <span>$75,000 (First Violation)</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="fineRisk" value="150000">
              <span>$150,000 (Subsequent)</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Calculate Button -->
      <button class="w-full bg-deaf-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-dark-navy transition mb-8">
        Calculate My ROI
      </button>
      
      <!-- Results Display -->
      <div class="bg-gradient-to-br from-deaf-blue/10 to-turquoise/10 rounded-xl p-8 border-2 border-turquoise/30">
        <p class="text-sm font-semibold text-gray-600 mb-2">ANNUAL VALUE OF HEALTHCOMM PRO</p>
        <p class="text-5xl font-bold text-deaf-blue mb-8">$<span id="roiValue">425,000</span></p>
        
        <!-- ROI Breakdown -->
        <div class="space-y-4">
          <div class="flex justify-between items-center pb-4 border-b border-turquoise/30">
            <span class="text-gray-700">Interpreter Cost Reduction (40% savings)</span>
            <span class="font-bold text-deaf-blue">$<span id="interpreterSavings">30,000</span></span>
          </div>
          <div class="flex justify-between items-center pb-4 border-b border-turquoise/30">
            <span class="text-gray-700">Malpractice Risk Mitigation</span>
            <span class="font-bold text-turquoise">$<span id="malpracticeSavings">250,000</span></span>
          </div>
          <div class="flex justify-between items-center pb-4 border-b border-turquoise/30">
            <span class="text-gray-700">Regulatory Fine Avoidance</span>
            <span class="font-bold text-deaf-blue">$<span id="fineSavings">75,000</span></span>
          </div>
          <div class="flex justify-between items-center pb-4 border-b border-turquoise/30">
            <span class="text-gray-700">HCAHPS Improvement (Medicare Reimbursement)</span>
            <span class="font-bold text-deaf-blue">$<span id="hcahpsSavings">70,000</span></span>
          </div>
          <div class="flex justify-between items-center pt-4">
            <span class="text-lg font-bold text-dark-navy">Annual SignBridge Investment</span>
            <span class="text-lg font-bold text-deaf-blue">-$<span id="platformCost">40,000</span></span>
          </div>
        </div>
        
        <!-- Net ROI -->
        <div class="mt-8 pt-8 border-t-2 border-deaf-blue/30">
          <p class="text-sm font-semibold text-gray-600 mb-2">NET ANNUAL VALUE</p>
          <p class="text-4xl font-bold text-deaf-blue">$<span id="netROI">385,000</span></p>
          <p class="text-lg text-gray-700 mt-4">
            <strong>ROI: <span id="roiPercentage">962</span>%</strong> — Your investment pays for itself in <strong><span id="paybackMonths">1.2</span> months</strong>
          </p>
        </div>
      </div>
      
      <!-- CTA -->
      <button class="w-full mt-8 bg-turquoise text-white py-4 rounded-lg font-bold text-lg hover:bg-turquoise/90 transition">
        Get Your Custom ROI Report
      </button>
    </div>
  </div>
</section>
```

---

## 7. Social Proof / Case Study Section

```html
<section id="social-proof" class="py-24 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    
    <!-- Primary Case Study -->
    <div class="bg-gradient-to-br from-deaf-blue/10 to-turquoise/10 rounded-2xl p-12 mb-20 border-2 border-deaf-blue/20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src="/logos/case-study-hospital.svg" alt="Academic Medical Center" class="h-12 mb-6">
          <p class="text-sm font-semibold text-gray-600 mb-4">Mid-Atlantic Regional Medical Center</p>
          <p class="text-gray-700 mb-8">450-bed academic teaching hospital serving a diverse, urban patient population</p>
          
          <!-- Key Results -->
          <div class="space-y-6 mb-8">
            <div>
              <p class="text-4xl font-bold text-deaf-blue">45 min → 30 sec</p>
              <p class="text-gray-700">Average interpreter response time</p>
            </div>
            <div>
              <p class="text-4xl font-bold text-turquoise">+3 Points</p>
              <p class="text-gray-700">HCAHPS Communication Score Improvement</p>
            </div>
            <div>
              <p class="text-4xl font-bold text-deaf-blue">$425K</p>
              <p class="text-gray-700">Annual value from risk mitigation</p>
            </div>
          </div>
          
          <!-- Quote -->
          <blockquote class="border-l-4 border-deaf-blue pl-6 mb-8">
            <p class="text-lg text-gray-700 italic mb-4">
              "SignBridge transformed how we serve our Deaf and Hard-of-Hearing patients. We went from 45-minute waits and frozen VRI screens to instant, reliable communication. But more importantly, we went from moral injury to moral certainty. We are finally meeting the legal mandate for 'effective communication,' and our staff feels empowered instead of constrained."
            </p>
            <p class="font-bold text-dark-navy">Dr. Evelyn Reed, CNO & Patient Safety Officer</p>
            <p class="text-sm text-gray-600">Mid-Atlantic Regional Medical Center</p>
          </blockquote>
          
          <a href="#" class="text-deaf-blue font-bold hover:underline">Read Full Case Study →</a>
        </div>
        
        <div class="bg-gradient-to-br from-deaf-blue/5 to-turquoise/5 rounded-xl overflow-hidden">
          <img src="/images/case-study-dashboard.webp" alt="SignBridge Dashboard in Use" class="w-full h-auto">
        </div>
      </div>
    </div>
    
    <!-- Supporting Testimonials -->
    <h3 class="text-3xl font-bold text-dark-navy text-center mb-12">Trusted by Healthcare Leaders</h3>
    
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      
      <!-- Testimonial 1 -->
      <div class="bg-white rounded-xl p-8 border-2 border-deaf-blue/10 shadow-md hover:shadow-lg transition">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-deaf-yellow text-xl">★★★★★</span>
        </div>
        <p class="text-gray-700 mb-6">
          "This is the first time I've felt confident that our ED can provide truly effective communication to Deaf patients. The reliability is unmatched."
        </p>
        <p class="font-bold text-dark-navy">Sarah Chen, ED Director</p>
        <p class="text-sm text-gray-600">Regional Hospital Network</p>
        <img src="/logos/hospital-logo-1.svg" alt="Hospital Logo" class="h-6 mt-4 grayscale">
      </div>
      
      <!-- Testimonial 2 -->
      <div class="bg-white rounded-xl p-8 border-2 border-turquoise/10 shadow-md hover:shadow-lg transition">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-deaf-yellow text-xl">★★★★★</span>
        </div>
        <p class="text-gray-700 mb-6">
          "The ROI was undeniable. We eliminated a major compliance risk, improved patient satisfaction, and reduced staff stress. It's a win on every level."
        </p>
        <p class="font-bold text-dark-navy">Michael Torres, Risk Management</p>
        <p class="text-sm text-gray-600">Academic Medical Center</p>
        <img src="/logos/hospital-logo-2.svg" alt="Hospital Logo" class="h-6 mt-4 grayscale">
      </div>
      
      <!-- Testimonial 3 -->
      <div class="bg-white rounded-xl p-8 border-2 border-deaf-blue/10 shadow-md hover:shadow-lg transition">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-deaf-yellow text-xl">★★★★★</span>
        </div>
        <p class="text-gray-700 mb-6">
          "Our nurses went from feeling helpless to feeling empowered. The AI coaching is subtle but transformative. This is healthcare equity in action."
        </p>
        <p class="font-bold text-dark-navy">Jennifer Park, Chief Nursing Officer</p>
        <p class="text-sm text-gray-600">Community Hospital System</p>
        <img src="/logos/hospital-logo-3.svg" alt="Hospital Logo" class="h-6 mt-4 grayscale">
      </div>
    </div>
    
    <!-- Stats Bar -->
    <div class="bg-gradient-to-r from-deaf-blue to-turquoise rounded-xl p-12 text-white">
      <div class="grid md:grid-cols-4 gap-8 text-center">
        <div>
          <p class="text-4xl font-bold">200+</p>
          <p class="text-lg mt-2">Healthcare Systems</p>
        </div>
        <div>
          <p class="text-4xl font-bold">50K+</p>
          <p class="text-lg mt-2">Patient Encounters/Month</p>
        </div>
        <div>
          <p class="text-4xl font-bold">98%</p>
          <p class="text-lg mt-2">Customer Satisfaction</p>
        </div>
        <div>
          <p class="text-4xl font-bold">$500M+</p>
          <p class="text-lg mt-2">Risk Mitigated</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 8. Pricing Section

```html
<section id="pricing" class="py-24 px-6 bg-light-gray">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center text-dark-navy mb-4">
      Transparent Pricing for Every Hospital Size
    </h2>
    <p class="text-center text-xl text-gray-700 mb-12">
      Choose the plan that fits your facility. All plans include a 30-day free trial and dedicated support.
    </p>
    
    <!-- Monthly/Annual Toggle -->
    <div class="flex justify-center items-center gap-4 mb-12">
      <span class="text-gray-700">Monthly</span>
      <button class="bg-deaf-blue text-white px-6 py-2 rounded-full font-semibold">Annual (Save 20%)</button>
      <span class="text-gray-700">Annual</span>
    </div>
    
    <!-- Pricing Cards -->
    <div class="grid md:grid-cols-3 gap-8 mb-12">
      
      <!-- Starter Tier -->
      <div class="bg-white rounded-2xl p-8 border-2 border-deaf-blue/20 shadow-md hover:shadow-lg transition">
        <h3 class="text-2xl font-bold text-dark-navy mb-2">Starter</h3>
        <p class="text-gray-600 mb-6">For small clinical departments</p>
        
        <div class="mb-6">
          <p class="text-4xl font-bold text-deaf-blue">$2,500<span class="text-lg text-gray-600">/month</span></p>
          <p class="text-sm text-gray-600 mt-2">Billed annually: $30,000/year</p>
        </div>
        
        <button class="w-full bg-deaf-blue text-white py-3 rounded-lg font-bold mb-8 hover:bg-dark-navy transition">
          Start Free Trial
        </button>
        
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Real-time transcription (up to 100 encounters/month)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Offline functionality</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Basic AI coaching</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Email support</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-gray-400">✗</span>
            <span class="text-gray-400">Advanced analytics</span>
          </li>
        </ul>
      </div>
      
      <!-- Professional Tier (Most Popular) -->
      <div class="bg-white rounded-2xl p-8 border-4 border-deaf-blue shadow-xl hover:shadow-2xl transition transform md:scale-105">
        <div class="bg-deaf-yellow text-dark-navy px-4 py-2 rounded-full inline-block mb-4 font-bold text-sm">
          Most Popular
        </div>
        <h3 class="text-2xl font-bold text-dark-navy mb-2">Professional</h3>
        <p class="text-gray-600 mb-6">For mid-size hospitals</p>
        
        <div class="mb-6">
          <p class="text-4xl font-bold text-deaf-blue">$5,000<span class="text-lg text-gray-600">/month</span></p>
          <p class="text-sm text-gray-600 mt-2">Billed annually: $50,000/year (Save $10,000)</p>
        </div>
        
        <button class="w-full bg-deaf-blue text-white py-3 rounded-lg font-bold mb-8 hover:bg-dark-navy transition">
          Start Free Trial
        </button>
        
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Real-time transcription (unlimited encounters)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Offline functionality</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Advanced AI coaching</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Compliance dashboard & reporting</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Priority phone support</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Advanced analytics</span>
          </li>
        </ul>
      </div>
      
      <!-- Enterprise Tier -->
      <div class="bg-white rounded-2xl p-8 border-2 border-turquoise/20 shadow-md hover:shadow-lg transition">
        <h3 class="text-2xl font-bold text-dark-navy mb-2">Enterprise</h3>
        <p class="text-gray-600 mb-6">For large healthcare systems</p>
        
        <div class="mb-6">
          <p class="text-4xl font-bold text-deaf-blue">Custom<span class="text-lg text-gray-600"></span></p>
          <p class="text-sm text-gray-600 mt-2">Volume pricing available</p>
        </div>
        
        <button class="w-full border-2 border-deaf-blue text-deaf-blue py-3 rounded-lg font-bold mb-8 hover:bg-deaf-blue/10 transition">
          Schedule Demo
        </button>
        
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Everything in Professional</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Dedicated account manager</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Custom integrations (EHR, CRM)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>SLA guarantee (99.99% uptime)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Custom training & onboarding</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-turquoise">✓</span>
            <span>Multi-facility discounts</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Trust Elements -->
    <div class="text-center space-y-4 text-gray-700">
      <p class="text-lg">✓ No credit card required • ✓ Cancel anytime • ✓ 30-day money-back guarantee</p>
    </div>
  </div>
</section>
```

---

## 9. Integration & Security Section

```html
<section id="integrations" class="py-24 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-16">
      
      <!-- Integrations -->
      <div>
        <h3 class="text-3xl font-bold text-dark-navy mb-6">Connects With Your Existing Stack</h3>
        <p class="text-gray-700 mb-8">
          SignBridge integrates seamlessly with the healthcare systems you already use. No rip-and-replace, no disruption.
        </p>
        
        <!-- Integration Logos Grid -->
        <div class="grid grid-cols-3 gap-6 mb-8">
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/epic.svg" alt="Epic Systems" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/cerner.svg" alt="Cerner" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/medidata.svg" alt="Medidata" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/slack.svg" alt="Slack" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/teams.svg" alt="Microsoft Teams" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
          <div class="flex items-center justify-center bg-light-gray rounded-lg p-4">
            <img src="/logos/zoom.svg" alt="Zoom" class="h-8 grayscale hover:grayscale-0 transition">
          </div>
        </div>
        
        <a href="#" class="text-deaf-blue font-bold hover:underline">View All Integrations →</a>
      </div>
      
      <!-- Security & Compliance -->
      <div>
        <h3 class="text-3xl font-bold text-dark-navy mb-6">Enterprise-Grade Security & Compliance</h3>
        <p class="text-gray-700 mb-8">
          Your patient data is sacred. SignBridge is built with security-first architecture and meets the highest healthcare compliance standards.
        </p>
        
        <!-- Compliance Badges -->
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div class="bg-light-gray rounded-lg p-6 text-center">
            <img src="/badges/hipaa.svg" alt="HIPAA Compliant" class="h-12 mx-auto mb-2">
            <p class="font-bold text-dark-navy">HIPAA</p>
            <p class="text-sm text-gray-600">Compliant</p>
          </div>
          <div class="bg-light-gray rounded-lg p-6 text-center">
            <img src="/badges/soc2.svg" alt="SOC 2 Type II" class="h-12 mx-auto mb-2">
            <p class="font-bold text-dark-navy">SOC 2</p>
            <p class="text-sm text-gray-600">Type II</p>
          </div>
          <div class="bg-light-gray rounded-lg p-6 text-center">
            <img src="/badges/iso27001.svg" alt="ISO 27001" class="h-12 mx-auto mb-2">
            <p class="font-bold text-dark-navy">ISO 27001</p>
            <p class="text-sm text-gray-600">Certified</p>
          </div>
          <div class="bg-light-gray rounded-lg p-6 text-center">
            <img src="/badges/gdpr.svg" alt="GDPR Compliant" class="h-12 mx-auto mb-2">
            <p class="font-bold text-dark-navy">GDPR</p>
            <p class="text-sm text-gray-600">Compliant</p>
          </div>
        </div>
        
        <!-- Security Features -->
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue font-bold">●</span>
            <span>256-bit AES encryption for all data in transit and at rest</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue font-bold">●</span>
            <span>SSO/SAML support for enterprise authentication</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue font-bold">●</span>
            <span>Role-based access control (RBAC)</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue font-bold">●</span>
            <span>Regular third-party security audits</span>
          </li>
          <li class="flex items-center gap-3">
            <span class="text-deaf-blue font-bold">●</span>
            <span>Automated backup and disaster recovery</span>
          </li>
        </ul>
        
        <a href="#" class="text-deaf-blue font-bold hover:underline mt-6 inline-block">View Security Documentation →</a>
      </div>
    </div>
  </div>
</section>
```

---

## 10. Demo/Video Section

```html
<section id="demo" class="py-24 px-6 bg-gradient-to-br from-deaf-blue/5 to-turquoise/5">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl md:text-5xl font-bold text-dark-navy mb-6">
      See SignBridge in Action
    </h2>
    <p class="text-xl text-gray-700 mb-12">
      Watch a 3-minute walkthrough of how SignBridge transforms communication in a real emergency department scenario.
    </p>
    
    <!-- Video Player -->
    <div class="relative bg-dark-navy rounded-2xl overflow-hidden shadow-2xl mb-8">
      <div class="aspect-video bg-dark-navy flex items-center justify-center">
        <button class="w-20 h-20 bg-deaf-blue rounded-full flex items-center justify-center hover:bg-turquoise transition transform hover:scale-110">
          <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
          </svg>
        </button>
      </div>
      <!-- Video embed would go here -->
    </div>
    
    <!-- Video Description -->
    <div class="bg-white rounded-xl p-8 border-2 border-deaf-blue/20 mb-8">
      <h3 class="text-2xl font-bold text-dark-navy mb-4">What You'll See:</h3>
      <ul class="text-left space-y-3 text-gray-700 max-w-2xl mx-auto">
        <li class="flex items-start gap-3">
          <span class="text-turquoise font-bold">0:00-0:45</span>
          <span>Real-time transcription (D/HH) and specialized audio translation (LEP) in action during an ED patient encounter</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-turquoise font-bold">0:45-1:30</span>
          <span>AI cultural competency coach providing real-time guidance to staff</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-turquoise font-bold">1:30-2:15</span>
          <span>Compliance dashboard showing audit trail and reporting</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-turquoise font-bold">2:15-3:00</span>
          <span>Patient satisfaction and ROI impact metrics</span>
        </li>
      </ul>
    </div>
    
    <!-- Secondary CTA -->
    <p class="text-gray-700 mb-6">Ready to see how SignBridge can transform your hospital?</p>
    <button class="bg-deaf-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-dark-navy transition">
      Schedule a Personalized Demo
    </button>
  </div>
</section>
```

---

## 11. Final CTA Section

```html
<section class="py-32 px-6 bg-gradient-to-r from-deaf-blue to-turquoise text-white">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-5xl font-bold mb-6">
      Ready to Transform Patient Communication?
    </h2>
    <p class="text-xl mb-12 leading-relaxed">
      Join 200+ healthcare systems using SignBridge to eliminate communication barriers, reduce malpractice risk, and achieve true ADA & Title VI compliance. Start your free 30-day trial today—no credit card required.
    </p>
    
    <!-- Dual CTAs -->
    <div class="flex flex-col sm:flex-row gap-6 justify-center mb-12">
      <button class="bg-deaf-yellow text-dark-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition transform hover:scale-105">
        Start Free Trial
      </button>
      <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition">
        Schedule a Demo
      </button>
    </div>
    
    <!-- Trust Elements -->
    <div class="flex flex-wrap justify-center gap-8 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-deaf-yellow text-xl">✓</span>
        <span>30-day free trial</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-deaf-yellow text-xl">✓</span>
        <span>No credit card required</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-deaf-yellow text-xl">✓</span>
        <span>Cancel anytime</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-deaf-yellow text-xl">✓</span>
        <span>Setup in 5 minutes</span>
      </div>
    </div>
  </div>
</section>
```

---

## 12. Footer

```html
<footer class="bg-dark-navy text-white py-16 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="grid md:grid-cols-5 gap-12 mb-12">
      
      <!-- Column 1: Company Info -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-8 h-8 text-deaf-yellow" viewBox="0 0 32 32">
            <!-- SignBridge logo -->
          </svg>
          <span class="text-xl font-bold">SignBridge</span>
        </div>
        <p class="text-gray-400 text-sm mb-6">
          Enterprise communication platform for Deaf/Hard-of-Hearing and Limited English Proficiency (LEP) patients in healthcare.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-deaf-yellow transition">LinkedIn</a>
          <a href="#" class="text-gray-400 hover:text-deaf-yellow transition">Twitter</a>
          <a href="#" class="text-gray-400 hover:text-deaf-yellow transition">Facebook</a>
        </div>
        <p class="text-gray-600 text-sm mt-6">© 2025 SignBridge. All rights reserved.</p>
      </div>
      
      <!-- Column 2: Product -->
      <div>
        <h4 class="font-bold mb-4">Product</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-deaf-yellow transition">Features</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Integrations</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Pricing</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Security</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Changelog</a></li>
        </ul>
      </div>
      
      <!-- Column 3: Resources -->
      <div>
        <h4 class="font-bold mb-4">Resources</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-deaf-yellow transition">Blog</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Case Studies</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Help Center</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">API Documentation</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Webinars</a></li>
        </ul>
      </div>
      
      <!-- Column 4: Company -->
      <div>
        <h4 class="font-bold mb-4">Company</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-deaf-yellow transition">About Us</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Careers</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Contact</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Press Kit</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Partners</a></li>
        </ul>
      </div>
      
      <!-- Column 5: Legal -->
      <div>
        <h4 class="font-bold mb-4">Legal</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-deaf-yellow transition">Privacy Policy</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Terms of Service</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Cookie Policy</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">GDPR</a></li>
          <li><a href="#" class="hover:text-deaf-yellow transition">Acceptable Use</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Newsletter Signup -->
    <div class="border-t border-gray-700 pt-12">
      <div class="max-w-md">
        <h4 class="font-bold mb-4">Get Healthcare Insights & Product Updates</h4>
        <div class="flex gap-2">
          <input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg text-dark-navy">
          <button class="bg-deaf-yellow text-dark-navy px-6 py-3 rounded-lg font-bold hover:bg-white transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## Technical Implementation Notes

### Performance Targets
- Page Load: < 3 seconds on 3G
- First Contentful Paint: < 1.5 seconds
- Lighthouse Score: > 90

### Accessibility (WCAG 2.1 AA)
- Color contrast ratio: 4.5:1 for body text, 3:1 for large text
- Keyboard navigation fully supported
- Screen reader friendly (ARIA labels)
- Focus indicators visible on all interactive elements

### Responsive Breakpoints
- Mobile: 0-767px
- Tablet: 768px-1023px
- Desktop: 1024px-1439px
- Large Desktop: 1440px+

### Analytics & Tracking
- Google Analytics 4 implementation
- Event tracking for all CTAs, form submissions, video plays, calculator usage
- Heatmap tracking (Hotjar)
- A/B testing capability

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)
