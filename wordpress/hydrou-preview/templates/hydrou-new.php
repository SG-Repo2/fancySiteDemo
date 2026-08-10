<?php
/**
 * HydroU page template.
 *
 * The active theme supplies the site header and footer. Only the HydroU page
 * body is owned by this plugin.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<main id="top" class="hydrou-page">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__ribbon hero__ribbon--one" aria-hidden="true"></div>
        <div class="hero__ribbon hero__ribbon--two" aria-hidden="true"></div>
        <div class="hero__ribbon hero__ribbon--three" aria-hidden="true"></div>
        <div class="hero__shade" aria-hidden="true"></div>

        <div class="hero__inner shell">
          <div class="hero__collage" aria-label="Hydro University training and product imagery">
            <img class="collage-tile collage-tile--one reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-1.png' ); ?>" width="180" height="84" alt="Online pump training course preview" />
            <img class="collage-tile collage-tile--two reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-2.png' ); ?>" width="120" height="138" alt="Instructor-led pump training equipment" />
            <img class="collage-tile collage-tile--three reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-3.png' ); ?>" width="150" height="102" alt="Digital pump simulation on a tablet" />
            <img class="collage-tile collage-tile--four reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-4.png' ); ?>" width="176" height="128" alt="Hands-on maintenance work on industrial equipment" />
            <img class="collage-tile collage-tile--five reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-5.png' ); ?>" width="118" height="132" alt="Instructor presenting pump components" />
            <img class="collage-tile collage-tile--six reveal-intro" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-collage-6.png' ); ?>" width="162" height="214" alt="Blue industrial pump cutaway rendering" />
          </div>

          <div class="hero__lockup reveal-intro">
            <h1 id="hero-title" class="visually-hidden">Hydro University</h1>
            <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-hydrou-lockup.png' ); ?>" width="502" height="113" alt="Hydro University. Empowered Through Knowledge." />
          </div>

          <nav class="quicklinks reveal-intro" aria-label="Hydro University quick links">
            <a href="#intro">Our Story</a>
            <a href="#experts">Meet the Instructors</a>
            <a href="#courses">Student Login</a>
            <a href="#faq">FAQs &amp; Contact</a>
          </nav>
        </div>
      </section>

      <section class="intro" id="intro" aria-labelledby="intro-title">
        <div class="intro__inner shell">
          <h2 class="intro-title" id="intro-title" aria-label="Empower Your Team with Expert Knowledge.">
            <span class="line tone-muted"><span>Empower</span></span>
            <span class="line tone-muted"><span>Your Team</span></span>
            <span class="line tone-light"><span>with</span></span>
            <span class="line tone-light"><span>Expert</span></span>
            <span class="line tone-light"><span>Knowledge.</span></span>
          </h2>

          <div class="intro__copy" data-reveal style="font-size: 16px;">
            <p>
              Reliable pump operation depends as much on the capability of the people who
              operate, maintain, and evaluate the equipment as it does on the equipment
              itself.
            </p>
            <p>
              For this reason, personnel training is not a secondary support activity; it is a
              core reliability investment.
            </p>
            <p>
              Our flexible training programs, taught by industry experts with decades of
              experience, help teams improve reliability, reduce downtime, and build safer,
              more efficient operations — equipping the next generation of workers with
              practical skills that drive long-term success.
            </p>
            <p>Together, we’re building a smarter, stronger, and more resilient future.</p>
            <p>Join us.</p>
          </div>
        </div>
      </section>

      <section class="training" id="training" aria-labelledby="training-title">
        <div class="training__backdrop" aria-hidden="true"></div>
        <div class="training__inner shell">
          <h2 id="training-title" class="visually-hidden">Training formats and business impact</h2>

          <article class="training-panel training-panel--formats">
            <h3>Convenient Training Formats</h3>
            <ul>
              <li><strong>Online Courses</strong><span>Interactive, self-paced learning</span></li>
              <li><strong>Live Virtual Classes</strong><span>Real-time, instructor-led sessions</span></li>
              <li><strong>Hands-On Workshops</strong><span>Practical training with real equipment</span></li>
              <li><strong>Classroom Seminars</strong><span>Expert-led discussions and case studies</span></li>
              <li><strong>Flexible Solutions</strong><span>Custom curriculum, blended format</span></li>
            </ul>
            <a class="btn btn--light" href="#courses">View Courses</a>
          </article>

          <article class="training-panel training-panel--impact" id="impact">
            <h3>Business Impact</h3>
            <ul>
              <li>Lower maintenance costs</li>
              <li>Fewer unplanned shutdowns</li>
              <li>Improved energy efficiency</li>
              <li>Stronger reliability-centered maintenance</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="courses" id="courses" aria-labelledby="courses-title">
        <div class="courses__inner shell">
          <header class="section-heading section-heading--center" data-reveal>
            <h2 id="courses-title">Featured Courses</h2>
            <p>Live and On-Demand</p>
          </header>

          <div class="course-grid">
            <a
              class="course-card"
              href="https://external.university.hydroinc.com/catalog/info/id:258,cms_featured_course:1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="3345 Generic Failure Modes - Horizontal Pump Configurations, $423, on Hydro University (opens in a new tab)"
            >
              <span class="course-card__price">$423.00</span>
              <span class="course-card__media">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-course-3345-clean.png' ); ?>" width="218" height="130" alt="Horizontal pump train used in the 3345 course" loading="lazy" decoding="async" />
              </span>
              <h3>3345 Generic Failure Modes - Horizontal Pump Configurations</h3>
              <span class="course-card__external">
                View on Hydro University <span aria-hidden="true">↗</span>
                <span class="visually-hidden">; opens in a new tab</span>
              </span>
            </a>
            <a
              class="course-card"
              href="https://external.university.hydroinc.com/catalog/info/id:243,cms_featured_course:1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="3110 Pump Fundamentals for Engineers, $423, on Hydro University (opens in a new tab)"
            >
              <span class="course-card__price">$423.00</span>
              <span class="course-card__media">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-course-3110-clean.png' ); ?>" width="212" height="118" alt="Industrial pumps used in the 3110 course" loading="lazy" decoding="async" />
              </span>
              <h3>3110 Pump Fundamentals for Engineers</h3>
              <span class="course-card__external">
                View on Hydro University <span aria-hidden="true">↗</span>
                <span class="visually-hidden">; opens in a new tab</span>
              </span>
            </a>
            <a
              class="course-card"
              href="https://external.university.hydroinc.com/catalog/info/id:238,cms_featured_course:1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2140 Rolling Element Bearings, $171, on Hydro University (opens in a new tab)"
            >
              <span class="course-card__price">$171.00</span>
              <span class="course-card__media">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-course-2140-clean.png' ); ?>" width="196" height="134" alt="Rolling element bearing used in the 2140 course" loading="lazy" decoding="async" />
              </span>
              <h3>2140 Rolling Element Bearings</h3>
              <span class="course-card__external">
                View on Hydro University <span aria-hidden="true">↗</span>
                <span class="visually-hidden">; opens in a new tab</span>
              </span>
            </a>
            <a
              class="course-card"
              href="https://external.university.hydroinc.com/catalog/info/id:203,cms_featured_course:1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="3170 Vibration Fundamentals, $423, on Hydro University (opens in a new tab)"
            >
              <span class="course-card__price">$423.00</span>
              <span class="course-card__media">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-course-3170-clean.png' ); ?>" width="178" height="140" alt="Vibration analysis visualization used in the 3170 course" loading="lazy" decoding="async" />
              </span>
              <h3>3170 Vibration Fundamentals</h3>
              <span class="course-card__external">
                View on Hydro University <span aria-hidden="true">↗</span>
                <span class="visually-hidden">; opens in a new tab</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section class="split" id="webinars" aria-label="Webinars and instructors">
        <article class="split-panel split-panel--webinars">
          <div class="split-panel__inner">
            <h2>Wednesday Webinars</h2>
            <p class="split-panel__eyebrow">Join Hydro's FREE 90-Minute Webinar.</p>
            <p>
              Learn from our expert instructors and earn 1.5 Professional DHU credits -
              all from the convenience of your desk. Live sessions take place on the
              first Wednesday of each month.
            </p>
            <div class="webinar-actions" aria-label="Webinar links">
              <a href="#contact">Last Month's Webinar</a>
              <a href="#contact">Up Coming Webinars</a>
              <a href="#contact">Next Month's Webinar</a>
              <a href="#contact">See What You Missed</a>
            </div>
          </div>
        </article>

        <article class="split-panel split-panel--experts" id="experts">
          <div class="split-panel__inner">
            <h2>Meet our Experts</h2>
            <div class="expert-list">
              <article class="expert">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-expert-bob.png' ); ?>" width="100" height="120" alt="Bob Jennings" loading="lazy" decoding="async" />
                <div>
                  <h3>Bob Jennings</h3>
                  <p class="expert__role">Corporate Trainer</p>
                  <p>45+ years in pump sales, service, and troubleshooting.</p>
                </div>
              </article>
              <article class="expert">
                <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/pdf-expert-mike.png' ); ?>" width="100" height="120" alt="Mike Mancini" loading="lazy" decoding="async" />
                <div>
                  <h3>Mike Mancini</h3>
                  <p class="expert__role">President, Total Solutions</p>
                  <p>50+ years in pump design and training.</p>
                </div>
              </article>
            </div>
            <a class="btn btn--olive" href="#contact">Meet The Instructors</a>
          </div>
        </article>
      </section>

      <section class="why" id="why" aria-labelledby="why-title">
        <div class="why__inner shell">
          <article class="why-card why-card--white">
            <h2 id="why-title">Why Choose Hydro University?</h2>
            <p><strong>Proven Results - Trusted by organizations worldwide to build capability and reliability.</strong></p>
            <ul>
              <li>Significant reductions in unplanned downtime</li>
              <li>Lower maintenance costs and extended asset life</li>
              <li>Greater energy efficiency and sustainability</li>
              <li>Engaging, practical training professionals value</li>
            </ul>
          </article>

          <article class="why-card why-card--green">
            <h2 class="learn-bubbles">
              <span class="learn-bubble">Learn by doing.</span>
              <span class="learn-bubble">Grow through experience.</span>
              <span class="learn-bubble">Lead with confidence.</span>
            </h2>
            <p>That's the Hydro University way.</p>
          </article>

          <figure class="why-media">
            <img src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/hero-1280.webp' ); ?>" width="1280" height="720" alt="Close-up view of industrial pump components" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section class="impel" id="impel" aria-labelledby="impel-title">
        <div class="impel__inner shell">
          <div class="impel__media" data-reveal>
            <div class="impel__video">
              <iframe
                src="https://player.vimeo.com/video/1036532964?h=bd4b46c6bc&amp;dnt=1&amp;app_id=122963"
                title="IMPEL promotional video"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="impel__copy" data-reveal>
            <h2 id="impel-title" class="visually-hidden">IMPEL</h2>
            <img class="impel__logo" src="<?php echo esc_url( HYDROU_PREVIEW_URL . 'assets/img/impel-logo.png' ); ?>" width="1708" height="544" alt="IMPEL" loading="lazy" decoding="async" />
            <p>
              IMPEL® is an interactive, digital maintenance platform that replicates
              pump design and installation to clearly illustrate each step of the
              maintenance procedure.
            </p>
          </div>
        </div>
      </section>

      <section class="testimonial" aria-labelledby="testimonial-title">
        <div class="testimonial__inner shell">
          <h2 id="testimonial-title" data-reveal>What Our Customers Think</h2>
          <div class="testimonial-card" data-reveal>
            <button class="testimonial-card__nav" type="button" data-testimonial-prev aria-label="Previous testimonial">&lt;</button>
            <blockquote>
              <p class="testimonial-card__quote">
                "The instructor was well prepared and passionate. I've already
                recommended the course to colleagues."
              </p>
              <cite class="testimonial-card__cite">- Western Heights Water</cite>
            </blockquote>
            <button class="testimonial-card__nav" type="button" data-testimonial-next aria-label="Next testimonial">&gt;</button>
          </div>
        </div>
      </section>

      <section class="faq" id="faq" aria-labelledby="faq-title">
        <div class="faq__inner shell">
          <div class="faq__icon-placeholder" role="img" aria-label="FAQ icon placeholder; approved icon artwork is required" data-reveal>
            <span aria-hidden="true">FAQ</span>
            <small aria-hidden="true">Approved icon pending</small>
          </div>
          <div class="faq__copy" data-reveal>
            <h2 id="faq-title" class="visually-hidden">FAQs and Contact Form</h2>
            <p>
              Get answers to frequently asked questions and find easy contact
              information to get more information.
            </p>
            <a class="btn btn--blue" href="#contact">FAQs and Contact Form</a>
          </div>
        </div>
      </section>

      <section class="contact" id="contact" aria-labelledby="contact-title">
        <div class="contact__inner shell" data-reveal>
          <h2 id="contact-title">Contact Us</h2>
          <address class="contact-list">
            <a href="mailto:hydrouniversity@hydroinc.com" aria-label="Email Hydro University at hydrouniversity@hydroinc.com">
              <span class="contact-list__icon" aria-hidden="true">✉</span>
              <span>
                <strong>Email Hydro University</strong>
                <small>hydrouniversity@hydroinc.com</small>
              </span>
            </a>
            <a href="tel:+13127383000" aria-label="Call Hydro University at 312-738-3000">
              <span class="contact-list__icon" aria-hidden="true">☎</span>
              <span>
                <strong>Call Hydro University</strong>
                <small>312.738.3000</small>
              </span>
            </a>
          </address>
        </div>
      </section>
    </main>
<?php
get_footer();
