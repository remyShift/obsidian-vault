> [!info]- Tags
> #LangagesDeProgs #React #NextJS


```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";

const navLinks = [
{ name: "Login", href: "/auth/login" },
{ name: "Register", href: "/auth/register" },
{ name: "Forgot Password", href: "/auth/forgot-password" },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div>
			{navLinks.map((link) => {
				const isActive = pathname.startsWith(link.href);
					return (
						<Link key={link.name} href={link.href}
						className={isActive ? "font-bold mr-4 text-red-500" : "mr-4 text-blue-500"}>
							{link.name}
						</Link>
					)
				})}
			{children}
		</div>
	)
}
```

Dans notre exemple (*qui est un fichier layout*) lorsqu'on est sur un lien actif il sera en rouge.
- Vu qu'on est sur un layout les 3 liens seront visibles peut importe où on se trouve dans le path `auth/`.
- On obtient le lien actif avec `usePathname` --> il nous donne ce qui suit notre path global.
- `isActive` est un boolean car `startWith` est une assertion.