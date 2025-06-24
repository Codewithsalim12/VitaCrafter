"use client";

import Link from "next/link";
import {
  LogOut,
  Menu,
  User as UserIcon,
  X,
  LayoutDashboard,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  {
    href: "/ai-assistant",
    label: "AI Assistant",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const protectedNavLinks = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  {
    href: "/ai-assistant",
    label: "AI Assistant",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  const navLinks = session ? protectedNavLinks : publicNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={session?.user?.image || undefined}
              alt={session?.user?.name || "User"}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        {session?.user.role === "admin" && (
          <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Admin</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        isScrolled && "border-border bg-background/80 backdrop-blur-lg"
      )}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6">
        <Logo />
        <nav className="hidden md:flex items-center ml-auto space-x-6 text-sm font-medium">
          {navLinks.map((link) =>
            link.href === "/ai-assistant" ? (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary flex items-center group"
                aria-label="AI Assistant"
                tabIndex={0}
              >
                <span className="relative flex items-center">
                  <Sparkles className="w-5 h-5" />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-8 opacity-0 group-hover:opacity-100 pointer-events-none bg-background text-xs text-foreground px-2 py-1 rounded shadow transition-opacity duration-200 whitespace-nowrap z-50">
                    AI Assistant
                  </span>
                </span>
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
          {status === "loading" ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : session ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </nav>
        <div className="ml-auto md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container pb-4 flex flex-col space-y-4 px-4 sm:px-6">
            {navLinks.map((link) =>
              link.href === "/ai-assistant" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium transition-colors hover:text-primary flex items-center gap-2"
                  aria-label="AI Assistant"
                  tabIndex={0}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>AI Assistant</span>
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t">
              {status === "loading" ? (
                <Skeleton className="h-9 w-full rounded-md" />
              ) : session ? (
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                  >
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
