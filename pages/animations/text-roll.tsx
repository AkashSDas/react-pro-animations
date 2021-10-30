import styles from "../../styles/styles/TextRoll.module.scss";
import { css } from "glamor";

function TextRoll() {
  return (
    <main className="px-16 py-20 ">
      <div
        className="w-full font-black"
        style={{ fontFamily: "GTWalsheim Pro", fontSize: "80px" }}
      >
        <RollingAnimation color="black" text="Rolling Text 🏀" />
      </div>
      <div className="my-8 grid grid-flow-row grid-cols-4 gap-4">
        <Button text="React JS" />
        <Button text="Next JS" />
        <Button text="Glamor" />
        <Button text="SCSS" />
        <Button text="TypeScript" />
        <Button text="Framer Motion" />
        <Button text="Tailwind CSS" />
      </div>
      <div className="w-full bg-black p-8 flex flex-col md:flex-row justify-between">
        <img src="/images/bg4.png" alt="Background" />
        <div className="w-full flex flex-col items-end">
          <div style={{ fontFamily: "Sofia Pro", fontSize: "30px" }}>
            <RollingAnimation color="grey" text="🤳 Social" />
          </div>
          <div className="my-1"></div>
          <SideText text="Twitter" />
          <div className="my-1"></div>
          <SideText text="Facebook" />
          <div className="my-1"></div>
          <SideText text="Instagram" />
          <div className="my-1"></div>
          <SideText text="Dribbble" />
          <div className="my-1"></div>
          <SideText text="Github" />
        </div>
      </div>
    </main>
  );
}

function SideText({ text }: { text: string }) {
  return (
    <div style={{ fontFamily: "Sofia Pro", fontSize: "50px" }}>
      <RollingAnimation color="white" text={text} />
    </div>
  );
}

function Button({ text }: { text: string }) {
  return (
    <button
      style={{ borderWidth: "1px", fontFamily: "Sofia Pro", fontSize: 23 }}
      className="py-4 bg-white border-gray-500 border-solid rounded-full"
    >
      <RollingAnimation color="black" text={text} />
    </button>
  );
}

function RollingAnimation({ text, color }: { text: string; color: string }) {
  const after = css({
    "::after": { content: text, color: color },
    "::before": { content: text, color: color },
  });

  return (
    <div className={styles["roller"]}>
      <span className={`${after}`}>{text}</span>
    </div>
  );
}

export default TextRoll;
