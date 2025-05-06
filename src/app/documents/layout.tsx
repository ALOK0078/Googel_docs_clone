 interface DocumentsLayoutProps {
    children: React.ReactNode;  
    }

const DocumetsLayout = ({children}:DocumentsLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
        {children}
    </div>
  );
}   
export default DocumetsLayout;