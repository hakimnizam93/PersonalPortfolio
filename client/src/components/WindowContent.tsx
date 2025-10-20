import { Gamepad2 } from 'lucide-react';
import { useState } from 'react';

interface WindowContentProps {
  component: string;
  onOpenApp: (app: { id: string; title: string; component: string }) => void;
}

export function WindowContent({ component, onOpenApp }: WindowContentProps) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = () => {
    console.log('Contact form submitted:', contactForm);
    alert('Thanks for reaching out! Message received.');
    setContactForm({ name: '', email: '', message: '' });
  };

  if (component === 'Welcome') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-card">
        <div className="text-5xl mb-6 opacity-80">👋</div>
        <h1 className="text-4xl font-light mb-3 text-foreground tracking-tight" data-testid="text-welcome-name">
          Hakim Nizam
        </h1>
        <p className="text-lg text-muted-foreground mb-2 font-light">Design Leader</p>
        <p className="text-sm text-muted-foreground/70 max-w-md mb-10 leading-relaxed">
          Creating experiences that bridge people and business success
        </p>
        <button 
          onClick={() => onOpenApp({ id: 'about', title: 'About', component: 'About' })}
          className="px-6 min-h-9 bg-foreground text-background text-sm rounded-lg hover-elevate active-elevate-2 transition-colors"
          data-testid="button-explore"
        >
          Explore
        </button>
      </div>
    );
  }
  
  if (component === 'About') {
    return (
      <div className="h-full overflow-auto p-10 bg-card">
        <h2 className="text-2xl font-light mb-8 text-foreground">About</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl">
          <p>
            I'm a Kuala Lumpur-based design leader with 5 years of experience taking things apart and figuring out how they tick. That curiosity translates into crafting user experiences that matter.
          </p>
          <p>
            Currently at ServiceRocket, working to become the most reliable Atlassian partner for thousands of businesses worldwide. I also lead the team at Zensite, a top UX agency across Singapore and Malaysia.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Active in design leadership communities, staying connected to evolving product trends and debates.
          </p>
          
          <div className="pt-8 space-y-4 border-t border-border mt-10">
            <h3 className="text-lg font-light text-foreground mb-6">Principles</h3>
            <div className="space-y-5">
              {[
                { title: 'People First', desc: 'Understanding needs and motivations is the foundation' },
                { title: 'Vision and Execution', desc: 'Plan the vision, stay hands-on to bring it to life' },
                { title: 'Fail Fast, Win Big', desc: 'Learning quickly from failures accelerates success' },
                { title: 'Business Impact', desc: 'Great design must drive actual results' }
              ].map((principle) => (
                <div key={principle.title}>
                  <h4 className="text-sm font-medium text-foreground mb-1">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (component === 'Work') {
    return (
      <div className="h-full overflow-auto p-10 bg-card">
        <h2 className="text-2xl font-light mb-8 text-foreground">Experience</h2>
        <div className="space-y-8 max-w-2xl">
          {[
            {
              company: 'ServiceRocket',
              role: 'Design Leader',
              desc: 'Leading user experience initiatives for enterprise Atlassian solutions, helping thousands of businesses worldwide work more efficiently.'
            },
            {
              company: 'Zensite',
              role: 'Design Team Lead',
              desc: 'Guiding a top UX agency across Singapore and Malaysia, delivering exceptional digital experiences for diverse clients.'
            },
            {
              company: 'Community',
              role: 'Design Leadership Networks',
              desc: 'Actively engaged in design communities, staying at the forefront of product design trends and leadership best practices.',
              noBorder: true
            }
          ].map((job) => (
            <div key={job.company} className={job.noBorder ? '' : 'pb-8 border-b border-border'}>
              <h3 className="text-base font-medium text-foreground mb-1">{job.company}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (component === 'Projects') {
    return (
      <div className="h-full overflow-auto p-10 bg-card">
        <h2 className="text-2xl font-light mb-8 text-foreground">Selected Work</h2>
        <div className="grid grid-cols-1 gap-6 max-w-2xl">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`group cursor-pointer pb-6 ${i < 4 ? 'border-b border-border' : ''}`}>
              <div className="w-full h-48 bg-muted/20 rounded-lg mb-4 group-hover:bg-muted/30 transition-colors"></div>
              <h3 className="text-base font-medium text-foreground mb-2">Project {i}</h3>
              <p className="text-sm text-muted-foreground">Brief description of the project and its impact</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (component === 'Resume') {
    return (
      <div className="h-full overflow-auto p-10 bg-card">
        <h2 className="text-2xl font-light mb-8 text-foreground">Resume</h2>
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Experience</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-foreground">Design Leader</h4>
                <p className="text-sm text-muted-foreground mb-2">ServiceRocket · 2020 - Present</p>
                <p className="text-sm text-muted-foreground">Leading UX initiatives for enterprise solutions</p>
              </div>
              <div>
                <h4 className="text-base font-medium text-foreground">Design Team Lead</h4>
                <p className="text-sm text-muted-foreground mb-2">Zensite · 2019 - Present</p>
                <p className="text-sm text-muted-foreground">Managing UX agency operations across Singapore and Malaysia</p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['UX Design', 'Design Leadership', 'Product Strategy', 'User Research', 'Figma', 'Team Management', 'Atlassian'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-muted/20 text-foreground/70 rounded-md text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  if (component === 'Games') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-card p-10">
        <Gamepad2 size={48} className="text-muted-foreground/30 mb-6" />
        <h2 className="text-2xl font-light mb-3 text-foreground">Games</h2>
        <p className="text-center mb-8 text-muted-foreground text-sm max-w-md">
          Ready for a break? DOOM and Oregon Trail coming soon.
        </p>
        <div className="space-y-3 w-64">
          <button 
            onClick={() => console.log('DOOM clicked')}
            className="w-full px-6 min-h-9 bg-foreground text-background text-sm rounded-lg hover-elevate active-elevate-2 transition-colors"
            data-testid="button-doom"
          >
            DOOM
          </button>
          <button 
            onClick={() => console.log('Oregon Trail clicked')}
            className="w-full px-6 min-h-9 bg-muted text-foreground text-sm rounded-lg hover-elevate active-elevate-2 transition-colors"
            data-testid="button-oregon-trail"
          >
            Oregon Trail
          </button>
        </div>
      </div>
    );
  }
  
  if (component === 'Contact') {
    return (
      <div className="h-full overflow-auto p-10 bg-card">
        <h2 className="text-2xl font-light mb-8 text-foreground">Get in touch</h2>
        <div className="space-y-5 max-w-md">
          <div>
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Name</label>
            <input 
              type="text" 
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-card text-foreground"
              data-testid="input-contact-name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-card text-foreground"
              data-testid="input-contact-email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Message</label>
            <textarea 
              rows={4} 
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm bg-card text-foreground resize-none"
              data-testid="input-contact-message"
            ></textarea>
          </div>
          <button 
            onClick={handleContactSubmit}
            className="w-full px-6 min-h-9 bg-foreground text-background text-sm rounded-lg hover-elevate active-elevate-2 transition-colors"
            data-testid="button-contact-send"
          >
            Send
          </button>
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Connect</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com' },
              { name: 'Dribbble', url: 'https://dribbble.com' },
              { name: 'Behance', url: 'https://www.behance.net' }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-muted/20 text-foreground rounded-lg hover-elevate text-xs transition-colors"
                data-testid={`link-social-${social.name.toLowerCase()}`}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return <div className="h-full flex items-center justify-center bg-card text-muted-foreground">Content loading...</div>;
}
