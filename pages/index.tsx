import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

gsap.config({
  force3D: true,
});

function Index() {
  const [position, setPosition] = useState({
    // clientX: -window.innerWidth,
    // clientY: -window.innerHeight,
    clientX: 0,
    clientY: 0,
  });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [text, setText] = useState(false);
  const [opaque, setOpaque] = useState(false);

  const [lg, setLg] = useState(false);
  const [color, setColor] = useState(false);
  const [exclusion, setExclusion] = useState(false);

  const [stick, setStick] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const mainRef = useRef();
  const cursorRef = useRef();

  const mouseEnter = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      node.addEventListener("mouseenter", () => setVisible(true), false);
    }
  };

  const mouseLeave = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      node.addEventListener("mouseleave", () => setVisible(false), false);
    }
  };

  const move = (x = 0, y = 0, event = null) => {
    if (event != null) {
      setPosition({ clientX: event.clientX, clientY: event.clientY });
      gsap.to(cursorRef.current, {
        x: event.clientX || position.clientX,
        y: event.clientY || position.clientY,
        duration: 0.2,
        overwrite: true,
      });
    } else {
      setPosition({
        clientX: x || position.clientX,
        clientY: y || position.clientY,
      });

      gsap.to(cursorRef.current, {
        x: x || position.clientX,
        y: y || position.clientY,
        duration: 10,
        overwrite: true,
      });
    }
  };

  const mouseMove = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      node.addEventListener(
        "mousemove",
        (event) => {
          move(0, 0, event);
        },
        false
      );
    }
  };

  const mouseDown = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      node.addEventListener("mousedown", () => setActive(true), false);
    }
  };

  const mouseEnterPointer = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      node.querySelectorAll("a").forEach((node) => {
        node.addEventListener("mouseenter", () => setPointer(true), false);
        node.addEventListener("mouseleave", () => setPointer(false), false);
      });

      node.querySelectorAll("textarea").forEach((node) => {
        node.addEventListener("mouseenter", () => setPointer(true), false);
        node.addEventListener("mouseleave", () => setPointer(false), false);
      });

      node.querySelectorAll("button").forEach((node) => {
        node.addEventListener("mouseenter", () => setPointer(true), false);
        node.addEventListener("mouseleave", () => setPointer(false), false);
      });

      node.querySelectorAll("input").forEach((node) => {
        node.addEventListener("mouseenter", () => setPointer(true), false);
        node.addEventListener("mouseleave", () => setPointer(false), false);
      });
    }
  };

  const mouseText = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      let n = node.querySelector("#text");
      n.addEventListener("mouseenter", () => setText(true), false);
      n.addEventListener("mouseleave", () => setText(false), false);
    }
  };

  const mouseLg = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      let n = node.querySelector(".-lg");
      n.addEventListener("mouseenter", () => setLg(true), false);
      n.addEventListener("mouseleave", () => setLg(false), false);
    }
  };

  const mouseColor = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      let n = node.querySelector(".-color-red");
      n.addEventListener("mouseenter", () => setColor(true), false);
      n.addEventListener("mouseleave", () => setColor(false), false);
    }
  };

  const mouseOpaque = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      let n = node.querySelector(".-opaque");
      n.addEventListener("mouseenter", () => setOpaque(true), false);
      n.addEventListener("mouseleave", () => setOpaque(false), false);
    }
  };

  const mouseStick = () => {
    const node = mainRef.current as HTMLElement;
    if (node) {
      let n = node.querySelector("#stick");
      n.addEventListener(
        "mouseenter",
        () => {
          const bound = n.getBoundingClientRect();
          setStick({
            active: true,
            x: bound.top + n.clientWidth / 2,
            y: bound.left + n.clientHeight / 2,
          });
          move(stick.x, stick.y, null);
        },
        false
      );
      n.addEventListener(
        "mouseleave",
        () =>
          setStick({
            ...stick,
            active: false,
            // x: 0,
            // y: 0,
          }),
        false
      );
    }
  };

  useEffect(() => {
    mouseEnter();
    mouseLeave();
    mouseMove();
    mouseDown();
    mouseEnterPointer();
    mouseText();

    mouseLg();
    mouseColor();
    mouseOpaque();
    mouseStick();
  }, []);

  return (
    <main ref={mainRef} className="container">
      <div
        ref={cursorRef}
        className={`cursor ${active ? "-active" : ""} ${
          visible ? "-visible" : ""
        } ${pointer ? "-pointer" : ""} ${text ? "-text" : ""} ${
          lg ? "-lg" : ""
        } ${color ? "-color-red" : ""}
        ${exclusion ? "-exclusion" : ""} 
        ${opaque ? "-opaque" : ""} 
        `}
      >
        <div className="cursor-text">{text ? "Hello" : ""}</div>
      </div>

      <div
        id="text"
        style={{ width: "200px", height: "200px", backgroundColor: "gray" }}
      >
        <h1>Hello World</h1>
      </div>

      <div>
        <a href="#">Cool</a>
        <input type="text" placeholder="Something" />
      </div>

      <div
        className="-lg"
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "blue",
        }}
      >
        <h1>Hello World</h1>
      </div>

      <div
        className="-color-red"
        style={{ width: "200px", height: "200px", backgroundColor: "blue" }}
      >
        <h1>Hello World</h1>
      </div>

      <div
        className="-opaque"
        style={{ width: "200px", height: "200px", backgroundColor: "blue" }}
      >
        <h1>Hello World</h1>
      </div>

      <div
        id="stick"
        className={stick.active ? "-stick" : ""}
        style={{ width: "200px", height: "200px", backgroundColor: "blue" }}
      >
        <h1>Hello World</h1>
        <div>
          {stick.x} {stick.y}
        </div>
      </div>
    </main>
  );
}

export default Index;
