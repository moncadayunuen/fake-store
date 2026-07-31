import { FaSpinner } from "react-icons/fa";

type LoaderProps = {
    msg?: string;
    fullScreen?: boolean;
};

export const Loader = ({
   msg = "Espera un momento...",
   fullScreen = false,
}: LoaderProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 ${
                fullScreen ? "min-h-screen" : "py-10"
            }`}
        >
            <div role="status" aria-live="polite">
                <FaSpinner className="size-10 animate-spin text-orange-500" />
                <span className="sr-only">Cargando...</span>
            </div>

            <p className="text-lg font-medium text-slate-600">
                {msg}
            </p>
        </div>
    );
};