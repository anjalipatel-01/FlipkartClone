"use client";

import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ABOUT_LINKS = [
  "Contact Us",
  "About Us",
  "Careers",
  "Flipkart Stories",
  "Press",
  "Corporate Information",
];

const GROUP_COMPANIES = ["Myntra", "Cleartrip", "Shopsy"];

const HELP_LINKS = ["Payments", "Shipping", "Cancellation & Returns", "FAQ"];

const CONSUMER_POLICY = [
  "Cancellation & Returns",
  "Terms Of Use",
  "Security",
  "Privacy",
  "Sitemap",
  "Grievance Redressal",
  "EPR Compliance",
  "FSSAI Food Safety Connect App",
];

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white mt-2">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-8">
          {/* ABOUT */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              ABOUT
            </h4>
            <ul className="space-y-2">
              {ABOUT_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white text-xs font-medium hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              GROUP COMPANIES
            </h4>
            <ul className="space-y-2">
              {GROUP_COMPANIES.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white text-xs font-medium hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              HELP
            </h4>
            <ul className="space-y-2">
              {HELP_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="/help-center"
                    className="text-white text-xs font-medium hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              CONSUMER POLICY
            </h4>
            <ul className="space-y-2">
              {CONSUMER_POLICY.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white text-xs font-medium hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MAIL US + SOCIAL */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              Mail Us:
            </h4>
            <p className="text-xs text-white leading-5">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia &amp;
              <br />
              Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
            </p>
            <h4 className="text-[#878787] text-xs font-semibold mt-6 mb-3 tracking-wide">
              Social:
            </h4>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-white hover:text-[#878787]">
                <FaFacebookF size={16} />
              </Link>
              <Link href="#" className="text-white hover:text-[#878787]">
                <FaXTwitter size={16} />
              </Link>
              <Link href="#" className="text-white hover:text-[#878787]">
                <FaYoutube size={18} />
              </Link>
              <Link href="#" className="text-white hover:text-[#878787]">
                <FaInstagram size={16} />
              </Link>
            </div>
          </div>

          {/* REGISTERED OFFICE ADDRESS */}
          <div>
            <h4 className="text-[#878787] text-xs font-semibold mb-3 tracking-wide">
              Registered Office Address:
            </h4>
            <p className="text-xs text-white leading-5">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia &amp;
              <br />
              Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
            </p>
            <p className="text-xs text-white leading-5 mt-3">
              CIN&nbsp;: U51109KA2012PTC066107
            </p>
            <p className="text-xs text-white leading-5 mt-1">
              Telephone:{" "}
              <Link href="tel:044-45614700" className="text-[#2874f0] hover:underline">
                044-45614700
              </Link>
              {" / "}
              <Link href="tel:044-67415800" className="text-[#2874f0] hover:underline">
                044-67415800
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="border-t border-[#ffffff1a]">
        <div className="mx-auto max-w-[1400px] px-4 py-4 text-center sm:px-6 sm:py-5">
          <p className="text-xs text-[#878787]">
            &copy; 2007-2024 Flipkart.com
          </p>
        </div>
      </div>
    </footer>
  );
}
