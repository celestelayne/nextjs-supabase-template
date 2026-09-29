import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          You&apos;re signed in. Start building.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example: Notes</CardTitle>
          <CardDescription>
            Row-level security, server actions, and private storage in one small
            feature. Delete when you start your real project — see README.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/app/notes" />}>Open notes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
