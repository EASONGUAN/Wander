import React, { useRef, useState } from 'react';
import logo from './assets/wanderpin-logo.png';
import dashboardScreen from './assets/screen-dashboard.png';
import tripsScreen from './assets/screen-trips.png';
import bucketScreen from './assets/screen-bucket.png';
import itineraryScreen from './assets/screen-itinerary.png';

const featureCards = [
  {
    title: 'Secure, low-friction onboarding',
    text:
      'Let travelers sign in with Apple, Google, or email, choose a language before login, and accept legal terms without adding confusion.',
    accent: 'blue',
  },
  {
    title: 'Profiles built for real travelers',
    text:
      'Capture names, optional birth dates, passport details, and favorite activities so the app can personalize each travel experience.',
    accent: 'mint',
  },
  {
    title: 'Crew Cabins for group trips',
    text:
      'Turn friends into planning partners with shared cabins, invitations, and collaborative spaces built for trip coordination.',
    accent: 'sky',
  },
  {
    title: 'Daily itineraries with smart support',
    text:
      'Build day-by-day schedules with activities, locations, weather visibility, routing checks, reminders, and realistic travel alerts.',
    accent: 'navy',
  },
];

const storySteps = [
  {
    number: '01',
    title: 'Get started quickly and with confidence',
    text:
      'Choose your language, sign in securely, and move through a setup flow that stays simple from the very first screen.',
  },
  {
    number: '02',
    title: 'Save the details that make future trips easier',
    text:
      'Add your profile details, passport information, and travel preferences so Wander Pal can support the way you like to travel.',
  },
  {
    number: '03',
    title: 'Keep everyone on the same page as plans come together',
    text:
      'Create shared cabins, build day-by-day plans, and organize realistic itineraries with friends without losing track of the details.',
  },
];

const highlights = [
  'Apple, Google, and email sign-in',
  'Profiles, passports, and preferences',
  'Crew Cabins for shared planning',
  'Hourly itineraries with smart alerts',
];

const showcaseScreens = [
  {
    image: dashboardScreen,
    title: 'Planner hub',
    screenClass: 'screen--dashboard',
  },
  {
    image: tripsScreen,
    title: 'Trip library',
    screenClass: 'screen--trips',
  },
  {
    image: bucketScreen,
    title: 'Bucket list',
    screenClass: 'screen--bucket',
  },
  {
    image: itineraryScreen,
    title: 'Daily itinerary',
    screenClass: 'screen--itinerary',
  },
];

function FeatureCard({ title, text, accent }) {
  return (
    <article className={`feature-card feature-card--${accent}`}>
      <div className="feature-card__pill" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function DeviceFrame({ image, title, screenClass, frameClass = '' }) {
  return (
    <figure className={`device-frame ${frameClass}`} aria-label={title}>
      <div className="device-frame__speaker" />
      <div className={`device-frame__screen ${screenClass}`}>
        <img src={image} alt="" />
      </div>
    </figure>
  );
}

function DeviceCarousel({ screens }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  const total = screens.length;

  function showNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current == null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    if (deltaX < 0) {
      showNext();
      return;
    }

    showPrevious();
  }

  function getCardState(index) {
    const offset = (index - activeIndex + total) % total;

    if (offset === 0) {
      return 'showcase-carousel__card--active';
    }

    if (offset === 1) {
      return 'showcase-carousel__card--next';
    }

    if (offset === 2) {
      return 'showcase-carousel__card--back';
    }

    return 'showcase-carousel__card--prev';
  }

  return (
    <div className="showcase-carousel">
      <div
        className="showcase-carousel__deck"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {screens.map((screen, index) => (
          <div
            key={screen.title}
            className={`showcase-carousel__card ${getCardState(index)}`}
            onClick={() => {
              if (index === activeIndex) {
                showNext();
                return;
              }

              setActiveIndex(index);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveIndex(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Show ${screen.title}`}
          >
            <DeviceFrame
              image={screen.image}
              title={screen.title}
              screenClass={screen.screenClass}
              frameClass="device-frame--carousel"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <div className="page-glow page-glow--left" aria-hidden="true" />
      <div className="page-glow page-glow--right" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#hero">
          <img className="brand__logo" src={logo} alt="Wander Pal logo" />
          <span>Wander Pal</span>
        </a>

        <nav className="topbar__nav" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#story">How it works</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="hero__copy">
            <div className="hero-badge">
              <img src={logo} alt="" aria-hidden="true" />
              <span>Wander Pal</span>
            </div>
            <h1>
              From onboarding
              <br />
              to shared trip
              <br />
              planning.
            </h1>
            <p className="hero__lede">
              Wander Pal helps travelers sign in securely, set up profiles and
              passport details, choose travel preferences, and build practical
              itineraries together with friends.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#features">
                Explore features
              </a>
              <a className="button button--ghost" href="#story">
                View the product flow
              </a>
            </div>

            <ul className="hero__meta" aria-label="Highlights">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <DeviceCarousel screens={showcaseScreens} />
          </div>
        </section>

        <section className="section section--tight" id="features">
          <div className="section-heading">
            <p className="eyebrow">Built around the product requirements</p>
            <h2>Everything you need to get set up, personalize your trip, and plan it together.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className="section storyboard" id="story">
          <div className="storyboard__intro">
            <p className="eyebrow">From onboarding to itinerary execution</p>
            <h2>Get set up faster, save what matters, and plan each trip with more confidence.</h2>
            <p>
              The PRD positions Wander Pal as more than a trip board. It is a
              mobile-first system for user onboarding, group travel
              coordination, and practical day-by-day planning.
            </p>
          </div>

          <div className="storyboard__layout">
            <div className="story-steps">
              {storySteps.map((step) => (
                <article className="story-step" key={step.number}>
                  <span className="story-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <aside className="summary-panel">
              <div className="summary-panel__window">
                <div className="summary-panel__header">
                  <span>Core experience</span>
                  <span>What users move through</span>
                </div>

                <div className="summary-panel__body">
                  <div className="summary-panel__item">
                    <p>Step 1</p>
                    <strong>Onboarding and traveler setup</strong>
                    <span>Authentication, language selection, legal consent, profile details, passports, and travel preferences.</span>
                  </div>
                  <div className="summary-panel__item">
                    <p>Step 2</p>
                    <strong>Friends and Crew Cabins</strong>
                    <span>Invite friends, create shared cabins, and coordinate travel plans inside dedicated group spaces.</span>
                  </div>
                  <div className="summary-panel__item">
                    <p>Step 3</p>
                    <strong>Trip planning and daily schedules</strong>
                    <span>Create trips, organize activities, add locations, and stay realistic with alerts, reminders, and weather cues.</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--accent" id="about">
          <div className="closing-card">
            <div>
              <p className="eyebrow">Wander Pal static build</p>
              <h2>Everything you need to start planning, stay organized, and travel together more smoothly.</h2>
            </div>

            <p className="closing-card__text">
              Wander Pal brings onboarding, traveler profiles, shared trip
              spaces, and day-by-day planning into one experience, so every
              part of the journey feels easier to set up, manage, and share.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
