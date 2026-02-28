import heroRoute from "../assets/images/hero-route.jpg"

function Hero() {
  return (
    /*
      ACCESSIBILITY: section element is a landmark. aria-labelledby
      points to the h1 inside it, so screen readers announce this
      section as "Hero banner — Your Adventure Starts with RouteWise"
      giving users immediate context about what this section contains.
    */
    <section
      aria-labelledby="hero-heading"
      className="min-h-[520px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroRoute})` }}
    >

      {/* ACCESSIBILITY: aria-hidden on the overlay — it is purely
          decorative and adds no information for screen readers */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50"></div>

      <div className="relative flex flex-col md:flex-row min-h-[520px]">

        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 text-white">

          {/* ACCESSIBILITY: aria-hidden on the eyebrow text because
              the h1 below already communicates the full message.
              This avoids redundant announcements for screen readers. */}
          <p aria-hidden="true" className="text-sm mb-2">
            Plan Your Next Move
          </p>

          {/*
            ACCESSIBILITY: id="hero-heading" matches the aria-labelledby
            on the section element above. This creates a programmatic
            link so screen readers use this text to describe the section.
          */}
          <h1
            id="hero-heading"
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
          >
            Your Adventure Starts with RouteWise
          </h1>

          <p className="text-sm mb-8 max-w-sm">
            Turning every destination into an experience worth remembering,
            guiding you confidently from where you are to where you dream to be
          </p>

          {/*
            ACCESSIBILITY: aria-label gives the button a more descriptive
            name than just "Discover more" — tells the user what they
            will discover so they can decide whether to click it.
          */}
          <button
            aria-label="Discover more about RouteWise travel planning"
            className="bg-white text-gray-800 font-semibold px-6 py-3 rounded w-fit hover:bg-gray-100"
          >
            Discover more
          </button>
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center py-12">
          {/*
            ACCESSIBILITY: Descriptive alt text explains what is in the
            image to someone who cannot see it. "Travel" alone is not
            helpful — describe what is actually shown in the photo.
            If the image is purely decorative, use alt="" to skip it.
          */}
          <img
            src={heroRoute}
            alt="A traveller sitting confidently on a pink suitcase, ready for their next adventure"
            className="w-full md:w-[80%] rounded-xl shadow-xl object-cover max-h-[400px]"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero