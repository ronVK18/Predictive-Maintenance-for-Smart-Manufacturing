import React, { useState, useEffect } from 'react';
import { 
  FiActivity, 
  FiAlertCircle, 
  FiBarChart2, 
  FiCalendar, 
  FiCpu, 
  FiDatabase, 
  FiPieChart, 
  FiSettings, 
  FiTrendingUp, 
  FiWifi 
} from 'react-icons/fi';
import Header from '../components/Header';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { 
      icon: <FiAlertCircle className="text-blue-400" size={24} />, 
      title: "Anomaly Detection", 
      description: "Identify irregular patterns in sensor data with advanced algorithms" 
    },
    { 
      icon: <FiTrendingUp className="text-green-400" size={24} />, 
      title: "Predictive Forecasting", 
      description: "Calculate equipment failure probability with machine learning" 
    },
    { 
      icon: <FiActivity className="text-purple-400" size={24} />, 
      title: "Real-time Monitoring", 
      description: "Track critical metrics and receive instant alerts" 
    },
    { 
      icon: <FiCalendar className="text-yellow-400" size={24} />, 
      title: "Maintenance Scheduling", 
      description: "Automate maintenance planning to minimize downtime" 
    },
    { 
      icon: <FiPieChart className="text-pink-400" size={24} />, 
      title: "Data Visualization", 
      description: "Intuitive charts and graphs for actionable insights" 
    },
    { 
      icon: <FiBarChart2 className="text-red-400" size={24} />, 
      title: "Trend Analysis", 
      description: "Identify long-term patterns and operational insights" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
    <Header/>
      <div className={`max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-20">
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Predictive Maintenance for Smart Manufacturing
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Prevent equipment failures before they happen with real-time sensor analytics and AI-driven predictions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Request Demo
              </button>
              <button className="px-8 py-3 bg-transparent border border-blue-500 hover:bg-blue-500/10 rounded-lg font-medium transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative flex items-center justify-center p-8">
                <div className="w-full h-64 md:h-80 bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl flex items-center justify-center p-6 overflow-hidden">
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <FiCpu size={160} className="text-blue-500/10" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-semibold">Machine Performance Dashboard</div>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-ping"></span>
                          <span className="text-green-400 text-sm">Live</span>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/30 backdrop-blur rounded-lg p-3 flex flex-col">
                          <div className="text-xs text-gray-400">Temperature</div>
                          <div className="text-lg font-semibold flex items-center">
                            82.4°C <FiTrendingUp className="ml-2 text-red-400" />
                          </div>
                          <div className="mt-2 w-full bg-gray-600/30 h-1 rounded-full overflow-hidden">
                            <div className="bg-red-400 h-full rounded-full animate-pulse" style={{width: '70%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-700/30 backdrop-blur rounded-lg p-3 flex flex-col">
                          <div className="text-xs text-gray-400">Vibration</div>
                          <div className="text-lg font-semibold">Normal</div>
                          <div className="mt-2 w-full bg-gray-600/30 h-1 rounded-full overflow-hidden">
                            <div className="bg-green-400 h-full rounded-full" style={{width: '30%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-700/30 backdrop-blur rounded-lg p-3 flex flex-col">
                          <div className="text-xs text-gray-400">Pressure</div>
                          <div className="text-lg font-semibold">4.2 MPa</div>
                          <div className="mt-2 w-full bg-gray-600/30 h-1 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full rounded-full" style={{width: '45%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-700/30 backdrop-blur rounded-lg p-3 flex flex-col">
                          <div className="text-xs text-gray-400">Failure Risk</div>
                          <div className="text-lg font-semibold text-amber-400">Medium</div>
                          <div className="mt-2 w-full bg-gray-600/30 h-1 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{width: '55%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">98%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">73%</div>
                <div className="text-gray-400">Downtime Reduction</div>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">45%</div>
                <div className="text-gray-400">Cost Savings</div>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">1.2M</div>
                <div className="text-gray-400">Predictions Daily</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all duration-500 hover:bg-gray-700/40 transform hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="p-3 bg-gray-700/30 inline-block rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-12 shadow-xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-4">Ready to optimize your manufacturing operations?</h2>
                <p className="text-gray-300 text-lg">Join industry leaders who have reduced equipment failures by up to 78% with our predictive maintenance solution.</p>
              </div>
              <div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="fixed top-20 left-4 opacity-20 animate-bounce delay-300">
          <FiSettings size={24} className="text-blue-400" />
        </div>
        <div className="fixed bottom-20 right-8 opacity-20 animate-bounce delay-700">
          <FiDatabase size={24} className="text-purple-400" />
        </div>
        <div className="fixed top-40 right-12 opacity-20 animate-bounce delay-500">
          <FiWifi size={24} className="text-green-400" />
        </div>
      </div>
    </div>
  );
}