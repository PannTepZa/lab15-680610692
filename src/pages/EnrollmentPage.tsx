import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data";
import type { Course } from "@/lib/types";
import { SidebarSeparator } from "@/components/ui/sidebar";

function formatEnrollmentDateTime(time: string) {
  const date = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);

  return `${date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })} ${time}`;
}

export default function Enrollment() {
  const enrolledStudent = {
    ...currentStudent,
    firstName: "Pann",
    lastName: "Kitina",
  };
  const [registeredCourses, setRegisteredCourses] = useState<
    Array<{ course: Course; enrolledAt: string }>
  >([]);

  function handleRegistered(course: Course, time: string) {
    setRegisteredCourses((current) => [
      ...current,
      { course, enrolledAt: formatEnrollmentDateTime(time) },
    ]);
  }

  function handleCancel(courseId: string) {
    setRegisteredCourses((current) =>
      current.filter(({ course }) => course.courseId !== courseId),
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground font-semibold">Pann Kitina (680610692)</p>
        </div>
        <RegisterDialog
          onRegistered={handleRegistered}
          enrolledCourseIds={registeredCourses.map(({ course }) => course.courseId)}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const registration = registeredCourses.find(
            ({ course: registeredCourse }) =>
              registeredCourse.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={enrolledStudent}
              enrolledAt={registration?.enrolledAt}
              onCancel={
                registration
                  ? () => handleCancel(course.courseId)
                  : undefined
              }
            />
          );
        })}
      </div>
      <div className="mt-auto translate-y-4 space-y-4">
        <SidebarSeparator />
        <p className="text-center text-xs text-muted-foreground">
          จัดทำโดย Pann Kitina รหัสนักศึกษา 680610692
        </p>
      </div>
    </div>
  );
}
