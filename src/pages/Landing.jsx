// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/navigation/Navbar'
import {
  FiZap, FiTarget, FiFileText, FiLightbulb, FiTrendingUp,
  FiClock, FiArrowRight, FiCheckCircle, FiStar, FiShield,
  FiUsers, FiVideo, FiCpu, FiSmartphone
} from 'react-icons/fi'

function Landing() {
  const features = [
    {
      icon: FiZap,
      title: 'Viral Script Generator',
      description: 'Create high-retention scripts with perfect structure for any platform. Our AI analyzes viral patterns to craft scripts that keep viewers watching.',
      color: 'purple',
    },
    {
      icon: FiTarget,
      title: 'Hook Generator',
      description: 'Stop the scroll with curiosity-driven hooks. Get multiple variations optimized for your specific audience and platform.',
      color: 'pink',
    },
    {
      icon: FiFileText,
      title: 'Title Generator',
      description: 'Boost your CTR with AI-optimized titles. Each title is crafted using proven viral formulas and power words.',
      color: 'cyan',
    },
    {
      icon: FiLightbulb,
      title: 'Content Ideas',
      description: 'Never face creative block again. Get endless viral content ideas tailored to your niche with engagement predictions.',
      color: 'yellow',
    },
    {
      icon: FiTrendingUp,
      title: 'Trend Analysis',
      description: 'Stay ahead of trends with real-time analysis. Know what\'s working now and capitalize on emerging opportunities.',
      color: 'green',
    },
    {
      icon: FiClock,
      title: 'Save Hours',
      description: 'Reduce content planning time by 80%. Go from idea to publish-ready script in minutes, not hours.',
      color: 'orange',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Enter Your Topic',
      description: 'Tell us your niche, topic, or content idea',
      icon: FiFileText,
    },
    {
      number: '02',
      title: 'AI Generates Content',
      description: 'Our algorithms create viral-optimized results',
      icon: FiCpu,
    },
    {
      number: '03',
      title: 'Export & Publish',
      description: 'Copy, save, and use in your content immediately',
      icon: FiVideo,
    },
  ]

  const stats = [
    { value: '10K+', label: 'Active Creators' },
    { value: '1M+', label: 'Scripts Generated' },
    { value: '85%', label: 'Time Saved' },
    { value: '3x', label: 'Engagement Boost' },
  ]

  const benefits = [
    'Save 10+ hours per week on content planning',
    'Increase video engagement by up to 3x',
    'Never experience creative block again',
    'Access professional-grade hooks and scripts',
    'Scale your content across multiple platforms',
    'Stay consistent with your posting schedule',
    'Data-driven content strategies that work',
    'Built by creators, for creators',
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '10 generations per month',
        'Basic templates',
        'Title & Hook generator',
        'Save up to 20 projects',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: [
        'Unlimited generations',
        'All AI tools',
        'Advanced templates',
        'Priority support',
        'Script generator',
        'Idea generator',
        'Unlimited projects',
        'Export options',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: '/month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom AI training',
        'API access',
        'Dedicated support',
        'Custom templates',
        'Analytics dashboard',
        'White-label option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-surface-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-pink/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full filter blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm">AI-Powered Creator Platform</span>
              <FiStar className="text-yellow-400" size={14} />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
              Creator
              <span className="gradient-text block mt-2">OS AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4">
              The AI-powered creator studio for viral content, scripts, 
              and video creation. Scale your content with intelligence.
            </p>

            <p className="text-gray-500 max-w-2xl mx-auto mb-10">
              Join 10,000+ creators using AI to generate engaging scripts, 
              hooks, and titles that actually perform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
              >
                Start Creating Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>

            <p className="text-gray-500 text-sm">
              No credit card required • Free forever plan • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">go viral</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful AI tools designed specifically for content creators to generate 
              high-performing content faster than ever before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card group"
              >
                <div className={`w-12 h-12 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`text-${feature.color}-400 text-xl`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Three simple steps to viral content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-brand-500/20 to-accent-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-500/20">
                  <span className="text-2xl font-black gradient-text">{step.number}</span>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
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
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why creators choose{' '}
                <span className="gradient-text">CreatorOS AI</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Built by creators who understand the struggle of consistently producing 
                high-quality content that performs.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FiCheckCircle className="text-brand-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="glass-card p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded-full w-3/4" />
                    <div className="h-4 bg-white/5 rounded-full w-1/2" />
                  </div>
                  <div className="h-40 bg-gradient-to-r from-brand-500/10 to-accent-pink/10 rounded-xl flex items-center justify-center">
                    <FiZap className="text-brand-400 text-4xl" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-white/5 rounded-xl flex items-center justify-center">
                      <FiSmartphone className="text-gray-600 text-2xl" />
                    </div>
                    <div className="h-24 bg-white/5 rounded-xl flex items-center justify-center">
                      <FiYoutube className="text-gray-600 text-2xl" />
                    </div>
                    <div className="h-24 bg-white/5 rounded-xl flex items-center justify-center">
                      <FiTarget className="text-gray-600 text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/20 rounded-full filter blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-pink/20 rounded-full filter blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, transparent{' '}
              <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Start free, upgrade when you need more power
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card relative ${
                  plan.popular ? 'gradient-border' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-pink text-xs px-4 py-1">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <FiCheckCircle className="text-green-400 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card text-center p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-accent-pink/5" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-brand-500/20 rounded-full filter blur-2xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent-pink/20 rounded-full filter blur-2xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to transform your content?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators using CreatorOS AI to generate viral content, 
                save time, and grow their audience faster than ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
                >
                  Start Creating Free
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  View Demo
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FiShield size={14} /> No credit card required
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiUsers size={14} /> Join 10,000+ creators
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-accent-pink rounded-lg flex items-center justify-center">
                  <FiZap className="text-white" size={16} />
                </div>
                <span className="text-white font-bold text-lg">CreatorOS AI</span>
              </Link>
              <p className="text-gray-500 text-sm">
                AI-powered content creation platform for modern creators.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Templates', 'Changelog'],
              },
              {
                title: 'Resources',
                links: ['Blog', 'Tutorials', 'Community', 'Help Center'],
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'Privacy'],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 CreatorOS AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
