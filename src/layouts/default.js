import Link from 'next/link';
import Logo from '@/components/tentacle-logo';
import Nav from '@/components/nav';

export default function DefaultLayout({ children }) {
  return (
    <div>
      <header className="flex px-6 bg-blue-gray-900">
        <div className="flex flex-grow py-4">
          <Link href="/">
            <div className="cursor-pointer">
              <Logo />
            </div>
          </Link>
        </div>
        <Nav />
      </header>

      <div className="px-6">{children}</div>
    </div>
  );
}
