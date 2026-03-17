export default function LoadingAnimation() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white fixed inset-0 z-50">
            <div className="w-12 h-12 border-8 border-[#EA580C]/20 border-t-[#EA580C] rounded-full animate-spin"></div>
        </div>
    );
}
