import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

interface FAQProps {
  question: string;
  answer: string;
}


function FAQ({ question, answer }: FAQProps): JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // Track section from start to end
  });

  return (
    <section ref={ref} className="faq-section">
      <motion.div
        className="faq-question"
        style={{
          translateY: scrollYProgress, // Animate question's position
        }}
      >
        {question}
      </motion.div>
      <div className="faq-answer">{answer}</div>
    </section>
  );
}

export default function App(): JSX.Element {
  const faqs = [
    { question: "What is Framer Motion?", answer: "Framer Motion is a React library for animations." },
    { question: "How does useScroll work?", answer: "useScroll tracks scroll progress of an element or viewport." },
    { question: "What is SVG?", answer: "SVG stands for Scalable Vector Graphics." },
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
  ];


  return (
    <>
      {faqs.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
    </>
  );
}

