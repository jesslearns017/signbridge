import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Video,
  MessageSquare,
  Languages,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-deaf-blue rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-deaf-blue to-deaf-turquoise bg-clip-text text-transparent">
                SignBridge
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-deaf-blue transition">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-deaf-blue transition">
                How It Works
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-deaf-blue transition">
                About
              </Link>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-deaf-blue hover:bg-deaf-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-deaf-blue via-deaf-turquoise to-deaf-blue bg-clip-text text-transparent">
            Healthcare Communication <br />
            Without Barriers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            HIPAA-compliant video consultations with real-time interpretation for Deaf and Hard-of-Hearing patients. Connect with your doctor through ASL, LSM, live captions, or text chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=patient">
              <Button size="lg" className="bg-deaf-blue hover:bg-deaf-blue-600 text-lg px-8">
                I'm a Patient
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/register?role=provider">
              <Button size="lg" variant="outline" className="text-lg px-8">
                I'm a Provider
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-deaf-blue" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-deaf-turquoise" />
              <span>ADA Title III</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-deaf-yellow" />
              <span>ASL & LSM Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">
            Communication Your Way
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition">
                <div className="w-12 h-12 bg-deaf-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-deaf-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-deaf-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-deaf-blue to-deaf-turquoise py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Break Down Communication Barriers?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of patients and providers using SignBridge for accessible healthcare communication.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deaf-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-deaf-blue rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SignBridge</span>
              </div>
              <p className="text-gray-400 text-sm">
                Healthcare communication without barriers for the Deaf community.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/hipaa" className="hover:text-white transition">HIPAA Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 SignBridge. All rights reserved. Built with ❤️ for the Deaf community.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Video,
    title: 'HD Video Calling',
    description: '60fps video quality optimized for clear sign language communication with your provider.',
  },
  {
    icon: Languages,
    title: 'Sign Language Support',
    description: 'ASL, LSM, and LSE certified interpreters available to join your consultation.',
  },
  {
    icon: MessageSquare,
    title: 'Live Captions & Chat',
    description: 'Real-time speech-to-text captions and text chat with text-to-speech for flexible communication.',
  },
  {
    icon: Shield,
    title: 'HIPAA Secure',
    description: 'Bank-level encryption and full HIPAA compliance to protect your medical information.',
  },
]

const steps = [
  {
    title: 'Create Your Account',
    description: 'Sign up as a patient or provider. Choose your preferred communication method: sign language, captions, or text chat.',
  },
  {
    title: 'Book an Appointment',
    description: 'Select your provider, choose a time, and request an interpreter if needed. We match you with certified medical interpreters.',
  },
  {
    title: 'Join Your Video Call',
    description: 'One click to join. High-quality video, live captions, text chat, and optional interpreter—all in one place.',
  },
  {
    title: 'Get Care, Your Way',
    description: 'Communicate naturally with your provider. All sessions are securely recorded for your medical records.',
  },
]
