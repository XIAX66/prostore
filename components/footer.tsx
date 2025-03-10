import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        <span className="text-sm">
          &copy; {currentYear} {APP_NAME}. All Rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
