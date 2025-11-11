import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/Sidebar";
import {
  IconArrowLeft,
  IconHistory,
  IconHome,
  IconPhoto,
  IconSettings,
  IconStar,
  IconTrendingUp,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { signOut } from "../../lib/cognito";

export function SidebarDemo() {
  const links = [
    { label: "Home", href: "/home", icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "My Gallery", href: "/gallery", icon: <IconPhoto className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    // { label: "Trending", href: "/trending", icon: <IconTrendingUp className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "For You", href: "/for-you", icon: <IconStar className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "History", href: "/history", icon: <IconHistory className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    // { label: "Logout", href: "/", icon: <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
          <button onClick={signOut} className="my-1">
            <SidebarLink
              link={{
                label: "LogOut",
                href: "/",
                icon: (
                  <IconArrowLeft />
                ),
                
              }}
            />
          </button>

        </div>
        <SidebarLink
          link={{
            label: "Aniket Ainapur",
            href: "",
            icon: (
              <img
                src="https://assets.aceternity.com/manu.png"
                className="h-7 w-7 shrink-0 rounded-full"
                alt="Avatar"
              />
            ),
          }}
        />
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => { return (<a href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"> <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-pre text-black dark:text-white"> Artifex AI </motion.span> </a>); }; export const LogoIcon = () => { return (<a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"> <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> </a>); };
