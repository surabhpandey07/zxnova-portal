'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zxnova-dark via-zxnova-darker to-black">
      {/* Header */}
      <header className="border-b border-zxnova-accent/20 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-zxnova-primary to-zxnova-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ZX</span>
              </div>
              <h1 className="text-2xl font-bold text-white">ZXNOVA Portal</h1>
            </div>
            <p className="text-zxnova-accent text-sm">Agency Management System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-white">
              Welcome to <span className="bg-gradient-to-r from-zxnova-primary to-zxnova-accent bg-clip-text text-transparent">ZXNOVA</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional Agency Management System. Manage clients, create invoices, proposals, and track tasks with ease.
            </p>
          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Clients', value: '0', icon: '👥' },
              { label: 'Projects', value: '0', icon: '📊' },
              { label: 'Invoices', value: '0', icon: '📄' },
              { label: 'Tasks', value: '0', icon: '✓' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur border border-zxnova-primary/20 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
            ))}
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Client Management', desc: 'Manage all your clients in one place' },
              { title: 'Invoicing', desc: 'Create and send professional invoices' },
              { title: 'Proposals', desc: 'Build custom proposals and quotes' },
              { title: 'Task Board', desc: 'Organize work with Kanban boards' },
              { title: 'Analytics', desc: 'Track performance and metrics' },
              { title: 'Team Collaboration', desc: 'Work together seamlessly' },
            ].map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-zxnova-primary/10 to-zxnova-accent/10 border border-zxnova-primary/30 rounded-lg p-6 hover:border-zxnova-accent/50 transition">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-6 py-12">
            <h3 className="text-3xl font-bold text-white">Ready to Get Started?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white font-semibold rounded-lg hover:opacity-90 transition">
                Launch Dashboard
              </button>
              <button className="px-8 py-3 border border-zxnova-accent text-zxnova-accent font-semibold rounded-lg hover:bg-zxnova-accent/10 transition">
                Learn More
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zxnova-accent/20 bg-black/30 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400">© 2026 ZXNOVA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
