import { FaCheckCircle } from "react-icons/fa";

interface GreenCheckmarkProps {
  variant?: 'light' | 'dark';
}

export default function GreenCheckmark({ variant = 'light' }: GreenCheckmarkProps) {
  const checkColor = variant === 'light' ? 'text-success' : 'text-white';
  
  return (
    <FaCheckCircle className={`${checkColor} me-1 fs-5`} />
  );
}
