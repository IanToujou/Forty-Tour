import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";

export const SectionLegal = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="bg-neutral-white w-full px-12 py-24 md:py-36">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mx-auto w-full max-w-3xl"
                >
                    <h1 className="font-outfit text-neutral-darker text-4xl font-semibold tracking-tight md:text-5xl">Legal Notice</h1>
                    <p className="font-manrope text-neutral-light mt-4 text-sm">Last updated: 4. October 2026</p>

                    <div className="mt-12 flex flex-col gap-10">
                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">1. Provider</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                This website is operated by Ian Bour, Luxembourg. It is a personal, non-commercial project.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">2. Contact</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                For any questions about this website, including requests concerning your personal data, you can reach us using the
                                details below.
                            </p>
                            <div className="font-manrope text-neutral-medium mt-3 flex flex-col gap-y-1 text-base leading-relaxed">
                                <p>
                                    <span className="text-neutral-darker font-semibold">Name:</span> Ian Bour
                                </p>
                                <p>
                                    <span className="text-neutral-darker font-semibold">Country:</span> Luxembourg
                                </p>
                                <p>
                                    <span className="text-neutral-darker font-semibold">Email:</span>{" "}
                                    <a
                                        href="mailto:legal@toujou.lu"
                                        className="text-primary-dark decoration-primary-medium hover:text-primary-medium font-semibold underline underline-offset-4 transition-colors duration-300"
                                    >
                                        legal@toujou.lu
                                    </a>
                                </p>
                                <p>
                                    <span className="text-neutral-darker font-semibold">Website:</span>{" "}
                                    <a
                                        href="https://toujou.lu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-dark decoration-primary-medium hover:text-primary-medium font-semibold underline underline-offset-4 transition-colors duration-300"
                                    >
                                        toujou.lu
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">3. Responsibility for Content</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                We take care to keep the information on this website accurate and up to date. However, we cannot guarantee that it is
                                complete, correct, or current at all times, and we accept no liability for any loss arising from its use.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">4. External Links</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                This website may link to third-party websites. We have no influence over their content and are not responsible for it.
                                The respective provider is always responsible for the content of linked pages. If you notice an unlawful link, please
                                let us know and we will review it promptly.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">5. Intellectual Property</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                The content of this website, including texts, graphics, and images, is protected by copyright unless stated otherwise.
                                Any use beyond what the law permits requires our prior written consent.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">6. Data Protection</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-justify text-base leading-relaxed">
                                Information on how we process personal data can be found in our Privacy Policy.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="bg-primary-medium hover:bg-primary-dark group mx-auto mt-10 flex w-fit cursor-pointer items-center gap-x-4 rounded-full px-6 py-2.5 text-white duration-200"
                    >
                        <p className="text-lg font-bold">Back to Home</p>
                    </Link>
                </motion.div>
            </section>
        </MotionConfig>
    );
};
