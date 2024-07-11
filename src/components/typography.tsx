export function H1({ text }: { text: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text.toUpperCase()}
    </h1>
  );
}

export function H3({ text }: { text: string }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text.toUpperCase()}
    </h3>
  );
}

export function P({ text }: { text: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}
