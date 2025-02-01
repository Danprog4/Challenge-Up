import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  desc: string;
  title: string;
  question: string;
  handleFunc: () => void;
  bgColor: string;
}

export const Alert = ({
  desc,
  title,
  handleFunc,
  question,
  bgColor,
}: AlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          className={`flex h-[44px] w-[90vw] items-center justify-center rounded-md ${bgColor} p-[10px]`}
        >
          <span className="text-sm font-bold">{title}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{question}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleFunc}>Продолжить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
