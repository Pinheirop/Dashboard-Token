"use client";

import { loginUser } from "@/utils/ws_functions";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export function AuthorizeWithToken() {
  const [token, setToken] = useState("");
  const handleChange = (event: any) => {
    setToken(event.target.value);
  };
  


  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Dashboard Token</CardTitle>
        <CardDescription>Developed by P7</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="token">Token</Label>
          <Input id="token" type="text" value={token} onChange={handleChange} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => loginUser(token)}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
