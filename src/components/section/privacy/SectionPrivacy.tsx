import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";

export const SectionPrivacy = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="bg-neutral-white w-full px-12 py-24 md:py-36">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mx-auto w-full max-w-3xl"
                >
                    <h1 className="font-outfit text-neutral-darker text-4xl font-semibold tracking-tight md:text-5xl">Privacy Policy</h1>
                    <p className="font-manrope text-neutral-light mt-4 text-sm">Last updated: 4. October 2026</p>

                    <div className="mt-12 flex flex-col gap-10">
                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">1. Controller</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                This website is operated by Ian Bour, Luxembourg, contact: legal@toujou.lu. We are the controller responsible for the
                                processing of personal data described in this policy.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">2. Data We Process</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                We do not offer user accounts or contact forms, and we do not use analytics or tracking tools. When you visit this
                                website, our web server automatically records standard server log data, including:
                            </p>
                            <ul className="font-manrope text-neutral-medium marker:text-primary-medium mt-3 list-disc space-y-1 pl-5 text-base leading-relaxed">
                                <li>your IP address</li>
                                <li>the date and time of the request</li>
                                <li>the page or file requested</li>
                                <li>your browser type and user agent</li>
                                <li>the referring page</li>
                            </ul>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">3. Purpose and Legal Basis</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                We process this data solely to ensure the security, stability, and proper functioning of the website, for example to
                                detect and prevent abuse and to diagnose technical errors. The legal basis is our legitimate interest pursuant to Art.
                                6(1)(f) GDPR.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">4. Retention</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                Server log files are automatically deleted after 30 days.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">
                                5. Content Delivery and Security (Cloudflare)
                            </h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                We use Cloudflare, Inc. as a content delivery network and security service. When you access this website, your
                                requests are routed through Cloudflare&apos;s infrastructure, which processes your IP address and request data in
                                order to deliver and protect the site. Such processing may involve transfers of data to countries outside the European
                                Economic Area, which Cloudflare safeguards through appropriate mechanisms such as standard contractual clauses.
                                Further information is available in Cloudflare&apos;s privacy policy at{" "}
                                <a
                                    href="https://www.cloudflare.com/privacypolicy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-dark decoration-primary-medium hover:text-primary-medium font-semibold underline underline-offset-4 transition-colors duration-300"
                                >
                                    cloudflare.com/privacypolicy
                                </a>
                                .
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">6. Fonts (Google Fonts)</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                This website uses fonts provided by Google Fonts, a service of Google Ireland Limited. When you visit a page, your
                                browser loads the fonts directly from Google&apos;s servers. As a result, Google receives your IP address and
                                technical request data, such as your browser type and the page from which the fonts were requested. This allows the
                                fonts to be displayed correctly and consistently. The legal basis is our legitimate interest in a uniform and
                                attractive presentation of the website pursuant to Art. 6(1)(f) GDPR. Google may process this data outside the
                                European Economic Area. Further information is available in Google&apos;s privacy policy at{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-dark decoration-primary-medium hover:text-primary-medium font-semibold underline underline-offset-4 transition-colors duration-300"
                                >
                                    policies.google.com/privacy
                                </a>
                                .
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">7. Cookies</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                We do not set cookies ourselves. Cloudflare may set strictly necessary cookies for security purposes, which do not
                                require your consent.
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">8. Your Rights</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                Under the GDPR, you have the right to access, rectify, or erase your personal data, to restrict or object to its
                                processing, and to data portability where applicable. To exercise these rights, please contact us at legal@toujou.lu.
                                You also have the right to lodge a complaint with a supervisory authority, in particular the Commission Nationale pour
                                la Protection des Données (CNPD) in Luxembourg:{" "}
                                <a
                                    href="https://cnpd.lu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-dark decoration-primary-medium hover:text-primary-medium font-semibold underline underline-offset-4 transition-colors duration-300"
                                >
                                    cnpd.lu
                                </a>
                                .
                            </p>
                        </div>

                        <div className="border-primary-medium border-l-2 pl-6">
                            <h2 className="font-outfit text-neutral-darker text-xl font-semibold md:text-2xl">9. Changes to This Policy</h2>
                            <p className="font-manrope text-neutral-medium mt-3 text-base leading-relaxed text-justify">
                                We may update this policy from time to time. The current version is always available on this page, together with the
                                date of the last update.
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
