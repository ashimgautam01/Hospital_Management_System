import React, { useEffect, useState } from 'react';
import { Heart, Calendar, Stethoscope, Star, MapPin, Phone, Clock, ChevronRight, Activity, Shield, Users, Award } from 'lucide-react';

const Home = ({ isStaff }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const heroSlides = [
    {
      title: "Your Path To Health",
      subtitle: "Comprehensive Healthcare Excellence",
      description: "Nourish your body with wholesome foods, embrace the power of movement, and cultivate a balanced mind. Each day is a step towards a healthier you.",
      bg: "from-cyan-600 to-blue-700"
    },
    {
      title: "Advanced Medical Care",
      subtitle: "State-of-the-art Technology",
      description: "Experience cutting-edge medical treatments with our world-class facilities and expert healthcare professionals.",
      bg: "from-emerald-600 to-teal-700"
    },
    {
      title: "Compassionate Care",
      subtitle: "Your Wellness Journey",
      description: "Let your wellness journey be fueled by self-love and determination. Small changes lead to big results – choose to thrive.",
      bg: "from-purple-600 to-indigo-700"
    }
  ];

  const stats = [
    { icon: Users, number: "50,000+", label: "Patients Treated" },
    { icon: Stethoscope, number: "200+", label: "Expert Doctors" },
    { icon: Award, number: "25+", label: "Years Experience" },
    { icon: Heart, number: "98%", label: "Success Rate" }
  ];

  const doctors = [
    {
      date: "Jul 18",
      specialty: "Cardiologist",
      name: "Dr. Ram Chandra Gautam",
      description: "Specializes in diagnosing and treating diseases of the cardiovascular system, including the heart and blood vessels.",
      image: "https://img.freepik.com/premium-photo/portrait-happy-successful-hindu-doctor-young-medical-practitioner-smiling-looking_321831-17342.jpg",
      rating: 4.9,
      experience: "15+ Years",
      color: "from-red-100 to-pink-100"
    },
    {
      date: "Jul 20",
      specialty: "Neurologist",
      name: "Dr. Srijana Paudel",
      description: "Focuses on the diagnosis and treatment of disorders of the nervous system, including the brain, spinal cord, and nerves.",
      image: "https://img.freepik.com/free-photo/portrait-doctor_144627-39388.jpg",
      rating: 4.8,
      experience: "12+ Years",
      color: "from-blue-100 to-cyan-100"
    },
    {
      date: "Jul 22",
      specialty: "Dermatologist",
      name: "Dr. Ashok Kumar Ojha",
      description: "Specializes in the treatment of skin, hair, and nail disorders, including conditions like acne, eczema, and skin cancer.",
      image: "https://img.freepik.com/premium-photo/positive-indian-man-doctor-uniform-holding-clipboard-smiling_116547-84711.jpg",
      rating: 4.9,
      experience: "18+ Years",
      color: "from-green-100 to-emerald-100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    
  <section className="relative h-screen overflow-hidden text-white">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="./hero.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="absolute inset-0 bg-black/40 z-10"></div>

 
  <div className="relative z-30 container mx-auto px-6 h-full flex items-center">
    <div className="max-w-4xl mx-auto text-center">
   
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse shadow-lg">
            <Heart className="w-12 h-12 text-red-400 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">+</span>
          </div>
        </div>
      </div>
 
      <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-xl">
        <span className="bg-gradient-to-r from-teal-200 via-green-700 to-green-200 bg-clip-text text-transparent">
          {heroSlides[currentSlide].title}
        </span>
      </h1>
 
      <p className="text-xl md:text-2xl mb-4 font-light text-gray-100 drop-shadow-md">
        {heroSlides[currentSlide].subtitle}
      </p>
 
      <p className="text-lg mb-10 max-w-3xl mx-auto leading-relaxed text-white/80 drop-shadow">
        {heroSlides[currentSlide].description}
      </p> 
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-600 text-black rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl">
          <Calendar className="inline-block w-5 h-5 mr-2" />
          Book Appointment
          <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>

        <button className="group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-teal-800 hover:scale-105 backdrop-blur-sm">
          <Activity className="inline-block w-5 h-5 mr-2" />
          Your Health Profile
        </button>
      </div>
 
      <div className="flex justify-center mt-12 space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-cyan-50"></div>
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                data-animate
                className={`text-center group transition-all duration-500 hover:scale-105 ${
                  isVisible[`stat-${index}`] ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Specialists</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced doctors are here to provide you with the best medical care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                id={`doctor-${index}`}
                data-animate
                className={`group relative bg-gradient-to-br ${doctor.color} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible[`doctor-${index}`] ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                  <div className="text-sm font-semibold text-gray-700">{doctor.date}</div>
                </div>

                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{doctor.specialty}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{doctor.name}</h3>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold text-gray-700">{doctor.rating}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{doctor.experience}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{doctor.description}</p>

                  <button className="w-full bg-white text-gray-900 font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-md hover:shadow-lg">
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-800 to-teal-700 relative overflow-hidden p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63-34c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-sm font-semibold text-purple-200 mb-2 tracking-wider uppercase">
                Together Towards a Healthier Future
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                City Hospital <span className="text-purple-200">Mobile App</span>
              </h1>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                Access healthcare services anytime, anywhere. Book appointments, view reports, and connect with doctors through our mobile app.
              </p>
              
              <div className="flex items-center space-x-4 text-purple-200">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center space-x-4">
              <button className="group bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-2xl">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
              </button>

              <button className="group bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-2xl">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;