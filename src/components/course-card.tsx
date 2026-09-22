import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onCancel?: () => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onCancel,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        <CardAction>
          <span
            className={
              enrolledAt
                ? "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent bg-amber-500/15 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-amber-700 transition-all dark:text-purple-700"
                : "rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700 dark:bg-amber-500/20 dark:text-amber-400"
            }
          >
            {enrolledAt ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </span>
        </CardAction>
      </CardHeader>
      {enrolledAt && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
          </div>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onCancel}
              aria-label="ยกเลิกการลงทะเบียน"
              title="ยกเลิกการลงทะเบียน"
            >
              <Trash2 />
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
