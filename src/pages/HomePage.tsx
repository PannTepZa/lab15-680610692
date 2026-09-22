import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";


export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="w-1/2 text-center">
        <CardHeader>
          <CardTitle>ระบบลงทะเบียนเรียน CPE &amp; ISNE</CardTitle>
        </CardHeader>
        <Button className="mx-auto mb-4 w-1/2" render={<Link to="/enrollment" />}>
          ไปหน้าลงทะเบียนเรียน
        </Button>
      </Card>
      <p className="text-center text-xs text-muted-foreground">จัดทำโดย Pann Kitina รหัสนักศึกษา 680610692</p>
    </div>
  );
}
