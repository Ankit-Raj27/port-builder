"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function TemplatesSection() {
  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
    
      <section className="w-full py-16 shadow-lg bg-gradient-to-tr from-[#1a1a1a] via-[#000] to-[#1a1a1a] dark:bg-gradient-to-tr dark:from-[#1a1a1a] dark:via-[#000] dark:to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center px-4 mb-"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose the best templates for your portfolio website
          </h2>
          <p className="text-lg text-slate-600">
            PortBuilder offers a wide variety of templates for creatives looking to make their portfolio. You can
            easily mix templates to create a digital portfolio that perfectly fits your needs.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-y-24 min-h-screen max-w-7xl mx-auto px-4">
          {/* First image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
          >
            {/* Top-left image (normal position) */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/portfolio1.png"
                width={240}
                height={240}
                alt="portfolio2"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </motion.div>

            {/* Top-right image (shifted down on md and up) */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/portfolio2.jpg"
                width={240}
                height={240}
                alt="portfolio1"
                className="rounded-lg shadow-lg object-cover md:mt-12"
              />
            </motion.div>

            {/* Bottom image (centered below, slight overlap on md+) */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={imageHoverVariants}
              className="md:col-span-2 flex justify-center md:-mt-8"
            >
              <Image
                src="/images/portfolio3.png"
                width={240}
                height={240}
                alt="portfolio3"
                className="rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-3xl md:text-4xl">Choose from Stunning Templates</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-white ">Create web pages easily</h3>
            <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
              PortBuilder gives you the freedom to mix and match beautifully designed sections—from navbars and hero sections to project showcases, experience timelines, and footers. Whether you are a designer, developer, or creative, you’ll find the perfect fit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white "> Fully Customizable Layouts</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-white ">Craft your unique digital presence with ease.</h3>
            <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
              Select from a variety of layout options for every section of your portfolio—no code required. Want a minimal navbar and a bold hero? Go for it. Prefer a dark footer with animated project cards? You’re in control.
            </p>
          </motion.div>

          {/* Second image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 p-4"
          >
            {/* Top-left - slightly lowered */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/editor1.png"
                width={240}
                height={240}
                alt="df"
                className="rounded-lg shadow-lg mt-6 object-cover"
              />
            </motion.div>

            {/* Top-right - slightly higher and overlaps left */}
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/editor2.jpg"
                width={240}
                height={240}
                alt="df"
                className="rounded-lg shadow-lg -mt-2 -ml-4 object-cover"
              />
            </motion.div>

            {/* Bottom - centered and overlapping top images slightly */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={imageHoverVariants}
              className="col-span-2 flex justify-center -mt-8"
            >
              <Image
                src="/images/editor3.jpg"
                width={260}
                height={260}
                alt="df"
                className="rounded-lg shadow-xl object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Third image section with grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 p-4 relative"
          >
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/hosting1.png"
                width={250}
                height={250}
                alt="img1"
                className="rounded-lg shadow-lg mt-4 object-cover "
              />
            </motion.div>
            <motion.div whileHover="hover" initial="initial" variants={imageHoverVariants}>
              <Image
                src="/images/hosting2.png"
                width={250}
                height={250}
                alt="img2"
                className="rounded-lg shadow-xl -mt-6 -ml-6 object-cover z-20 relative"
              />
            </motion.div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white "> Built-in Web Hosting</h2>
            <h3 className="text font-medium sm:text-2xl mt-2 text-white ">Host your portfolio easily</h3>
            <p className="mt-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed l:text-l/relaxed dark:text-gray-400">
              No more wrestling with hosting providers or DNS settings. Your portfolio lives on the web the moment you publish it—secure, fast, and hassle-free.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}