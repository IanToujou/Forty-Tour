import { FooterLink } from "@/components/common/footer/FooterLink";

export const Footer = () => {
    return (
        <footer className="w-full bg-white px-24 py-12">
            <div className="flex w-full flex-col items-start justify-between gap-12 lg:flex-row">
                <div className="flex max-w-sm flex-col gap-y-3">
                    <h6 className="font-outfit text-2xl font-bold">Forty Tour</h6>
                    <p className="text-neutral-medium text-sm font-medium">
                        The Forty2 campus belongs to School 42. This website is not affiliated with them in any way.
                    </p>
                </div>

                <div className="flex flex-wrap items-start gap-x-32 gap-y-8">
                    <div className="flex min-w-40 flex-col gap-y-3">
                        <h6 className="font-outfit text-xl font-bold">About</h6>
                        <FooterLink title="Privacy Policy" href="/" />
                        <FooterLink title="Legal" href="/" />
                    </div>
                    <div className="flex min-w-40 flex-col gap-y-3">
                        <h6 className="font-outfit text-xl font-bold">Digital Tour</h6>
                        <FooterLink title="Interactive Map" href="/" />
                        <FooterLink title="Points of Interest" href="/" />
                    </div>
                </div>
            </div>
            <div className="bg-primary-medium mt-12 mb-6 h-px w-full" />
            <div className="text-neutral-medium flex w-full flex-col items-center justify-between gap-2 text-center text-sm font-medium sm:flex-row sm:text-left">
                <p>Copyright (c) 2026 Toujou Studios</p>
            </div>
        </footer>
    );
};
