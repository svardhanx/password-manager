export default function SubHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col mb-4">
      <h4 className="text-2xl font-bold text-black dark:text-white">{title}</h4>
      <p className="text-sm text-muted-foreground dark:text-white">
        {description}
      </p>
    </div>
  );
}
