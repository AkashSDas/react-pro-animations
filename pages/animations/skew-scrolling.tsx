import { useEffect, useRef, useState } from "react";

function SkewScrolling() {
  const size = useWindowSize();

  const mainRef = useRef();
  const scrollRef = useRef();

  // Making <main> to fixed position and keeping overflow hidden
  // Stopping any scroll in the main and for scroll relying on .scroll
  // where we'll have skew scroll
  const mainStyle = "fixed top-0 left-0 h-full w-full overflow-hidden";

  useEffect(() => {
    if (scrollRef.current) {
      const node = scrollRef.current as HTMLElement;
      document.body.style.height = `${node.getBoundingClientRect().height}px`;
    }

    // NOTE: a performance improvement will be to use debounce for size.height
    // so that you don't call it again and again when the height changes continously
  }, [size.height]);

  const skewConfig = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  const skewScrolling = () => {
    skewConfig.current = window.scrollY;

    skewConfig.previous +=
      (skewConfig.current - skewConfig.previous) * skewConfig.ease;

    skewConfig.rounded = Math.round(skewConfig.previous * 100) / 100;

    // variables
    const difference = skewConfig.current - skewConfig.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 50.5;

    // style change
    if (scrollRef.current) {
      const node = scrollRef.current as HTMLElement;
      node.style.transform = `skewY(${skew}deg)`;

      // Remove translateY because it was it's translation was creating a lot
      // of unnecessary space between .scroll and the component after it
      // Removing it causes no changes in skew scroll
      // translateY will be needed if you want smooth scrolling, here remove
      // skew and add translate
      // node.style.transform = `translateY(-${skewConfig.rounded}px) skewY(${skew}deg)`;
    }

    // animating
    requestAnimationFrame(() => skewScrolling());
  };

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  return (
    // The below line makes the parent component position fixed
    // <main ref={mainRef} className={`main ${mainStyle}`}>
    <main ref={mainRef} className={`main`}>
      <img src="/images/bg5.png" alt="Background" />

      <div ref={scrollRef} className="scroll py-12 px-64">
        <HeadingText text="Skew Scrolling" fontSize={60} />
        <InfoText />
        <img src="/images/bg5.png" alt="Background" />
        <div className="flex my-16">
          <Button text="Skew" />
          <Button text="Jelly" />
          <Button text="Smooth" />
        </div>
        <div className="container">
          <HeadingText fontSize={50} text="People" />
          <div className="grid gap-8 grid-cols-2 grid-flow-row mt-16">
            <img src="/images/person1.png" alt="Person 1" />
            <img className="pt-8" src="/images/person2.png" alt="Person 2" />
            <img src="/images/person3.png" alt="Person 3" />
            <img className="pt-16" src="/images/person4.png" alt="Person 4" />
          </div>
        </div>
      </div>

      <img className="mb-8" src="/images/bg5.png" alt="Background" />

      <div className="px-64">
        <SkewScrollingAnimation>
          <>
            <HeadingText text="Skew Scrolling" fontSize={60} />
            <InfoText />
            <img src="/images/bg5.png" alt="Background" />
            <div className="flex my-16">
              <Button text="Skew" />
              <Button text="Jelly" />
              <Button text="Smooth" />
            </div>
            <div className="container">
              <HeadingText fontSize={50} text="People" />
              <div className="grid gap-8 grid-cols-2 grid-flow-row mt-16">
                <img src="/images/person1.png" alt="Person 1" />
                <img
                  className="pt-8"
                  src="/images/person2.png"
                  alt="Person 2"
                />
                <img src="/images/person3.png" alt="Person 3" />
                <img
                  className="pt-16"
                  src="/images/person4.png"
                  alt="Person 4"
                />
              </div>
            </div>
          </>
        </SkewScrollingAnimation>
      </div>
    </main>
  );
}

function SkewScrollingAnimation({ children }: { children: JSX.Element }) {
  const size = useWindowSize();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const node = ref.current as HTMLElement;
      document.body.style.height = `${node.getBoundingClientRect().height}px`;
    }

    // NOTE: a performance improvement will be to use debounce for size.height
    // so that you don't call it again and again when the height changes continously
  }, [size.height]);

  const config = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  const skewScrolling = () => {
    config.current = window.scrollY;
    config.previous += (config.current - config.previous) * config.ease;
    config.rounded = Math.round(config.previous * 100) / 100;

    const difference = config.current - config.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 50.5;

    if (ref.current) {
      const node = ref.current as HTMLElement;
      node.style.transform = `skewY(${skew}deg)`;
    }
    requestAnimationFrame(() => skewScrolling());
  };

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  return <div ref={ref}>{children}</div>;
}

function Button({ text }: { text: string }) {
  return (
    <button
      style={{
        fontFamily: "Sofia Pro",
        fontSize: "17px",
        fontWeight: 500,
      }}
      className="mr-5 py-4 px-8 bg-black text-white cursor-auto"
    >
      {text}
    </button>
  );
}

function InfoText() {
  return (
    <p
      className="text-gray-700 my-16"
      style={{
        fontFamily: "Sofia Pro",
        fontSize: "23px",
        fontWeight: 500,
        lineHeight: 1.4,
      }}
    >
      Skew on scroll effect with CSS. ... This effect is called a Skew on Scroll
      Effect, which creates a unique visual distortion in the form of a skew
      motion when scrolling. This would pair beautifully with elements in the
      center of your viewport
    </p>
  );
}

function HeadingText({ fontSize, text }: { fontSize: number; text: string }) {
  return (
    <div
      className="w-full text-white"
      style={{
        fontFamily: "GTWalsheim Pro",
        fontSize: `${fontSize}px`,
        textShadow: "4px 4px 0px #000000",
        WebkitTextStroke: "1.5px #000000",
        lineHeight: `${fontSize}px`,
      }}
    >
      {text}
    </div>
  );
}

function useWindowSize() {
  const getSize = () => ({
    width: typeof window !== "undefined" && window.innerWidth,
    height: typeof window !== "undefined" && window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(() => getSize());

  const handleResize = () => {
    setWindowSize(() => getSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default SkewScrolling;
