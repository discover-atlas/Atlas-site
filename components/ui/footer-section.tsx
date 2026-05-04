'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

/* ── Types ── */
interface FooterLink {
    title: string;
    href: string;
    external?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

/* ── Link data — Atlas Leads ── */
const footerLinks: FooterSection[] = [
    {
        label: 'Services',
        links: [
            { title: 'Web Design & Development', href: '#services' },
            { title: 'SEO & Local Rankings',     href: '#services' },
            { title: 'Lead Generation',           href: '#services' },
            { title: 'CRM & Booking',             href: '#services' },
            { title: 'System Automations',        href: '#services' },
            { title: 'Social Media Content',      href: '#services' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About',                href: '#'                                                                    },
            { title: 'Contact',              href: '#contact'                                                             },
            { title: 'Book a Strategy Call', href: 'https://calendly.com/drikusbisschoff/al-agency-discovery-call', external: true },
        ],
    },
    {
        label: 'Follow Us',
        links: [
            { title: 'LinkedIn',  href: '#', icon: ExternalLink },
            { title: 'Instagram', href: '#', icon: ExternalLink },
        ],
    },
];

/* ── Atlas Leads logo ── */
function AtlasLogo() {
    return (
        <a href="#" aria-label="Atlas Leads home" className="group inline-flex items-center">
            <Image
                src="/atlas-logo.png"
                alt="Atlas Leads"
                width={128}
                height={32}
                className="h-8 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
            />
        </a>
    );
}

/* ── Footer ── */
export function Footer() {
    return (
        <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-white/5 px-6 py-12 lg:py-16"
            style={{
                background: 'radial-gradient(35% 128px at 50% 0%, rgba(0,201,200,0.05), transparent)',
                backgroundColor: '#0a0a0a',
            }}
        >
            {/* Top blur line */}
            <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-white/20" />

            <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">

                {/* Brand column */}
                <AnimatedContainer className="space-y-4">
                    <AtlasLogo />
                    <p className="text-[#f0ede8]/30 mt-4 text-xs leading-relaxed max-w-[20ch]">
                        We build systems that scale your business — without scaling headcount.
                    </p>
                    <p className="text-[#f0ede8]/15 text-[10px] tracking-[0.15em]">
                        © {new Date().getFullYear()} Atlas Leads. All rights reserved.
                    </p>
                </AnimatedContainer>

                {/* Link columns */}
                <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#f0ede8]/40 font-medium">
                                    {section.label}
                                </h3>
                                <ul className="mt-4 space-y-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                target={link.external ? '_blank' : undefined}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                                className="group inline-flex items-center gap-1.5 text-xs text-[#f0ede8]/35 hover:text-[#f0ede8] transition-colors duration-200"
                                            >
                                                {link.icon && (
                                                    <link.icon className="w-3.5 h-3.5 shrink-0 text-[#f0ede8]/20 group-hover:text-[#00C9C8] transition-colors duration-200" />
                                                )}
                                                <span className="relative">
                                                    {link.title}
                                                    <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00C9C8]/50 group-hover:w-full transition-all duration-300" />
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
}

/* ── Animated entrance wrapper ── */
type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default Footer;
