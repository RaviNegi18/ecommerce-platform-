import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";

const Profile = () => {
  ///its just a demodata we will makde backedn of this yet in somedays
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  };

  return (
    <div className="flex mt-10 min-h-screen justify-center items-center h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl font-semibold">
            {user.name}
          </CardTitle>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">Role: {user.role}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full flex gap-2">
            <User size={18} /> Edit Profile
          </Button>
          <Button className="w-full flex gap-2">
            <Settings size={18} /> Account Settings
          </Button>
          <Button variant="destructive" className="w-full flex gap-2">
            <LogOut size={18} /> Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
