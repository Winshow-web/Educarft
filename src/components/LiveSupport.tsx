import React, { useState } from 'react';
import { MessageCircle, Send, X, MinusCircle, Phone, Mail, User, Brackets as BrandWhatsapp } from 'lucide-react';

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
}

export function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(true);
  const [formData, setFormData] = useState<ContactForm>({
    fullName: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Hi! Please fill out the form below to connect with our education consultants.", isUser: false }
  ]);

  const validateForm = (): boolean => {
    const errors: Partial<ContactForm> = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Invalid phone format (e.g., +371 12345678)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const message = `Hello! I'm interested in studying abroad.
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/37127333527?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setShowContactForm(false);
    setMessages(prev => [...prev, {
      text: "Thanks for your interest! We'll be in touch with you shortly via WhatsApp.",
      isUser: false
    }]);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thanks for reaching out! Please fill out the contact form above to connect with our education consultants.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed right-6 bottom-6 w-96 bg-white rounded-lg shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-[600px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Contact Us</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="h-[calc(600px-3.5rem)] flex flex-col">
              {/* Contact Form */}
              {showContactForm && (
                <div className="p-4 border-b">
                  <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="John Doe"
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="+371 12345678"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#25D366] hover:bg-[#1fb959] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                    >
                      <BrandWhatsapp className="w-5 h-5 mr-2" />
                      Connect on WhatsApp
                    </button>
                  </form>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}