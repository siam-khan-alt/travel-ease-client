import { Link } from "react-router-dom";

const Breadcrumb = ({ category, name }) => (
  <div className="flex items-center gap-2 mb-6 opacity-40 text-[10px] uppercase font-black tracking-widest">
    <Link to="/">Home</Link> / <span className="text-[var(--primary)]">{category}</span> / {name}
  </div>
);

export default Breadcrumb;