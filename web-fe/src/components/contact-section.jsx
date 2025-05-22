import React from "react";
import { H3, Small } from "./ui/typography";
import ContactForm from "./forms/contact";

export default function ContactSection() {
  return (
    <section className="bg-primary py-20">
      <div className="container">
        <div className="mx-auto max-w-xl space-y-8 rounded-md bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <H3>Drop us a line</H3>
            <Small className={"text-gray-400"}>
              Contact us for any question
            </Small>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
