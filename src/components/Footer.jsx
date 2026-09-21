import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-8 pb-3 text-slate-300">
      <div className="flex justify-around">
        <div>
          <h2 className="text-2xl">
            <Link href="/">Folio</Link>
          </h2>
        </div>
        <small className="block bg-gray-900 text-slate-300 text-center pt-6">
          &copy; 2026 Folio All Rights Reserved.
        </small>
        <ul className="flex gap-6">
          <li>
            <a href="#">
              <InstagramIcon sx={{ fontSize: "2rem" }} />
            </a>
          </li>
          <li>
            <a href="#">
              <FacebookIcon sx={{ fontSize: "2rem" }} />
            </a>
          </li>
          <li>
            <a href="#">
              <YouTubeIcon sx={{ fontSize: "2rem" }} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
