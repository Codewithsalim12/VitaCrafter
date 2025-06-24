"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IResume } from "@/models/Resume";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const { toast } = useToast();
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchResumes();
    }
  }, [status]);

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/resumes");
      if (response.ok) {
        const data = await response.json();
        setResumes(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch resumes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push("/editor/new");
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchResumes(); // Refresh the list
        toast({
          title: "Success",
          description: "Resume deleted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete resume.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-10 w-48" />
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-accent/10 pb-24">
      <header className="container mx-auto flex justify-between items-center mb-12 pt-10 px-4 md:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary drop-shadow-sm">
          Your Resumes
        </h1>
        <Button
          onClick={handleCreateNew}
          className="hidden md:inline-flex bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold rounded-lg px-6 py-3 shadow-lg transition-all duration-200"
          size="lg"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Create New Resume
        </Button>
      </header>
      <div className="container mx-auto px-4 md:px-8">
        {isLoading && !resumes.length ? (
          <p>Loading resumes...</p>
        ) : resumes.length > 0 ? (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <AnimatePresence>
              {resumes.map((resume) => (
                <motion.div
                  key={resume._id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="rounded-2xl shadow-xl border border-border/40 bg-white/90 group-hover:shadow-2xl group-hover:border-primary/40 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold font-headline text-primary group-hover:text-accent transition-colors duration-200">
                        {resume.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Last updated:{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-muted-foreground mb-2">
                        Template:{" "}
                        <span className="font-medium capitalize">
                          {resume.templateId}
                        </span>
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg font-semibold group-hover:border-primary"
                        onClick={() => router.push(`/editor/${resume._id}`)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="rounded-lg font-semibold"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(resume._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-white/70 shadow-inner">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              No resumes yet
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Click "Create New Resume" to get started.
            </p>
            <Button
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold rounded-lg px-6 py-3 shadow-lg transition-all duration-200"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Resume
            </Button>
          </div>
        )}
      </div>
      {/* Floating Create Button (desktop only) */}
      <Button
        onClick={handleCreateNew}
        className="fixed bottom-8 right-8 z-40 hidden md:flex bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold rounded-full p-0 w-16 h-16 shadow-2xl items-center justify-center text-3xl"
        size="icon"
        aria-label="Create New Resume"
      >
        <PlusCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}
