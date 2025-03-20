
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 导航链接
  const navLinks = [
    { name: "名言生成器", href: "#generator" },
    { name: "名言集锦", href: "#quotes" },
    { name: "科幻素材", href: "#resources" },
    { name: "博客", href: "/blog" },
    { name: "帮助", href: "/help" }
  ];

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 关闭菜单（当窗口大小改变时）
  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "py-3 bg-white shadow-sm" : "py-5 bg-transparent"
  }`;

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return location.hash === href || (!location.hash && href === "#");
    }
    return location.pathname === href;
  };

  return (
    <nav className={navbarClass}>
      <div className="section-container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SCI-FI AI
          </span>
        </Link>

        {/* Desktop 导航链接 */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-indigo-700"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="section-container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
