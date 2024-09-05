interface Props {
  children: React.ReactNode;
}

export default function ErrorMsg({ children }: Props) {
  return <div className="text-red-600 text-sm">{children}</div>;
}
