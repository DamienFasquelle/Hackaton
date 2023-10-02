function Banner() {
  return (
    <section className="main-container banner-section">
      <div className="flex-between">
        <div className="title">
          <h1>
            concours <br />
            <span>photos</span>
          </h1>
          <div className="flex-center">
            <p>by</p>
            <img src="/images/logo1.png" alt="logo-myphotos" />
          </div>
        </div>
        <div className="img-container">
          <img src="/images/cache-accueil.svg" alt="cache-accueil" />
          <div className="a1 anim-imgs"></div>
          <div className="a2 anim-imgs"></div>
          <div className="a3 anim-imgs"></div>
          <div className="a4 anim-imgs"></div>
          <div className="b1 anim-imgs"></div>
          <div className="b2 anim-imgs"></div>
          <div className="c1 anim-imgs"></div>
          <div className="c2 anim-imgs"></div>
          <div className="c3 anim-imgs"></div>
          <div className="c4 anim-imgs"></div>
          <img className="bg" src="/images/bg-anim.jpg" alt="photo-accueil" />
        </div>
      </div>
      <div className="scroller">
        <a href="#presentation" id="presentation">
          <svg
            className="scroll-indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 231.19 172.43"
          >
            <g id="V" class="cls-1">
              <g class="cls-1">
                <path
                  class="cls-2"
                  d="m0,0h26.35l95.92,150.21h2.11L204.84,0h26.35l-111.73,172.43h-7.73L0,0Z"
                />
              </g>
            </g>
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Banner;
