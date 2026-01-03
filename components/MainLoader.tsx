import Loader from "./Loader";

export default function MainLoader() {
    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center">
            <Loader />
        </section>
    )
}