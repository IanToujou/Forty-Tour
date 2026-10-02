import Link from "next/link";

export const HeaderCompany = () => {
    return (
        <Link href="/" className="flex items-center gap-x-4">
            <h1 className="font-outfit text-3xl font-bold text-white uppercase">Forty Tour</h1>
        </Link>
    );
};
