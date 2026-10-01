import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>Bienvenido a la App de Tareas</h1>
            <nav>
                <ul>
                    <Link href="/">Inicio</Link>
                    <Link href="/tasks">Tareas</Link>
                    <Link href="/about">Acerca de</Link>
                </ul>
            </nav>
        </header>
    )
}