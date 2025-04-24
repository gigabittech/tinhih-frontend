function Avatar({ name }) {
  if (!name || typeof name !== "string") return null;

  const arrayOfNames = name.trim().split(/\s+/);
  const firstLetter = arrayOfNames[0]?.[0]?.toUpperCase() || "";

  let initials = firstLetter;

  if (arrayOfNames.length > 1) {
    const lastLetter = arrayOfNames[arrayOfNames.length - 1]?.[0]?.toUpperCase() || "";
    initials = firstLetter + lastLetter;
  }

  return (
    <p className="w-8 h-8 flex justify-center items-center font-extrabold text-xs rounded-full bg-primary-400">
      {initials}
    </p>
  );
}

export default Avatar;

