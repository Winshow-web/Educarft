import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#1a0b2e] mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Educraft, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#1a0b2e]">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Express interest in obtaining information about our services</li>
                <li>Register for our services</li>
                <li>Contact us through our live support system</li>
                <li>Subscribe to our newsletter</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide, operate, and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Understand and analyze how you use our services</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you about our services</li>
              <li>Process your transactions</li>
              <li>Prevent fraudulent transactions and monitor against theft</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Information Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to our processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:{' '}
              <a href="mailto:info@educrafters.eu" className="text-[#6000ff] hover:text-[#1a0b2e]">
                info@educrafters.eu
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1a0b2e] mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
            </p>
          </section>

          <p className="text-sm text-gray-500 pt-8">
            Last updated: March 15, 2024
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}