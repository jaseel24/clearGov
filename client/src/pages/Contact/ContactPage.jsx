import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We’d love to hear from you! Please fill out the form below or reach out to us directly.
          </p>
        </div>
        <div className="mt-12">
          

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Feel free to reach out to us via phone, email, or visit our office.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email</h4>
                <p className="mt-1 text-sm text-gray-500">support@tendersapp.com</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Phone</h4>
                <p className="mt-1 text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Address</h4>
                <p className="mt-1 text-sm text-gray-500">
                  123 Tenders Street<br />
                  Suite 456<br />
                  New York, NY 10001
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Map</h4>
                <div className="mt-4 aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183792036099!2d-73.9854280845936!3d40.748440479327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1633023226785!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;