function Spinner() {
  return (
    <div
      className="m-12 h-16 w-16 animate-rotate rounded-full bg-[radial-gradient(farthest-side,var(--color-brand-600)_94%,transparent)_top/10px_10px_no-repeat,conic-gradient(transparent_30%,var(--color-brand-600))]"
      style={{
        WebkitMask:
          "radial-gradient(farthest-side, transparent calc(100% - 10px), #000)",
      }}
    />
  );
}

export default Spinner;
