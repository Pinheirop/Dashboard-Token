"use client";

import { useState } from "react";
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

export function AuthorizeWithToken() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleLogin = async () => {
    try {
      setError(null); // Limpa o erro anterior
      await loginUser(token);
      // Redirecionar ou atualizar UI em caso de sucesso
      // Por exemplo: window.location.href = '/dashboard';
    } catch (error: any) {
      // Define a mensagem de erro no estado
      setError(error.message || "Erro desconhecido ao fazer login.");
    }
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
