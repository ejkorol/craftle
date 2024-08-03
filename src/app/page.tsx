"use client";

import { useTheme } from "@/utils/hooks/useTheme";
import { Button, Link } from "@nextui-org/react";
import CraftleLogo from "@/app/components/CraftleLogo";
import { motion } from "framer-motion";

const Home = () => {
  useTheme('light');

  const h1Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut", delay: 0.75 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.3, delayChildren: 1.25 } },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <main className="flex w-full h-svh justify-center items-center text-center">
      <section className="flex flex-col justify-center items-center text-center">
        <CraftleLogo />
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-serif font-bold mt-[35px]"
            variants={h1Variants}
          >
            Craftle
          </motion.h1>
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3
              className="text-2xl font-serif font-medium my-[35px]"
              variants={fadeVariants}
            >
              Get 6 chances to guess<br />a crafting recipe.
            </motion.h3>
            <motion.div
              className="flex flex-col items-center gap-6 md:flex-row"
              variants={containerVariants}
            >
              <motion.div variants={fadeVariants}>
                <Button
                  className="border-primary w-40 hover:bg-primary hover:text-white"
                  radius="full"
                  variant="bordered"
                  color="primary"
                >
                  Subscribe
                </Button>
              </motion.div>
              <motion.div variants={fadeVariants}>
                <Button
                  className="border-primary w-40 hover:bg-primary hover:text-white"
                  radius="full"
                  variant="bordered"
                  color="primary"
                >
                  Log in
                </Button>
              </motion.div>
              <motion.div variants={fadeVariants}>
                <Button
                  href="/craftle"
                  as={Link}
                  className="w-40"
                  radius="full"
                  variant="shadow"
                  color="primary"
                >
                  Play
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
