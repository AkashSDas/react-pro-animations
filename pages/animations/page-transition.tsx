import { AnimatePresence, motion } from "framer-motion";
import { createContext, MouseEventHandler, useContext, useState } from "react";
import styles from "../../styles/styles/PageTransition.module.scss";

const PageNumContext = createContext<any>(null);

function PageTransition() {
  const [pageNum, setPageNum] = useState(0);

  const displayPage = () => {
    if (pageNum == 0) return <Page1 />;
    else if (pageNum == 1) return <Page2 />;
    else if (pageNum == 2) return <Page3 />;
    return <></>;
  };

  const pushPage = () => {
    if (pageNum < 3) setPageNum(() => pageNum + 1);
  };

  const popPage = () => {
    if (pageNum > 0) setPageNum(() => pageNum - 1);
  };

  return (
    <PageNumContext.Provider value={{ pushPage, popPage }}>
      <SlideAnimation pageNum={pageNum}>{displayPage()}</SlideAnimation>
    </PageNumContext.Provider>
  );
}

const SlideAnimation = ({
  pageNum,
  children,
}: {
  pageNum: number;
  children: JSX.Element;
}) => {
  const slideAnimation = {
    pageInitial: { x: "-100vw" },
    pageAnimate: { x: "0vw" },
    pageExit: { x: "100vw" },
  };

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      <motion.main
        key={pageNum}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={slideAnimation}
        transition={{ type: "tween", ease: "easeInOut" }}
        style={{ fontFamily: "Cubano" }}
        className="h-screen"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

function Button({
  onClick,
  text,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }}
      className="bg-white text-black p-4 hover:cursor-pointer hover:bg-gray-300 transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Heading({ text }: { text: string }) {
  return (
    <h1
      style={{
        textShadow: "4px 4px 4px #000000",
        WebkitTextStroke: "1.5px #000000",
        lineHeight: "100px",
      }}
      className={styles["heading"]}
    >
      {text}
    </h1>
  );
}

function PageWrapper({
  children,
  color,
}: {
  children: JSX.Element;
  color: string;
}) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="h-full text-white px-4 py-4 w-full md:px-16"
    >
      {children}
    </div>
  );
}

function Page1() {
  const { pushPage } = useContext(PageNumContext);

  return (
    <PageWrapper color="#FF2E2E">
      <>
        <Heading text="Page 1" />
        <img className="my-8" src="/images/bg1.png" alt="Page 1" />
        <div className="w-full flex justify-end">
          <Button text="Go to page 2" onClick={() => pushPage()} />
        </div>
      </>
    </PageWrapper>
  );
}

function Page2() {
  const { pushPage, popPage } = useContext(PageNumContext);

  return (
    <PageWrapper color="#FFEA2E">
      <>
        <Heading text="Page 2" />
        <img className="my-8" src="/images/bg2.png" alt="Page 2" />
        <div className="w-full flex justify-between">
          <Button text="Go to page 1" onClick={() => popPage()} />
          <Button text="Go to page 3" onClick={() => pushPage()} />
        </div>
      </>
    </PageWrapper>
  );
}

function Page3() {
  const { popPage } = useContext(PageNumContext);

  return (
    <PageWrapper color="#2ECDFF">
      <>
        <Heading text="Page 3" />
        <img className="my-8" src="/images/bg3.png" alt="Page 3" />
        <div className="w-full flex justify-start">
          <Button text="Go to page 2" onClick={() => popPage()} />
        </div>
      </>
    </PageWrapper>
  );
}

export default PageTransition;
