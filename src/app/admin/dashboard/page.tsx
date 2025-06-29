"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IUser } from "@/models/User";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  ShieldCheck,
  User as UserIcon,
  BarChart2,
  Users,
  UserPlus,
  Activity,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const { toast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/dashboard");
      } else {
        fetchUsers();
        fetchAnalytics();
      }
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch users.",
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

  const fetchAnalytics = async () => {
    setIsAnalyticsLoading(true);
    try {
      const response = await fetch("/api/admin/users?analytics=1");
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      // ignore
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: "user" | "admin") => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (response.ok) {
        fetchUsers();
        toast({ title: "Success", description: "User role updated." });
      } else {
        toast({
          title: "Error",
          description: "Failed to update role.",
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
        toast({ title: "Success", description: "User deleted successfully." });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete user.",
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

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-5 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-48" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-5 w-36" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-9" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-primary/80 to-accent/80 rounded-xl p-6 flex flex-col items-center shadow-lg text-white">
          <Users className="h-8 w-8 mb-2" />
          <div className="text-2xl font-bold">
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              analytics?.totalUsers ?? "-"
            )}
          </div>
          <div className="text-sm opacity-80">Total Users</div>
        </div>
        <div className="bg-gradient-to-br from-green-400/80 to-green-600/80 rounded-xl p-6 flex flex-col items-center shadow-lg text-white">
          <UserPlus className="h-8 w-8 mb-2" />
          <div className="text-2xl font-bold">
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              analytics?.newUsersToday ?? "-"
            )}
          </div>
          <div className="text-sm opacity-80">New Today</div>
        </div>
        <div className="bg-gradient-to-br from-blue-400/80 to-blue-600/80 rounded-xl p-6 flex flex-col items-center shadow-lg text-white">
          <BarChart2 className="h-8 w-8 mb-2" />
          <div className="text-2xl font-bold">
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              analytics?.newUsersThisWeek ?? "-"
            )}
          </div>
          <div className="text-sm opacity-80">New This Week</div>
        </div>
        <div className="bg-gradient-to-br from-pink-400/80 to-pink-600/80 rounded-xl p-6 flex flex-col items-center shadow-lg text-white">
          <Activity className="h-8 w-8 mb-2" />
          <div className="text-2xl font-bold">
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              analytics?.activeUsers ?? "-"
            )}
          </div>
          <div className="text-sm opacity-80">Active (7d)</div>
        </div>
      </div>
      {/* Recent Users Table */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Recent Registrations & Logins
        </h2>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isAnalyticsLoading || !analytics?.recentUsers
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                    </TableRow>
                  ))
                : analytics.recentUsers.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-2">
                  {user.role === "user" ? (
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(user._id, "admin")}
                    >
                      <ShieldCheck className="mr-2 h-4 w-4" /> Make Admin
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleRoleChange(user._id, "user")}
                    >
                      <UserIcon className="mr-2 h-4 w-4" /> Make User
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the user and all their
                          data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
