import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('progressBar', { static: false }) progressBar!: ElementRef;
  @ViewChild('animatedBg', { static: false }) animatedBg!: ElementRef;

  activeSection = 'about';
  scrollProgress = 0;
  colorIndex = 0;
  lastTrail = 0;
  particleInterval: any;

  skills = [
    'Advanced Wiring',
    'Circuit Analysis',
    'Safety Protocols',
    'Motor Systems',
    'PLC Control',
    'Smart Home Tech',
    'Renewable Energy',
    'Digital Training'
  ];

  services = [
    {
      icon: '📚',
      title: 'Interactive Theory Sessions',
      description: 'Dynamic learning with 3D models and virtual simulations'
    },
    {
      icon: '🔧',
      title: 'Hands-On Workshops',
      description: 'Real-world projects with industry-standard equipment'
    },
    {
      icon: '🎯',
      title: 'Certification Programs',
      description: 'Complete certification courses with job placement support'
    },
    {
      icon: '💡',
      title: 'Innovation Labs',
      description: 'Cutting-edge research in smart electrical systems'
    }
  ];

  contactInfo = [
    {
      icon: '📱',
      title: 'Direct Line',
      info: '+855 XX XXX XXX'
    },
    {
      icon: '✉️',
      title: 'Email Hub',
      info: 'kimly.ry@email.com'
    },
    {
      icon: '📍',
      title: 'Innovation Center',
      info: 'Phnom Penh, Cambodia'
    },
    {
      icon: '🌟',
      title: 'Available 24/7',
      info: 'Always ready to innovate!'
    }
  ];

  backgroundColors = [
    'linear-gradient(45deg, #028a0f, #eba50a, #028a0f, #eba50a)',
    'linear-gradient(45deg, #eba50a, #028a0f, #eba50a, #028a0f)',
    'linear-gradient(45deg, #028a0f, #03a512, #eba50a, #ffc107)'
  ];

  ngOnInit() {
    this.startParticleSystem();
    this.setupIntersectionObserver();
  }

  ngAfterViewInit() {
    this.updateProgressBar();
  }

  ngOnDestroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateProgressBar();
    this.updateBackgroundColor();
    this.updateFloatingElements();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const now = Date.now();
    if (now - this.lastTrail > 50) {
      this.createMouseTrail(event);
      this.lastTrail = now;
    }
  }

  updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset;
    this.scrollProgress = (scrollTop / scrollHeight) * 100;

    if (this.progressBar) {
      this.progressBar.nativeElement.style.width = this.scrollProgress + '%';
    }
  }

  updateBackgroundColor() {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    let newColorIndex = 0;
    if (scrollPercent > 25 && scrollPercent < 50) {
      newColorIndex = 1;
    } else if (scrollPercent > 50 && scrollPercent < 75) {
      newColorIndex = 2;
    }

    if (newColorIndex !== this.colorIndex) {
      this.colorIndex = newColorIndex;
      if (this.animatedBg) {
        this.animatedBg.nativeElement.style.background = this.backgroundColors[this.colorIndex];
      }
    }
  }

  updateFloatingElements() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element: any, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  }

  createMouseTrail(event: MouseEvent) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
      position: fixed;
      left: ${event.clientX}px;
      top: ${event.clientY}px;
      width: 6px;
      height: 6px;
      background: #eba50a;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      animation: trailFade 0.8s ease-out forwards;
    `;

    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 800);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: #eba50a;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      animation: particle ${Math.random() * 3 + 5}s linear infinite;
      animation-delay: ${Math.random() * 2}s;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 8000);
  }

  startParticleSystem() {
    this.particleInterval = setInterval(() => {
      this.createParticle();
    }, 2000);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const id = entry.target.getAttribute('id');
          if (id) {
            this.activeSection = id;
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    setTimeout(() => {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }

  navigateToSection(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onNavItemClick(event: Event, sectionId: string) {
    event.preventDefault();

    const target = event.currentTarget as HTMLElement;

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(2, 138, 15, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: 50%;
      top: 50%;
      width: 50px;
      height: 50px;
      margin-left: -25px;
      margin-top: -25px;
    `;

    target.style.position = 'relative';
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    this.navigateToSection(sectionId);
  }

  onSkillClick(skill: string, event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'translateY(-15px) rotateY(180deg) scale(1.1)';
    target.style.background = 'linear-gradient(135deg, #eba50a, #ffc107)';

    setTimeout(() => {
      target.style.transform = '';
      target.style.background = '';
    }, 600);
  }

  onServiceHover(event: Event, isEnter: boolean) {
    const target = event.currentTarget as HTMLElement;
    if (isEnter) {
      target.style.background = 'linear-gradient(135deg, #028a0f, #03a512)';
    } else {
      target.style.background = 'linear-gradient(135deg, #eba50a, #ffc107)';
    }
  }

  onContactClick(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      target.style.transform = 'scale(1)';
    }, 150);
  }
}
