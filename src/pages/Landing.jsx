// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { 
  FiZap, 
  FiTarget, 
  FiFileText, 
  FiVideo, 
  FiTrendingUp, 
  FiClock,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi'

function Landing() {
  const features = [
    {
      icon: FiZap,
      title: 'Viral Script Generator',
      description: 'Generate high-retention scripts optimized for YouTube, TikTok, and Instagram Reels.'
    },
    {
      icon: FiTarget,
      title: 'Hook Generator',
      description: 'Create scroll-stopping hooks that capture attention in the first 3 seconds.'
    },
    {
      icon: FiFileText,
      title: 'Title Generator',
      description: 'Craft click-worthy titles that maximize CTR and drive more views.'
    },
    {
      icon: FiVideo,
      title: 'Content Ideas',
      description: 'Never run out of content with AI-powered viral video ideas for any niche.'
    },
    {
      icon: FiTrendingUp,
      title: 'Trend Analysis',
      description: 'Stay ahead of trends with AI that understands what\'s working right now.'
    },
    {
      icon: FiClock,
      title: 'Save Time',
      description: 'Reduce content creation time by 80% while increasing quality and engagement.'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Enter Your Topic',
      description: 'Tell us your niche or topic idea'
    },
    {
      number: '02',
      title: 'AI Generation',
      description: 'Our AI creates viral-optimized content'
    },
    {
      number: '03',
      title: 'Copy & Use',
      description: 'Export and use in your content immediately'
    }
  ]

  const benefits = [
    'Save 10+ hours per week on content planning',
    'Increase video engagement by up to 3x',
    'Never experience creative block again',
    'Access professional-grade hooks and scripts',
    'Scale your content across multiple platforms',
    'Stay consistent with your posting schedule'
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">AI-Powered Creator Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              CreatorOS
              <span className="gradient-text block">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              The AI-powered creator studio for viral content, scripts, and video creation. 
              Scale your content creation with intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="gradient-btn text-lg px-8 py-4 inline-flex items-center gap-2">
                Get Started Free
                <FiArrowRight />
              </Link>
              <Link to="/login" className="gradient-btn-outline text-lg px-8 py-4">
                Login
              </Link>
            </div>

            <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">go viral</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful AI tools designed specifically for content creators to generate 
              high-performing content faster than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-hover p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-gray-400 text-lg">Three simple steps to viral content</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                  <span className="text-2xl font-black gradient-text">{step.number}</span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                    <FiArrowRight className="text-gray-600 text-2xl" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why creators love{' '}
                <span className="gradient-text">CreatorOS AI</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
                  <div className="h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl mt-6"></div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="h-20 bg-white/5 rounded-xl"></div>
                    <div className="h-20 bg-white/5 rounded-xl"></div>
                    <div className="h-20 bg-white/5 rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-600/20 rounded-full filter blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to transform your content?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators using CreatorOS AI to generate viral content 
                and grow their audience faster.
              </p>
              <Link to="/signup" className="gradient-btn text-lg px-8 py-4 inline-flex items-center gap-2">
                Start Creating Free
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2024 CreatorOS AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
