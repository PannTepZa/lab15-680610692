import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courses } from "@/lib/mock-data";
import type { Course } from "@/lib/types";

type RegisterDialogProps = {
  onRegistered: (course: Course, time: string) => void;
  enrolledCourseIds: string[];
};

function getCurrentTime() {
  return new Date().toTimeString().slice(0, 5);
}

export function RegisterDialog({
  onRegistered,
  enrolledCourseIds,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime);
  const availableCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.courseId),
  );
  const selectedCourse = availableCourses.find(
    (course) => course.courseId === courseId,
  );
  const fullName = "Pann Kitina";
  const program = "CPE";

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (selectedCourse) {
      onRegistered(selectedCourse, time);
    }
    setCourseId(""); // เคลียร์ฟอร์ม
    setTime(getCurrentTime());
    setOpen(false); // ปิด Dialog
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setTime(getCurrentTime());
    }
    if (!nextOpen) {
      setCourseId("");
      setTime(getCurrentTime());
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>
          <img
            src="/359657.png"
            alt=""
            width={16}
            height={16}
            className="block object-contain invert dark:invert-0"
          />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm min-w-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription className="break-words">
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 w-full min-w-0 max-w-full justify-between overflow-hidden rounded-lg px-2.5 text-left font-normal"
                    />
                  }
                >
                <span
                  className={
                    selectedCourse
                      ? "min-w-0 truncate"
                      : "min-w-0 truncate text-muted-foreground"
                  }
                >
                  {selectedCourse
                    ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                    : "เลือกวิชา"}
                </span>
                  <ChevronDown className="size-4 shrink-0 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                {availableCourses.map((course) => (
                  <DropdownMenuItem
                    key={course.courseId}
                    onClick={() => setCourseId(course.courseId)}
                    className="whitespace-normal break-words py-2 pr-8"
                  >
                    <span className="min-w-0 break-words">
                      {course.courseId} - {course.courseTitle}
                    </span>
                    {course.courseId === courseId && (
                      <Check className="absolute right-2 size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <input type="hidden" name="courseId" value={courseId} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              onClick={(event) => event.currentTarget.showPicker()}
              className="cursor-pointer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              name="fullName"
              value={fullName}
              readOnly
              className="bg-muted/50 text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">โปรแกรม</Label>
            <Input
              id="program"
              name="program"
              value={program}
              readOnly
              className="bg-muted/50 text-foreground"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
