'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function PayeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          bankAccount,
          walletId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "Payee details submitted successfully.",
        });
        router.push("/success/payee");
      } else if (response.status === 409) {
        toast({
          title: "Duplicate Payee",
          description: "A payee with the same email or bank account already exists.",
          variant: "destructive",
        });
      } else if (data.errors) {
        Object.keys(data.errors).forEach((field) => {
          toast({
            title: "Validation Error",
            description: `${field}: ${data.errors[field]._errors[0]}`,
            variant: "destructive",
          });
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "An error occurred while submitting the form.",
          variant: "destructive",
        });  
      } else {
        toast({
          title: "Error",
          description: "An error occurred while submitting the form.",
          variant: "destructive",
        });  
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Enter Payee Details</CardTitle>
        <CardDescription>Please fill in the information below to add a new payee.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankAccount">Bank Account</Label>
            <Input
              type="text"
              id="bankAccount"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletId">Wallet ID (Optional)</Label>
            <Input
              type="text"
              id="walletId"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              placeholder="Enter wallet ID if applicable"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        All fields are required unless marked as optional.
      </CardFooter>
    </Card>
  );
}
