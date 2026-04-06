import heroRoute from "../assets/images/hero-route.jpg"
import SearchBar from "./SearchBar"

function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .rw-hero {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 40%, #7dd3fc 70%, #bae6fd 100%);
        }

        .rw-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 30%;
          z-index: 0;
          opacity: 0.18;
          mix-blend-mode: multiply;
        }

        .rw-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(14, 165, 233, 0.82) 0%,
            rgba(56, 189, 248, 0.55) 40%,
            rgba(186, 230, 253, 0.25) 75%,
            rgba(224, 242, 254, 0.1) 100%
          );
          z-index: 1;
        }

        .rw-hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px 72px;
          gap: 32px;
        }

        .rw-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }

        .rw-hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          display: inline-block;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .rw-hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.08;
          letter-spacing: -0.02em;
          max-width: 640px;
          margin: 0;
          text-shadow: 0 2px 24px rgba(0,100,160,0.18);
        }

        .rw-hero-heading mark {
          background: none;
          color: #fff176;
        }

        .rw-hero-sub {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          line-height: 1.7;
          max-width: 420px;
          margin: 0;
        }

        .rw-hero-hints {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .rw-hero-hints-label {
          font-size: 11.5px;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }

        .rw-hero-hint-chip {
          font-size: 11.5px;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.35);
          padding: 3px 10px;
          border-radius: 99px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .rw-hero-hint-chip:hover {
          background: rgba(255,255,255,0.35);
          color: #fff;
        }

        .rw-hero-stats {
          display: flex;
          gap: 32px;
          padding-top: 8px;
        }

        .rw-hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .rw-hero-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .rw-hero-stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .rw-hero-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.3);
          align-self: stretch;
        }

        .rw-scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.4;
        }

        .rw-scroll-hint span {
          font-size: 10px;
          color: #fff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        .rw-scroll-mouse {
          width: 20px;
          height: 30px;
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 99px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }

        .rw-scroll-wheel {
          width: 3px;
          height: 6px;
          background: rgba(255,255,255,0.8);
          border-radius: 99px;
          animation: scroll-wheel 1.6s ease-in-out infinite;
        }

        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }

        @media (max-width: 640px) {
          .rw-hero-inner {
            padding: 56px 24px 60px;
          }
          .rw-hero-stats {
            gap: 20px;
          }
          .rw-scroll-hint {
            display: none;
          }
        }
      `}</style>

      <section aria-labelledby="hero-heading" className="rw-hero">

        <div
          aria-hidden="true"
          className="rw-hero-bg"
          style={{ backgroundImage: `url(${heroRoute})` }}
        />
        <div aria-hidden="true" className="rw-hero-overlay" />

        <div className="rw-hero-inner">

          <p aria-hidden="true" className="rw-hero-eyebrow">
            <span className="rw-hero-eyebrow-dot" />
            PLAN YOUR PERFECT ESCAPE
          </p>

          <h1 id="hero-heading" className="rw-hero-heading">
            Your Path to<br />
            Adventure Starts <mark>Here</mark>
          </h1>

          <p className="rw-hero-sub">
            Discover personalized routes to hidden gems and bucket list destinations. Experience the journey, not just the destination.
          </p>

          <div>
            <SearchBar />

            <div className="rw-hero-hints">
              <span className="rw-hero-hints-label">Popular:</span>
              {["Paris", "Tokyo", "Rome", "Bali"].map((city) => (
                <button
                  key={city}
                  type="button"
                  aria-label={`Search for ${city}`}
                  className="rw-hero-hint-chip"
                  onClick={() => {
                    window.location.href = `/destinations?search=${city}`
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="rw-hero-stats" aria-label="RouteWise at a glance">
            <div className="rw-hero-stat">
              <span className="rw-hero-stat-num">20+</span>
              <span className="rw-hero-stat-label">Countries</span>
            </div>
            <div className="rw-hero-stat-divider" aria-hidden="true" />
            <div className="rw-hero-stat">
              <span className="rw-hero-stat-num">500+</span>
              <span className="rw-hero-stat-label">Destinations</span>
            </div>
            <div className="rw-hero-stat-divider" aria-hidden="true" />
            <div className="rw-hero-stat">
              <span className="rw-hero-stat-num">12k+</span>
              <span className="rw-hero-stat-label">Travellers</span>
            </div>
          </div>

        </div>

        <div className="rw-scroll-hint" aria-hidden="true">
          <div className="rw-scroll-mouse">
            <div className="rw-scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>

      </section>
    </>
  )
}

export default Hero
