import Link from "next/link";

import { signInWithMagicLink } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchParams = {
  next?: string;
  sent?: string;
  error?: string;
};

export default async function LoginPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const next = searchParams.next ?? "/app";
  const sent = searchParams.sent === "1";
  const error = searchParams.error;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-6 py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a magic link.
          </CardDescription>
        </CardHeader>
        <form action={signInWithMagicLink}>
          <CardContent className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
            {sent ? (
              <p className="text-sm text-muted-foreground">
                Check your inbox for the sign-in link.
              </p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button type="submit">Send magic link</Button>
            <Button variant="ghost" render={<Link href="/" />}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
