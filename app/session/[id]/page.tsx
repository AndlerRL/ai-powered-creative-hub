import LessonComponent from "@/components/lesson";

async function SessionPage({ params: asyncParams }: { params: Promise<{ id: string }> }) {
  const params = await asyncParams
  return (
    <LessonComponent params={params} />
  );
};

export default SessionPage;
