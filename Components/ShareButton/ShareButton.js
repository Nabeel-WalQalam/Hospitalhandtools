import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaPinterest,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
export const ShareButton = () => {
  return (
    <>
      <div className="btn_wrap">
        <span className="span_12">Share</span>

        <div className="container2">
          <i className="fab fa-facebook-f">
            <Link href={"#"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </Link>
          </i>

          <i className="fab fa-twitter">
            <Link href={"#"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </Link>
          </i>

          <i className="fab fa-instagram">
            <Link href={"#"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </Link>
          </i>

          <i className="fab fa-whatsapp">
            <Link href={"#"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                <FaPinterest />
              </a>
            </Link>
          </i>
        </div>
      </div>
    </>
  );
};
