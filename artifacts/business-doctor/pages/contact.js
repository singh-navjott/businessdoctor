import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/shared/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Business Doctor</title>
        <meta name="description" content="Get in touch with Business Doctor for a free quote on your digital marketing, SEO, and web development needs." />
      </Head>
      
      <Header />
      
      <div className="bg-neutral-50 py-24 sm:py-32 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="display text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">Ready to grow your business? Let's discuss your digital marketing needs.</p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6 text-gray-600">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Call Us</p>
                      <a href="tel:+919599249586" className="hover:text-primary transition-colors">+91 9599249586</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email Us</p>
                      <a href="mailto:hello@businessdoctor.in" className="hover:text-primary transition-colors">hello@businessdoctor.in</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Our Location</p>
                      <p>Delhi NCR, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
                <ContactForm source="Contact" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
